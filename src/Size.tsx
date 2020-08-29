import {ViewWithStyle, ViewWith} from "./ViewWithStyle";

export interface Size {
    width: number;
    height: number;
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
export const SquareView = ({size, ...props}: ViewWith<{ size: number }>) =>
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
