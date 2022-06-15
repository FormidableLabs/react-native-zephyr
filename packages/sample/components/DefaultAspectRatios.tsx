import * as React from "react";
import { Text, View } from "react-native";
import { styles } from "../styled";
import { DefaultConstraints } from "react-native-style-buddy";

export const DefaultAspectRatios: React.FC = () => {
  return (
    <View
      style={styles(
        "flex:1",
        "flex:row",
        "items:center",
        "justify:between",
        "px:10"
      )}
    >
      {Object.keys(DefaultConstraints.aspectRatios).map((key) => (
        <View key={key} style={styles("items:center")}>
          <Text style={styles("text:sm", "color:gray-600", "font-weight:bold")}>
            aspect:{key}
          </Text>
          <View
            style={styles(
              "border:hairline",
              "rounded:base",
              "bg:purple-700",
              "shadow:md",
              // @ts-ignore
              `aspect:${key}`,
              "w:20",
              "justify:center",
              "items:center"
            )}
          >
            <Text style={styles("color:white", "font-weight:bold")}>{key}</Text>
          </View>
        </View>
      ))}
    </View>
  );
};
