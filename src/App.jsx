import { Loader } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { Suspense, useEffect, useState } from "react";
import { Experience } from "./components/Experience";
import { UI } from "./components/UI";

function App() {
  // Responsive kamera pozitsiyasi
  const [cameraZ, setCameraZ] = useState(window.innerWidth > 800 ? 4 : 9);

  useEffect(() => {
    const handleResize = () => {
      setCameraZ(window.innerWidth > 800 ? 4 : 9);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <>
      <UI />
      <Loader />
      <Canvas
        shadows
        dpr={[1, 1.5]}
        camera={{
          position: [-0.5, 1, cameraZ],
          fov: 45,
        }}
        aria-label="3D interactive book viewer"
      >
        <group position-y={0}>
          <Suspense fallback={null}>
            <Experience />
          </Suspense>
        </group>
      </Canvas>
    </>
  );
}

export default App;
