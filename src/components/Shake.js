import React, { useState } from "react";
import { useSpring, animated } from "react-spring";

export default function Shake() {
  const [toggle, setToggle] = useState(false);
  const { x } = useSpring({
    from: { x: 0 },
    to: { x: toggle ? 1 : 0 },
    config: { mass: 1, tension: 500, friction: 10 },
  });

  return (
    <div className="App">
      <animated.div
        style={{
          transform: x
            .interpolate({
              range: [0, 0.25, 0.35, 0.45, 0.55, 0.65, 0.75, 1],
              output: [180, 220, 180, 220, 180, 220, 180, 200],
            })
            .interpolate((x) => `translate3d(${x}px, 0px, 0px)`),
        }}
      >
        Shake
      </animated.div>
      <button onClick={() => setToggle((v) => !v)}>shake it</button>
    </div>
  );
}

/*          transform: xyz
            .interpolate(([y]) => ({
              range: [0, 0.25, 0.35, 0.45, 0.55, 0.65, 0.75, 1],
              output: [180, 220, 180, 220, 180, 220, 180, 200]
            }))
            .interpolate((x, y, z) => `translate(${x}px, ${y}px, ${z}px)`) */
