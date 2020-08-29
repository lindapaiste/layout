import {FlexStyle} from "react-native";
import {ViewWithStyle} from "./ViewWithStyle";

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
