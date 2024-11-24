import { useNavigation, Link } from "expo-router";
import { View, Text, StyleSheet, Button, ScrollView, TextInput } from "react-native";
import { useState, useEffect } from "react";
import { JournalEntry } from "@/components/JournalEntry";
import CustomButton from '@/components/CustomButton';
import { db, storage } from '@/firebaseConfig';
import { collection, addDoc, getDocs, deleteDoc, doc } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';

interface Entry {
  id: string;
  title: string;
  content: string;
}

export default function JournalScreen() {
  const [entries, setEntries] = useState<Entry[]>([]);
  const [newEntry, setNewEntry] = useState<string>("");
  const [selectedEntryIndex, setSelectedEntryIndex] = useState<number | null>(null);

  useEffect(() => {
    const fetchEntries = async () => {
      const querySnapshot = await getDocs(collection(db, "journalEntries"));
      const entriesData = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as Entry[];
      setEntries(entriesData);
    }

    fetchEntries();
  }, []);

  const addEntry = async () => {
    if (newEntry.trim()) {
      const newEntryObject = {
        title: `Entry: ${entries.length + 1}`,
        content: newEntry,
      };
      const docRef = await addDoc(collection(db, "journalEntries"), newEntryObject);
      setEntries([...entries, {id: docRef.id, ...newEntryObject}]);
      setNewEntry("");
    }
  };
  
  const deleteEntry = async (index: number) => {
    const entryToDelete = entries[index];
    await deleteDoc(doc(db, "journalEntries", entryToDelete.id));
    const updatedEntries = entries.filter((_, i) => i !== index);
    setEntries(updatedEntries)
    setSelectedEntryIndex(null)
  }

  const uploadEntryToStorage = async () => {
    const sampleEntry = { title: 'Sample Entry', content: 'This is a sample entry' };
    const entryBlob = new Blob([JSON.stringify(sampleEntry)], { type: 'application/json' });
    const storageRef = ref(storage, `journalEntries/${Date.now()}.json`);
    await uploadBytes(storageRef, entryBlob);
    const downloadURL = await getDownloadURL(storageRef);
    console.log('File available at ', downloadURL);
  }

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
      <CustomButton styleType="primary" onClick={uploadEntryToStorage}>
        Upload Entry to Storage
      </CustomButton>
      <ScrollView style={styles.entriesContainer}>
        {entries.map((entry, index) => (
          <JournalEntry
            key={entry.id}
            title={entry.title}
            content={entry.content}
            onSelect={() => setSelectedEntryIndex(index)}
            onDelete={() => deleteEntry(index)}
            isSelected={selectedEntryIndex === index}
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
