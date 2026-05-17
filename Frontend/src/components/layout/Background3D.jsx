import React, { useRef, useState, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Environment, Float, Stars, Sphere, MeshDistortMaterial } from '@react-three/drei';
import * as THREE from 'three';

function InteractiveOrb({ position, scale = 1, color }) {
  const ref = useRef();
  const [hovered, setHover] = useState(false);
  const targetPosition = useRef(new THREE.Vector3(...position));
  const currentPosition = useRef(new THREE.Vector3(...position));

  useFrame((state, delta) => {
    if (!ref.current) return;
    
    // Animate scale on hover
    const targetScale = hovered ? scale * 1.6 : scale;
    ref.current.scale.lerp(new THREE.Vector3(targetScale, targetScale, targetScale), 0.1);

    // Global cursor follow attraction
    const mouse3D = new THREE.Vector3(state.pointer.x * 25, state.pointer.y * 25, currentPosition.current.z);
    const dist = currentPosition.current.distanceTo(mouse3D);
    
    if (dist < 15) {
      // Attract towards cursor
      const dir = mouse3D.clone().sub(currentPosition.current).normalize();
      // the closer, the stronger the pull
      const pull = (15 - dist) * 0.15;
      targetPosition.current.copy(currentPosition.current).add(dir.multiplyScalar(pull));
    } else {
      // Return to original
      targetPosition.current.copy(currentPosition.current);
    }

    ref.current.position.lerp(targetPosition.current, 0.04);
  });

  return (
    <Float speed={2} rotationIntensity={2} floatIntensity={2}>
      <Sphere
        ref={ref}
        position={position}
        args={[1, 64, 64]}
        onPointerOver={(e) => {
          e.stopPropagation();
          setHover(true);
        }}
        onPointerOut={(e) => setHover(false)}
      >
        <MeshDistortMaterial
          color={hovered ? '#00f5d4' : color}
          emissive={hovered ? '#00f5d4' : '#000000'}
          emissiveIntensity={hovered ? 0.6 : 0.1}
          roughness={0.2}
          metalness={0.8}
          distort={hovered ? 0.5 : 0.3}
          speed={hovered ? 4 : 2}
          transparent
          opacity={0.8}
        />
      </Sphere>
    </Float>
  );
}

function Scene() {
  const orbs = useMemo(() => {
    const temp = [];
    const colors = ['#0f172a', '#1e293b', '#00f5d4', '#0284c7', '#0e8c6b'];
    for (let i = 0; i < 45; i++) {
      const x = (Math.random() - 0.5) * 35;
      const y = (Math.random() - 0.5) * 35;
      const z = (Math.random() - 0.5) * 20 - 10;
      const scale = Math.random() * 0.6 + 0.3;
      const color = colors[Math.floor(Math.random() * colors.length)];
      temp.push({ position: [x, y, z], scale, color });
    }
    return temp;
  }, []);

  return (
    <>
      <ambientLight intensity={0.2} />
      <directionalLight position={[10, 10, 5]} intensity={1} color="#00f5d4" />
      <pointLight position={[-10, -10, -5]} intensity={1} color="#0284c7" />
      
      {orbs.map((orb, i) => (
        <InteractiveOrb key={i} position={orb.position} scale={orb.scale} color={orb.color} />
      ))}
      <Environment preset="city" />
      <Stars radius={100} depth={50} count={3500} factor={4} saturation={1} fade speed={1.5} />
    </>
  );
}

function CameraRig() {
  useFrame((state) => {
    state.camera.position.x = THREE.MathUtils.lerp(state.camera.position.x, state.pointer.x * 2.5, 0.05);
    state.camera.position.y = THREE.MathUtils.lerp(state.camera.position.y, state.pointer.y * 2.5, 0.05);
    state.camera.lookAt(0, 0, 0);
  });
  return null;
}

export default function Background3D() {
  return (
    <div className="fixed inset-0 z-0 bg-[#020617] pointer-events-none">
      <Canvas 
        camera={{ position: [0, 0, 20], fov: 60 }}
        eventSource={document.getElementById('root')}
        eventPrefix="client"
        className="pointer-events-auto"
      >
        <Scene />
        <CameraRig />
      </Canvas>
      {/* Subtle overlay gradient to blend with the app */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#020617]/40 to-[#020617] pointer-events-none z-10" />
    </div>
  );
}
