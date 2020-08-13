import {FlexStyle, useWindowDimensions, View, ViewStyle} from "react-native";
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
 * returns two separate functions - vw and vh - so vw can be used on height dimensions and vice-versa
 * makes use of native useDimensions hook to get updated window size
 */
export const useViewportUnits = (): ViewportFunctions => {
    const {width, height} = useWindowDimensions();

    return {
        vw: units => units === undefined ? undefined : units * width / 100,
        vh: units => units === undefined ? undefined : units * height / 100,
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
