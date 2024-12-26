import { Image, StyleSheet, Platform, Alert, Button } from "react-native";

import { HelloWave } from "@/components/HelloWave";
import ParallaxScrollView from "@/components/ParallaxScrollView";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { Link } from "expo-router";

export default function HomeScreen() {
  const showAlert = () => {
    Alert.alert("Button Pressed", "You pressed the button!");
  };

  const fetchAndShowData = async () => {
    try {
      // Make a network request to fetch data from a public API
      const response = await fetch(
        "https://jsonplaceholder.typicode.com/todos/1"
      );
      const data = await response.json();

      // Display the fetched data in an alert
      Alert.alert(
        "Fetched Data",
        `Title: ${data.title}\nCompleted: ${data.completed}`
      );
    } catch (error) {
      // Handle any errors
      Alert.alert("Error", "Something went wrong while fetching data.");
    }
  };

  return (
    <ThemedView style={styles.container}>
      <ParallaxScrollView
        headerImage={
          <Image
            source={require("@/assets/images/partial-react-logo.png")}
            style={{ width: "100%", height: 200 }}
          />
        }
        headerBackgroundColor={{ dark: "#000", light: "#fff" }}
      >
        <HelloWave />
        <ThemedText> Welcome to the Journal App</ThemedText>
        <Button title="Show Alert" onPress={showAlert} />
        <Button title="Fetch Data" onPress={fetchAndShowData} />
        {/* <Link href="/settings">Go to Settings</Link> */}
        {/* <Link href="/journal">Go to Journal</Link> */}
      </ParallaxScrollView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
