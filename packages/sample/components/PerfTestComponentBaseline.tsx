import { StyleSheet, View } from "react-native";
/**
 * Performance test component
 *
 * @returns an array of 1000 styled views
 */
const PerfTestComponentBaseline = () => {
  return (
    <View
      style={{
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "row",
      }}
    >
      {new Array(1000).fill(0).map((_, i) => (
        <View key={i} style={styles.styledView} />
      ))}
    </View>
  );
};
const styles = StyleSheet.create({
  styledView: {
    borderColor: "red",
    borderWidth: 2,
    padding: 5,
    overflow: "hidden",
  },
});

export default PerfTestComponentBaseline;
