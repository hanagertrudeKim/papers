"use client";

import { Component, ReactNode, Suspense, useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";
import LandLayer from "./LandLayer";
import { latLngToVector3 } from "@/lib/locations";
import { journey, JourneyProject } from "@/lib/journey";

function Route({from,to,color,reduced}:{from:JourneyProject;to:JourneyProject;color:string;reduced:boolean}) {
  const traveler=useRef<THREE.Mesh>(null);
  const phase=useRef(0);
  const curve=useMemo(()=>{
    const a=latLngToVector3(from.lat,from.lng,1),b=latLngToVector3(to.lat,to.lng,1);
    const start=new THREE.Vector3(a.x,a.y,a.z).normalize(),end=new THREE.Vector3(b.x,b.y,b.z).normalize();
    const angle=start.angleTo(end),points=[];
    for(let i=0;i<=80;i++){const t=i/80;const v=start.clone().lerp(end,t).normalize();v.multiplyScalar(2.045+Math.sin(Math.PI*t)*Math.min(.4,.08+angle*.16));points.push(v);}
    return new THREE.CatmullRomCurve3(points);
  },[from,to]);
  useFrame((_,delta)=>{if(traveler.current){if(!reduced)phase.current=(phase.current+delta*.12)%1;traveler.current.position.copy(curve.getPoint(phase.current));}});
  return <group><mesh><tubeGeometry args={[curve,100,.005,5,false]}/><meshBasicMaterial color={color} transparent opacity={.55}/></mesh><mesh ref={traveler}><sphereGeometry args={[.026,12,12]}/><meshBasicMaterial color="#e4f0ff"/></mesh></group>;
}
function MapPin({project,active,reduced}:{project:JourneyProject;active:boolean;reduced:boolean}) {
  const pulse=useRef<THREE.Mesh>(null);
  const v=latLngToVector3(project.lat,project.lng,2.025);
  const q=new THREE.Quaternion().setFromUnitVectors(new THREE.Vector3(0,0,1),new THREE.Vector3(v.x,v.y,v.z).normalize());
  useFrame(({clock})=>{if(pulse.current){const t=reduced?1:1+(Math.sin(clock.elapsedTime*2.2)*.5+.5)*.7;pulse.current.scale.setScalar(t);}});
  return <group position={[v.x,v.y,v.z]} quaternion={q}>
    <mesh><ringGeometry args={[active ? .09 : .04,active ? .105 : .05,48]}/><meshBasicMaterial color={project.color} side={THREE.DoubleSide} transparent opacity={active ? .8 : .5}/></mesh>
    <mesh position={[0,0,active ? .13 : .065]} rotation={[Math.PI/2,0,0]}><cylinderGeometry args={[.007,.007,active ? .26 : .13,8]}/><meshBasicMaterial color={project.color}/></mesh>
    <mesh position={[0,0,active ? .27 : .14]}><sphereGeometry args={[active ? .06 : .025,18,18]}/><meshBasicMaterial color={project.color}/></mesh>
    {active&&<mesh ref={pulse}><ringGeometry args={[.13,.136,64]}/><meshBasicMaterial color={project.color} transparent opacity={.35} side={THREE.DoubleSide} depthWrite={false}/></mesh>}
  </group>;
}
function Earth({project,reduced}:{project:JourneyProject;reduced:boolean}) {
  const globe = useRef<THREE.Group>(null);
  const ring = useRef<THREE.Mesh>(null);
  const atmosphere=useRef<THREE.Mesh<THREE.BufferGeometry,THREE.MeshBasicMaterial>>(null);
  const target = useMemo(()=>{
    const p=latLngToVector3(project.lat,project.lng,1);
    return new THREE.Quaternion().setFromUnitVectors(new THREE.Vector3(p.x,p.y,p.z).normalize(),new THREE.Vector3(0,0,1));
  },[project]);
  const stars=useMemo(()=>{const p=[];for(let i=0;i<180;i++){const y=1-2*i/179;const r=Math.sqrt(1-y*y);p.push(Math.cos(i*2.39996)*r*3.1,y*3.1,Math.sin(i*2.39996)*r*3.1);}return new Float32Array(p);},[]);
  useFrame((_,delta)=>{
    if(globe.current) {if(reduced)globe.current.quaternion.copy(target);else globe.current.quaternion.slerp(target,1-Math.exp(-delta*3.2));}
    if(ring.current&&!reduced)ring.current.rotation.z+=delta*.025;
    if(atmosphere.current)atmosphere.current.material.opacity=reduced?.07:.065+Math.sin(performance.now()/1800)*.012;
  });
  return <group>
    <points><bufferGeometry><bufferAttribute attach="attributes-position" args={[stars,3]}/></bufferGeometry><pointsMaterial size={.009} color="#9bb9e7" transparent opacity={.35}/></points>
    <mesh ref={ring} rotation={[1.2,.25,.3]}><torusGeometry args={[2.37,.002,8,180]}/><meshBasicMaterial color="#86d4d3" transparent opacity={.16}/></mesh>
    <mesh rotation={[.8,.3,-.4]}><torusGeometry args={[2.57,.002,8,180]}/><meshBasicMaterial color="#b79af7" transparent opacity={.1}/></mesh>
    <group ref={globe}>
      <mesh><sphereGeometry args={[2,64,64]}/><meshStandardMaterial color="#153344" emissive="#102330" emissiveIntensity={.35} roughness={.65} metalness={.12}/></mesh>
      <mesh><sphereGeometry args={[2.009,48,24]}/><meshBasicMaterial color="#b2d6ff" wireframe transparent opacity={.018}/></mesh>
      <mesh ref={atmosphere} scale={1.07}><sphereGeometry args={[2,48,48]}/><meshBasicMaterial color={project.color} transparent opacity={.07} side={THREE.BackSide}/></mesh>
      <LandLayer/>
      <Route from={journey[0]} to={journey[2]} color="#8dc5b5" reduced={reduced}/>
      <Route from={journey[2]} to={journey[3]} color="#92b5ff" reduced={reduced}/>
      <Route from={journey[3]} to={journey[1]} color="#b1a5f5" reduced={reduced}/>
      {journey.map(p=><MapPin key={p.id} project={p} active={p.id===project.id} reduced={reduced}/>)}

    </group>
  </group>;
}
class GlobeBoundary extends Component<{children:ReactNode;fallback:ReactNode},{failed:boolean}> {
  state={failed:false};static getDerivedStateFromError(){return {failed:true};}render(){return this.state.failed?this.props.fallback:this.props.children;}
}
export default function JourneyGlobe({project,reduced}:{project:JourneyProject;reduced:boolean}) {
  const fallback=<div className="earth-fallback" style={{transform:`rotate(${project.lng/8}deg)`}}><span/></div>;
  return <GlobeBoundary fallback={fallback}><Canvas camera={{position:[0,0,6.5],fov:43}} dpr={[1,1.5]} gl={{antialias:true,alpha:true}} fallback={fallback}><ambientLight intensity={.65}/><pointLight position={[3,-2,3]} intensity={.8} color="#aa7fe6"/><pointLight position={[-3,2,2]} intensity={1.6} color="#58cabd"/><directionalLight position={[3,3,5]} intensity={1.8} color="#dcecff"/><pointLight position={[-3,-2,2]} intensity={.65} color="#447fd2"/><Suspense fallback={null}><Earth project={project} reduced={reduced}/></Suspense></Canvas></GlobeBoundary>;
}
