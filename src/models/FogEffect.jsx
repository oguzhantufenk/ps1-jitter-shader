import { extend } from "@react-three/fiber";
import { shaderMaterial } from "@react-three/drei";
import * as THREE from "three";

const FogMaterial = shaderMaterial(
  {
    uCenter: new THREE.Vector2(0.5, 0.5),
    uRadius: 0.0065,
  },
  // Vertex shader
  `
      varying vec2 vUv;
      void main() {
        vUv = uv;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
      }
    `,
  // Fragment shader
  `
      uniform vec2 uCenter;
      uniform float uRadius;
      varying vec2 vUv;
      
      void main() {
        float dist = distance(vUv, uCenter);
        float alpha = smoothstep(uRadius - 0.01, uRadius + 0.01, dist);
        gl_FragColor = vec4(1.0, 1.0, 1.0, alpha);
      }
    `
);

extend({ FogMaterial });

export function Fog() {
  return (
    <mesh rotation={[4.725, 0, 0]} position={[0, -0.49, 0]}>
      <planeGeometry args={[50, 50, 50, 50]} />
      <fogMaterial transparent depthWrite={false} />
    </mesh>
  );
}
