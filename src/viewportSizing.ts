import {Dimensions} from "react-native";

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
 * allows use of vw and vh units for width and height
 * by creating functions that convert units to raw pixel values
 * returns separate functions - vw and vh - so vw can be used on height dimensions and vice-versa
 * also added vmax and vmin which scale units based on the greater or lesser of the two dimensions
 *
 * not using native useWindowDimensions hook to get updated window size because it is not supported in react-native-web
 */
export const useViewportUnits = (): ViewportFunctions => {
    const {width, height} = Dimensions.get('window'); // useWindowDimensions();

    return {
        vw: units => units * width / 100,
        vh: units => units * height / 100,
        vmax: units => units * Math.max(width, height) / 100,
        vmin: units => units * Math.min(width, height) / 100,
    }
}
/**
 * also exporting the two separately for convenience
 * these hooks are themselves the converter, as they take the units as a param,
 * rather than returning a function
 */
export const useVw: ViewportConverter = (units) => {
    return useViewportUnits().vw(units);
}
export const useVh: ViewportConverter = (units) => {
    return useViewportUnits().vh(units);
}
export const useVmin: ViewportConverter = (units) => {
    return useViewportUnits().vmin(units);
}
export const useVmax: ViewportConverter = (units) => {
    return useViewportUnits().vmax(units);
}
