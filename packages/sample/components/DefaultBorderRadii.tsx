import * as React from "react";
import { View, Text } from "react-native";
import { styles } from "../styled";
import { DefaultConstraints } from "react-native-zephyr";

export const DefaultBorderRadii = () => {
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
      {Object.keys(DefaultConstraints.borderRadii).map((key) => (
        <View key={key} style={styles("items:center")}>
          <Text style={styles("text:sm", "color:gray-600")}>rounded:{key}</Text>
          <View
            style={styles(
              "border:2",
              "border-color:purple-700",
              // @ts-ignore
              `rounded:${key}`,
              "w:20",
              "h:20",
              "justify:center",
              "items:center"
            )}
          >
            <Text>{key}</Text>
          </View>
        </View>
      ))}
    </View>
  );
};
