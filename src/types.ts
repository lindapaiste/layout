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
 * can handle an undefined input, but will return an undefined value
 */
export type ViewportConverter = <T extends number | undefined>(units: T) => T

/**
 * pair of converters for vw and vh
 */
export interface ViewportFunctions {
  vw: ViewportConverter;
  vh: ViewportConverter;
}

/**
 * shorthand for accepting standard View props in addition to custom props
 */
export type ViewWith<T> = T & PropsWithChildren<ViewProps>;
