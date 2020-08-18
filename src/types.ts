import { PropsWithChildren } from "react";
import { ViewProps } from "react-native";

export interface Translate {
  translateX: number;
  translateY: number;
}

export interface Position {
  x: number;
  y: number;
}

export interface Size {
  width: number;
  height: number;
}

export interface ViewportSize {
  vw: number;
  vh: number;
}

/**
 * convert a number in viewport units into a number of pixels
 * no longer supporting pass-through of undefined
 */
export type ViewportConverter = (units: number) => number;

/**
 * converters for vw, vh, vmin and vmax
 */
export interface ViewportFunctions {
  vw: ViewportConverter;
  vh: ViewportConverter;
  vmin: ViewportConverter;
  vmax: ViewportConverter;
}

/**
 * shorthand for accepting standard View props in addition to custom props
 */
export type ViewWith<T> = T & PropsWithChildren<ViewProps>;
