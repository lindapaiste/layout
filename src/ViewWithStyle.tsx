import {View, ViewProps, ViewStyle} from "react-native";
import * as React from "react";
import {FunctionComponent, PropsWithChildren} from "react";

/**
 * shorthand for accepting standard View props in addition to custom props
 */
export type ViewWith<T> = T & PropsWithChildren<ViewProps>;

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
