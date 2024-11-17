import { useNavigation, Link } from "expo-router";
import { View, Text, StyleSheet, Button, ScrollView, TextInput } from "react-native";
import { useState } from "react";
import { JournalEntry } from "@/components/JournalEntry";
import CustomButton from '@/components/CustomButton';

interface Entry {
  title: string;
  content: string;
}

export default function JournalScreen() {
  const [entries, setEntries] = useState<Entry[]>([
    { title: "Entry 1", content: "This is the first entry." },
    { title: "Entry 2", content: "This is the second entry." },
  ]);
  const [newEntry, setNewEntry] = useState<string>("");

  const addEntry = () => {
    if (newEntry.trim()) {
      const newEntryObject = {
        title: `Entry: ${entries.length + 1}`,
        content: newEntry,
      };
      setEntries([...entries, newEntryObject]);
      setNewEntry("");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}> Journal </Text>
      <TextInput
        style={styles.input}
        placeholder="Write your journal entry here..."
        value={newEntry}
        onChangeText={setNewEntry}
        multiline
      />
      <CustomButton styleType ="primary" onClick={addEntry}>
        Save Entry
      </CustomButton>
      <ScrollView style={styles.entriesContainer}>
        {entries.map((entry, index) => (
          <JournalEntry
            key={index}
            title={entry.title}
            content={entry.content}
          />
        ))}
      </ScrollView>
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
  input: {
    height: 100,
    borderColor: "gray",
    borderWidth: 1,
    padding: 8,
    marginBottom: 16,
  },
  entriesContainer: {
    marginTop: 16,
  },
});
