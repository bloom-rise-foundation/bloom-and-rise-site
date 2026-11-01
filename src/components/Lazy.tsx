"use client";
import dynamic from "next/dynamic";

/* The background scene and custom cursor are not needed for first paint: load them as separate chunks. */
export const Scene = dynamic(() => import("./Scene").then((m) => m.Scene), { ssr: false });
export const Cursor = dynamic(() => import("./Cursor").then((m) => m.Cursor), { ssr: false });