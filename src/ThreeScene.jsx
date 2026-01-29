import React, { useRef, useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Canvas, useThree, useFrame } from "@react-three/fiber";
import {
  OrbitControls,
  useGLTF,
  Text,
  useTexture,
  Loader,
  Environment,
} from "@react-three/drei";

import { Vector3, Color } from "three";
import orangeNoise from "./images/border90.webp";
import rotate from "./images/arrow.svg";
import pause from "./images/pause.svg";
import "./styles/menu.css";
import {
  Bloom,
  BrightnessContrast,
  EffectComposer,
} from "@react-three/postprocessing";
import { LoadingText } from "./components/LoadingText";

// OrangeTexture Component
function OrangeTexture() {
  const t = useTexture(orangeNoise);
  return <meshBasicMaterial map={t}></meshBasicMaterial>;
}

// Model Component
function Model({ url, setLoading }) {
  const { scene } = useGLTF(url);

  useEffect(() => {
    if (scene) {
      setLoading(false);
    }
  }, [scene, setLoading]);

  scene.traverse((child) => {
    if (child.isMesh) {
      child.castShadow = true;
      child.receiveShadow = true;
    }
  });

  return <primitive object={scene} scale={0.0125} position={[0, -1, 0]} />;
}

// MainLight Component
const MainLight = () => {
  const lightRef = useRef();
  const { camera } = useThree();

  useFrame(() => {
    if (lightRef.current && camera) {
      const lightOffset = new Vector3(6, 5, -6).applyQuaternion(
        camera.quaternion,
      );
      lightRef.current.position.copy(camera.position).add(lightOffset);
    }
  });

  return (
    <directionalLight
      ref={lightRef}
      intensity={2.5}
      castShadow
      shadow-camera-near={0.5}
      shadow-camera-far={50}
      shadow-bias={-0.001}
      color={new Color("#faf3e6")}
      shadow-mapSize={2048}
    >
      <orthographicCamera
        attach="shadow-camera"
        args={[-8.5, 8.5, 8.5, -8.5, 0.1, 20]}
      />
    </directionalLight>
  );
};

// SecondaryLight Component
const SecondaryLight = () => {
  const secondaryLightRef = useRef();
  const { camera } = useThree();

  useFrame(() => {
    if (secondaryLightRef.current && camera) {
      const lightOffset = new Vector3(-7, 1, 3).applyQuaternion(
        camera.quaternion,
      );
      secondaryLightRef.current.position.copy(camera.position).add(lightOffset);
    }
  });

  return (
    <directionalLight
      ref={secondaryLightRef}
      intensity={1}
      castShadow
      shadow-camera-near={0.5}
      shadow-camera-far={50}
      color={new Color("#fae7d2")}
      shadow-mapSize={2048}
      shadow-bias={-0.01}
    />
  );
};

// CameraControlsAndResponsive Component
const CameraControlsAndResponsive = ({ setReady, autoRotate }) => {
  const { camera } = useThree();
  const controlsRef = useRef();

  useEffect(() => {
    if (controlsRef.current) {
      controlsRef.current.autoRotate = autoRotate;
    }
  }, [autoRotate]);

  useEffect(() => {
    const handleResize = () => {
      const aspect = window.innerWidth / window.innerHeight;
      const zoomFactor = Math.log(aspect + 1) * 0.363;

      // 🔥 Mobile boost
      const isMobile = window.innerWidth < 768;
      camera.zoom = isMobile ? zoomFactor * 1.4 : zoomFactor;

      camera.updateProjectionMatrix();
      setReady(true);
    };

    window.addEventListener("resize", handleResize);
    handleResize();

    return () => window.removeEventListener("resize", handleResize);
  }, [camera]);

  return (
    <OrbitControls
      ref={controlsRef}
      enableZoom={true}
      enablePan={true}
      enableRotate={true}
      zoomSpeed={0.8}
      rotateSpeed={0.5}
      dampingFactor={0.15}
      minPolarAngle={Math.PI / 40} // Prevent camera from going too high
      maxPolarAngle={Math.PI / 2} // Prevent camera from going too low
      minDistance={4}
      maxDistance={8}
      autoRotate={autoRotate}
      autoRotateSpeed={0.7}
    />
  );
};

