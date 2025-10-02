import React, { useRef, useEffect } from "react";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";

export default function DonutHead() {
  const containerRef = useRef(null);

  useEffect(() => {
    if (!containerRef.current) return;

    // Scene setup
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x14151a);

    const camera = new THREE.PerspectiveCamera(
      75,
      containerRef.current.clientWidth / containerRef.current.clientHeight,
      0.1,
      1000
    );
    camera.position.set(0, 1.75, 2.5);

    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(
      containerRef.current.clientWidth,
      containerRef.current.clientHeight
    );
    containerRef.current.appendChild(renderer.domElement);

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
    directionalLight.position.set(5, 5, 5);
    scene.add(directionalLight);

    const pointLight = new THREE.PointLight(0xffffff, 0.5);
    pointLight.position.set(-5, 3, -5);
    scene.add(pointLight);

    // State
    let headModel = null;
    const mousePos = new THREE.Vector2(0, 0);
    const raycaster = new THREE.Raycaster();
    const target = new THREE.Vector3();

    // Load Homer head
    const loader = new GLTFLoader();
    loader.load("/models/head.glb", (gltf) => {
      headModel = gltf.scene;
      headModel.scale.set(1, 1, 1);
      headModel.position.set(0, 0, 0);
    //   headModel.rotation.x = -Math.PI / 6;
      scene.add(headModel);
    });

    // Track mouse globally
    function onMouseMove(event) {
      const width = window.innerWidth;
      const height = window.innerHeight;

      // Normalized device coordinates (-1 to 1)
      mousePos.x = (event.clientX / width) * 2 - 1;
      mousePos.y = -(event.clientY / height) * 2 + 1;
    }

    window.addEventListener("mousemove", onMouseMove);

    // Animation loop
    let animationId;
    function animate() {
      animationId = requestAnimationFrame(animate);

      if (headModel) {
        // Project mouse into 3D space in front of camera
        raycaster.setFromCamera(mousePos, camera);
        target.copy(raycaster.ray.origin).add(raycaster.ray.direction.multiplyScalar(5));

        // Homer looks at this point
        headModel.lookAt(target);
      }

      renderer.render(scene, camera);
    }

    animate();

    // Handle window resize
    function onWindowResize() {
      camera.aspect =
        containerRef.current.clientWidth / containerRef.current.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(
        containerRef.current.clientWidth,
        containerRef.current.clientHeight
      );
    }
    window.addEventListener("resize", onWindowResize);

    // Cleanup
    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("resize", onWindowResize);
      window.removeEventListener("mousemove", onMouseMove);
      if (containerRef.current && renderer.domElement) {
        containerRef.current.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, []);

  return <div ref={containerRef} className="w-200 h-60 bg-[#14151A]" />;
}
