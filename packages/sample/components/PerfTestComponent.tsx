import React from "react";
import { View } from "react-native";
import { StyledView } from "../styled";

/**
 * Performance test component
 *
 * @returns an array of 1000 styled views
 */
const PerfTestComponent = () => {
  return (
    <View
      style={{
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "row",
      }}
    >
      {new Array(1000).fill(0).map((_, i) => (
        <StyledView
          key={i}
          classes={[
            "border:2",
            "p:1",
            "border-color:indigo-600",
            "overflow:hidden",
          ]}
        />
      ))}
    </View>
  );
};

export default PerfTestComponent;
