import React, { useRef, useEffect, useState } from 'react';
import * as THREE from 'three';

// Note: You'll need to install and import GLTFLoader separately in a real project
// For now, we'll provide a fallback to the makeshift ships
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

const StarWars = ({ 
  width = 800, 
  height = 600, 
  xwingModelPath = '/models/xwing.glb',
  tieFighterModelPath = '/models/tiefighter.glb'
}) => {
  const mountRef = useRef(null);
  const sceneRef = useRef(null);
  const rendererRef = useRef(null);
  const cameraRef = useRef(null);
  const raycasterRef = useRef(null);
  const mouseRef = useRef(new THREE.Vector2());
  const animationRef = useRef(null);
  const shipsRef = useRef([]);
  const lasersRef = useRef([]);
  const spawnTimerRef = useRef(0);

  useEffect(() => {
    // Scene setup
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x000011);
    sceneRef.current = scene;

    // Camera setup - aerial view
    const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
    camera.position.set(0, 80, 20);
    camera.lookAt(0, 0, 0);
    cameraRef.current = camera;

    // Renderer setup
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(width, height);
    mountRef.current.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    // --- Lighting setup ---
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);

    const dirLight = new THREE.DirectionalLight(0xffffff, 2);
    dirLight.position.set(0, 50, 50); // above & in front of ships
    dirLight.castShadow = true;
    scene.add(dirLight);

    // Optional helper so you can see where the light is
    const dirLightHelper = new THREE.DirectionalLightHelper(dirLight, 5);
    scene.add(dirLightHelper);
    // --- End lighting setup ---

    
    // Raycaster for mouse interactions
    const raycaster = new THREE.Raycaster();
    raycasterRef.current = raycaster;

    // Add stars in background
    const starGeometry = new THREE.SphereGeometry(0.2, 4, 4);
    const starMaterial = new THREE.MeshBasicMaterial({ color: 0xffffff });
    for (let i = 0; i < 300; i++) {
      const star = new THREE.Mesh(starGeometry, starMaterial);
      star.position.set(
        (Math.random() - 0.5) * 300,
        (Math.random() - 0.5) * 300,
        (Math.random() - 0.5) * 300
      );
      scene.add(star);
    }

    const ships = [];
    shipsRef.current = ships;

    // Model loading function
    const loadGLBModel = (path) => {
      return new Promise((resolve, reject) => {
        if (!path) {
          resolve(null);
          return;
        }
        
        console.log('Attempting to load model from:', path);
        
        const loader = new GLTFLoader();
        loader.load(
          path,
          (gltf) => {
            console.log('Model loaded successfully:', path);
            const model = gltf.scene;
            
            // Normalize the model
            const box = new THREE.Box3().setFromObject(model);
            const center = box.getCenter(new THREE.Vector3());
            const size = box.getSize(new THREE.Vector3());
            
            console.log('Model size:', size);
            
            // Center the model
            model.position.sub(center);
            
            // Scale to appropriate size
            const maxDimension = Math.max(size.x, size.y, size.z);
            const scale = 10 / maxDimension; // Adjust this value as needed
            model.scale.setScalar(scale);
            
            console.log('Applied scale:', scale);
            
            // Ensure materials are set up properly
            model.traverse((child) => {
              if (child.isMesh) {
                // Enable shadows if needed
                child.castShadow = true;
                child.receiveShadow = true;
                
                // Ensure materials work with basic lighting
                if (child.material) {
                  if (child.material.map) {
                    child.material.map.flipY = false;
                  }
                }
              }
            });
            
            resolve(model);
          },
          (progress) => {
            // Optional: Handle loading progress
            console.log('Loading progress:', (progress.loaded / progress.total * 100).toFixed(2) + '%');
          },
          (error) => {
            console.error('Failed to load GLB model:', path, error);
            resolve(null);
          }
        );
      });
    };

    // Load models (will be null if no path provided)
    let xwingModel = null;
    let tieFighterModel = null;
    
    const initializeModels = async () => {
      console.log('Starting model initialization...');
      if (xwingModelPath) {
        console.log('Loading X-wing model...');
        xwingModel = await loadGLBModel(xwingModelPath);
        if (xwingModel) {
          console.log('X-wing model loaded successfully');
        } else {
          console.log('X-wing model failed to load, using fallback');
        }
      } else {
        console.log('No X-wing model path provided, using fallback');
      }
      
      if (tieFighterModelPath) {
        console.log('Loading TIE Fighter model...');
        tieFighterModel = await loadGLBModel(tieFighterModelPath);
        if (tieFighterModel) {
          console.log('TIE Fighter model loaded successfully');
        } else {
          console.log('TIE Fighter model failed to load, using fallback');
        }
      } else {
        console.log('No TIE Fighter model path provided, using fallback');
      }
      
      console.log('Model initialization complete. X-wing model:', !!xwingModel, 'TIE Fighter model:', !!tieFighterModel);
    };

    // X-Wing factory (with model fallback)
    const createXWing = (position) => {
      let group;
      
      console.log('Creating X-wing. Model available:', !!xwingModel);
      
      if (xwingModel) {
        // Use loaded model
        console.log('Using 3D model for X-wing');
        group = xwingModel.clone();
      } else {
        // Fallback to makeshift model
        console.log('Using fallback geometry for X-wing');
        group = new THREE.Group();
        
        // Main body
        const bodyGeometry = new THREE.BoxGeometry(0.8, 0.4, 3);
        const bodyMaterial = new THREE.MeshBasicMaterial({ color: 0xcccccc });
        const body = new THREE.Mesh(bodyGeometry, bodyMaterial);
        group.add(body);
        
        // Wings in X formation
        const wingGeometry = new THREE.BoxGeometry(0.15, 0.15, 2.5);
        const wingMaterial = new THREE.MeshBasicMaterial({ color: 0xaaaaaa });
        
        const wing1 = new THREE.Mesh(wingGeometry, wingMaterial);
        wing1.position.set(1.2, 0, 0);
        wing1.rotation.y = Math.PI / 6;
        group.add(wing1);
        
        const wing2 = new THREE.Mesh(wingGeometry, wingMaterial);
        wing2.position.set(-1.2, 0, 0);
        wing2.rotation.y = -Math.PI / 6;
        group.add(wing2);
        
        const wing3 = new THREE.Mesh(wingGeometry, wingMaterial);
        wing3.position.set(0, 1.2, 0);
        wing3.rotation.x = Math.PI / 6;
        group.add(wing3);
        
        const wing4 = new THREE.Mesh(wingGeometry, wingMaterial);
        wing4.position.set(0, -1.2, 0);
        wing4.rotation.x = -Math.PI / 6;
        group.add(wing4);
      }
      
      group.position.copy(position);
      group.userData = { 
        type: 'xwing',
        velocity: new THREE.Vector3(
          (Math.random() - 0.5) * 0.08,
          (Math.random() - 0.5) * 0.08,
          (Math.random() - 0.5) * 0.08
        ),
        health: 100,
        lastShot: 0,
        clickable: true
      };
      
      return group;
    };

    // TIE Fighter factory (with model fallback)
    const createTieFighter = (position) => {
      let group;
      
      if (tieFighterModel) {
        // Use loaded model
        group = tieFighterModel.clone();
      } else {
        // Fallback to makeshift model
        group = new THREE.Group();
        
        // Cockpit
        const cockpitGeometry = new THREE.SphereGeometry(0.6, 8, 8);
        const cockpitMaterial = new THREE.MeshBasicMaterial({ color: 0x333333 });
        const cockpit = new THREE.Mesh(cockpitGeometry, cockpitMaterial);
        group.add(cockpit);
        
        // Solar panels
        const panelGeometry = new THREE.BoxGeometry(0.1, 3, 3);
        const panelMaterial = new THREE.MeshBasicMaterial({ color: 0x111111 });
        
        const leftPanel = new THREE.Mesh(panelGeometry, panelMaterial);
        leftPanel.position.set(-1.8, 0, 0);
        group.add(leftPanel);
        
        const rightPanel = new THREE.Mesh(panelGeometry, panelMaterial);
        rightPanel.position.set(1.8, 0, 0);
        group.add(rightPanel);
      }
      
      group.position.copy(position);
      group.userData = { 
        type: 'tie',
        velocity: new THREE.Vector3(
          (Math.random() - 0.5) * 0.1,
          (Math.random() - 0.5) * 0.1,
          (Math.random() - 0.5) * 0.1
        ),
        health: 100,
        lastShot: 0,
        clickable: true
      };
      
      return group;
    };

    // Spawn ships from edges
    const spawnShip = async (type) => {
      const edge = Math.floor(Math.random() * 4);
      let position;
      let baseVelocity;
      
      switch(edge) {
        case 0: // Top
          position = new THREE.Vector3(Math.random() * 80 - 40, 0, -60);
          baseVelocity = new THREE.Vector3((Math.random() - 0.5) * 0.05, 0, Math.random() * 0.1 + 0.05);
          break;
        case 1: // Right  
          position = new THREE.Vector3(60, 0, Math.random() * 80 - 40);
          baseVelocity = new THREE.Vector3(-Math.random() * 0.1 - 0.05, 0, (Math.random() - 0.5) * 0.05);
          break;
        case 2: // Bottom
          position = new THREE.Vector3(Math.random() * 80 - 40, 0, 60);
          baseVelocity = new THREE.Vector3((Math.random() - 0.5) * 0.05, 0, -Math.random() * 0.1 - 0.05);
          break;
        case 3: // Left
          position = new THREE.Vector3(-60, 0, Math.random() * 80 - 40);
          baseVelocity = new THREE.Vector3(Math.random() * 0.1 + 0.05, 0, (Math.random() - 0.5) * 0.05);
          break;
      }
      
      const ship = type === 'xwing' ? createXWing(position) : createTieFighter(position);
      ship.userData.velocity = baseVelocity;
      ship.userData.baseSpeed = baseVelocity.length();
      ship.userData.currentHeading = Math.atan2(baseVelocity.z, baseVelocity.x);
      ship.userData.targetHeading = ship.userData.currentHeading;
      ship.userData.turnRate = 0.02 + Math.random() * 0.03;
      ship.userData.nextTurnTime = Date.now() * 0.001 + Math.random() * 3 + 1;
      ship.userData.curvePhase = Math.random() * Math.PI * 2;
      ship.userData.curveFrequency = 0.01 + Math.random() * 0.02;
      ship.userData.curveAmplitude = 0.3 + Math.random() * 0.7;
      ship.userData.lastTurn = 0;
      ship.userData.turnCooldown = 2 + Math.random() * 3;
      ships.push(ship);
      scene.add(ship);
    };

    // Initialize models and then start with initial ships
    const initializeScene = async () => {
      await initializeModels();
      
      // Initial ships - start with balanced numbers
      for (let i = 0; i < 2; i++) {
        await spawnShip('xwing');
        await spawnShip('tie');
      }
    };

    initializeScene();

    // Laser creation
    const createLaser = (position, direction, color, shooter) => {
      const laserGeometry = new THREE.CylinderGeometry(0.08, 0.08, 1.5);
      const laserMaterial = new THREE.MeshBasicMaterial({ color });
      const laser = new THREE.Mesh(laserGeometry, laserMaterial);
      
      laser.position.copy(position);
      laser.lookAt(position.clone().add(direction));
      laser.rotateX(Math.PI / 2);
      
      laser.userData = {
        velocity: direction.clone().multiplyScalar(1.2),
        life: 80,
        shooter: shooter
      };
      
      return laser;
    };

    // Explosion effect
    const createExplosion = (position) => {
      const explosionGroup = new THREE.Group();
      
      // Multiple explosion particles
      for (let i = 0; i < 8; i++) {
        const particleGeometry = new THREE.SphereGeometry(0.3, 4, 4);
        const particleMaterial = new THREE.MeshBasicMaterial({ 
          color: new THREE.Color().setHSL(Math.random() * 0.1, 1, 0.5)
        });
        const particle = new THREE.Mesh(particleGeometry, particleMaterial);
        
        particle.position.copy(position);
        particle.userData = {
          velocity: new THREE.Vector3(
            (Math.random() - 0.5) * 0.3,
            (Math.random() - 0.5) * 0.3,
            (Math.random() - 0.5) * 0.3
          ),
          life: 30 + Math.random() * 20
        };
        
        explosionGroup.add(particle);
      }
      
      scene.add(explosionGroup);
      
      // Animate explosion
      const animateExplosion = () => {
        let aliveParticles = 0;
        explosionGroup.children.forEach(particle => {
          if (particle.userData.life > 0) {
            particle.position.add(particle.userData.velocity);
            particle.userData.life--;
            particle.scale.setScalar(1 + (30 - particle.userData.life) * 0.05);
            particle.material.opacity = particle.userData.life / 30;
            aliveParticles++;
          }
        });
        
        if (aliveParticles > 0) {
          requestAnimationFrame(animateExplosion);
        } else {
          scene.remove(explosionGroup);
        }
      };
      
      animateExplosion();
    };

    // Mouse event handlers
    const onMouseMove = (event) => {
      const rect = renderer.domElement.getBoundingClientRect();
      mouseRef.current.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
      mouseRef.current.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;
    };

    const onMouseClick = (event) => {
      raycaster.setFromCamera(mouseRef.current, camera);
      const intersects = raycaster.intersectObjects(ships, true);
      
      if (intersects.length > 0) {
        const clickedObject = intersects[0].object;
        let ship = clickedObject.parent;
        
        // Find the ship group
        while (ship && !ship.userData.type) {
          ship = ship.parent;
        }
        
        if (ship && ship.userData.clickable) {
          createExplosion(ship.position);
          scene.remove(ship);
          const index = ships.indexOf(ship);
          if (index > -1) ships.splice(index, 1);
        }
      }
    };

    renderer.domElement.addEventListener('mousemove', onMouseMove);
    renderer.domElement.addEventListener('click', onMouseClick);

    // Animation loop
    const animate = () => {
      animationRef.current = requestAnimationFrame(animate);
      
      const time = Date.now() * 0.001;
      spawnTimerRef.current++;
      
      // Spawn new ships periodically
      if (spawnTimerRef.current % 180 === 0) { // Every 3 seconds at 60fps
        const xwingCount = ships.filter(s => s.userData.type === 'xwing').length;
        const tieCount = ships.filter(s => s.userData.type === 'tie').length;
        
        // Only spawn if we have less than max ships of that type
        if (Math.random() < 0.7) { // 70% chance to spawn
          if (xwingCount < 4 && tieCount < 4) {
            // Spawn the type that has fewer ships, or random if equal
            if (xwingCount < tieCount) {
              spawnShip('xwing');
            } else if (tieCount < xwingCount) {
              spawnShip('tie');
            } else {
              spawnShip(Math.random() < 0.5 ? 'xwing' : 'tie');
            }
          } else if (xwingCount < 4) {
            spawnShip('xwing');
          } else if (tieCount < 4) {
            spawnShip('tie');
          }
        }
      }
      
      // Update ships
      ships.forEach((ship, shipIndex) => {
        if (ship.userData.health <= 0) return;
        
        // Random turning behavior
        if (time - ship.userData.lastTurn > ship.userData.turnCooldown) {
          if (Math.random() < 0.3) { // 30% chance to initiate a turn
            // Choose a random new heading
            const turnAmount = (Math.random() - 0.5) * Math.PI; // Up to 180 degree turns
            ship.userData.targetHeading = ship.userData.currentHeading + turnAmount;
            ship.userData.lastTurn = time;
            ship.userData.turnCooldown = 1 + Math.random() * 4; // Random time until next possible turn
          }
        }
        
        // Gradually turn towards target heading
        let headingDiff = ship.userData.targetHeading - ship.userData.currentHeading;
        
        // Normalize angle difference to [-PI, PI]
        while (headingDiff > Math.PI) headingDiff -= 2 * Math.PI;
        while (headingDiff < -Math.PI) headingDiff += 2 * Math.PI;
        
        // Apply turn rate
        if (Math.abs(headingDiff) > 0.01) {
          const turnDirection = headingDiff > 0 ? 1 : -1;
          const actualTurnRate = Math.min(ship.userData.turnRate, Math.abs(headingDiff));
          ship.userData.currentHeading += turnDirection * actualTurnRate;
        }
        
        // Create velocity from current heading and speed
        const baseVelocity = new THREE.Vector3(
          Math.cos(ship.userData.currentHeading) * ship.userData.baseSpeed,
          0,
          Math.sin(ship.userData.currentHeading) * ship.userData.baseSpeed
        );
        
        // Add some randomness and evasive maneuvers
        ship.userData.curvePhase += ship.userData.curveFrequency;
        const evasiveX = Math.sin(ship.userData.curvePhase) * ship.userData.curveAmplitude * 0.02;
        const evasiveZ = Math.cos(ship.userData.curvePhase * 1.3) * ship.userData.curveAmplitude * 0.015;
        
        // Apply final movement
        const finalVelocity = baseVelocity.clone();
        finalVelocity.x += evasiveX;
        finalVelocity.z += evasiveZ;
        
        ship.position.add(finalVelocity);
        
        // Visual banking based on turn rate
        const bankAngle = headingDiff * 3; // Banking proportional to turn intensity
        ship.rotation.z = THREE.MathUtils.lerp(ship.rotation.z, bankAngle, 0.1);
        
        // Face movement direction
        ship.lookAt(ship.position.clone().add(finalVelocity));
        
        // Remove ships that are too far away
        if (Math.abs(ship.position.x) > 90 || Math.abs(ship.position.z) > 90) {
          scene.remove(ship);
          ships.splice(shipIndex, 1);
          return;
        }
        
        // Emergency obstacle avoidance - turn away from boundaries
        const boundaryBuffer = 65;
        if (Math.abs(ship.position.x) > boundaryBuffer || Math.abs(ship.position.z) > boundaryBuffer) {
          // Turn towards center
          const centerDirection = new THREE.Vector3(0, 0, 0).sub(ship.position).normalize();
          ship.userData.targetHeading = Math.atan2(centerDirection.z, centerDirection.x);
        }
        
        // Evasive maneuvers when near enemies
        let nearestEnemy = null;
        let minDistance = Infinity;
        ships.forEach(otherShip => {
          if (otherShip.userData.type !== ship.userData.type && otherShip.userData.health > 0) {
            const distance = ship.position.distanceTo(otherShip.position);
            if (distance < minDistance) {
              minDistance = distance;
              nearestEnemy = otherShip;
            }
          }
        });
        
        // If enemy is very close, perform evasive maneuvers
        if (nearestEnemy && minDistance < 15) {
          if (Math.random() < 0.05) { // 5% chance per frame to evade
            const evadeDirection = (Math.random() - 0.5) * Math.PI; // Random evasive turn
            ship.userData.targetHeading += evadeDirection;
          }
        }
        
        // Shooting logic - less frequent with randomized outcomes
        if (time - ship.userData.lastShot > 2 + Math.random() * 3) {
          let nearestEnemy = null;
          let minDistance = Infinity;
          
          ships.forEach(otherShip => {
            if (otherShip.userData.type !== ship.userData.type && otherShip.userData.health > 0) {
              const distance = ship.position.distanceTo(otherShip.position);
              if (distance < minDistance && distance < 25) {
                minDistance = distance;
                nearestEnemy = otherShip;
              }
            }
          });
          
          if (nearestEnemy && Math.random() < 0.4) { // Only 40% chance to actually shoot when in range
            const direction = nearestEnemy.position.clone().sub(ship.position).normalize();
            const laserColor = ship.userData.type === 'xwing' ? 0xff0000 : 0x00ff00;
            const laser = createLaser(ship.position.clone(), direction, laserColor, ship);
            
            // Add some inaccuracy - not every shot is perfect
            const inaccuracy = (Math.random() - 0.5) * 0.3;
            laser.userData.velocity.x += inaccuracy;
            laser.userData.velocity.z += inaccuracy;
            
            scene.add(laser);
            lasersRef.current.push(laser);
            ship.userData.lastShot = time;
          }
        }
        
        // Subtle rotation for movement - reduced since we're now using lookAt
        ship.rotation.y += 0.001;
      });
      
      // Update lasers
      lasersRef.current.forEach((laser, index) => {
        laser.position.add(laser.userData.velocity);
        laser.userData.life--;
        
        if (laser.userData.life <= 0) {
          scene.remove(laser);
          lasersRef.current.splice(index, 1);
          return;
        }
        
        // Check for hits - instant destruction
        ships.forEach((ship, shipIndex) => {
          if (ship !== laser.userData.shooter && ship.userData.health > 0) {
            const distance = laser.position.distanceTo(ship.position);
            if (distance < 2.5) {
              // Create explosion
              createExplosion(ship.position);
              
              // Remove ship and laser
              scene.remove(ship);
              ships.splice(shipIndex, 1);
              scene.remove(laser);
              lasersRef.current.splice(index, 1);
            }
          }
        });
      });
      
      renderer.render(scene, camera);
    };

    animate();

    // Cleanup
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
      renderer.domElement.removeEventListener('mousemove', onMouseMove);
      renderer.domElement.removeEventListener('click', onMouseClick);
      if (mountRef.current && renderer.domElement) {
        mountRef.current.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, [width, height]);

  return <div ref={mountRef} style={{ width, height, border: '1px solid #333', cursor: 'crosshair' }} />;
};

export default StarWars;