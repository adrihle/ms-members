import { EBreakpoints } from "@constants";
import { useEffect, useRef, useState } from "react";
import { useTheme } from "styled-components";

interface IUseResponsive {
  imageSize: number;
  grid: number;
  logoSize: number;
  resolution: EBreakpoints;
}

export const useResponsive = (): IUseResponsive => {
  const loaded = useRef(false);
  const { 
    breakpoints,
    imageResponsive,
    listGridResponsive,
    logoResponsive
  } = useTheme();
  const [resolution, setResolution] = useState<EBreakpoints>(EBreakpoints.MOBILE);

  const handleWindowSizeChange = () => {
    const resolution = assignResolution(window.innerWidth);
    setResolution(resolution)
  }

  const assignResolution = (width: number): EBreakpoints => {
    if (width < breakpoints.TABLET) return EBreakpoints.MOBILE;
    if (width < breakpoints.DESKTOP) return EBreakpoints.TABLET;
    return EBreakpoints.DESKTOP;
  }

  useEffect(() => {
    if (!loaded.current) {
      handleWindowSizeChange();
      loaded.current = true;
    }
    window.addEventListener('resize', handleWindowSizeChange);
    return () => {
      window.removeEventListener('resize', handleWindowSizeChange);
    };
  }, []);


  return {
    resolution,
    imageSize: imageResponsive[resolution],
    grid: listGridResponsive[resolution],
    logoSize: logoResponsive[resolution]
  }
}