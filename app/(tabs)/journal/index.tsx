import { useNavigation, Link } from "expo-router";
import { View, Text, StyleSheet, Button, ScrollView } from "react-native";
import { useState } from "react";
import { JournalEntry } from "@/components/JournalEntry";

interface Entry {
    title: string;
    content: string;
}

export default function JournalScreen() {
  const [entries, setEntries] = useState<Entry[]>([
    { title: "Entry 1", content: "This is the first entry." },
    { title: "Entry 2", content: "This is the second entry." },
  ]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}> Journal </Text>
      <ScrollView style={styles.entriesContainer}>
        {entries.map((entry, index) => (
          <JournalEntry
            key={index}
            title={entry.title}
            content={entry.content}
          />
        ))}
      </ScrollView>
      <Link href="/journal/entry">
        <Button title="Add New Entry" />
      </Link>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "white",
  },
  title: {
    fontSize: 24,
    marginBottom: 16,
    textAlign: "center",
  },
  entriesContainer: {
    marginTop: 16,
  },
});
