"use client";
import { useEffect, useRef } from "react";
import { isLite } from "@/lib/perf";

/**
 * Fixed full-page background: the cosmos-field photo, faded by CSS (.scene opacity).
 *  - Flowers sway via a WebGL fragment shader. Every term is periodic in a single loop phase, so the
 *    motion repeats seamlessly forever (no time-growth, no precision drift, no visible "restart").
 *  - The photo is drawn at the screen's real pixel density (devicePixelRatio) with bicubic (Catmull-Rom)
 *    sampling + unsharp masking tuned to the faded photo, so a small source photo stays as crisp as it can.
 *  - The ferry is a sprite that sails along one lane of open water. The lane's "where is water?" mask is
 *    computed from the photo itself, so the boat slides behind the trees / headland instead of over them.
 * Assets: /public/scene/scene.webp + scene-lite.webp (boat removed) and /public/scene/boat.png.
 * The photo can be any resolution as long as it keeps the same framing (everything below is in fractions of it).
 */

// ---- photo geometry, as fractions of the photo ----
const DESIGN_W = 720; // the photo size the numbers below were measured on
const LANE_Y = 0.4725; // vertical centre of the boat lane (open water between the far shore and the near trees)
const HULL_Y = 0.4795; // row where the hull meets the water; the water mask is read here
const BOAT_W = 32.4 / DESIGN_W; // boat width
const BOAT_RATIO = 49 / 162; // sprite height / width
const WAKE_W = 95 / DESIGN_W; // wake length
const MASK_X0 = 0.332; // never show the boat left of this (tree line / separate lagoon) ...
const MASK_X1 = 0.762; // ... or right of this (grove of trees)
const FADE_TIME = 0.7; // seconds the wake takes to fade once the boat has gone behind the land

// seconds for the flowers' sway to repeat exactly (any value works, it is a seamless loop)
const LOOP = 22;

const VERT = `
attribute vec2 aPos;
varying vec2 vUv;
void main(){ vUv = aPos * 0.5 + 0.5; gl_Position = vec4(aPos, 0.0, 1.0); }
`;

