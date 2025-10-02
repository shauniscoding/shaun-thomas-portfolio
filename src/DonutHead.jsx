import React, { useRef, useEffect } from "react";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";

export default function DonutHead() {
  const containerRef = useRef(null);

  useEffect(() => {
    if (!containerRef.current) return;

    // Scene setup
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x1a1a2e);

    const camera = new THREE.PerspectiveCamera(
      75,
      containerRef.current.clientWidth / containerRef.current.clientHeight,
      0.1,
      1000
    );
    camera.position.z = 5;

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
    let donutModel = null;
    let donutAttachedToMouse = false;
    const donutPosition = new THREE.Vector3(2, 0, 0);
    const mousePos = new THREE.Vector2();
    const raycaster = new THREE.Raycaster();

    // Load GLB models
    const loader = new GLTFLoader();
    loader.load("/models/head.glb", (gltf) => {
      headModel = gltf.scene;
      headModel.scale.set(1.2, 1.2, 1.2);
      headModel.position.set(-2, 0, 0);
      scene.add(headModel);
    });

    loader.load("/models/donut.glb", (gltf) => {
      donutModel = gltf.scene;
      donutModel.scale.set(1.5, 1.5, 1.5);
      donutModel.position.copy(donutPosition);
      scene.add(donutModel);
    });

    // Mouse move handler
    function onMouseMove(event) {
      if (!donutAttachedToMouse || !donutModel) return;

      const rect = renderer.domElement.getBoundingClientRect();
      mousePos.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
      mousePos.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;

      raycaster.setFromCamera(mousePos, camera);
      const distance = 5;
      const pos = raycaster.ray.origin
        .clone()
        .add(raycaster.ray.direction.clone().multiplyScalar(distance));
      donutPosition.copy(pos);
    }

    // Left click toggles pickup/drop
    function onMouseDown(event) {
      if (event.button !== 0 || !donutModel) return;

      if (!donutAttachedToMouse) {
        // Try to pick up donut
        const rect = renderer.domElement.getBoundingClientRect();
        const clickX = ((event.clientX - rect.left) / rect.width) * 2 - 1;
        const clickY = -((event.clientY - rect.top) / rect.height) * 2 + 1;

        raycaster.setFromCamera(new THREE.Vector2(clickX, clickY), camera);
        const intersects = raycaster.intersectObject(donutModel, true);

        if (intersects.length > 0) {
          donutAttachedToMouse = true;
        }
      } else {
        // Drop the donut
        donutAttachedToMouse = false;
      }
    }

    renderer.domElement.addEventListener("mousemove", onMouseMove);
    renderer.domElement.addEventListener("mousedown", onMouseDown);

    // Animation loop
    let animationId;
    function animate() {
      animationId = requestAnimationFrame(animate);

      if (headModel && donutModel) {
        donutModel.position.copy(donutPosition);
        headModel.lookAt(donutModel.position);
        donutModel.rotation.y += 0.01;
      }

      renderer.render(scene, camera);
    }

    animate();

    // Handle window resize
    function onWindowResize() {
      if (!containerRef.current) return;
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
      renderer.domElement.removeEventListener("mousemove", onMouseMove);
      renderer.domElement.removeEventListener("mousedown", onMouseDown);
      if (containerRef.current && renderer.domElement) {
        containerRef.current.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, []);

  return <div ref={containerRef} className="w-full h-screen bg-black" />;
}
