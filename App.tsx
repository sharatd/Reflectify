// App.tsx
import React from "react";
import { View, Text, StyleSheet } from "react-native";

// This is the main App component
export default function App() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Hello World</Text>
    </View>
  );
}

// Simple styling
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F5FCFF",
  },
  text: {
    fontSize: 20,
    textAlign: "center",
    margin: 10,
  },
});