const FRAG_BODY = `
#ifdef GL_FRAGMENT_PRECISION_HIGH
precision highp float;
#else
precision mediump float;
#endif
uniform sampler2D uTex;
uniform vec2 uRes;
uniform vec2 uImg;
uniform vec2 uTexel;
uniform float uPhase;   // 0..2PI, wraps every LOOP seconds
uniform float uMotion;
varying vec2 vUv;

float hash(vec2 p){ p = fract(p * vec2(123.34, 456.21)); p += dot(p, p + 45.32); return fract(p.x * p.y); }
float noise(vec2 p){
  vec2 i = floor(p), f = fract(p);
  f = f * f * (3.0 - 2.0 * f);
  return mix(mix(hash(i), hash(i + vec2(1.0, 0.0)), f.x),
             mix(hash(i + vec2(0.0, 1.0)), hash(i + vec2(1.0, 1.0)), f.x), f.y);
}
// a point travelling round a circle: k whole turns per loop, so it always returns to where it started
vec2 orbit(float k, float ph){ float a = uPhase * k + ph; return vec2(cos(a), sin(a)); }

// Catmull-Rom bicubic sampling (5 bilinear taps): much crisper than plain LINEAR when the photo is enlarged
vec3 bicubic(vec2 uv){
  vec2 pos = uv / uTexel;
  vec2 c = floor(pos - 0.5) + 0.5;
  vec2 f = pos - c;
  vec2 w0 = f * (-0.5 + f * (1.0 - 0.5 * f));
  vec2 w1 = 1.0 + f * f * (-2.5 + 1.5 * f);
  vec2 w2 = f * (0.5 + f * (2.0 - 1.5 * f));
  vec2 w3 = f * f * (-0.5 + 0.5 * f);
  vec2 w12 = w1 + w2;
  vec2 t0 = (c - 1.0) * uTexel;
  vec2 t3 = (c + 2.0) * uTexel;
  vec2 t12 = (c + w2 / w12) * uTexel;
  vec3 r = texture2D(uTex, vec2(t12.x, t0.y)).rgb * (w12.x * w0.y)
         + texture2D(uTex, vec2(t0.x, t12.y)).rgb * (w0.x * w12.y)
         + texture2D(uTex, vec2(t12.x, t12.y)).rgb * (w12.x * w12.y)
         + texture2D(uTex, vec2(t3.x, t12.y)).rgb * (w3.x * w12.y)
         + texture2D(uTex, vec2(t12.x, t3.y)).rgb * (w12.x * w3.y);
  float wsum = w12.x * w0.y + w0.x * w12.y + w12.x * w12.y + w3.x * w12.y + w12.x * w3.y;
  return clamp(r / wsum, 0.0, 1.0);
}

void main(){
  // "cover" mapping so the shader lines up exactly with CSS background-size: cover
  vec2 frag = vUv * uRes;
  float scale = max(uRes.x / uImg.x, uRes.y / uImg.y);
  vec2 size = uImg * scale;
  vec2 off = (uRes - size) * 0.5;
  vec2 uv = (frag - off) / size;
  uv.y = 1.0 - uv.y;

  // 0 at the far edge of the flower field, 1 at the bottom (closest flowers move the most)
  float d = smoothstep(0.572, 1.0, uv.y);
  float lock = smoothstep(0.572, 0.61, uv.y);     // keeps the horizon, trees and sea perfectly still
  float amp = (0.0012 + 0.0066 * pow(d, 1.5)) * uMotion * lock;

  // big gusts rolling across the field (3 whole waves per loop)
  float gust = 0.5 + 0.5 * sin(uv.x * 5.0 + uv.y * 2.2 - uPhase * 3.0 + 1.7 * noise(uv * 3.0 + orbit(1.0, 0.0) * 0.7));

  // organic per-clump flutter (the noise field circles back to its start every loop)
  vec2 q = vec2(uv.x * 11.0, uv.y * 16.0 * (0.6 + d));
  float n1 = noise(q + orbit(2.0, 0.0) * 1.2);
  float n2 = noise(q * 1.9 + vec2(5.2, 0.0) + orbit(3.0, 2.1) * 1.0);
  float sway = (n1 - 0.5) * 1.4 + (n2 - 0.5) * 0.7;

  float dx = (gust * 1.25 + sway * 0.55) * amp;
  float dy = (n2 - 0.5) * amp * 0.5 + (gust - 0.5) * amp * 0.25;

  vec2 p = clamp(uv + vec2(dx, dy), 0.0, 1.0);
#ifdef LITE
  vec3 col = texture2D(uTex, p).rgb;
#else
  vec3 col = bicubic(p);
#endif

#ifndef LITE
  // unsharp mask, sized for this photo + the CSS fade. scene.jpg only holds ~half its pixel grid in real
  // detail, so a 1-texel kernel does almost nothing; a ~1.5-texel ring does, and the .scene opacity halves
  // contrast, so the boost has to be stronger than it would be on an unfaded photo.
  vec2 r1 = uTexel * 1.5;
  vec2 r2 = uTexel * 1.06;
  vec3 ring = texture2D(uTex, p + vec2(r1.x, 0.0)).rgb + texture2D(uTex, p - vec2(r1.x, 0.0)).rgb
            + texture2D(uTex, p + vec2(0.0, r1.y)).rgb + texture2D(uTex, p - vec2(0.0, r1.y)).rgb
            + texture2D(uTex, p + vec2(r2.x, r2.y)).rgb + texture2D(uTex, p + vec2(-r2.x, r2.y)).rgb
            + texture2D(uTex, p + vec2(r2.x, -r2.y)).rgb + texture2D(uTex, p + vec2(-r2.x, -r2.y)).rgb;
  vec3 soft = mix(ring * 0.125, col, 0.2);
  col = clamp(col + (col - soft) * 1.0, 0.0, 1.0);

#endif

  // a whisper of light shifting with the gusts
  col *= 1.0 + (gust - 0.5) * 0.035 * lock * uMotion;
  gl_FragColor = vec4(col, 1.0);
}
`;
const FRAG = FRAG_BODY;
const FRAG_LITE = "#define LITE\n" + FRAG_BODY;

