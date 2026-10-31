"use client";
import { useEffect, useRef } from "react";

/**
 * Fixed full-page background: the cosmos-field photo, faded by CSS (.scene opacity).
 *  - Flowers sway via a WebGL fragment shader (rolling gusts + per-clump flutter, stronger toward the camera).
 *  - The ferry is a separate sprite (the original was painted out of the photo) that sails across forever:
 *    it leaves the screen completely, waits a random while, then a "new" boat arrives from a random side.
 * Assets: /public/scene/scene.jpg (boat removed) and /public/scene/boat.png.
 */

// photo + sprite geometry, in photo pixels (the photo is 720x480)
const IMG_W = 720;
const IMG_H = 480;
const BOAT_LEFT = 399.5; // where the sprite's left edge sat in the original photo
const BOAT_CY = 236.75; // vertical centre of the boat in the original photo
const BOAT_W = 40.5;
const BOAT_RATIO = 49 / 162; // sprite height / width

const VERT = `
attribute vec2 aPos;
varying vec2 vUv;
void main(){ vUv = aPos * 0.5 + 0.5; gl_Position = vec4(aPos, 0.0, 1.0); }
`;

const FRAG = `
#ifdef GL_FRAGMENT_PRECISION_HIGH
precision highp float;
#else
precision mediump float;
#endif
uniform sampler2D uTex;
uniform vec2 uRes;
uniform vec2 uImg;
uniform float uTime;
uniform float uMotion;
varying vec2 vUv;

float hash(vec2 p){ p = fract(p * vec2(123.34, 456.21)); p += dot(p, p + 45.32); return fract(p.x * p.y); }
float noise(vec2 p){
  vec2 i = floor(p), f = fract(p);
  f = f * f * (3.0 - 2.0 * f);
  return mix(mix(hash(i), hash(i + vec2(1.0, 0.0)), f.x),
             mix(hash(i + vec2(0.0, 1.0)), hash(i + vec2(1.0, 1.0)), f.x), f.y);
}

void main(){
  // "cover" mapping so the shader lines up exactly with CSS background-size: cover
  vec2 frag = vUv * uRes;
  float scale = max(uRes.x / uImg.x, uRes.y / uImg.y);
  vec2 size = uImg * scale;
  vec2 off = (uRes - size) * 0.5;
  vec2 uv = (frag - off) / size;
  uv.y = 1.0 - uv.y;

  float t = uTime;

  // 0 at the far edge of the flower field, 1 at the bottom (closest flowers move the most)
  float d = smoothstep(0.572, 1.0, uv.y);
  float lock = smoothstep(0.572, 0.61, uv.y);     // keeps the horizon, trees and sea perfectly still
  float amp = (0.0008 + 0.0044 * d * d) * uMotion * lock;

  // big gusts rolling across the field
  float gust = 0.5 + 0.5 * sin(uv.x * 5.0 + uv.y * 2.2 - t * 0.9 + 1.7 * noise(uv * 3.0 + t * 0.08));

  // organic per-clump flutter
  vec2 q = vec2(uv.x * 14.0, uv.y * 24.0 * (0.6 + d));
  float n1 = noise(q + vec2(t * 0.55, t * 0.18));
  float n2 = noise(q * 1.9 + vec2(-t * 0.7, 5.2 + t * 0.25));
  float sway = (n1 - 0.5) * 1.4 + (n2 - 0.5) * 0.7;

  float dx = (gust * 0.9 + sway * 0.9) * amp;
  float dy = (n2 - 0.5) * amp * 0.45;

  vec3 col = texture2D(uTex, clamp(uv + vec2(dx, dy), 0.0, 1.0)).rgb;
  // a whisper of light shifting with the gusts
  col *= 1.0 + (gust - 0.5) * 0.035 * lock * uMotion;
  gl_FragColor = vec4(col, 1.0);
}
`;

type GLState = {
  gl: WebGLRenderingContext;
  resize: (w: number, h: number) => void;
  draw: (t: number, motion: number) => void;
};

function createGL(canvas: HTMLCanvasElement, img: HTMLImageElement): GLState | null {
  const gl = canvas.getContext("webgl", { alpha: false, antialias: false, powerPreference: "low-power" });
  if (!gl) return null;

  const compile = (type: number, src: string) => {
    const s = gl.createShader(type);
    if (!s) return null;
    gl.shaderSource(s, src);
    gl.compileShader(s);
    return gl.getShaderParameter(s, gl.COMPILE_STATUS) ? s : null;
  };
  const vs = compile(gl.VERTEX_SHADER, VERT);
  const fs = compile(gl.FRAGMENT_SHADER, FRAG);
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

  const uRes = gl.getUniformLocation(prog, "uRes");
  const uImg = gl.getUniformLocation(prog, "uImg");
  const uTime = gl.getUniformLocation(prog, "uTime");
  const uMotion = gl.getUniformLocation(prog, "uMotion");
  gl.uniform1i(gl.getUniformLocation(prog, "uTex"), 0);
  gl.uniform2f(uImg, img.naturalWidth || IMG_W, img.naturalHeight || IMG_H);

  return {
    gl,
    resize(w, h) {
      canvas.width = w;
      canvas.height = h;
      gl.viewport(0, 0, w, h);
      gl.uniform2f(uRes, w, h);
    },
    draw(t, motion) {
      gl.uniform1f(uTime, t);
      gl.uniform1f(uMotion, motion);
      gl.drawArrays(gl.TRIANGLES, 0, 3);
    },
  };
}

