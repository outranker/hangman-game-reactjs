import React, { useState, useEffect } from "react";
import { useSpring, animated } from "@react-spring/web";
import Paper from "@mui/material/Paper";
import { styled } from "@mui/material/styles";

const Item = styled(Paper)(({ theme }) => ({
  width: { sx: "1.2rem", md: "1.4rem", lg: "1.8rem" },
  height: { sx: "1.8rem", md: "2rem", lg: "2.4rem" },
  backgroundColor: "#fff",
  padding: theme.spacing(1),
  textAlign: "center",
  color: "white",
}));

export default function Shake({ letterObj, lastPressedLetter }) {
  const [toggle, setToggle] = useState(false);
  const { x } = useSpring({
    x: toggle ? 1 : 0,
    config: { mass: 1, tension: 500, friction: 10 },
    reset: true,
  });
  useEffect(() => {
    if (lastPressedLetter === letterObj?.letter) {
      setToggle((v) => !v);
    }
  }, [lastPressedLetter, letterObj?.letter]);

  return (
    <animated.div
      key={letterObj?.id}
      style={{
        transform: x
          .to({
            range: [0, 0.25, 0.35, 0.45, 0.55, 0.65, 0.75, 1],
            output: [0, 15, -15, 15, -15, 15, -15, 0],
          })
          .to((x) => `translate(${x}px, 0px)`),
      }}
    >
      <Item
        sx={{
          backgroundColor: letterObj?.color === "green" ? "#66bb6a" : "#f44336",
        }}
        key={letterObj?.id}
      >
        {letterObj?.letter}
      </Item>
    </animated.div>
  );
}

/*          transform: xyz
            .interpolate(([y]) => ({
              range: [0, 0.25, 0.35, 0.45, 0.55, 0.65, 0.75, 1],
              output: [180, 220, 180, 220, 180, 220, 180, 200]
            }))
            .interpolate((x, y, z) => `translate(${x}px, ${y}px, ${z}px)`) 
            
            
            
            <animated.div
              key={ul.id}
              style={{
                transform: x
                  .to({
                    range: [0, 0.25, 0.35, 0.45, 0.55, 0.65, 0.75, 1],
                    output: [0, 15, -15, 15, -15, 15, -15, 0],
                  })
                  .to((x) => `translate(${x}px, 0px)`),
              }}
            >
              <Item
                sx={{
                  backgroundColor: ul.color === "green" ? "#66bb6a" : "#f44336",
                }}
                key={ul.id}
              >
                {ul.letter}
              </Item>
            </animated.div>
            */
