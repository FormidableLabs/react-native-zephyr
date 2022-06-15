import * as React from "react";
import { SafeAreaView, View, Text, ScrollView } from "react-native";
import { styles } from "../styled";
import { DefaultConstraints } from "react-native-style-buddy";

export const DefaultFontSizes = () => {
  return (
    <SafeAreaView style={styles("flex:1")}>
      <ScrollView>
        {Object.keys(DefaultConstraints.fontSizes).map((key) => (
          <View
            key={key}
            style={styles("px:2", "py:1", "flex:grow", "overflow:hidden")}
          >
            <Text style={styles("text:sm", "color:gray-600")}>text:{key}</Text>
            {/* @ts-ignore */}
            <Text style={styles(`text:${key}`)} numberOfLines={1}>
              The quick brown fox...
            </Text>
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};
