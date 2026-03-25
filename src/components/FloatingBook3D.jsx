import { useRef, useEffect } from "react";
import { Canvas, useFrame, useLoader } from "@react-three/fiber";
import { TextureLoader } from "three";

/* ── 3D Book Mesh ─────────────────────────────────────── */
const BookMesh = ({ scrollRef }) => {
  const meshRef = useRef();
  const texture = useLoader(TextureLoader, "/images/ghibli_book.png");

  useFrame((state, delta) => {
    if (!meshRef.current) return;
    const sp = scrollRef.current; // read ref — no re-render

    // Auto-rotation
    meshRef.current.rotation.y += delta * 0.4;
    meshRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.5) * 0.15;

    // Scroll-driven position (top-right → bottom-left)
    const targetX = 3.5 - sp * 7;
    const targetY = 1.5 - sp * 3;
    const targetZ = -1 + sp * 0.5;

    meshRef.current.position.x += (targetX - meshRef.current.position.x) * 0.05;
    meshRef.current.position.y += (targetY - meshRef.current.position.y) * 0.05;
    meshRef.current.position.z += (targetZ - meshRef.current.position.z) * 0.05;

    // Floating bob
    meshRef.current.position.y +=
      Math.sin(state.clock.elapsedTime * 1.2) * 0.01;

    // Pulse scale
    const scale = 0.95 + Math.sin(state.clock.elapsedTime * 0.8) * 0.03;
    meshRef.current.scale.setScalar(scale);
  });

  return (
    <mesh ref={meshRef} position={[3.5, 1.5, -1]}>
      <boxGeometry args={[1.4, 1.8, 0.18]} />
      <meshStandardMaterial map={texture} roughness={0.4} metalness={0.1} />
    </mesh>
  );
};

/* ── Floating particles — NEVER re-renders ─────────────── */
const Particles = () => {
  const points = useRef();
  const count = 60;

  const positions = new Float32Array(count * 3);
  for (let i = 0; i < count; i++) {
    positions[i * 3] = (Math.random() - 0.5) * 12;
    positions[i * 3 + 1] = (Math.random() - 0.5) * 8;
    positions[i * 3 + 2] = (Math.random() - 0.5) * 4 - 2;
  }

  useFrame((state, delta) => {
    if (points.current) {
      // Use delta (frame-rate independent) — completely isolated from scroll
      points.current.rotation.y += delta * 0.02;
    }
  });

  return (
    <points ref={points}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial
        color="#a855f7"
        size={0.04}
        transparent
        opacity={0.6}
        sizeAttenuation
      />
    </points>
  );
};



/* ── Scene — stable component, never re-renders ────────── */
const Scene = ({ scrollRef }) => (
  <>
    <ambientLight intensity={0.8} />
    <directionalLight position={[5, 5, 5]} intensity={1.2} color="#ffffff" />
    <pointLight position={[-3, 2, 3]} intensity={0.6} color="#a855f7" />
    <pointLight position={[3, -2, 2]} intensity={0.4} color="#7c3aed" />
    <BookMesh scrollRef={scrollRef} />
    <Particles />
  </>
);

/* ── Main Component ───────────────────────────────────── */
const FloatingBook3D = () => {
  // ✅ Use REF — updates without triggering ANY React re-render
  const scrollRef = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      const maxScroll =
        document.documentElement.scrollHeight - window.innerHeight;
      if (maxScroll > 0) {
        scrollRef.current = window.scrollY / maxScroll;
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div
      style={{ position: "fixed", inset: 0, zIndex: 5, pointerEvents: "none" }}
    >
      <Canvas
        camera={{ position: [0, 0, 6], fov: 50 }}
        style={{ background: "transparent" }}
        gl={{ alpha: true, antialias: true }}
      >
        <Scene scrollRef={scrollRef} />
      </Canvas>
    </div>
  );
};

export default FloatingBook3D;
