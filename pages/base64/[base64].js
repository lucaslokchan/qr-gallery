import { useRouter } from "next/router";
import React, { useEffect, useRef } from "react";
import * as THREE from "three";

let base64Code; // Global variable for base64Code
let decodedCode; // Global variable for decodedCode

function Base64DecodeUrl(base64) {
  if (base64) {
    const decodedCode = Buffer.from(base64, "base64").toString("utf-8");
    console.log("base64: " + typeof base64);
    console.log("decodedCode: " + decodedCode);
    return decodedCode;
  }
  return null; // or any default value you prefer
}

const setupCanvas = (canvasRef, camera, cube) => {
  const renderer = new THREE.WebGLRenderer({ canvas: canvasRef.current });

  const handleResize = () => {
    const { innerWidth, innerHeight } = window;
    camera.aspect = innerWidth / innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(innerWidth, innerHeight);
  };

  if (typeof window !== "undefined") {
    window.addEventListener("resize", handleResize);
    handleResize(); // Initialize renderer size
  }

  return () => {
    // Cleanup event listener
    if (typeof window !== "undefined") {
      window.removeEventListener("resize", handleResize);
    }
  };
};

const create3DModel = (scene, camera) => {
  const geometry = new THREE.BoxGeometry();
  const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
  const cube = new THREE.Mesh(geometry, material);
  scene.add(cube);

  return cube; // Return the cube object
};

const setupThreeJS = () => {
  const canvasRef = useRef(null);
  const camera = new THREE.PerspectiveCamera(
    75,
    typeof window !== "undefined" ? window.innerWidth / window.innerHeight : 1,
    0.1,
    1000
  );
  let cube; // Declare cube variable outside of create3DModel

  useEffect(() => {
    if (canvasRef.current) {
      const scene = new THREE.Scene();

      const cleanupCanvas = setupCanvas(canvasRef, camera, cube); // Set up canvas and resize handling
      cube = create3DModel(scene, camera); // Assign the cube object to a variable

      camera.position.z = 5;

      const animate = (cube) => {
        // Pass cube as a parameter to the animate function
        requestAnimationFrame(() => animate(cube));
        cube.rotation.x += 0.021;
        cube.rotation.y += 0.011;
        cube.rotation.z += 0.001;
        renderer.render(scene, camera);
      };

      const renderer = new THREE.WebGLRenderer({ canvas: canvasRef.current });
      animate(cube); // Pass the cube object to the animate function

      return () => {
        // Cleanup
        cleanupCanvas();
        scene.remove(cube);
      };
    }
  }, []);

  return <canvas ref={canvasRef} />;
};

export default function Page() {
  const router = useRouter();
  base64Code = router.query.base64;
  decodedCode = Base64DecodeUrl(base64Code);
  
  return setupThreeJS();
}