type GLState = {
  gl: WebGLRenderingContext;
  resize: (w: number, h: number) => void;
  draw: (t: number, motion: number) => void;
};

function createGL(canvas: HTMLCanvasElement, img: HTMLImageElement, lite: boolean): GLState | null {
  const gl = canvas.getContext("webgl", { alpha: false, antialias: false, powerPreference: "low-power", preserveDrawingBuffer: false, depth: false, stencil: false });
  if (!gl) return null;

  const compile = (type: number, src: string) => {
    const s = gl.createShader(type);
    if (!s) return null;
    gl.shaderSource(s, src);
    gl.compileShader(s);
    return gl.getShaderParameter(s, gl.COMPILE_STATUS) ? s : null;
  };
  const vs = compile(gl.VERTEX_SHADER, VERT);
  const fs = compile(gl.FRAGMENT_SHADER, lite ? FRAG_LITE : FRAG);
  const prog = gl.createProgram();
  if (!vs || !fs || !prog) return null;
  gl.attachShader(prog, vs);
  gl.attachShader(prog, fs);
  gl.linkProgram(prog);
  if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) return null;
  gl.useProgram(prog);

  // one big triangle that covers the screen
  const buf = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, buf);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW);
  const loc = gl.getAttribLocation(prog, "aPos");
  gl.enableVertexAttribArray(loc);
  gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0);

  const tex = gl.createTexture();
  gl.bindTexture(gl.TEXTURE_2D, tex);
  gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGB, gl.RGB, gl.UNSIGNED_BYTE, img);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);

  const nw = img.naturalWidth || DESIGN_W;
  const nh = img.naturalHeight || 480;
  const uRes = gl.getUniformLocation(prog, "uRes");
  const uPhase = gl.getUniformLocation(prog, "uPhase");
  const uMotion = gl.getUniformLocation(prog, "uMotion");
  gl.uniform1i(gl.getUniformLocation(prog, "uTex"), 0);
  gl.uniform2f(gl.getUniformLocation(prog, "uImg"), nw, nh);
  gl.uniform2f(gl.getUniformLocation(prog, "uTexel"), 1 / nw, 1 / nh);

  return {
    gl,
    resize(w, h) {
      canvas.width = w;
      canvas.height = h;
      gl.viewport(0, 0, w, h);
      gl.uniform2f(uRes, w, h);
    },
    draw(t, motion) {
      // wrap the clock *here* so the shader only ever sees a small, exactly-periodic phase
      gl.uniform1f(uPhase, ((t % LOOP) / LOOP) * Math.PI * 2);
      gl.uniform1f(uMotion, motion);
      gl.drawArrays(gl.TRIANGLES, 0, 3);
    },
  };
}

/**
 * Reads the photo and returns a 1-pixel-tall PNG (as a data URL) whose alpha is 1 in the columns where the
 * boat's waterline sits on open water, and 0 where there is land in front of it (trees, headland).
 * Used as a CSS mask on the boat layer, so the boat slides behind the land instead of over it.
 * The same columns are returned so the boat logic knows when the boat is hidden (= "gone").
 */
