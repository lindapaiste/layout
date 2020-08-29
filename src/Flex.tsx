import {FlexStyle} from "react-native";
import {ViewWith, ViewWithStyle} from "./ViewWithStyle";
import * as React from "react";

/**
 * certain flex properties can be passed in as top-level props to FlexRow and FlexColumn
 *
 * this is just a subset of FlexStyle, so it could be written with Pick and Require, but instead I am copying for the
 * sake of documentation
 *
 * descriptions from http://flexbox.malven.co/
 */
export interface FlexProps extends FlexStyle {
    display: "flex";
    /**
     * Establishes the main axis.
     */
    flexDirection: 'row' | 'column' | 'row-reverse' | 'column-reverse';
    /**
     * Wraps items if they can't all be made to fit on one line.
     */
    flexWrap: 'wrap' | 'nowrap' | 'wrap-reverse';
    /**
     * Attempts to distribute extra space on the main axis.
     */
    justifyContent: 'flex-start' | 'flex-end' | 'center' | 'space-between' | 'space-around' | 'space-evenly';
    /**
     * Determines how items are laid out on the cross axis.
     */
    alignItems: 'flex-start' | 'flex-end' | 'center' | 'stretch' | 'baseline';
    /**
     * Only has an effect with more than one line of content.
     */
    alignContent: 'flex-start' | 'flex-end' | 'center' | 'stretch' | 'space-between' | 'space-around';
}

type Props = ViewWith<Partial<FlexProps>>;

/**
 * shared default style between flex row and column
 * includes flexDirection, but this can be overwritten
 */
export const centerContents: FlexStyle & FlexProps = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    alignContent: "center",
    flexDirection: "row",
    flexWrap: "nowrap"
}

/**
 * don't want to pass through all props, just FlexProps
 * picks out top-level FlexProps and applies centerContents as the default such that all are defined
 */
const extractFlexProps = (props: Partial<FlexProps>): FlexProps => {
    const combined = {...centerContents, ...props};
    const {flexDirection, flexWrap, alignContent, alignItems, justifyContent, display} = combined;
    return {flexDirection, flexWrap, alignContent, alignItems, justifyContent, display};
}

/**
 * basic Flex component uses centerContents as the default style with flexDirection = row, but this can be overwritten
 * with prop flexDirection
 */
export const Flex = ViewWithStyle(extractFlexProps);


/**
 * automatically applies flexDirection to Flex component
 */
export const FlexRow = (props: Props) => Flex({...props, flexDirection: "row"});
export const FlexColumn = (props: Props) => Flex({...props, flexDirection: "column"});
