import React, { useRef, useState, useEffect } from "react";
import { AnimatePresence, motion, transform } from "framer-motion";
import { Canvas, useThree, useFrame } from "@react-three/fiber";
import {
  OrbitControls,
  useGLTF,
  Text,
  useTexture,
  Loader,
} from "@react-three/drei";
import { Vector3, Color, Raycaster, Vector2 } from "three";
import useWindowDimensions from "./Hooks/useWindowDimensions";
import loadingGif from "./images/loadingcd.gif";
import orangeNoise from "./images/border90.jpg";
import rotate from "./images/rotate.png";
import pause from "./images/pause.png";

function OrangeTexture() {
  const t = useTexture(orangeNoise);
  return <meshBasicMaterial map={t}></meshBasicMaterial>;
}

function Model({ url, setLoading }) {
  const { scene } = useGLTF(url);
  const { width } = useWindowDimensions();

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

  return (
    <primitive object={scene} position={[0, width > 500 ? -1.2 : -1.9, -0.8]} />
  );
}

const MainLight = () => {
  const lightRef = useRef();
  const { camera } = useThree();

  useFrame(() => {
    if (lightRef.current && camera) {
      const lightOffset = new Vector3(6, 1, 1).applyQuaternion(
        camera.quaternion
      );
      lightRef.current.position.copy(camera.position).add(lightOffset);
    }
  });

  return (
    <directionalLight
      ref={lightRef}
      intensity={3}
      castShadow
      shadow-mapSize-width={1024}
      shadow-mapSize-height={1024}
      shadow-bias={-0.001}
      color={new Color("#fcc46f")}
    />
  );
};

const SecondaryLight = () => {
  const secondaryLightRef = useRef();
  const { camera } = useThree();

  useFrame(() => {
    if (secondaryLightRef.current && camera) {
      const lightOffset = new Vector3(-3, 2, -2).applyQuaternion(
        camera.quaternion
      );
      secondaryLightRef.current.position.copy(camera.position).add(lightOffset);
    }
  });

  return (
    <directionalLight
      ref={secondaryLightRef}
      intensity={0.2}
      castShadow
      shadow-mapSize-width={1024}
      shadow-mapSize-height={1024}
      shadow-bias={-0.001}
      color={new Color("#ffffff")}
    />
  );
};

const TopDownLight = () => {
  return (
    <directionalLight
      intensity={0.5}
      position={[0, 10, 0]}
      castShadow
      shadow-mapSize-width={1024}
      shadow-mapSize-height={1024}
      shadow-bias={-0.001}
      color={new Color("#ffac30")}
    />
  );
};

const CameraController = ({ defaultCameraTarget, autoRotate }) => {
  const { camera } = useThree();
  const controlsRef = useRef();

  useEffect(() => {
    if (controlsRef.current) {
      controlsRef.current.autoRotate = autoRotate;
    }
  }, [autoRotate]);

  return (
    <OrbitControls
      ref={controlsRef}
      target={defaultCameraTarget}
      enableZoom={true}
      enablePan={false}
      enableRotate={true}
      zoomSpeed={0.8}
      rotateSpeed={0.5}
      dampingFactor={0.15}
      minPolarAngle={Math.PI / 40} // Prevent camera from going too high
      maxPolarAngle={Math.PI / 1.75} // Prevent camera from going too low
      minDistance={4}
      maxDistance={14}
      autoRotate={autoRotate}
    />
  );
};

