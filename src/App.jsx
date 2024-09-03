import { Canvas } from "@react-three/fiber";
import { OrbitControls, Center } from "@react-three/drei";
import { Leva } from "leva";

import { Crash } from "./models/Crash";
import { Fog } from "./models/FogEffect";

function App() {
  return (
    <div className="canvas-wrapper">
      <div className="leva-controls">
        <Leva />
      </div>

      <Canvas
        dpr={1}
        camera={{ fov: 30, position: [0, 1, 3.5] }}
        linear
        shadows
      >
        <color attach="background" args={["#111111"]} />

        <ambientLight intensity={3} />
        <directionalLight position={[0, 1, 0.5]} intensity={3} castShadow />

        <Center position={[0, -0.25, 0]}>
          <Crash />
          <Fog />
        </Center>

        <OrbitControls
          minPolarAngle={0.2}
          maxPolarAngle={1.22}
          enableZoom={false}
          enablePan={false}
        />
      </Canvas>
    </div>
  );
}

export default App;
