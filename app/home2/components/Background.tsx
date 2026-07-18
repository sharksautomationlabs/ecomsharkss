'use client';

import { useEffect, useRef, useState } from 'react';
import Script from 'next/script';
import styles from '../home2.module.css';

/** Fixed 3D underwater particle scene (three.js) that sits behind all content. */
export default function Background() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [threeReady, setThreeReady] = useState(false);

  useEffect(() => {
    if (!threeReady) return;
    const THREE = (window as any).THREE;
    const canvas = canvasRef.current;
    if (!THREE || !canvas) return;

    const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x03101e, 0.045);
    const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 100);
    camera.position.z = 12;

    const bubbleCount = 420;
    const geo = new THREE.BufferGeometry();
    const pos = new Float32Array(bubbleCount * 3);
    const speeds = new Float32Array(bubbleCount);
    for (let i = 0; i < bubbleCount; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 44;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 30;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 22;
      speeds[i] = 0.006 + Math.random() * 0.02;
    }
    geo.setAttribute('position', new THREE.BufferAttribute(pos, 3));
    const mat = new THREE.PointsMaterial({ color: 0x7eebff, size: 0.09, transparent: true, opacity: 0.55, depthWrite: false });
    const bubbles = new THREE.Points(geo, mat);
    scene.add(bubbles);

    const geo2 = geo.clone();
    const mat2 = new THREE.PointsMaterial({ color: 0x35c4dd, size: 0.05, transparent: true, opacity: 0.35, depthWrite: false });
    const dust = new THREE.Points(geo2, mat2);
    dust.position.z = -6;
    scene.add(dust);

    const rings: any[] = [];
    for (let i = 0; i < 5; i++) {
      const rg = new THREE.TorusGeometry(3.2 + i * 1.6, 0.015, 8, 90);
      const rm = new THREE.MeshBasicMaterial({ color: 0x35c4dd, transparent: true, opacity: 0.1 });
      const ring = new THREE.Mesh(rg, rm);
      ring.rotation.x = Math.PI / 2.2;
      ring.position.set(0, -3 - i * 1.4, -4 - i * 2);
      scene.add(ring);
      rings.push(ring);
    }

    let mx = 0, my = 0;
    const onMouseMove = (e: MouseEvent) => {
      mx = (e.clientX / window.innerWidth - 0.5) * 2;
      my = (e.clientY / window.innerHeight - 0.5) * 2;
    };
    window.addEventListener('mousemove', onMouseMove, { passive: true });

    let scrollYLocal = 0;
    const onScroll = () => { scrollYLocal = window.scrollY; };
    window.addEventListener('scroll', onScroll, { passive: true });

    function resize() {
      renderer.setSize(window.innerWidth, window.innerHeight, false);
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
    }
    window.addEventListener('resize', resize);
    resize();

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    let rafId = 0;
    function tick(t: number) {
      if (!reduced) {
        const p = geo.attributes.position.array as Float32Array;
        for (let i = 0; i < bubbleCount; i++) {
          p[i * 3 + 1] += speeds[i];
          p[i * 3] += Math.sin(t * 0.0006 + i) * 0.0025;
          if (p[i * 3 + 1] > 15) p[i * 3 + 1] = -15;
        }
        geo.attributes.position.needsUpdate = true;
        bubbles.rotation.y = t * 0.00002;
        dust.rotation.y = -t * 0.00003;
        rings.forEach((r, i) => { r.rotation.z = t * 0.00008 * (i % 2 ? 1 : -1); });
        camera.position.x += (mx * 1.4 - camera.position.x) * 0.03;
        camera.position.y += (-my * 0.9 - scrollYLocal * 0.0012 - camera.position.y) * 0.03;
        camera.lookAt(0, 0, 0);
      }
      renderer.render(scene, camera);
      rafId = requestAnimationFrame(tick);
    }
    rafId = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', resize);
      renderer.dispose();
      geo.dispose();
      geo2.dispose();
      mat.dispose();
      mat2.dispose();
      rings.forEach((r) => { r.geometry.dispose(); r.material.dispose(); });
    };
  }, [threeReady]);

  return (
    <>
      <Script
        id="eh2-threejs"
        src="https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js"
        strategy="afterInteractive"
        onReady={() => setThreeReady(true)}
      />
      <canvas ref={canvasRef} aria-hidden="true" className="pointer-events-none fixed inset-0 z-0" />
      <div aria-hidden="true" className={`pointer-events-none fixed inset-0 z-[1] opacity-50 ${styles.godrays}`} />
    </>
  );
}
