'use client';

import React, { useEffect, useRef } from 'react';

const VERT_SHADER = `
  precision mediump float;
  varying vec2 vUv;
  attribute vec2 a_position;
  void main() {
    vUv = .5 * (a_position + 1.);
    gl_Position = vec4(a_position, 0.0, 1.0);
  }
`;

const FRAG_SHADER = `
  precision mediump float;

  varying vec2 vUv;
  uniform float u_time;
  uniform float u_ratio;
  uniform vec2 u_pointer_position;
  uniform float u_scroll_progress;

  vec2 rotate(vec2 uv, float th) {
    return mat2(cos(th), sin(th), -sin(th), cos(th)) * uv;
  }

  float neuro_shape(vec2 uv, float t, float p) {
    vec2 sine_acc = vec2(0.);
    vec2 res = vec2(0.);
    float scale = 8.;

    for (int j = 0; j < 15; j++) {
      uv = rotate(uv, 1.);
      sine_acc = rotate(sine_acc, 1.);
      vec2 layer = uv * scale + float(j) + sine_acc - t;
      sine_acc += sin(layer) + 2.4 * p;
      res += (.5 + .5 * cos(layer)) / scale;
      scale *= 1.2;
    }
    return res.x + res.y;
  }

  void main() {
    vec2 uv = .5 * vUv;
    uv.x *= u_ratio;

    vec2 pointer = vUv - u_pointer_position;
    pointer.x *= u_ratio;
    float p = clamp(length(pointer), 0., 1.);
    p = .5 * pow(1. - p, 2.);

    float t = .0008 * u_time;

    float noise = neuro_shape(uv, t, p);

    noise = 1.2 * pow(noise, 3.);
    noise += pow(noise, 10.);
    noise = max(.0, noise - .5);

    // Smooth radial vignette so it softly dissolves towards the boundaries
    float dist = length(vUv - .5);
    noise *= (1. - smoothstep(0.18, 0.65, dist));

    // Luxurious gold & obsidian black palette (harmonized with Vedika ring)
    vec3 goldDeep = vec3(0.55, 0.38, 0.08);   // deep amber gold
    vec3 goldWarm = vec3(0.85, 0.65, 0.18);   // radiant gold
    vec3 goldBright = vec3(0.98, 0.88, 0.48); // champagne sparkle

    vec3 goldColor = mix(goldDeep, goldWarm, 0.5 + 0.5 * sin(uv.x * 2.5 + t * 0.8));
    goldColor = mix(goldColor, goldBright, pow(noise, 2.2));

    // Very subtle, quiet presence so it never distracts from the cards or Vedika
    vec3 color = goldColor * noise * 0.55;
    float alpha = noise * 0.35;

    gl_FragColor = vec4(color, alpha);
  }
`;

export default function NeuralNoiseBackground() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const gl = (canvas.getContext('webgl', { alpha: true, antialias: true }) ||
      canvas.getContext('experimental-webgl', {
        alpha: true,
        antialias: true,
      })) as WebGLRenderingContext | null;

    if (!gl) return;

    let animationFrameId: number;

    const pointer = {
      x: 0.5,
      y: 0.5,
      tX: 0.5,
      tY: 0.5,
    };

    function createShader(glCtx: WebGLRenderingContext, source: string, type: number) {
      const shader = glCtx.createShader(type);
      if (!shader) return null;
      glCtx.shaderSource(shader, source);
      glCtx.compileShader(shader);
      if (!glCtx.getShaderParameter(shader, glCtx.COMPILE_STATUS)) {
        glCtx.deleteShader(shader);
        return null;
      }
      return shader;
    }

    const vs = createShader(gl, VERT_SHADER, gl.VERTEX_SHADER);
    const fs = createShader(gl, FRAG_SHADER, gl.FRAGMENT_SHADER);
    if (!vs || !fs) return;

    const program = gl.createProgram();
    if (!program) return;
    gl.attachShader(program, vs);
    gl.attachShader(program, fs);
    gl.linkProgram(program);

    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      gl.deleteProgram(program);
      return;
    }

    gl.useProgram(program);

    const uTimeLoc = gl.getUniformLocation(program, 'u_time');
    const uRatioLoc = gl.getUniformLocation(program, 'u_ratio');
    const uPointerPosLoc = gl.getUniformLocation(program, 'u_pointer_position');
    const uScrollProgLoc = gl.getUniformLocation(program, 'u_scroll_progress');

    const vertices = new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]);
    const vertexBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);

    const aPosLoc = gl.getAttribLocation(program, 'a_position');
    gl.enableVertexAttribArray(aPosLoc);
    gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
    gl.vertexAttribPointer(aPosLoc, 2, gl.FLOAT, false, 0, 0);

    gl.enable(gl.BLEND);
    gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);

    const resize = () => {
      if (!canvas) return;
      const rect = canvas.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      const width = Math.max(1, Math.floor(rect.width * dpr));
      const height = Math.max(1, Math.floor(rect.height * dpr));
      if (canvas.width !== width || canvas.height !== height) {
        canvas.width = width;
        canvas.height = height;
        gl.viewport(0, 0, width, height);
      }
      if (uRatioLoc) {
        gl.uniform1f(uRatioLoc, width / height);
      }
    };

    resize();
    window.addEventListener('resize', resize);

    const onPointerMove = (e: PointerEvent) => {
      if (!canvas) return;
      const rect = canvas.getBoundingClientRect();
      if (rect.width > 0 && rect.height > 0) {
        pointer.tX = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
        pointer.tY = Math.max(0, Math.min(1, 1 - (e.clientY - rect.top) / rect.height));
      }
    };

    window.addEventListener('pointermove', onPointerMove, { passive: true });

    const render = (time: number) => {
      pointer.x += (pointer.tX - pointer.x) * 0.15;
      pointer.y += (pointer.tY - pointer.y) * 0.15;

      if (uTimeLoc) gl.uniform1f(uTimeLoc, time);
      if (uPointerPosLoc) gl.uniform2f(uPointerPosLoc, pointer.x, pointer.y);
      if (uScrollProgLoc) gl.uniform1f(uScrollProgLoc, 0.0);

      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
      animationFrameId = requestAnimationFrame(render);
    };

    animationFrameId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', resize);
      window.removeEventListener('pointermove', onPointerMove);
      if (gl) {
        gl.deleteBuffer(vertexBuffer);
        gl.deleteProgram(program);
        gl.deleteShader(vs);
        gl.deleteShader(fs);
      }
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="student-neural-noise-canvas"
      aria-hidden="true"
    />
  );
}
