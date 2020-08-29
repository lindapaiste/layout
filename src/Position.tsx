import {ViewWithStyle} from "./ViewWithStyle";

export interface Translate {
    translateX: number;
    translateY: number;
}

export interface Position {
    x: number;
    y: number;
}

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
