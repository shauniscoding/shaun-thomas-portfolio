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
    // Camera position in 3D space (X, Y, Z)
    // X → move camera left (-) or right (+)
    // Y → move camera down (-) or up (+) — controls vertical framing
    // Z → move camera closer (-) or farther away (+) from the scene
    camera.position.set(0, 1.5, 3.5); 

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
    const donutPosition = new THREE.Vector3(0, 0, 0);
    const mousePos = new THREE.Vector2();
    const raycaster = new THREE.Raycaster();

    // Load models
    const loader = new GLTFLoader();

   loader.load("/models/head.glb", (gltf) => {
  headModel = gltf.scene;

  // Scale of the head model (X, Y, Z)  
  // Increase numbers to make it bigger, decrease for smaller.  
  // Example: (2, 2, 2) = twice as large in all directions.
  headModel.scale.set(1, 1, 1); 

  // Position of the head in 3D space (X, Y, Z)
  // X → move left (-) or right (+)
  // Y → move down (-) or up (+)
  // Z → move closer to camera (-) or farther back (+)
  headModel.position.set(0, 0, 0); 

  // Rotation of the head (in radians)
  // X → tilt head up/down (negative = look up, positive = look down)
  // Y → turn head left/right (like shaking "no")
  // Z → tilt sideways (ear to shoulder)
  // Example: -Math.PI / 6 ≈ -30°, Math.PI / 4 ≈ 45°
  headModel.rotation.x = -Math.PI / 6; 

  scene.add(headModel);
});

    loader.load("/models/donut.glb", (gltf) => {
      donutModel = gltf.scene;

  // Make the donut big and position it beside Homer
  // Scale → size of donut
  donutModel.scale.set(10, 10, 4); 
  
  // Position beside Homer (X, Y, Z)
  // X → move right (+2 = to his right, -2 = to his left)
  // Y → vertical alignment
  // Z → depth (keep same as head so it sits beside him)
donutModel.position.set(0, 13, 5);

  scene.add(donutModel);
    });

    // Mouse move handler
    function onMouseMove(event) {
      if (!donutAttachedToMouse || !donutModel) return;

      const rect = renderer.domElement.getBoundingClientRect();
      mousePos.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
      mousePos.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;

      raycaster.setFromCamera(mousePos, camera);
      const distance = 4; // closer projection to camera
      const pos = raycaster.ray.origin
        .clone()
        .add(raycaster.ray.direction.clone().multiplyScalar(distance));
      donutPosition.copy(pos);
    }

    // Left click toggles pickup/drop
    function onMouseDown(event) {
      if (event.button !== 0 || !donutModel) return;

      if (!donutAttachedToMouse) {
        const rect = renderer.domElement.getBoundingClientRect();
        const clickX = ((event.clientX - rect.left) / rect.width) * 2 - 1;
        const clickY = -((event.clientY - rect.top) / rect.height) * 2 + 1;

        raycaster.setFromCamera(new THREE.Vector2(clickX, clickY), camera);
        const intersects = raycaster.intersectObject(donutModel, true);

        if (intersects.length > 0) {
          donutAttachedToMouse = true;
        }
      } else {
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
        // donutModel.rotation.y += 0.01;
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

  return <div ref={containerRef} className="w-160 h-80 bg-black" />;
}
