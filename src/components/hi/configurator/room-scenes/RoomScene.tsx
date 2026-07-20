import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Environment, RoundedBox } from "@react-three/drei";
import { useConfigurator } from "@/contexts/ConfiguratorContext";
import * as THREE from "three";

function Room() {
  const { config } = useConfigurator();
  const groupRef = useRef<THREE.Group>(null);

  useFrame((_, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 0.08;
    }
  });

  const floorSelections = Object.values(config.rooms.floor.selections);
  const floorColor = useMemo(() => {
    if (floorSelections.length === 0) return "#8B7355";
    const opt = config.rooms.floor.options.find((o) => o.id === floorSelections[0]);
    return opt?.color || "#8B7355";
  }, [floorSelections, config.rooms.floor.options]);

  const wallSelections = Object.values(config.rooms.walls.selections);
  const wallColor = useMemo(() => {
    if (wallSelections.length === 0) return "#1a1a1a";
    const opt = config.rooms.walls.options.find((o) => o.id === wallSelections[0]);
    return opt?.color || "#1a1a1a";
  }, [wallSelections, config.rooms.walls.options]);

  const hasSofa =
    config.rooms["living-room"].selections["lr-sofa-leather"] ||
    config.rooms["living-room"].selections["lr-sofa-velvet"] ||
    config.rooms["living-room"].selections["lr-sofa-linen"];

  const hasBed =
    config.rooms.bedroom.selections["b-bed-upholstered"] ||
    config.rooms.bedroom.selections["b-bed-wood"] ||
    config.rooms.bedroom.selections["b-bed-platform"];

  const hasTable =
    config.rooms.furniture.selections["fu-table-marble"] ||
    config.rooms.furniture.selections["fu-table-wood"] ||
    config.rooms.furniture.selections["fu-table-glass"];

  const hasChandelier =
    config.rooms.lighting.selections["l-chandelier-crystal"] ||
    config.rooms.lighting.selections["l-chandelier-modern"];

  return (
    <group ref={groupRef} position={[0, -1, 0]}>
      {/* Floor */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]} receiveShadow>
        <planeGeometry args={[8, 8]} />
        <meshStandardMaterial color={floorColor} roughness={0.3} metalness={0.1} />
      </mesh>

      {/* Back wall */}
      <mesh position={[0, 2, -4]} receiveShadow>
        <planeGeometry args={[8, 4]} />
        <meshStandardMaterial color={wallColor} roughness={0.8} />
      </mesh>

      {/* Left wall */}
      <mesh position={[-4, 2, 0]} rotation={[0, Math.PI / 2, 0]} receiveShadow>
        <planeGeometry args={[8, 4]} />
        <meshStandardMaterial color={wallColor} roughness={0.8} />
      </mesh>

      {/* Gold accent strip */}
      <mesh position={[0, 0.01, -3.95]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[8, 0.1]} />
        <meshStandardMaterial color="#c9a84c" metalness={0.8} roughness={0.2} />
      </mesh>

      {/* Sofa */}
      {hasSofa && (
        <group position={[0, 0.4, -2.5]}>
          <RoundedBox args={[3, 0.8, 1.2]} radius={0.1} position={[0, 0, 0]}>
            <meshStandardMaterial color="#1a1a2e" roughness={0.6} />
          </RoundedBox>
          <RoundedBox args={[3, 0.6, 0.2]} radius={0.08} position={[0, 0.5, -0.5]}>
            <meshStandardMaterial color="#1a1a2e" roughness={0.6} />
          </RoundedBox>
        </group>
      )}

      {/* Bed */}
      {hasBed && (
        <group position={[0, 0.3, -2.5]}>
          <RoundedBox args={[2.5, 0.5, 3]} radius={0.05} position={[0, 0, 0]}>
            <meshStandardMaterial color="#2a2a2a" roughness={0.5} />
          </RoundedBox>
          <RoundedBox args={[2.5, 1.2, 0.3]} radius={0.05} position={[0, 0.5, -1.35]}>
            <meshStandardMaterial color="#c9a84c" metalness={0.3} roughness={0.4} />
          </RoundedBox>
        </group>
      )}

      {/* Coffee table */}
      {hasTable && (
        <RoundedBox args={[1.2, 0.3, 0.8]} radius={0.05} position={[0, 0.15, -0.5]}>
          <meshStandardMaterial color="#f0f0f0" roughness={0.1} metalness={0.2} />
        </RoundedBox>
      )}

      {/* Chandelier */}
      {hasChandelier && (
        <group position={[0, 3.5, -2]}>
          <mesh>
            <sphereGeometry args={[0.5, 16, 16]} />
            <meshStandardMaterial
              color="#c9a84c"
              metalness={0.9}
              roughness={0.1}
              emissive="#c9a84c"
              emissiveIntensity={0.3}
            />
          </mesh>
          <pointLight position={[0, -0.5, 0]} intensity={2} color="#f0d78c" distance={8} />
        </group>
      )}

      <GoldParticles />
    </group>
  );
}

function GoldParticles() {
  const count = 40;
  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 8;
      pos[i * 3 + 1] = Math.random() * 4;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 8;
    }
    return pos;
  }, []);

  const ref = useRef<THREE.Points>(null);

  useFrame((_, delta) => {
    if (ref.current) {
      ref.current.rotation.y += delta * 0.02;
    }
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial size={0.05} color="#c9a84c" transparent opacity={0.6} sizeAttenuation />
    </points>
  );
}

const RoomScene = () => (
  <Canvas
    camera={{ position: [5, 4, 5], fov: 50 }}
    shadows
    dpr={[1, 1.5]}
    gl={{ antialias: true }}
    style={{ background: "transparent" }}
  >
    <ambientLight intensity={0.4} />
    <directionalLight position={[5, 8, 5]} intensity={1} castShadow />
    <pointLight position={[0, 4, 0]} intensity={0.5} color="#f0d78c" />
    <Room />
    <Environment preset="apartment" />
  </Canvas>
);

export default RoomScene;
