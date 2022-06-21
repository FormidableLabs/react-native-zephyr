import * as React from "react";
import { SafeAreaView, ScrollView, Text, View } from "react-native";
import { styles } from "../styled";
import { DefaultTheme } from "react-native-zephyr";

export const DefaultLeading = () => {
  return (
    <SafeAreaView style={styles("flex:1")}>
      <ScrollView contentContainerStyle={styles("p:2")}>
        {Object.keys(DefaultTheme.lineHeights).map((key) => (
          <View
            key={key}
            style={styles("px:2", "py:1", "flex:grow", "overflow:hidden")}
          >
            <Text style={styles("text:sm", "color:gray-600")}>
              leading:{key}
            </Text>
            {/* @ts-ignore */}
            <Text style={styles(`leading:${key}`)}>
              The quick brown fox jumps over the lazy dog. The quick brown fox
              jumps over the lazy dog. The quick brown fox jumps over the lazy
              dog.
            </Text>
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};
