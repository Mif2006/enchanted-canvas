import { Canvas, useFrame } from "@react-three/fiber";
import { useRef, useMemo } from "react";
import * as THREE from "three";

const FloatingGeometry = ({ scrollProgress }: { scrollProgress: number }) => {
  const meshRef = useRef<THREE.Mesh>(null);
  const wireRef = useRef<THREE.Mesh>(null);

  const texture = useMemo(() => {
    const canvas = document.createElement("canvas");
    canvas.width = 512;
    canvas.height = 512;
    const ctx = canvas.getContext("2d")!;
    
    // Create golden marble texture
    const grd = ctx.createLinearGradient(0, 0, 512, 512);
    grd.addColorStop(0, "#1a1a1a");
    grd.addColorStop(0.3, "#2a1f0a");
    grd.addColorStop(0.5, "#c9a84c");
    grd.addColorStop(0.7, "#2a1f0a");
    grd.addColorStop(1, "#0a0a0a");
    ctx.fillStyle = grd;
    ctx.fillRect(0, 0, 512, 512);
    
    // Add veins
    for (let i = 0; i < 60; i++) {
      ctx.beginPath();
      ctx.strokeStyle = `rgba(201, 168, 76, ${Math.random() * 0.3})`;
      ctx.lineWidth = Math.random() * 2;
      let x = Math.random() * 512;
      let y = Math.random() * 512;
      ctx.moveTo(x, y);
      for (let j = 0; j < 8; j++) {
        x += (Math.random() - 0.5) * 80;
        y += (Math.random() - 0.5) * 80;
        ctx.lineTo(x, y);
      }
      ctx.stroke();
    }
    
    const tex = new THREE.CanvasTexture(canvas);
    tex.wrapS = tex.wrapT = THREE.RepeatWrapping;
    return tex;
  }, []);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.elapsedTime * 0.15 + scrollProgress * Math.PI;
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.2 + scrollProgress * Math.PI * 0.5;
      meshRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.3;
    }
    if (wireRef.current) {
      wireRef.current.rotation.x = -state.clock.elapsedTime * 0.1 + scrollProgress * Math.PI * 0.3;
      wireRef.current.rotation.z = state.clock.elapsedTime * 0.12;
      wireRef.current.scale.setScalar(1.6 + Math.sin(state.clock.elapsedTime * 0.3) * 0.1);
    }
  });

  return (
    <>
      <ambientLight intensity={0.2} />
      <pointLight position={[5, 5, 5]} intensity={1.5} color="#c9a84c" />
      <pointLight position={[-5, -3, 3]} intensity={0.8} color="#8b7430" />
      <mesh ref={meshRef}>
        <icosahedronGeometry args={[1.2, 1]} />
        <meshStandardMaterial map={texture} metalness={0.8} roughness={0.2} />
      </mesh>
      <mesh ref={wireRef}>
        <icosahedronGeometry args={[1.2, 1]} />
        <meshBasicMaterial color="#c9a84c" wireframe opacity={0.15} transparent />
      </mesh>
    </>
  );
};

const Scene3D = ({ scrollProgress = 0 }: { scrollProgress?: number }) => {
  return (
    <div className="absolute inset-0 z-10 pointer-events-none">
      <Canvas camera={{ position: [0, 0, 4], fov: 45 }} style={{ pointerEvents: "auto" }}>
        <FloatingGeometry scrollProgress={scrollProgress} />
      </Canvas>
    </div>
  );
};

export default Scene3D;
