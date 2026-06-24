import { useRef, useState, useEffect } from "react";
import { Canvas, useThree, useFrame } from "@react-three/fiber";
import { OrbitControls, useGLTF, Loader } from "@react-three/drei";

import {
  Color,
  MeshPhysicalMaterial,
  Vector2,
  Mesh,
  Matrix4,
  Float32BufferAttribute,
  Uint32BufferAttribute,
  Vector3,
} from "three";
import { mergeGeometries } from "three/examples/jsm/utils/BufferGeometryUtils.js";
import "./styles/menu.css";
import {
  EffectComposer,
  BrightnessContrast,
} from "@react-three/postprocessing";
import { LoadingText } from "./components/LoadingText";

function makePinkMaterial(normalMap) {
  const mat = new MeshPhysicalMaterial({
    color: new Color("#f79e9e"),
    normalMap: normalMap || null,
    normalScale: new Vector2(3, 3),
    roughness: 1,
    metalness: 1.0,
    transparent: true,
    opacity: 0.7,
    envMapIntensity: 0.0,
  });

  mat.onBeforeCompile = (shader) => {
    shader.fragmentShader = shader.fragmentShader.replace(
      "#include <dithering_fragment>",
      `#include <dithering_fragment>
      float nDotV = abs(dot(normalize(vNormal), normalize(-vViewPosition)));
      float edge = pow(1.0 - nDotV, 1.4);
      // Edge color = background blue (~#fffff), floats 0-1
      gl_FragColor.rgb = mix(gl_FragColor.rgb, vec3(0.373, 0.659, 0.878), edge * 0.7);
      // Lighter (brighter) areas more transparent, darker areas more opaque
      float brightness = dot(gl_FragColor.rgb, vec3(0.299, 0.587, 0.114));
      float lightAlpha = mix(gl_FragColor.a * 1.4, gl_FragColor.a * 0.25, clamp(brightness * 1.5, 0.0, 1.0));
      // Edges always opaque for the outline
      gl_FragColor.a = mix(clamp(lightAlpha, 0.0, 1.0), 1.0, edge * 0.8);

      // Deepen only the already-dark (shadowed) areas — lit areas untouched
      gl_FragColor.rgb *= mix(0.55, 1.0, clamp(brightness * 1.5, 0.0, 1.0));

      // --- Dry "chalk / drawn artwork" look ---
      // 1) Gentle posterize: break smooth gradients into flat tones
      float levels = 22.0;
      gl_FragColor.rgb = floor(gl_FragColor.rgb * levels + 0.5) / levels;
      // 2) Paper/chalk grain (static screen-space tooth)
      float grain = fract(sin(dot(gl_FragCoord.xy, vec2(12.9898, 78.233))) * 43758.5453);
      gl_FragColor.rgb *= 0.93 + 0.11 * grain;`,
    );
  };
  mat.customProgramCacheKey = () => "pink-chalk-restore-v1";
  return mat;
}

function Model({ url, setLoading }) {
  const { scene } = useGLTF(url, true);
  const [merged, setMerged] = useState(null);

  useEffect(() => {
    if (!scene) return;

    // Bake every mesh into one merged geometry so the cluster renders as a
    // SINGLE object — nothing to depth-sort between, so transparent pieces
    // never pop in/out during rotation.
    scene.updateWorldMatrix(true, true);
    const sceneInverse = new Matrix4().copy(scene.matrixWorld).invert();

    const geometries = [];
    const materials = [];

    scene.traverse((child) => {
      if (child.isMesh && child.geometry) {
        // Keep geometry indexed — toNonIndexed() explodes memory on big meshes
        let geom = child.geometry.clone();

        // Reduce to the attribute set shared by every mesh so they can merge
        for (const name of Object.keys(geom.attributes)) {
          if (name !== "position" && name !== "normal" && name !== "uv") {
            geom.deleteAttribute(name);
          }
        }
        if (!geom.attributes.position) return;
        const count = geom.attributes.position.count;

        // Every geometry must have the SAME attribute set to merge:
        // position + normal + uv, all indexed.
        if (!geom.attributes.uv) {
          geom.setAttribute(
            "uv",
            new Float32BufferAttribute(new Float32Array(count * 2), 2),
          );
        }
        if (!geom.index) {
          const idx = new Uint32Array(count);
          for (let i = 0; i < count; i++) idx[i] = i;
          geom.setIndex(new Uint32BufferAttribute(idx, 1));
        }
        if (!geom.attributes.normal) {
          geom.computeVertexNormals();
        }

        const rel = new Matrix4()
          .copy(sceneInverse)
          .multiply(child.matrixWorld);
        geom.applyMatrix4(rel);

        geometries.push(geom);
        materials.push(makePinkMaterial(child.material.normalMap));
      }
    });

    if (geometries.length === 0) return;

    // useGroups keeps one material per original mesh within the single object
    const mergedGeo = mergeGeometries(geometries, true);
    if (!mergedGeo) return;
    // Recenter so the cluster's bounding-box center sits at the origin —
    // keeps it centered in the viewport and orbiting around itself.
    mergedGeo.center();
    const mesh = new Mesh(mergedGeo, materials);
    mesh.frustumCulled = false;

    setMerged(mesh);
    setLoading(false);
  }, [scene, setLoading]);

  if (!merged) return null;
  return <primitive object={merged} scale={1} position={[0, 0, 0]} />;
}

