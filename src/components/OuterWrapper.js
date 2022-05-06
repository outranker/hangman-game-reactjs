import React from "react";
import styled from "styled-components";

const OuterWrapper = ({ children }) => {
  return <OuterWrapperDiv>{children}</OuterWrapperDiv>;
};

export default OuterWrapper;

const OuterWrapperDiv = styled.div`
  height: 100vh;
  width: 100vw;
`;
