import { View, Text, StyleSheet, Button, TextInput } from "react-native";
import { useState } from "react";
import { useNavigation } from "expo-router";

export default function JournalEntryScreen() {
  const [entry, setEntry] = useState<string>("");
  const navigation = useNavigation();

  const saveEntry = () => {
    console.log("Entry saved:", entry);
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>New Journal Entry</Text>
      <TextInput
        style={styles.input}
        placeholder="Write your thoughts here..."
        value={entry}
        onChangeText={setEntry}
        multiline
      />
      <Button title="Save Entry" onPress={saveEntry} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    justifyContent: "center",
  },
  title: {
    fontSize: 24,
    marginBottom: 16,
  },
  input: {
    height: 200,
    borderColor: "gray",
    borderWidth: 1,
    padding: 8,
    marginBottom: 16,
  },
});
