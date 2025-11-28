import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { GLTFLoader } from 'three-stdlib';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { MotionPathPlugin } from 'gsap/MotionPathPlugin';

gsap.registerPlugin(ScrollTrigger, MotionPathPlugin);

const isMobile = () => typeof window !== 'undefined' && window.innerWidth <= 768;

const ThreeGavelScene: React.FC = () => {
  const mountRef = useRef<HTMLDivElement | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const gavelRef = useRef<THREE.Object3D | null>(null);
  const soundBlockRef = useRef<THREE.Object3D | null>(null);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    if (!mountRef.current) return;

    let mounted = true;

    const width = mountRef.current.clientWidth;
    const height = Math.max(mountRef.current.clientHeight, window.innerHeight);

    // Renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, isMobile() ? 1.0 : 1.5));
    renderer.setSize(width, height);
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.domElement.style.position = 'absolute';
    renderer.domElement.style.top = '0';
    renderer.domElement.style.left = '0';
    renderer.domElement.style.pointerEvents = 'none';
    mountRef.current.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    // Scene
    const scene = new THREE.Scene();
    sceneRef.current = scene;

    // Camera
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    camera.position.set(0, 0, 6);
    cameraRef.current = camera;

    // Lighting — cinematic
    const hemi = new THREE.HemisphereLight(0xffffff, 0x444444, 0.4);
    hemi.position.set(0, 10, 0);
    scene.add(hemi);

    const dir = new THREE.DirectionalLight(0xffffff, 1.0);
    dir.position.set(5, 10, 7);
    dir.castShadow = true;
    dir.shadow.camera.near = 0.1;
    dir.shadow.camera.far = 50;
    dir.shadow.mapSize.set(2048, 2048);
    scene.add(dir);

    // Soft rim light
    const rim = new THREE.DirectionalLight(0x88d8ff, 0.25);
    rim.position.set(-6, 4, -2);
    scene.add(rim);

    // Loader
    const loader = new GLTFLoader();

    // Lazy-load models
    const modelPromises: Promise<void>[] = [];

    modelPromises.push(new Promise((resolve) => {
      loader.load('/assets/gavel.glb', (gltf) => {
        const gavel = gltf.scene || gltf.scenes[0];
        gavel.traverse((c: any) => {
          if (c.isMesh) {
            c.castShadow = true;
            c.receiveShadow = true;
            c.material.side = THREE.FrontSide;
          }
        });
        // Responsive scale for hero section
        const scale = isMobile() ? 0.38 : 0.55;
        gavel.scale.set(scale, scale, scale);
        gavel.position.set(0, 0.2, 0);
        gavel.rotation.set(0, 0, 0);
        gavelRef.current = gavel;
        scene.add(gavel);
        resolve();
      }, undefined, (err) => {
        // eslint-disable-next-line no-console
        console.error('Error loading gavel.glb', err);
        resolve();
      });
    }));

    modelPromises.push(new Promise((resolve) => {
      loader.load('/assets/sound-block.glb', (gltf) => {
        const block = gltf.scene || gltf.scenes[0];
        block.traverse((c: any) => {
          if (c.isMesh) {
            c.castShadow = true;
            c.receiveShadow = true;
          }
        });
        // Responsive scale for needs section
        const scale = isMobile() ? 0.32 : 0.45;
        block.scale.set(scale, scale, scale);
        block.position.set(0, -8, 0);
        soundBlockRef.current = block;
        scene.add(block);
        resolve();
      }, undefined, (err) => {
        // eslint-disable-next-line no-console
        console.error('Error loading sound-block.glb', err);
        resolve();
      });
    }));

    // Ambient subtle fog for cinematic look
    scene.fog = new THREE.FogExp2(0x050508, 0.02);

    // Animation loop
    const clock = new THREE.Clock();
    const animate = () => {
      if (!mounted) return;
      const delta = clock.getDelta();

      // subtle idle rotation / parallax
      if (gavelRef.current) {
        // small continuous rotation for cinematic feel
        gavelRef.current.rotation.y += delta * 0.1;
      }

      renderer.render(scene, camera);
      rafRef.current = requestAnimationFrame(animate);
    };

    Promise.all(modelPromises).then(() => {
      if (!mounted) return;

      // Idle float animation using GSAP (hero entry)
      if (gavelRef.current) {
        gsap.to(gavelRef.current.position, {
          y: '+=0.18',
          duration: 2.8,
          yoyo: true,
          ease: 'sine.inOut',
          repeat: -1,
        });
        gsap.to(gavelRef.current.rotation, {
          z: '+=0.09',
          duration: 7,
          yoyo: true,
          ease: 'sine.inOut',
          repeat: -1,
        });
      }

      // Build scroll-driven timeline
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: '#hero-section',
          start: 'top top',
          end: '+=2000',
          scrub: 0.6,
          pin: false,
          anticipatePin: 1,
        },
      });

      // compute world positions for DOM targets
      const heroRect = document.querySelector('#hero-section')?.getBoundingClientRect();
      const statsRect = document.querySelector('#stats-section')?.getBoundingClientRect();
      const needsRect = document.querySelector('#needs-section')?.getBoundingClientRect();

      const getWorldPoint = (clientX: number, clientY: number, z = 0) => {
        const ndcX = (clientX / window.innerWidth) * 2 - 1;
        const ndcY = -(clientY / window.innerHeight) * 2 + 1;
        const vec = new THREE.Vector3(ndcX, ndcY, 0.5);
        vec.unproject(camera);
        const dir = vec.sub(camera.position).normalize();
        const distance = (z - camera.position.z) / dir.z;
        const pos = camera.position.clone().add(dir.multiplyScalar(distance));
        return pos;
      };

      // fallback world points if DOM not found
      const heroPoint = getWorldPoint(window.innerWidth / 2, (heroRect?.bottom ?? window.innerHeight * 0.6) - 200, 0);
      const statsTop = getWorldPoint((statsRect?.left ?? window.innerWidth / 2) + ((statsRect?.width ?? 0) / 2), (statsRect?.top ?? window.innerHeight * 0.6) + 80, 0);
      const statsMid = getWorldPoint((statsRect?.left ?? window.innerWidth / 2) + ((statsRect?.width ?? 0) / 3), (statsRect?.top ?? window.innerHeight * 0.6) + (statsRect?.height ?? 200) / 2, 0);
      const statsBottom = getWorldPoint((statsRect?.left ?? window.innerWidth / 2) + ((statsRect?.width ?? 0) / 2), (statsRect?.bottom ?? window.innerHeight * 0.9) - 40, 0);
      const needsTop = getWorldPoint((needsRect?.left ?? window.innerWidth / 2) + ((needsRect?.width ?? 0) / 2), (needsRect?.top ?? window.innerHeight * 1.2) + 80, 0);

      // Place sound block at bottom center of needs section
      if (soundBlockRef.current && needsRect) {
        // Bottom center of needs section in screen coords
        const blockScreenX = needsRect.left + needsRect.width / 2;
        const blockScreenY = needsRect.bottom - 40; // 40px above bottom for visibility
        // Convert to world position
        const blockWorld = getWorldPoint(blockScreenX, blockScreenY, 0);
        soundBlockRef.current.position.copy(blockWorld);
      }

      // Timeline: GSAP MotionPathPlugin for cinematic gavel path
      tl.to(gavelRef.current!.rotation, { y: '+=' + Math.PI, duration: 1.2, ease: 'power2.inOut' }, 0);

      tl.to(gavelRef.current!.position, { x: statsTop.x, y: statsTop.y + 0.5, z: statsTop.z, duration: 1.1, ease: 'power2.inOut' }, 0.2);

      tl.to(gavelRef.current!.position, { x: statsMid.x - 0.5, y: statsMid.y - 0.1, z: statsMid.z, duration: 1.1, ease: 'power2.inOut' });

      tl.to(gavelRef.current!.rotation, { x: '+=' + 0.3, duration: 0.7, ease: 'power2.inOut' });

      tl.to(gavelRef.current!.position, { x: statsBottom.x, y: statsBottom.y + 0.1, z: statsBottom.z, duration: 1.1, ease: 'power2.inOut' });

      tl.to(gavelRef.current!.position, { x: needsTop.x, y: needsTop.y + 0.5, z: needsTop.z, duration: 1.2, ease: 'power2.inOut' });

      // Final smash: downward slam, impact effects
      tl.to(gavelRef.current!.position, {
        y: '-=1.1',
        duration: 0.38,
        ease: 'power4.in',
        onStart() {
          gsap.to(gavelRef.current!.rotation, { x: '+=' + 1.1, duration: 0.38, ease: 'power4.in' });
        },
        onComplete() {
          const needsEl = document.querySelector('#needs-section') as HTMLElement | null;
          const blockEl = needsEl;
          if (needsEl) {
            gsap.fromTo(needsEl, { y: 0 }, { y: 15, duration: 0.09, yoyo: true, repeat: 5, ease: 'power1.inOut' });
          }
          if (soundBlockRef.current) {
            gsap.fromTo(soundBlockRef.current.scale, { x: 0.9, y: 0.9, z: 0.9 }, { x: 1.05, y: 1.05, z: 1.05, duration: 0.32, yoyo: true, repeat: 1, ease: 'elastic.out(1, 0.6)' });
          }
          if (blockEl && mountRef.current) {
            const burst = document.createElement('div');
            burst.className = 'gavel-impact-burst';
            const rect = blockEl.getBoundingClientRect();
            burst.style.left = rect.left + rect.width / 2 + 'px';
            burst.style.top = rect.top + 'px';
            document.body.appendChild(burst);
            gsap.fromTo(burst, { scale: 0.8, opacity: 1 }, { scale: 1.6, opacity: 0, duration: 0.7, ease: 'power2.out', onComplete() { burst.remove(); } });
          }
        }
      });

      animate();
    });

    const handleResize = () => {
      if (!mountRef.current || !rendererRef.current || !cameraRef.current) return;
      const w = mountRef.current.clientWidth;
      const h = Math.max(mountRef.current.clientHeight, window.innerHeight);
      rendererRef.current.setSize(w, h);
      cameraRef.current.aspect = w / h;
      cameraRef.current.updateProjectionMatrix();
    };

    window.addEventListener('resize', handleResize);

    // mouse parallax
    const onPointerMove = (e: PointerEvent) => {
      if (!cameraRef.current || !gavelRef.current) return;
      const nx = (e.clientX / window.innerWidth) * 2 - 1;
      const ny = -(e.clientY / window.innerHeight) * 2 + 1;
      // subtle camera parallax
      gsap.to(cameraRef.current.position, { x: nx * 0.6, y: ny * 0.4, duration: 1.2, ease: 'power3.out' });
      gsap.to(gavelRef.current.rotation, { y: nx * 0.15, x: ny * 0.08, duration: 1.2, ease: 'power3.out' });
    };

    window.addEventListener('pointermove', onPointerMove);

    return () => {
      mounted = false;
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('pointermove', onPointerMove);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      if (rendererRef.current) {
        rendererRef.current.dispose();
        const canvas = rendererRef.current.domElement;
        if (canvas && canvas.parentElement) canvas.parentElement.removeChild(canvas);
      }
      // cleanup scene
      if (sceneRef.current) {
        sceneRef.current.clear();
      }
    };
  }, []);

  return <div ref={mountRef} style={{ position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 20 }} />;
};

export default ThreeGavelScene;
