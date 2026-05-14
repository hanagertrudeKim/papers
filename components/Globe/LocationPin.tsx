"use client";

import { useRef, useState } from "react";
import { Billboard, Text } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { latLngToVector3 } from "@/lib/locations";

interface LocationPinProps {
  lat: number;
  lng: number;
  color: string;
  label: string;
  detail?: string;
  onClick?: () => void;
}

export default function LocationPin({ lat, lng, color, label, detail, onClick }: LocationPinProps) {
  const [hovered, setHovered] = useState(false);
  const ringRef = useRef<THREE.Mesh<THREE.BufferGeometry, THREE.MeshBasicMaterial>>(null);
  const ringRef2 = useRef<THREE.Mesh<THREE.BufferGeometry, THREE.MeshBasicMaterial>>(null);
  const pinRef = useRef<THREE.Group>(null);
  const pos = latLngToVector3(lat, lng);
  const normal = new THREE.Vector3(pos.x, pos.y, pos.z).normalize();

  useFrame((_, delta) => {
    if (ringRef.current && ringRef2.current) {
      const t = Date.now() / 1000;
      const s1 = 1 + (Math.sin(t * 2.2) * 0.5 + 0.5) * 1.15;
      const s2 = 1 + (Math.sin(t * 2.2 + Math.PI) * 0.5 + 0.5) * 1.15;
      ringRef.current.scale.setScalar(s1);
      ringRef2.current.scale.setScalar(s2);
      ringRef.current.material.opacity = 0.6 / s1;
      ringRef2.current.material.opacity = 0.6 / s2;
    }

    if (pinRef.current) {
      pinRef.current.scale.setScalar(
        THREE.MathUtils.lerp(pinRef.current.scale.x, hovered ? 1.12 : 1, delta * 8)
      );
    }
  });

  return (
    <group position={[pos.x, pos.y, pos.z]}>
      <Billboard>
        <group
          ref={pinRef}
          onPointerEnter={() => setHovered(true)}
          onPointerLeave={() => setHovered(false)}
          onClick={onClick}
        >
          {/* Beacon plate */}
          <mesh ref={ringRef}>
            <ringGeometry args={[0.048, 0.072, 48]} />
            <meshBasicMaterial color={color} transparent opacity={0.45} side={THREE.DoubleSide} />
          </mesh>
          <mesh ref={ringRef2}>
            <ringGeometry args={[0.048, 0.072, 48]} />
            <meshBasicMaterial color={color} transparent opacity={0.18} side={THREE.DoubleSide} />
          </mesh>

          {/* Core dot */}
          <mesh>
            <sphereGeometry args={[0.038, 18, 18]} />
            <meshBasicMaterial color={color} />
          </mesh>
          <mesh scale={2.6}>
            <sphereGeometry args={[0.038, 18, 18]} />
            <meshBasicMaterial color={color} transparent opacity={hovered ? 0.18 : 0.08} />
          </mesh>
        </group>
      </Billboard>

      {/* Label */}
      <Billboard>
        <group position={[normal.x * 0.12, normal.y * 0.12 + 0.17, normal.z * 0.12]}>
          <mesh>
            <planeGeometry args={[hovered ? 0.78 : 0.56, detail ? 0.22 : 0.15]} />
            <meshBasicMaterial color="#06101d" transparent opacity={hovered ? 0.82 : 0.54} />
          </mesh>
          <mesh position={[0, detail ? -0.12 : -0.08, -0.002]}>
            <planeGeometry args={[hovered ? 0.78 : 0.56, 0.008]} />
            <meshBasicMaterial color={color} transparent opacity={0.58} />
          </mesh>
          <Text
            position={[0, detail ? 0.035 : 0, 0.004]}
            fontSize={0.062}
            color="#FFFFFF"
            anchorX="center"
            anchorY="middle"
          >
            {label}
          </Text>
          {detail && (
            <Text
              position={[0, -0.06, 0.004]}
              fontSize={0.034}
              color={color}
              anchorX="center"
              anchorY="middle"
            >
              {detail}
            </Text>
          )}
        </group>
      </Billboard>
    </group>
  );
}
