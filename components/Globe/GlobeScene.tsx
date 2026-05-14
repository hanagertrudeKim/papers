"use client";

import { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import Globe from "./Globe";
import { LocationKey } from "@/lib/locations";

interface GlobeSceneProps {
  onPinClick?: (location: LocationKey) => void;
}

export default function GlobeScene({ onPinClick }: GlobeSceneProps) {
  return (
    <div className="w-full h-full globe-canvas">
      <Canvas
        camera={{ position: [0, 0.15, 5.7], fov: 41 }}
        gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
        style={{ background: "transparent" }}
      >
        <ambientLight intensity={0.42} />
        <directionalLight position={[5, 2.6, 4]} intensity={1.35} color="#f8fbff" />
        <directionalLight position={[-4, -1.5, -3]} intensity={0.42} color="#60a5fa" />
        <pointLight position={[-2.4, 2.3, 2.2]} intensity={1.2} color="#7dd3fc" />
        <pointLight position={[2.8, -1.2, 1.4]} intensity={0.5} color="#ff8a8a" />

        <Suspense fallback={null}>
          <Globe onPinClick={onPinClick} />
        </Suspense>

        <OrbitControls
          enableZoom={false}
          enablePan={false}
          rotateSpeed={0.38}
          dampingFactor={0.08}
          enableDamping
          minPolarAngle={Math.PI / 4}
          maxPolarAngle={(3 * Math.PI) / 4}
        />
      </Canvas>
    </div>
  );
}
