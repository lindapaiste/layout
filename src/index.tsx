import {Dimensions, FlexStyle, View, ViewStyle} from "react-native";
import {Position, Size, Translate, ViewportConverter, ViewportFunctions, ViewWith} from "./types";
import * as React from "react";
import {FunctionComponent} from "react";

/**
 * factory for making a View Component which applies default styles
 * the style prop comes second, so custom style declarations will override the provided defaults
 */
export const ViewWithStyle = <T extends {}>(propsMapper: ViewStyle | ((props: T) => ViewStyle)): FunctionComponent<ViewWith<T>> =>
    (props: ViewWith<T>) => {
        return (
            <View
                {...props}
                style={[
                    typeof propsMapper === "function" ? propsMapper(props) : propsMapper,
                    props.style,
                ]}
            />
        )
    }

/**
 * provide props width and/or height for a fixed-size box with hidden overflow
 */
export const FixedSizeView = ViewWithStyle(
    ({width, height}: Partial<Size>) => ({
        width,
        height,
        overflow: 'hidden'
    })
);

/**
 * provide prop size for a square ie. a fixed-size with width and height the same
 */
export const SquareView = ({size, ...props}: ViewWith<{size: number}>) =>
    FixedSizeView({...props, width: size, height: size});

/**
 * provide prop size (diameter) for a circle ie. a square with 50% border radius
 */
export const CircleView = ViewWithStyle(
    ({size}: { size: number }) => ({
        width: size,
        height: size,
        borderRadius: .5 * size,
        overflow: 'hidden'
    })
);

/**
 * provide props translateX and/or translateY for a translated view
 */
export const TranslatedView = ViewWithStyle(
    ({translateX, translateY}: Partial<Translate>) => ({
        transform: [
            {translateX: translateX || 0},
            {translateY: translateY || 0},
        ]
    })
);

/**
 * applies an absolute position
 * uses props x and y rather than top and left
 */
export const PositionedView = ViewWithStyle(
    ({x, y}: Partial<Position>) => ({
        position: 'absolute',
        top: y,
        left: x,
    })
);

/**
 * a View with position="relative" so that it can be used as a parent container for absolute positioned children
 */
export const RelativeContainer = ViewWithStyle({
    position: "relative",
});

/**
 * aspect ratio view involves an inner and an outer View
 * uses the padding hack (vertical padding is based on width) rather than computation
 */
export const AspectRatioView = ({aspectRatio, style, ...rest}: ViewWith<{ aspectRatio: number }>) => {
    return (
        <View
            style={[
                {
                    paddingBottom: `${100 / aspectRatio}%`,
                    position: 'relative',
                    height: 0,
                    width: '100%',
                },
                style,
            ]}
        >
            <View
                style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    height: '100%',
                    width: '100%',
                }}
                {...rest}
            />
        </View>
    )
};

/**
 * shared style between flex row and column
 */
export const centerContents: FlexStyle = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    alignContent: "center",
}

/**
 * basic flexbox row with default settings set to center contents
 */
export const FlexRow = ViewWithStyle({
    ...centerContents,
    flexDirection: "row"
})

/**
 * basic flexbox column with default settings set to center contents
 */
export const FlexColumn = ViewWithStyle({
    ...centerContents,
    flexDirection: "column"
})

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
