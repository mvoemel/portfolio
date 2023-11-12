import { useRef, useCallback, useMemo, Suspense } from "react";
import { Canvas /*, useFrame*/ } from "@react-three/fiber";
import { Points, PointMaterial, Preload } from "@react-three/drei";

// TODO: fix bug using "ref": in useFrame ref.current.array throws exception
/*
https://codesandbox.io/s/point-forked-x3fc01
https://codesandbox.io/s/points-ldpyw8?file=/src/index.js

function BufferPoints({ count = 10000 }) {
  const points = useMemo(() => {
    const p = new Array(count).fill(0).map((v) => (0.5 - Math.random()) * 20);
    return new BufferAttribute(new Float32Array(p), 3);
  }, [count]);

  return (
    <points>
      <bufferGeometry>
        <bufferAttribute attach={"attributes-position"} {...points} />
      </bufferGeometry>
      <pointsMaterial
        size={0.1}
        threshold={0.1}
        color={0xff00ff}
        sizeAttenuation={true}
      />
    </points>
  );
 */

const RipplePoints = (props) => {
  const ref = useRef();

  let t = 0; // phase shift
  let f = 0.002; // frequency
  let a = 3; // amplitude
  const graph = useCallback(
    (x, z) => {
      return Math.sin(f * (x ** 2 + z ** 2 + t)) * a;
    },
    [t, f, a]
  );

  const count = 100;
  const sep = 3;
  let positions = useMemo(() => {
    let positions = [];

    for (let xi = 0; xi < count; xi++) {
      for (let zi = 0; zi < count; zi++) {
        // offset points to center of the graph
        let x = sep * (xi - count / 2);
        let z = sep * (zi - count / 2);
        let y = graph(x, z);
        positions.push(x, y, z);
      }
    }

    return new Float32Array(positions);
  }, [count, sep, graph]);

  // useFrame(() => {
  //   t += 15;

  //   const positions = ref.current.array;

  //   let i = 0;
  //   for (let xi = 0; xi < count; xi++) {
  //     for (let zi = 0; zi < count; zi++) {
  //       let x = sep * (xi - count / 2);
  //       let z = sep * (zi - count / 2);

  //       positions[i + 1] = graph(x, z);
  //       i += 3;
  //     }
  //   }

  //   ref.current.needsUpdate = true;
  // });

  return (
    <Points
      // attach={"attributes-position"}
      ref={ref}
      positions={positions}
      stride={3}
      frustumCulled
      {...props}
    >
      <PointMaterial
        transparent
        color="#f272c8"
        size={0.3}
        sizeAttenuation={true}
        depthWrite={false}
      />
    </Points>
  );
};

const RippleCanvas = () => {
  return (
    // z index is -1 so that it is shown behind the other elements
    <div className="w-full h-auto absolute inset-0 z-[-1]">
      <Canvas camera={{ position: [100, 10, 0], fov: 75 }}>
        <Suspense fallback={null}>
          <RipplePoints />
        </Suspense>

        <Preload all />
      </Canvas>
    </div>
  );
};

export default RippleCanvas;