// Both lights are repositioned every frame relative to the camera and aim at
// the model centre (origin). They travel with the view, so the illumination
// stays locked to what the viewer sees as the model rotates.
const ViewLockedLights = () => {
  const { camera } = useThree();
  const keyRef = useRef();
  const fillRef = useRef();
  // Camera-relative offsets: key from upper-left, fill softer from lower-right
  const keyOffset = useRef(new Vector3(-4, 5, 1)).current;
  const fillOffset = useRef(new Vector3(5, -3, 1)).current;
  const tmp = useRef(new Vector3()).current;

  useFrame(() => {
    if (keyRef.current) {
      tmp
        .copy(keyOffset)
        .applyQuaternion(camera.quaternion)
        .add(camera.position);
      keyRef.current.position.copy(tmp);
    }
    if (fillRef.current) {
      tmp
        .copy(fillOffset)
        .applyQuaternion(camera.quaternion)
        .add(camera.position);
      fillRef.current.position.copy(tmp);
    }
  });

  return (
    <>
      <directionalLight ref={keyRef} intensity={7} color="#fbfbfb" />
      <directionalLight ref={fillRef} intensity={5} color="#ffffff" />
    </>
  );
};

const CameraControlsAndResponsive = ({ setReady, autoRotate }) => {
  const { camera, invalidate } = useThree();
  const controlsRef = useRef();

  useEffect(() => {
    if (controlsRef.current) {
      controlsRef.current.autoRotate = autoRotate;
    }
  }, [autoRotate]);

  useEffect(() => {
    const handleResize = () => {
      const aspect = window.innerWidth / window.innerHeight;
      const zoomFactor = Math.log(aspect + 1) * 0.5;
      const isMobile = window.innerWidth < 768;
      camera.zoom = isMobile ? zoomFactor * 1.4 : zoomFactor;
      camera.updateProjectionMatrix();
      setReady(true);
      // In demand frameloop the canvas is idle; force a live re-render each
      // resize event so the model follows the window instead of snapping after.
      invalidate();
    };

    window.addEventListener("resize", handleResize);
    handleResize();
    return () => window.removeEventListener("resize", handleResize);
  }, [camera, invalidate, setReady]);

  return (
    <OrbitControls
      ref={controlsRef}
      enableZoom={true}
      enablePan={true}
      enableRotate={true}
      zoomSpeed={0.8}
      rotateSpeed={0.5}
      dampingFactor={0.15}
      minPolarAngle={Math.PI / 40}
      maxPolarAngle={Math.PI / 2}
      minDistance={4}
      maxDistance={6}
      autoRotate={autoRotate}
      autoRotateSpeed={0.7}
    />
  );
};

export const ThreeScene = ({ autoRotate }) => {
  const [loading, setLoading] = useState(true);
  const [ready, setReady] = useState(false);

  const glbUrl = "/album-opt.glb";

  useEffect(() => {
    setLoading(true);
  }, [glbUrl]);

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

        {/* Color Balance applied to the object only (not the background).
            5th number in each row = additive shift: R +red/-cyan,
            G +green/-magenta, B +blue/-yellow. Tweak freely, no cache key. */}
        <svg width="0" height="0" style={{ position: "absolute" }}>
          <filter id="colorBalance" colorInterpolationFilters="sRGB">
            <feColorMatrix
              type="matrix"
              values="1 0 0 0  0.10
                      0 1 0 0 -0.20
                      0 0 1 0  0.00
                      0 0 0 1  0"
            />
          </filter>
        </svg>

        <div style={{ opacity: ready ? 1 : 0 }}>
          <Canvas
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              // Canvas is taller than the viewport by the same amount it gets
              // lifted (8vh) so that after the upward shift it still reaches the
              // bottom of the page — otherwise the model's lower portion renders
              // into a dead strip below the canvas and gets clipped.
              width: "100%",
              height: "108vh",
              // X: shift right by half the sidebar width so the model is centred
              // in the area right of the black sidebar.
              // Y: negative value lifts the model up the page.
              transform: "translate(calc(var(--bar-width) / 2), -8vh)",
              filter: "contrast(150%) url(#colorBalance)",
            }}
            camera={{ position: [0, 0, 6], fov: 24 }}
            gl={{ alpha: true, antialias: true }}
            frameloop={autoRotate ? "always" : "demand"}
          >
            <ambientLight intensity={0} color="#ffffff" />
            <ViewLockedLights />
            <Model url={glbUrl} setLoading={setLoading} />
            <CameraControlsAndResponsive
              setReady={setReady}
              autoRotate={autoRotate}
            />
            <EffectComposer>
              <BrightnessContrast brightness={-0.02} contrast={0.55} />
            </EffectComposer>
          </Canvas>
        </div>
        <Loader />
      </div>
    </>
  );
};

export default ThreeScene;
