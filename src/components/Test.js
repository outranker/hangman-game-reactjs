import React, { useState } from "react";
import { useSpring, animated, config } from "@react-spring/web";

const Test = () => {
  const [flip, set] = useState(false);
  const props = useSpring({
    to: { opacity: 1 },
    from: { opacity: 0 },
    reset: true,
    reverse: flip,
    delay: 200,
    config: config.molasses,
    onRest: () => set(!flip),
  });

  return <animated.h1 style={props}>hello</animated.h1>;
};

export default Test;
