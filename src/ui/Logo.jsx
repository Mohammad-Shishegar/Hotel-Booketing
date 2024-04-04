import styled from "styled-components";
import { useDarkMode } from "../context/DarkModeContext";
import imageLight from "../logo-light.png"
import imageDark from "../logo-dark.png"
import { useEffect, useState } from "react";

const StyledLogo = styled.div`
  text-align: center;
`;

const Img = styled.img`
  height: 9.6rem;
  width: auto;
`;

function Logo() {

  const {isDarkMode} = useDarkMode()
  const src = isDarkMode ? imageDark : imageLight


  return (
    <StyledLogo>
      <Img src={src} alt="Logo" />
    </StyledLogo>
  );
}

export default Logo;