// ThreeScene Component
export const ThreeScene = ({ setSignUpVisible }) => {
  const [loading, setLoading] = useState(true);
  const [autoRotate, setAutoRotate] = useState(true);
  const [hovered, setHovered] = useState(null); // Change to track which text is hovered
  const [touchStartTime, setTouchStartTime] = useState(null);
  const [ready, setReady] = useState(false);

  const glbUrl = "/truck 5.glb"; // Replace with your actual GLB file path

  const maxTouchDuration = 150; // Maximum duration for a short touch in ms

  const handleToggleAutoRotate = () => {
    setAutoRotate(!autoRotate);
  };

  useEffect(() => {
    setLoading(true);
  }, [glbUrl]);

  useEffect(() => {
    document.body.style.cursor = hovered !== null ? "pointer" : "auto"; // Update cursor style based on hover state
  }, [hovered]);

  useEffect(() => {
    document.body.style.cursor = hovered !== null ? "pointer" : "auto"; // Update cursor style based on hover state
  }, [hovered]);

  const handlePointerOver = (id) => (e) => {
    e.stopPropagation(); // Prevent event propagation
    console.log(`${id} hovered`);
    setHovered(id);
  };
  const handlePointerOut = () => setHovered(null);

  const handlePointerDown = () => setTouchStartTime(Date.now());

  const handlePointerUp = (url, tab) => {
    const touchEndTime = Date.now();
    const touchDuration = touchEndTime - touchStartTime;

    if (touchDuration < maxTouchDuration) {
      if (url === "signup") {
        setSignUpVisible(true);
        handlePointerOut();
      } else {
        window.open(url, tab);
        handlePointerOut();
      }
    }
  };

  const TourMesh = () => (
    <mesh
      position={[-1.05, -0.1, 0.85]}
      rotation={[0, -1.56, 0]}
      onPointerDown={(e) => {
        e.stopPropagation(); // Stop event propagation
        handlePointerDown();
      }}
      onPointerUp={(e) => {
        e.stopPropagation(); // Stop event propagation
        handlePointerUp("/tour", "_self");
      }}
      onPointerOver={handlePointerOver("tour")}
      onPointerOut={handlePointerOut}
    >
      <planeGeometry attach="geometry" args={[1, 0.8]} />
      <meshBasicMaterial attach="material" transparent opacity={0} />
    </mesh>
  );

  const WatchMesh = () => (
    <mesh
      position={[1.05, -0.1, 0.76]}
      rotation={[0, 1.56, 0]}
      onPointerDown={(e) => {
        e.stopPropagation(); // Stop event propagation
        handlePointerDown();
      }}
      onPointerUp={(e) => {
        e.stopPropagation(); // Stop event propagation
        handlePointerUp("https://www.youtube.com/watch?v=J8fd8_OeOaY", "blank");
      }}
      onPointerOver={handlePointerOver("watch")}
      onPointerOut={handlePointerOut}
    >
      <planeGeometry attach="geometry" args={[1, 0.8]} />
      <meshBasicMaterial attach="material" transparent opacity={0} />
    </mesh>
  );

  const imageVariants = {
    initial: { opacity: 0 },
    animate: { opacity: 0.9, transition: { duration: 0.04 } },
    exit: { opacity: 0.4, transition: { duration: 0.04 } },
  };

  return (
    <>
      <div
        style={{
          width: "100%",
          height: "100vh",
          position: "relative",
          zIndex: 2,
        }}
      >
        {loading && <LoadingText />}

        {!loading && (
          <AnimatePresence mode="wait">
            <motion.img
              alt="rotate"
              key={autoRotate ? "pause" : "rotate"}
              onClick={handleToggleAutoRotate}
              src={autoRotate ? pause : rotate}
              variants={imageVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              style={{
                width: autoRotate
                  ? "clamp(22px, 5.5vw, 34px)"
                  : "clamp(28px, 6.5vw, 42px)",
                bottom: autoRotate
                  ? "min(max(15px, 2vmin), 20px)"
                  : "min(max(12px, 1.6vmin), 20px)",
                left: autoRotate
                  ? "min(max(15px, 2vmin), 18px)"
                  : "min(max(12px, 1.6vmin), 18px)",
                position: "fixed",
                opacity: 0.9,
                cursor: "pointer",
                zIndex: 200,
                padding: "15px 15px 0px 0px",
              }}
            />
          </AnimatePresence>
        )}

        <div style={{ opacity: ready ? 1 : 0 }}>
          <Canvas
            shadows
            style={{ position: "absolute", top: 0, left: 0 }}
            camera={{
              position: [6, 0.7, 1.7],
              fov: 24,
            }}
          >
            <Environment preset="forest" resolution={256} blur={0.6} />

            <MainLight />
            <SecondaryLight />

            <Model url={glbUrl} setLoading={setLoading} />

            <Text
              scale={0.16}
              color="#b07c00" // Change color based on hover state
              position={[1.05, -0.1, 0.76]}
              rotation={[0, 1.56, 0]}
              fillOpacity={1}
              fontWeight="bold"
              font="/fonts/Sequel100Black-75.ttf"
              strokeOpacity={hovered === "watch" ? 1 : 0}
              strokeColor="white"
              strokeWidth={hovered === "watch" ? 0.046 : 0}
            >
              WATCH
            </Text>
            <WatchMesh />

            <Text
              scale={0.16}
              color="#b07c00" // Change color based on hover state
              position={[-1.05, -0.1, 0.85]}
              rotation={[0, -1.56, 0]}
              fillOpacity={1}
              fontWeight="bold"
              font="/fonts/Sequel100Black-75.ttf"
              strokeOpacity={hovered === "tour" ? 1 : 0}
              strokeColor="white"
              strokeWidth={hovered === "tour" ? 0.046 : 0}
            >
              TOUR
            </Text>
            <TourMesh />

            <CameraControlsAndResponsive
              setReady={setReady}
              autoRotate={autoRotate}
            />

            <EffectComposer multisampling={0} resolutionScale={0.5}>
              <BrightnessContrast brightness={0.02} contrast={0.1} />
              <Bloom
                intensity={0.25}
                luminanceThreshold={0.9}
                luminanceSmoothing={0.1}
                mipmapBlur
              />
            </EffectComposer>
          </Canvas>
        </div>
        <Loader />
      </div>
    </>
  );
};

export default ThreeScene;
