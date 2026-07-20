import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Environment, Float, ContactShadows } from "@react-three/drei";
import * as THREE from "three";

/* ── Luxury Lounge Chair ─────────────────────────────── */

function ChairLeg({ position }: { position: [number, number, number] }) {
  const goldMat = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: new THREE.Color("#c9a84c"),
        metalness: 0.95,
        roughness: 0.15,
      }),
    []
  );

  return (
    <mesh position={position} material={goldMat}>
      <cylinderGeometry args={[0.025, 0.025, 0.35, 12]} />
    </mesh>
  );
}

function LoungeChair() {
  const groupRef = useRef<THREE.Group>(null!);

  useFrame((_, delta) => {
    groupRef.current.rotation.y += delta * 0.12;
  });

  const leatherMat = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: new THREE.Color("#1a1a1a"),
        roughness: 0.55,
        metalness: 0.05,
      }),
    []
  );

  const cushionMat = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: new THREE.Color("#2a2a2a"),
        roughness: 0.7,
        metalness: 0.0,
      }),
    []
  );

  const goldMat = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: new THREE.Color("#c9a84c"),
        metalness: 0.95,
        roughness: 0.15,
      }),
    []
  );

  // Curved seat shell — half-torus sliced
  const seatShape = useMemo(() => {
    const shape = new THREE.Shape();
    // Outer arc
    const outerR = 1.0;
    const innerR = 0.7;
    const segs = 48;
    const startAngle = Math.PI * 0.15;
    const endAngle = Math.PI * 0.85;

    // Outer arc
    for (let i = 0; i <= segs; i++) {
      const a = startAngle + (endAngle - startAngle) * (i / segs);
      const x = Math.cos(a) * outerR;
      const y = Math.sin(a) * outerR;
      if (i === 0) shape.moveTo(x, y);
      else shape.lineTo(x, y);
    }
    // Inner arc (reverse)
    for (let i = segs; i >= 0; i--) {
      const a = startAngle + (endAngle - startAngle) * (i / segs);
      shape.lineTo(Math.cos(a) * innerR, Math.sin(a) * innerR);
    }
    shape.closePath();
    return shape;
  }, []);

  const extrudeSettings = useMemo(
    () => ({
      steps: 1,
      depth: 0.8,
      bevelEnabled: true,
      bevelThickness: 0.04,
      bevelSize: 0.04,
      bevelSegments: 6,
    }),
    []
  );

  return (
    <Float speed={0.8} rotationIntensity={0.15} floatIntensity={0.3}>
      <group ref={groupRef} position={[0, -0.6, 0]} scale={1.1}>
        {/* Seat shell */}
        <mesh material={leatherMat} rotation={[0, 0, 0]} position={[0, 0, -0.4]}>
          <extrudeGeometry args={[seatShape, extrudeSettings]} />
        </mesh>

        {/* Seat cushion — soft box */}
        <mesh material={cushionMat} position={[0, 0.15, 0]}>
          <boxGeometry args={[0.9, 0.12, 0.55]} />
        </mesh>

        {/* Back cushion — angled */}
        <mesh
          material={cushionMat}
          position={[0, 0.55, -0.32]}
          rotation={[0.3, 0, 0]}
        >
          <boxGeometry args={[0.8, 0.5, 0.1]} />
        </mesh>

        {/* Armrest left */}
        <mesh material={leatherMat} position={[-0.48, 0.35, 0]}>
          <boxGeometry args={[0.08, 0.35, 0.5]} />
        </mesh>

        {/* Armrest right */}
        <mesh material={leatherMat} position={[0.48, 0.35, 0]}>
          <boxGeometry args={[0.08, 0.35, 0.5]} />
        </mesh>

        {/* Gold frame / legs */}
        <ChairLeg position={[-0.4, -0.2, 0.25]} />
        <ChairLeg position={[0.4, -0.2, 0.25]} />
        <ChairLeg position={[-0.4, -0.2, -0.25]} />
        <ChairLeg position={[0.4, -0.2, -0.25]} />

        {/* Gold armrest caps */}
        <mesh material={goldMat} position={[-0.48, 0.53, 0]}>
          <boxGeometry args={[0.1, 0.02, 0.52]} />
        </mesh>
        <mesh material={goldMat} position={[0.48, 0.53, 0]}>
          <boxGeometry args={[0.1, 0.02, 0.52]} />
        </mesh>

        {/* Gold base bar */}
        <mesh material={goldMat} position={[0, -0.36, 0]}>
          <boxGeometry args={[0.7, 0.02, 0.02]} />
        </mesh>
      </group>
    </Float>
  );
}

/* ── Ambient Particles ────────────────────────────────── */

function GoldDust() {
  const count = 60;
  const ref = useRef<THREE.Points>(null!);

  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      arr[i * 3] = (Math.random() - 0.5) * 8;
      arr[i * 3 + 1] = (Math.random() - 0.5) * 8;
      arr[i * 3 + 2] = (Math.random() - 0.5) * 8;
    }
    return arr;
  }, []);

  useFrame((_, delta) => {
    ref.current.rotation.y += delta * 0.02;
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.015}
        color="#c9a84c"
        transparent
        opacity={0.35}
        sizeAttenuation
      />
    </points>
  );
}

/* ── Scene ────────────────────────────────────────────── */

export default function HeroScene() {
  return (
    <div className="absolute inset-0 z-0 opacity-70 lg:opacity-90">
      <Canvas
        camera={{ position: [0, 0.5, 4.5], fov: 35 }}
        dpr={[1, 1.5]}
        gl={{ antialias: true, alpha: true }}
        style={{ background: "transparent" }}
      >
        <ambientLight intensity={0.4} />
        <directionalLight position={[5, 8, 5]} intensity={1.4} color="#f5e6c8" />
        <directionalLight position={[-4, 3, 4]} intensity={0.6} color="#c9a84c" />
        <pointLight position={[0, 4, 2]} intensity={0.5} color="#e0c973" />
        <spotLight
          position={[0, 6, 3]}
          angle={0.3}
          penumbra={0.8}
          intensity={0.8}
          color="#ffffff"
        />

        <LoungeChair />
        <GoldDust />

        <ContactShadows
          position={[0, -1.0, 0]}
          opacity={0.4}
          scale={6}
          blur={2.5}
          far={4}
          color="#000000"
        />

        <Environment preset="studio" />
      </Canvas>
    </div>
  );
}