function buildBoatMask(img: HTMLImageElement): { url: string; cols: Float32Array } {
  const sw = Math.min(img.naturalWidth || DESIGN_W, 1280);
  const sh = Math.max(1, Math.round((sw * (img.naturalHeight || 480)) / (img.naturalWidth || DESIGN_W)));
  const on = new Uint8Array(sw);
  let ok = false;
  try {
    const c = document.createElement("canvas");
    c.width = sw;
    c.height = sh;
    const ctx = c.getContext("2d", { willReadFrequently: true });
    if (ctx) {
      ctx.drawImage(img, 0, 0, sw, sh);
      const y0 = Math.max(0, Math.round(HULL_Y * sh) - 2);
      const rows = 5;
      const px = ctx.getImageData(0, y0, sw, rows).data;
      for (let x = 0; x < sw; x++) {
        let water = 0;
        for (let r = 0; r < rows; r++) {
          const i = (r * sw + x) * 4;
          const R = px[i], G = px[i + 1], B = px[i + 2];
          if (B - R > 66 && B - G > 25) water++; // sea is clearly bluer than trees, sand, haze
        }
        on[x] = water === rows && x >= MASK_X0 * sw && x < MASK_X1 * sw ? 1 : 0;
      }
      ok = true;
    }
  } catch {
    ok = false;
  }
  if (!ok) {
    // measured fallback for the shipped photo
    for (let x = Math.round(MASK_X0 * sw); x < Math.round(MASK_X1 * sw); x++) on[x] = 1;
  }

  // tidy: fill tiny gaps (a bright wave), drop tiny islands (a stray pixel)
  const tidy = (val: number, maxRun: number) => {
    let x = 0;
    while (x < sw) {
      if (on[x] !== val) { x++; continue; }
      let e = x;
      while (e < sw && on[e] === val) e++;
      if (e - x < maxRun && x > 0 && e < sw) for (let i = x; i < e; i++) on[i] = 1 - val;
      x = e;
    }
  };
  tidy(0, Math.max(3, Math.round(sw * 0.007)));
  tidy(1, Math.max(4, Math.round(sw * 0.012)));

  // soften the edges a little so the boat tucks in smoothly
  const rad = Math.max(1, Math.round(sw * 0.0035));
  const out = document.createElement("canvas");
  out.width = sw;
  out.height = 1;
  const octx = out.getContext("2d")!;
  const im = octx.createImageData(sw, 1);
  const cols = new Float32Array(sw);
  for (let x = 0; x < sw; x++) {
    let s = 0;
    for (let k = -rad; k <= rad; k++) s += on[Math.min(sw - 1, Math.max(0, x + k))];
    cols[x] = s / (2 * rad + 1);
    const a = Math.round(cols[x] * 255);
    im.data[x * 4] = 0;
    im.data[x * 4 + 1] = 0;
    im.data[x * 4 + 2] = 0;
    im.data[x * 4 + 3] = a;
  }
  octx.putImageData(im, 0, 0);
  return { url: out.toDataURL("image/png"), cols };
}

