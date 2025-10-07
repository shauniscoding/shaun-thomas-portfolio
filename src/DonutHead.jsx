import React, { useRef, useEffect } from "react";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";

export default function DonutHead() {
  const containerRef = useRef(null);

  useEffect(() => {
    if (!containerRef.current) return;

    // Scene setup
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0xff0000); // bright red
    scene.background = new THREE.Color(0x14151a);


   const camera = new THREE.PerspectiveCamera(
  70, // Field of View (FOV) in degrees – how wide the camera sees vertically
  containerRef.current.clientWidth / containerRef.current.clientHeight, 
      // Aspect ratio – width divided by height of the rendering area
  0.1, // Near clipping plane – anything closer than 0.1 units won't be visible
  1000 // Far clipping plane – anything farther than 1000 units won't be visible
);

// Set the camera's position in 3D space
camera.position.set(
  0,   // x-coordinate – left/right position (0 = center)
  1.5,// y-coordinate – vertical position (1.75 units above origin)
  2.0  // z-coordinate – depth position (2 units away from origin)
);


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
      headModel.scale.set(0.9, 0.9, 0.9);
      headModel.position.set(0, 0, 0);
    //   headModel.rotation.x = -Math.PI / 6;
      // headModel.rotation.y = Math.PI;
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
        // Invert X so movement feels natural (left → left, right → right)
        const rotationY = mousePos.x * Math.PI * 0.5; 
        headModel.rotation.y = rotationY;

        const rotationX = mousePos.y * Math.PI * 0.1;
        headModel.rotation.x = -rotationX;
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

  return <div ref={containerRef} className="w-200 h-40" />;

  // return <div ref={containerRef} className="w-200 h-50 bg-[#14151A]" />;
}
