import { StyleSheet, Text, View } from "react-native";

export default function CalendarScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Cycle Calendar</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  title: {
    fontSize: 24,
    fontWeight: "700",
  },
});