import {ViewWith} from "./ViewWithStyle";
import {View} from "react-native";
import * as React from "react";

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