const ThreeScene = ({ glbUrl }) => {
  const { width, height } = useWindowDimensions();
  const [loading, setLoading] = useState(true);
  const [hovered, setHovered] = useState(false);
  const [hovered2, setHovered2] = useState(false);
  const [autoRotate, setAutoRotate] = useState(false); // State for autoRotate

  const handleToggleAutoRotate = () => {
    setAutoRotate(!autoRotate); // Toggle autoRotate state
  };

  const x = (1 / width) * 10000;
  const viewPointDistance = Math.min(Math.max(parseFloat(x), 5), 11.6);
  const defaultCameraPosition = new Vector3(viewPointDistance, 1, 2);
  const defaultCameraTarget = new Vector3(0, 0, 0);

  const textRef = useRef();
  const raycaster = new Raycaster();
  const mouse = new Vector2();

  const handleTextClick = (event) => {
    event.preventDefault();
    const url = hovered
      ? "https://your-preorder-link.com"
      : hovered2
      ? "/listen/doomsday_prepper"
      : "";
    if (url) {
      if (hovered) {
        window.open(url, "_blank"); // Open in new window/tab
      } else {
        window.location.href = url; // Open in same window/tab
      }
    }
  };

  const handleTextHover = (event) => {
    event.stopPropagation();
    setHovered(true);
    document.body.style.cursor = "pointer";
  };

  const handleTextUnhover = () => {
    setHovered(false);
    document.body.style.cursor = "default";
  };

  const handleTextHover2 = (event) => {
    event.stopPropagation();
    setHovered2(true);
    document.body.style.cursor = "pointer";
  };

  const handleTextUnhover2 = () => {
    setHovered2(false);
    document.body.style.cursor = "default";
  };

  useEffect(() => {
    setLoading(true);
  }, [glbUrl]);

  const onMouseMove = (event) => {
    event.preventDefault();

    mouse.x = (event.clientX / width) * 2 - 1;
    mouse.y = -(event.clientY / height) * 2 + 1;

    if (
      textRef.current &&
      textRef.current.parent &&
      textRef.current.parent.parent
    ) {
      const camera = textRef.current.parent.parent.children[0];

      if (camera) {
        raycaster.setFromCamera(mouse, camera);
        const intersects = raycaster.intersectObject(textRef.current);

        if (intersects.length > 0) {
          setHovered(true);
        } else {
          setHovered(false);
        }
      }
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

  return (
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
        <p
          className="three-text"
          style={{
            fontSize: "min(max(5.3vmax, 5.3vmax), 62px)",
            position: "fixed",
            left: "13px",
            top: "3px",
            marginLeft: "min(max(0.7vmax, 0.7vmax),11px)",
          }}
        >
          NEXT DAY SHIPPING
          <br />
          COMING SOON
          <br />
          <p
            style={{
              fontSize: "min(max(4vmax, 4vmax), 50px)",
            }}
          >
            06/09/2024
          </p>
        </p>
      )}

      <Canvas
        shadows
        style={{ position: "absolute", top: 0, left: 0 }}
        camera={{
          position: defaultCameraPosition.toArray(),
          target: defaultCameraTarget.toArray(),
          fov: width < 600 ? 75 : 55, // Adjust FOV dynamically based on screen width
        }}
        onClick={handleTextClick}
        onMouseMove={onMouseMove}
      >
        <ambientLight intensity={0.5} />
        <MainLight />
        <SecondaryLight />
        <TopDownLight />
        <Model url={glbUrl} setLoading={setLoading} />

        <Text
          ref={textRef}
          scale={0.25}
          color={hovered ? "#de6d37" : "#fca362"}
          position={[-0.38, width > 500 ? -1 : -1.7, 1.45]}
          rotation={[0, 1.559, 0]}
          fillOpacity={1}
          onPointerOver={handleTextHover}
          onPointerOut={handleTextUnhover}
          fontWeight="bold"
          font="/fonts/Sequel100Black-75.ttf"
        >
          <OrangeTexture></OrangeTexture>
          PREORDER
        </Text>
        <Text
          ref={textRef}
          scale={0.25}
          color={hovered2 ? "#de6d37" : "#fca362"}
          position={[1.03, width > 500 ? -1 : -1.7, -0.8]}
          rotation={[0, 1.59, 0]}
          fillOpacity={1}
          onPointerOver={handleTextHover2}
          onPointerOut={handleTextUnhover2}
          fontWeight="bold"
          font="/fonts/Sequel100Black-75.ttf"
        >
          <OrangeTexture></OrangeTexture>
          STREAM
        </Text>

        <CameraController
          defaultCameraTarget={defaultCameraTarget}
          autoRotate={autoRotate}
        />
      </Canvas>
      <Loader />
      {!loading && (
        <AnimatePresence mode="wait">
          <motion.img
            key={autoRotate ? "pause" : "rotate"}
            className="rotate-icon"
            onClick={handleToggleAutoRotate}
            src={autoRotate ? pause : rotate}
            variants={imageVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            style={{
              position: "fixed",
              width: autoRotate ? "68px" : "60px",
              bottom: autoRotate ? 18 : 16,
              right: autoRotate ? 4 : 16,
              opacity: 0.9,
              cursor: "pointer",
            }}
          />
        </AnimatePresence>
      )}
    </div>
  );
};

export default ThreeScene;
