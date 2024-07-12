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
import loadingGif from "./images/loadingvinyl.gif";
import orangeNoise from "./images/border90.jpg";
import rotate from "./images/rotate.png";
import pause from "./images/pause.png";
import "./styles/menu.css";
import { HomePageSocials } from "./components/HomePageSocials";
import { SoftShadows } from "@react-three/drei";

function OrangeTexture() {
  const t = useTexture(orangeNoise);
  return <meshBasicMaterial map={t}></meshBasicMaterial>;
}

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

const MainLight = () => {
  const lightRef = useRef();
  const { camera } = useThree();

  useFrame(() => {
    if (lightRef.current && camera) {
      const lightOffset = new Vector3(4.1, 2, -0).applyQuaternion(
        camera.quaternion
      );
      lightRef.current.position.copy(camera.position).add(lightOffset);
    }
  });

  return (
    <directionalLight
      ref={lightRef}
      intensity={2}
      castShadow
      shadow-camera-near={0.5}
      shadow-camera-far={50}
      shadow-bias={-0.001}
      color={new Color("#ffffff")}
      shadow-mapSize={2048}
      //shadow-bias={-0.001}
    >
      <orthographicCamera
        attach="shadow-camera"
        args={[-8.5, 8.5, 8.5, -8.5, 0.1, 20]}
      />
      <SoftShadows size={35} />
    </directionalLight>
  );
};

const SecondaryLight = () => {
  const secondaryLightRef = useRef();
  const { camera } = useThree();

  useFrame(() => {
    if (secondaryLightRef.current && camera) {
      const lightOffset = new Vector3(-1, 1, 3).applyQuaternion(
        camera.quaternion
      );
      secondaryLightRef.current.position.copy(camera.position).add(lightOffset);
    }
  });

  return (
    <directionalLight
      ref={secondaryLightRef}
      intensity={0.55}
      castShadow
      shadow-camera-near={0.5}
      shadow-camera-far={50}
      color={new Color("#fae7d2")}
      shadow-mapSize={2048}
      shadow-bias={-0.01}
    />
  );
};

