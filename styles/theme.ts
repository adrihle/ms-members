import { EBorderRadius, EBreakpoints, EColors, EFontSize } from "@constants";
import { DefaultTheme } from "styled-components";

type TResponsiveSizes = Record<EBreakpoints, number>;

declare module 'styled-components' {
  export interface DefaultTheme {
    breakpoints: TResponsiveSizes;
    colors: Record<EColors, string>;
    fontSize: Record<EFontSize, string>;
    borderRadius: Record<EBorderRadius, string>;
    imageResponsive: TResponsiveSizes;
    listGridResponsive: TResponsiveSizes;
    logoResponsive: TResponsiveSizes;
  } 
};

export const defaultTheme: DefaultTheme = {
  colors: {
    [EColors.PRIMARY]: '#ff324b',
    [EColors.SECONDARY]: '#0255a8',
    [EColors.TEXT_CONTENT]: '#666f80',
    [EColors.TEXT_PRIMARY]: '#3d3d3d',
    [EColors.TEXT_SECONDARY]: '##e02121',
    [EColors.SHADOW]: '#eaf0f6'
  },
  fontSize: {
    [EFontSize.TITLE]: '18px',
    [EFontSize.CONTENT]: '15px',
    [EFontSize.BADGE]: '12px'
  },
  borderRadius: {
    [EBorderRadius.CARD]: '28px'
  },
  breakpoints: {
    [EBreakpoints.MOBILE]: 360,
    [EBreakpoints.TABLET]: 770,
    [EBreakpoints.DESKTOP]: 1024
  },
  imageResponsive: {
    [EBreakpoints.MOBILE]: 100,
    [EBreakpoints.TABLET]: 120,
    [EBreakpoints.DESKTOP]: 100
  },
  listGridResponsive: {
    [EBreakpoints.MOBILE]: 1,
    [EBreakpoints.TABLET]: 2,
    [EBreakpoints.DESKTOP]: 3
  },
  logoResponsive: {
    [EBreakpoints.MOBILE]: 200,
    [EBreakpoints.TABLET]: 250,
    [EBreakpoints.DESKTOP]: 250
  }
}