export function Scene() {
  const rootRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const shipsRef = useRef<HTMLDivElement>(null);
  const boatRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    const canvas = canvasRef.current;
    const ships = shipsRef.current;
    const boatEl = boatRef.current;
    if (!root || !canvas || !ships || !boatEl) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const lite = isLite();
    // quality knobs: lite devices get a smaller canvas, a 1-tap shader and a 30fps cap
    const MAX_DPR = lite ? 1 : 2;
    const MAX_PIXELS = lite ? 0.9e6 : 5.5e6;
    const FRAME_MS = lite ? 1000 / 30 : 0;
    let quality = 1; // adaptive resolution scale, lowered if frames run slow
    let slow = 0;
    let avg = 16;
    let frozen = false;
    let scrolling = false;
    let scrollTimer = 0;
    let lastDraw = 0;
    let alive = true;
    let raf = 0;
    let glState: GLState | null = null;
    let photo: HTMLImageElement | null = null;
    let ready = false; // photo + boat mask loaded
    let maskCols: Float32Array | null = null; // 1 where open water, 0 where land hides the boat
    let maskL = MASK_X0; // first / last open-water column, as photo fractions
    let maskR = MASK_X1;
    let W = 0;
    let H = 0;
    let imgW = 0; // photo size on screen, px (cover)
    let imgH = 0;
    let offX = 0;
    let offY = 0;
    const t0 = performance.now();
    let last = t0;

    // ---------- the boat ----------
    // fx = boat centre as a fraction of the photo's width; speed in photo-widths per second
    const boat = { fx: 0.5, dir: -1 as 1 | -1, speed: 14 / DESIGN_W, k: 1, lane: 0, wait: 0, phase: Math.random() * 6.28, seen: false, fade: 1 };
    const boatW = () => BOAT_W * imgW * boat.k;
    const half = () => (BOAT_W * boat.k) / 2;
    // how much of the hull is currently over open water (0 = completely behind the land)
    const hullVisible = () => {
      if (!maskCols) return 1;
      const n = maskCols.length;
      const a = Math.max(0, Math.floor((boat.fx - half()) * n));
      const b = Math.min(n - 1, Math.ceil((boat.fx + half()) * n));
      let m = 0;
      for (let i = a; i <= b; i++) if (maskCols[i] > m) m = maskCols[i];
      return m;
    };
    const boatH = () => boatW() * BOAT_RATIO;

    const applySizes = () => {
      const u = imgW / DESIGN_W; // screen px per photo px
      boatEl.style.setProperty("--bw", `${boatW()}px`);
      boatEl.style.setProperty("--wl", `${WAKE_W * imgW * boat.k}px`);
      boatEl.style.setProperty("--wh", `${2.6 * u * boat.k}px`);
    };

    const spawn = (initial: boolean) => {
      boat.k = initial ? 1 : 0.92 + Math.random() * 0.16;
      boat.dir = initial ? -1 : Math.random() < 0.5 ? -1 : 1;
      boat.speed = (12 + Math.random() * 7) / DESIGN_W;
      boat.lane = initial ? 0 : (Math.random() - 0.5) * 0.006;
      boat.wait = 0;
      boat.seen = initial;
      boat.fade = 1;
      // new boats start just behind the land on one side
      boat.fx = initial ? 0.5 : boat.dir < 0 ? maskR + half() + 0.012 : maskL - half() - 0.012;
      boatEl.style.opacity = "1";
      applySizes();
    };

    const place = (t: number) => {
      const u = imgW / DESIGN_W;
      const bob = Math.sin(t * 1.3 + boat.phase) * 0.35 * u * boat.k;
      const rot = Math.sin(t * 0.9 + boat.phase) * 0.5;
      const x = offX + boat.fx * imgW - boatW() / 2;
      const y = offY + (LANE_Y + boat.lane) * imgH - boatH() / 2 + bob;
      boatEl.style.transform = `translate3d(${x}px,${y}px,0) scaleX(${-boat.dir}) rotate(${rot}deg)`;
      boatEl.style.opacity = String(boat.fade);
      boatEl.style.visibility = "visible";
    };

    const stepBoat = (dt: number, t: number) => {
      if (!ready) return;
      if (boat.wait > 0) {
        boat.wait -= dt;
        if (boat.wait > 0) return;
        spawn(false);
      }
      boat.fx += boat.dir * boat.speed * dt;
      // behind the land = off the screen: once the hull has been seen and is hidden again, fade the wake and respawn later
      const v = hullVisible();
      if (v > 0.15) boat.seen = true;
      if (boat.seen && v < 0.03) boat.fade = Math.max(0, boat.fade - dt / FADE_TIME);
      const stray = boat.fx < maskL - 0.3 || boat.fx > maskR + 0.3; // safety net
      if (boat.fade <= 0 || stray) {
        boat.wait = 3 + Math.random() * 10; // empty sea for a while, then another boat shows up
        boatEl.style.visibility = "hidden";
        return;
      }
      place(t);
    };

    // ---------- layout ----------
    const measure = () => {
      W = root.clientWidth;
      H = root.clientHeight;
      const nw = photo?.naturalWidth || DESIGN_W;
      const nh = photo?.naturalHeight || 480;
      const scale = Math.max(W / nw, H / nh);
      imgW = nw * scale;
      imgH = nh * scale;
      offX = (W - imgW) / 2;
      offY = (H - imgH) / 2;
      // keep the boat's land-mask lined up with the photo
      ships.style.setProperty("-webkit-mask-size", `${imgW}px 100%`);
      ships.style.setProperty("mask-size", `${imgW}px 100%`);
      ships.style.setProperty("-webkit-mask-position", `${offX}px 0`);
      ships.style.setProperty("mask-position", `${offX}px 0`);
      applySizes();
      if (glState) {
        // draw at the screen's real pixel density, capped so huge/hi-dpi screens stay smooth
        let dpr = Math.min(window.devicePixelRatio || 1, MAX_DPR) * quality;
        if (W * H * dpr * dpr > MAX_PIXELS) dpr = Math.sqrt(MAX_PIXELS / (W * H));
        glState.resize(Math.max(1, Math.round(W * dpr)), Math.max(1, Math.round(H * dpr)));
      }
    };

    const render = (t: number) => {
      if (glState) glState.draw(t, reduce ? 0 : 1);
    };

    const startGL = () => {
      if (!photo) return;
      glState = createGL(canvas, photo, lite);
      if (glState) {
        root.classList.add("gl");
        measure();
        render(0);
      }
    };

    const frame = (now: number) => {
      if (!alive) return;
      raf = requestAnimationFrame(frame);
      // while a phone is scrolling, keep the last frame on screen so the GPU can focus on compositing
      if (lite && scrolling) { last = now; return; }
      if (FRAME_MS && now - lastDraw < FRAME_MS - 1) return;
      lastDraw = now;
      const t = (now - t0) / 1000;
      const raw = now - last;
      const dt = Math.min(0.1, raw / 1000);
      last = now;
      render(t);
      stepBoat(dt, t);

      // adaptive quality: if frames keep taking too long, render fewer pixels; if it is still bad, stop animating
      if (!document.hidden && raw < 250) {
        avg = avg * 0.92 + raw * 0.08;
        const budget = FRAME_MS ? FRAME_MS * 1.5 : 26;
        if (avg > budget) slow++; else slow = Math.max(0, slow - 1);
        if (slow > 45) {
          slow = 0;
          if (quality > 0.55) { quality = Math.max(0.5, quality * 0.8); measure(); }
          else if (!frozen) { frozen = true; cancelAnimationFrame(raf); }
        }
      }
    };

    measure();

    const onScroll = () => {
      scrolling = true;
      window.clearTimeout(scrollTimer);
      scrollTimer = window.setTimeout(() => { scrolling = false; }, 140);
    };
    if (lite) window.addEventListener("scroll", onScroll, { passive: true });

    photo = new Image();
    photo.onload = () => {
      if (!alive || !photo) return;
      const { url, cols } = buildBoatMask(photo);
      ships.style.setProperty("-webkit-mask-image", `url(${url})`);
      ships.style.setProperty("mask-image", `url(${url})`);
      maskCols = cols;
      let first = -1;
      let lastOn = -1;
      for (let i = 0; i < cols.length; i++) {
        if (cols[i] > 0.5) {
          if (first < 0) first = i;
          lastOn = i;
        }
      }
      if (first >= 0) {
        maskL = first / cols.length;
        maskR = (lastOn + 1) / cols.length;
      }
      ready = true;
      measure();
      spawn(true);
      place(0);
      startGL();
      if (!reduce) raf = requestAnimationFrame(frame);
    };
    photo.decoding = "async";
    // don't compete with first paint / hydration: fetch the photo once the page has loaded and the browser is idle
    const loadPhoto = () => { if (alive && photo) photo.src = lite ? "/scene/scene-lite.webp" : "/scene/scene.webp"; };
    const whenIdle = () => {
      const ric = (window as Window & { requestIdleCallback?: (cb: () => void, o?: { timeout: number }) => number }).requestIdleCallback;
      if (ric) ric(loadPhoto, { timeout: 1500 }); else window.setTimeout(loadPhoto, 200);
    };
    if (document.readyState === "complete") whenIdle();
    else window.addEventListener("load", whenIdle, { once: true });

    // if the GPU drops the context (tab backgrounded on some phones), fall back to the still photo, then recover
    const onLost = (e: Event) => {
      e.preventDefault();
      glState = null;
      root.classList.remove("gl");
    };
    const onRestored = () => startGL();
    canvas.addEventListener("webglcontextlost", onLost);
    canvas.addEventListener("webglcontextrestored", onRestored);

    const ro = new ResizeObserver(() => {
      measure();
      if (reduce) {
        render(0);
        if (ready) place(0);
      }
    });
    ro.observe(root);

    return () => {
      alive = false;
      cancelAnimationFrame(raf);
      window.clearTimeout(scrollTimer);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("load", whenIdle);
      ro.disconnect();
      canvas.removeEventListener("webglcontextlost", onLost);
      canvas.removeEventListener("webglcontextrestored", onRestored);
    };
  }, []);

  return (
    <div ref={rootRef} className="scene" aria-hidden>
      <canvas ref={canvasRef} className="scene-canvas" />
      <div ref={shipsRef} className="scene-ships">
        <div ref={boatRef} className="scene-boat">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/scene/boat.png" alt="" draggable={false} />
          <i className="scene-wake" />
        </div>
      </div>
    </div>
  );
}