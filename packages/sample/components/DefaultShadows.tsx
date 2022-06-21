import * as React from "react";
import { Text, View } from "react-native";
import { styles } from "../styled";
import { DefaultTheme } from "react-native-zephyr";

export const DefaultShadows: React.FC = () => {
  return (
    <View
      style={styles(
        "flex:1",
        "flex:row",
        "items:center",
        "justify:between",
        "px:20"
        // "bg:purple-100"
      )}
    >
      {Object.keys(DefaultTheme.shadows).map((key) => (
        <View key={key} style={styles("items:center")}>
          <Text style={styles("text:sm", "color:gray-600")}>shadow:{key}</Text>
          <View
            style={styles(
              "border:hairline",
              "bg:white",
              // @ts-ignore
              `shadow:${key}`,
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
