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

const setupThreeJS = () => {
  const canvasRef = useRef(null);
  useEffect(() => {
    if (canvasRef.current) {
      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(
        75,
        window.innerWidth / window.innerHeight,
        0.1,
        1000
      );
      const renderer = new THREE.WebGLRenderer({ canvas: canvasRef.current });

      const geometry = new THREE.BoxGeometry();
      const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
      const cube = new THREE.Mesh(geometry, material);
      scene.add(cube);

      camera.position.z = 5;

      const handleResize = () => {
        const { innerWidth, innerHeight } = window;
        camera.aspect = innerWidth / innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(innerWidth, innerHeight);
      };

      window.addEventListener("resize", handleResize);
      handleResize(); // Initialize renderer size

      const animate = () => {
        requestAnimationFrame(animate);
        cube.rotation.x += 0.021;
        cube.rotation.y += 0.011;
        cube.rotation.z += 0.001;
        renderer.render(scene, camera);
      };

      animate();

      return () => {
        // Cleanup event listener
        window.removeEventListener("resize", handleResize);
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
