import React, { useRef, useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Canvas, useThree, useFrame } from "@react-three/fiber";
import {
  OrbitControls,
  useGLTF,
  Text,
  useTexture,
  Loader,
} from "@react-three/drei";
import { Vector3, Color } from "three";
import orangeNoise from "./images/border90.webp";
import rotate from "./images/arrow.png";
import pause from "./images/pause.png";
import "./styles/menu.css";
import {
  Bloom,
  BrightnessContrast,
  EffectComposer,
} from "@react-three/postprocessing";
import { BlendFunction } from "postprocessing";
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

  return <primitive object={scene} position={[0, -1, -0.7]} />;
}

// MainLight Component
const MainLight = () => {
  const lightRef = useRef();
  const { camera } = useThree();

  useFrame(() => {
    if (lightRef.current && camera) {
      const lightOffset = new Vector3(4, 3, -0).applyQuaternion(
        camera.quaternion
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
        camera.quaternion
      );
      secondaryLightRef.current.position.copy(camera.position).add(lightOffset);
    }
  });

  return (
    <directionalLight
      ref={secondaryLightRef}
      intensity={0.5}
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
      const zoomFactor = Math.log(aspect + 1) * 0.363; // Adjust the multiplier to your preference

      camera.zoom = zoomFactor;
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
    />
  );
};

// ThreeScene Component
export const ThreeScene = ({ setSignUpVisible }) => {
  const [loading, setLoading] = useState(true);
  const [autoRotate, setAutoRotate] = useState(false);
  const [hovered, setHovered] = useState(null); // Change to track which text is hovered
  const [touchStartTime, setTouchStartTime] = useState(null);
  const [ready, setReady] = useState(false);

  const glbUrl = "/model.glb"; // Replace with your actual GLB file path

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

  const StreamMesh = () => (
    <mesh
      position={[1.02, -1, -0.7]}
      rotation={[0, 1.59, 0]}
      onPointerDown={(e) => {
        e.stopPropagation(); // Stop event propagation
        handlePointerDown();
      }}
      onPointerUp={(e) => {
        e.stopPropagation(); // Stop event propagation
        handlePointerUp("/streaming_links", "_self");
      }}
      onPointerOver={handlePointerOver("stream")}
      onPointerOut={handlePointerOut}
    >
      <planeGeometry attach="geometry" args={[1.5, 1.97]} />
      <meshBasicMaterial attach="material" transparent opacity={0} />
    </mesh>
  );

  const ProrderMesh = () => (
    <mesh
      position={[-0.394, -1.1, 1.6]}
      rotation={[0, 1.57, 0]}
      onPointerDown={handlePointerDown}
      onPointerUp={() =>
        handlePointerUp(
          "https://adultdvd.bandcamp.com/album/next-day-shipping",
          "_blank"
        )
      }
      onPointerOver={handlePointerOver("preorder")}
      onPointerOut={handlePointerOut}
    >
      <planeGeometry attach="geometry" args={[2.5, 1.8]} />
      <meshBasicMaterial attach="material" transparent opacity={0} />
    </mesh>
  );

  const TourMesh = () => (
    <mesh
      position={[0.74, -1.6, 2]}
      rotation={[0, 2.08, 0]}
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

  const SignUpMesh = () => (
    <mesh
      position={[2.15, -1.4, -2.1]}
      rotation={[0, 1.3, 0]}
      onPointerDown={handlePointerDown}
      onPointerUp={() => {
        handlePointerUp("signup");
        document.body.style.cursor = "default";
      }}
      onPointerOver={handlePointerOver("signup")}
      onPointerOut={handlePointerOut}
    >
      <planeGeometry attach="geometry" args={[1.16, 1.2]} />
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
        data-nosnippet
        style={{ width: "100%", height: "100vh", position: "relative" }}
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
                  ? "min(max(16px, 1.8vmax), 30px)"
                  : "min(max(23px, 2.4vmax), 40px)",
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
              }}
            />
          </AnimatePresence>
        )}
        <div style={{ opacity: ready ? 1 : 0 }}>
          <p className="date">OUT 16/09/2024</p>
          <Canvas
            shadows
            style={{ position: "absolute", top: 0, left: 0 }}
            camera={{
              position: [6, 0.1, 1.7],
              fov: 25,
            }}
          >
            <ambientLight intensity={0.4} />
            <MainLight />
            <SecondaryLight />
            <Model url={glbUrl} setLoading={setLoading} />

            <Text
              scale={0.25}
              color="#eddda8" // Change color based on hover state
              position={[1.06, -0.9, -0.7]}
              rotation={[0, 1.57, 0]}
              fillOpacity={1}
              fontWeight="bold"
              font="/fonts/Sequel100Black-75.ttf"
              strokeOpacity={hovered === "stream" ? 1 : 0}
              strokeColor="white"
              strokeWidth={hovered === "stream" ? 0.046 : 0}
            >
              <OrangeTexture></OrangeTexture>
              STREAM
            </Text>
            <StreamMesh />

            <Text
              scale={0.22}
              color="#eddda8" // Change color based on hover state
              position={[2.152, -1.3, -2.1]}
              rotation={[0, 1.3, 0]}
              fillOpacity={1}
              fontWeight="bold"
              font="/fonts/Sequel100Black-75.ttf"
              strokeOpacity={hovered === "signup" ? 1 : 0}
              strokeColor="white"
              strokeWidth={hovered === "signup" ? 0.046 : 0}
            >
              <OrangeTexture></OrangeTexture>
              SIGN
            </Text>
            <Text
              scale={0.22}
              color="#eddda8" // Change color based on hover state
              position={[2.152, -1.6, -2.1]}
              rotation={[0, 1.3, 0]}
              fillOpacity={1}
              fontWeight="bold"
              font="/fonts/Sequel100Black-75.ttf"
              strokeOpacity={hovered === "signup" ? 1 : 0}
              strokeColor="white"
              strokeWidth={hovered === "signup" ? 0.046 : 0}
            >
              <OrangeTexture></OrangeTexture>
              UP
            </Text>
            <SignUpMesh />
            <Text
              scale={0.22}
              color="#eddda8" // Change color based on hover state
              position={[0.75, -1.6, 2]}
              rotation={[0, 2.08, 0]}
              fillOpacity={1}
              fontWeight="bold"
              font="/fonts/Sequel100Black-75.ttf"
              strokeOpacity={hovered === "tour" ? 1 : 0}
              strokeColor="white"
              strokeWidth={hovered === "tour" ? 0.046 : 0}
            >
              <OrangeTexture></OrangeTexture>
              TOUR
            </Text>
            <TourMesh />
            <Text
              scale={0.25}
              color="#eddda8" // Change color based on hover state
              position={[-0.38, -0.9, 1.58]}
              rotation={[0, 1.559, 0]}
              fillOpacity={1}
              fontWeight="bold"
              font="/fonts/Sequel100Black-75.ttf"
              strokeOpacity={hovered === "preorder" ? 1 : 0}
              strokeColor="white"
              strokeWidth={hovered === "preorder" ? 0.046 : 0}
            >
              <OrangeTexture></OrangeTexture>
              PREORDER
            </Text>

            <ProrderMesh />

            <CameraControlsAndResponsive
              setReady={setReady}
              autoRotate={autoRotate}
            />

            <EffectComposer>
              <BrightnessContrast brightness={0.04} contrast={0.2} />
              <Bloom
                blendFunction={BlendFunction.EXCLUSION}
                intensity={5}
                threshold={0.1}
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