const CameraControlsAndResponsive = ({ autoRotate }) => {
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

      // Use a logarithmic function to adjust the zoom level
      const zoomFactor = Math.log(aspect + 1) * 0.363; // Adjust the multiplier to your preference

      camera.zoom = zoomFactor;

      camera.updateProjectionMatrix();
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

const ThreeScene = ({ glbUrl }) => {
  const [loading, setLoading] = useState(true);
  const [autoRotate, setAutoRotate] = useState(false);
  const [hovered, setHovered] = useState(false); // Add this state
  const [touchStartTime, setTouchStartTime] = useState(null);
  const maxTouchDuration = 300; // Maximum duration for a short touch in ms

  const handleToggleAutoRotate = () => {
    setAutoRotate(!autoRotate);
  };

  useEffect(() => {
    setLoading(true);
  }, [glbUrl]);

  useEffect(() => {
    document.body.style.cursor = hovered ? "pointer" : "auto"; // Update cursor style based on hover state
  }, [hovered]);

  const handlePointerOver = () => setHovered(true);
  const handlePointerOut = () => setHovered(false);

  const handlePointerDown = () => setTouchStartTime(Date.now());

  const handlePointerUp = (url) => {
    const touchEndTime = Date.now();
    const touchDuration = touchEndTime - touchStartTime;

    if (touchDuration < maxTouchDuration) {
      window.open(url, "_blank");
    }
  };

  const imageVariants = {
    initial: { transform: "translate(0px, 0px)", opacity: 0 },
    animate: {
      opacity: 0.9,
      transition: { duration: 0.08 },
    },
    exit: {
      transform: "translate(-6px, -5px)",
      width: "50px",
      opacity: 0.4,
      transition: { duration: 0.08 },
    },
  };

  const StreamMesh = () => {
    return (
      <mesh
        position={[1.02, -1, -0.7]}
        rotation={[0, 1.59, 0]}
        onPointerDown={handlePointerDown}
        onPointerUp={() => handlePointerUp("/listen/doomsday_prepper")}
        onPointerOver={handlePointerOver}
        onPointerOut={handlePointerOut}
      >
        <planeGeometry attach="geometry" args={[1.5, 1.97]} />
        <meshBasicMaterial attach="material" transparent opacity={0} />
      </mesh>
    );
  };

  const ProrderMesh = () => {
    return (
      <mesh
        position={[-0.394, -1.1, 1.6]}
        rotation={[0, 1.57, 0]}
        onPointerDown={handlePointerDown}
        onPointerUp={() =>
          handlePointerUp("https://adultdvd.bandcamp.com/merch")
        }
        onPointerOver={handlePointerOver}
        onPointerOut={handlePointerOut}
      >
        <planeGeometry attach="geometry" args={[2.5, 1.8]} />
        <meshBasicMaterial attach="material" transparent opacity={0} />
      </mesh>
    );
  };

  const TourMesh = () => {
    return (
      <mesh
        position={[0.74, -1.6, 2]}
        rotation={[0, 2.08, 0]}
        onPointerDown={handlePointerDown}
        onPointerUp={() => handlePointerUp("/tour")}
        onPointerOver={handlePointerOver}
        onPointerOut={handlePointerOut}
      >
        <planeGeometry attach="geometry" args={[1, 0.8]} />
        <meshBasicMaterial attach="material" transparent opacity={0} />
      </mesh>
    );
  };

  const SignUpMesh = () => {
    return (
      <mesh
        position={[2.15, -1.4, -2.1]}
        rotation={[0, 1.3, 0]}
        onPointerDown={handlePointerDown}
        onPointerUp={() => handlePointerUp("https://mailinglist.c")}
        onPointerOver={handlePointerOver}
        onPointerOut={handlePointerOut}
      >
        <planeGeometry attach="geometry" args={[1.16, 1.2]} />
        <meshBasicMaterial attach="material" transparent opacity={0} />
      </mesh>
    );
  };

  return (
    <>
      <div style={{ width: "100%", height: "100vh", position: "relative" }}>
        {loading && (
          <div className="loading-container">
            <img className="loading-image" src={loadingGif} alt="Loading" />
            <p className="loading-text">
              Loading <span className="dot dot1">.</span>
              <span className="dot dot2">.</span>
              <span className="dot dot3">.</span>
            </p>
          </div>
        )}

        {!loading && (
          <AnimatePresence mode="wait">
            <motion.img
              key={autoRotate ? "pause" : "rotate"}
              onClick={handleToggleAutoRotate}
              src={autoRotate ? pause : rotate}
              variants={imageVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              style={{
                width: autoRotate ? "48px" : "40px",
                bottom: autoRotate ? 16 : 14,
                left: autoRotate ? 2 : 14,
                position: "fixed",
                opacity: 0.9,
                cursor: "pointer",
                zIndex: 200,
              }}
            />
          </AnimatePresence>
        )}

        <Canvas
          shadows
          style={{ position: "absolute", top: 0, left: 0 }}
          camera={{
            position: [6, 0.1, 1.7],
            fov: 25,
          }}
        >
          <ambientLight intensity={0.6} />
          <MainLight />
          <SecondaryLight />
          <Model url={glbUrl} setLoading={setLoading} />

          <Text
            scale={0.25}
            color="#de6d37"
            position={[-0.38, -0.9, 1.58]}
            rotation={[0, 1.559, 0]}
            fillOpacity={1}
            fontWeight="bold"
            font="/fonts/Sequel100Black-75.ttf"
          >
            <OrangeTexture></OrangeTexture>
            PREORDER
          </Text>
          <ProrderMesh />

          <Text
            scale={0.25}
            color="#de6d37"
            position={[1.06, -0.9, -0.7]}
            rotation={[0, 1.57, 0]}
            fillOpacity={1}
            fontWeight="bold"
            font="/fonts/Sequel100Black-75.ttf"
          >
            <OrangeTexture></OrangeTexture>
            STREAM
          </Text>
          <StreamMesh />
          <Text
            scale={0.22}
            color="#de6d37"
            position={[0.75, -1.6, 2]}
            rotation={[0, 2.08, 0]}
            fillOpacity={1}
            fontWeight="bold"
            font="/fonts/Sequel100Black-75.ttf"
          >
            <OrangeTexture></OrangeTexture>
            TOUR
          </Text>
          <TourMesh />

          <Text
            scale={0.22}
            color="#de6d37"
            position={[2.152, -1.3, -2.1]}
            rotation={[0, 1.3, 0]}
            fillOpacity={1}
            fontWeight="bold"
            font="/fonts/Sequel100Black-75.ttf"
          >
            <OrangeTexture></OrangeTexture>
            SIGN
          </Text>
          <Text
            scale={0.22}
            color="#de6d37"
            position={[2.152, -1.6, -2.1]}
            rotation={[0, 1.3, 0]}
            fillOpacity={1}
            fontWeight="bold"
            font="/fonts/Sequel100Black-75.ttf"
          >
            <OrangeTexture></OrangeTexture>
            UP
          </Text>
          <SignUpMesh />

          <CameraControlsAndResponsive autoRotate={autoRotate} />
        </Canvas>
        <Loader />
        <HomePageSocials />
      </div>
    </>
  );
};

export default ThreeScene;