export function Scene() {
  const rootRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const boatRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    const canvas = canvasRef.current;
    const boatEl = boatRef.current;
    if (!root || !canvas || !boatEl) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let alive = true;
    let raf = 0;
    let glState: GLState | null = null;
    let photo: HTMLImageElement | null = null;
    let W = 0;
    let H = 0;
    let scale = 1;
    let offY = 0;
    let offX = 0;
    const t0 = performance.now();
    let last = t0;

    // ---------- the boat ----------
    const boat = { x: 0, dir: -1 as 1 | -1, speed: 16, k: 1, lane: 0, wait: 0, phase: Math.random() * 6.28 };
    const boatW = () => BOAT_W * scale * boat.k;
    const boatH = () => boatW() * BOAT_RATIO;
    const wakeLen = () => 95 * scale * boat.k;

    const applySizes = () => {
      boatEl.style.setProperty("--bw", `${boatW()}px`);
      boatEl.style.setProperty("--wl", `${wakeLen()}px`);
      boatEl.style.setProperty("--wh", `${2.6 * scale * boat.k}px`);
    };

    const spawn = (initial: boolean) => {
      boat.k = initial ? 1 : 0.85 + Math.random() * 0.25;
      boat.dir = initial ? -1 : Math.random() < 0.5 ? -1 : 1;
      boat.speed = 12 + Math.random() * 8; // photo px per second
      boat.lane = initial ? 0 : (Math.random() - 0.5) * 3;
      boat.wait = 0;
      applySizes();
      if (initial) boat.x = offX + BOAT_LEFT * scale; // starts exactly where the photo's boat was
      else boat.x = boat.dir < 0 ? W + 10 : -(boatW() + wakeLen() + 10); // fully off-screen
    };

    const place = (t: number) => {
      const bob = Math.sin(t * 1.3 + boat.phase) * 0.35 * scale * boat.k;
      const rot = Math.sin(t * 0.9 + boat.phase) * 0.5;
      const y = offY + (BOAT_CY + boat.lane) * scale - boatH() / 2 + bob;
      boatEl.style.transform = `translate3d(${boat.x}px,${y}px,0) scaleX(${-boat.dir}) rotate(${rot}deg)`;
      boatEl.style.visibility = "visible";
    };

    const stepBoat = (dt: number, t: number) => {
      if (boat.wait > 0) {
        boat.wait -= dt;
        if (boat.wait > 0) return;
        spawn(false);
      }
      boat.x += boat.dir * boat.speed * scale * dt;
      const gone = boat.dir < 0 ? boat.x < -(boatW() + wakeLen() + 10) : boat.x > W + wakeLen() + 10;
      if (gone) {
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
      scale = Math.max(W / IMG_W, H / IMG_H);
      offX = (W - IMG_W * scale) / 2;
      offY = (H - IMG_H * scale) / 2;
      applySizes();
      if (glState) glState.resize(Math.max(1, Math.round(W)), Math.max(1, Math.round(H)));
    };

    const render = (t: number) => {
      if (glState) glState.draw(t, reduce ? 0 : 1);
    };

    const startGL = () => {
      if (!photo) return;
      glState = createGL(canvas, photo);
      if (glState) {
        root.classList.add("gl");
        measure();
        render(0);
      }
    };

    const frame = (now: number) => {
      if (!alive) return;
      const t = (now - t0) / 1000;
      const dt = Math.min(0.1, (now - last) / 1000);
      last = now;
      render(t);
      stepBoat(dt, t);
      raf = requestAnimationFrame(frame);
    };

    measure();
    spawn(true);
    place(0);

    photo = new Image();
    photo.onload = () => {
      if (!alive) return;
      startGL();
      if (!reduce) raf = requestAnimationFrame(frame);
    };
    photo.src = "/scene/scene.jpg";

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
        place(0);
      }
    });
    ro.observe(root);

    return () => {
      alive = false;
      cancelAnimationFrame(raf);
      ro.disconnect();
      canvas.removeEventListener("webglcontextlost", onLost);
      canvas.removeEventListener("webglcontextrestored", onRestored);
    };
  }, []);

  return (
    <div ref={rootRef} className="scene" aria-hidden>
      <canvas ref={canvasRef} className="scene-canvas" />
      <div ref={boatRef} className="scene-boat">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/scene/boat.png" alt="" draggable={false} />
        <i className="scene-wake" />
      </div>
    </div>
  );
}