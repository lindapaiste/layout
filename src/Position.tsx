import {ViewWithStyle} from "./ViewWithStyle";
import {Size} from "./Size";

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

/**
 * rectangle view combines fixed size with absolute position, for placing views with rectangle props x, y, width,
 * height at the correct position and size
 */
export const RectangleView = ViewWithStyle(
    ({x,y, width, height}: Partial<Position> & Partial<Size>) => ({
        position: 'absolute',
        top: y,
        left: x,
        width,
        height,
        overflow: 'hidden'
    })
)
