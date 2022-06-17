import * as React from "react";
import { SafeAreaView, View, Text, ScrollView } from "react-native";
import { DefaultConstraints } from "react-native-zephyr";
import { styles } from "../styled";

export const DefaultFontWeights = () => {
  return (
    <SafeAreaView style={styles()}>
      <ScrollView>
        {Object.keys(DefaultConstraints.fontWeights).map((key) => (
          <View
            key={key}
            style={styles("px:2", "py:2", "flex:grow", "overflow:hidden")}
          >
            <Text style={styles("text:sm", "color:gray-600")}>
              font-weight:{key}
            </Text>
            {/* @ts-ignore */}
            <Text style={styles(`font-weight:${key}`)} numberOfLines={1}>
              The quick brown fox jumped over the lazy dog.
            </Text>
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};
