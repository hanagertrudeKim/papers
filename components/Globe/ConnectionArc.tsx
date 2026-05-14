"use client";

import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { latLngToVector3 } from "@/lib/locations";

interface ConnectionArcProps {
  from: { lat: number; lng: number };
  to: { lat: number; lng: number };
  color: string;
  delay?: number;
  height?: number;
}

export default function ConnectionArc({
  from,
  to,
  color,
  delay = 0,
  height = 0.7,
}: ConnectionArcProps) {
  const courierRef = useRef<THREE.Group>(null);

  const curve = useMemo(() => {
    const start = latLngToVector3(from.lat, from.lng, 2.08);
    const end = latLngToVector3(to.lat, to.lng, 2.08);
    const startVector = new THREE.Vector3(start.x, start.y, start.z);
    const endVector = new THREE.Vector3(end.x, end.y, end.z);
    const mid = startVector
      .clone()
      .add(endVector)
      .multiplyScalar(0.5)
      .normalize()
      .multiplyScalar(2.35 + height);

    return new THREE.CatmullRomCurve3([startVector, mid, endVector]);
  }, [from.lat, from.lng, to.lat, to.lng, height]);

  useFrame(({ clock }) => {
    if (!courierRef.current) return;
    const t = (clock.elapsedTime * 0.13 + delay) % 1;
    const point = curve.getPointAt(t);
    courierRef.current.position.copy(point);
  });

  return (
    <group>
      <mesh>
        <tubeGeometry args={[curve, 112, 0.0036, 8, false]} />
        <meshBasicMaterial color={color} transparent opacity={0.22} />
      </mesh>
      <mesh>
        <tubeGeometry args={[curve, 112, 0.011, 8, false]} />
        <meshBasicMaterial color={color} transparent opacity={0.035} />
      </mesh>

      <group ref={courierRef}>
        <mesh>
          <sphereGeometry args={[0.026, 16, 16]} />
          <meshBasicMaterial color={color} />
        </mesh>
        <mesh scale={2.4}>
          <sphereGeometry args={[0.026, 16, 16]} />
          <meshBasicMaterial color={color} transparent opacity={0.14} />
        </mesh>
        <mesh position={[-0.035, 0, 0]} scale={[2.6, 0.8, 0.8]}>
          <sphereGeometry args={[0.022, 16, 16]} />
          <meshBasicMaterial color={color} transparent opacity={0.09} />
        </mesh>
      </group>
    </group>
  );
}
