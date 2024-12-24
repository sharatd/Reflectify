import {
  View,
  Text,
  StyleSheet,
  Button,
  ScrollView,
  TextInput,
} from "react-native";
import { useState, useEffect } from "react";
import { JournalEntry } from "@/components/JournalEntry";
import CustomButton from "@/components/CustomButton";
import { db, storage } from "@/firebaseConfig";
import {
  collection,
  addDoc,
  getDocs,
  deleteDoc,
  doc,
  onSnapshot,
} from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

interface Entry {
  id: string;
  title: string;
  content: string;
}

export default function JournalScreen() {
  const [entries, setEntries] = useState<Entry[]>([]);
  const [newEntryTitle, setNewEntryTitle] = useState<string>("");
  const [newEntry, setNewEntry] = useState<string>("");
  const [isUploading, setIsUploading] = useState<boolean>(false);
  const [selectedEntry, setSelectedEntry] = useState<Entry | null>(null);

  useEffect(() => {
    const unsubscribe = onSnapshot(
      collection(db, "journalEntries"),
      (querySnapshot: { docs: any[] }) => {
        const entriesData = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        })) as Entry[];
        setEntries(entriesData);
      },
      (error: any) => console.error("Error listening for changes:", error)
    );

    return () => unsubscribe(); // Clean up listener on unmount
  }, []);

  const handleSaveAndUpload = async () => {
    if (!newEntry.trim()) return;

    setIsUploading(true); // Indicate that a save/upload is in progress

    try {
      // Create a new entry object
      const newEntryObject = {
        title: newEntryTitle,
        content: newEntry,
      };

      // Save the entry to Firestore
      const docRef = await addDoc(
        collection(db, "journalEntries"),
        newEntryObject
      );

      // Upload the entry to Firebase Storage
      const entryBlob = new Blob([JSON.stringify(newEntryObject)], {
        type: "application/json",
      });
      const storageRef = ref(storage, `journalEntries/${newEntryTitle}.json`);
      await uploadBytes(storageRef, entryBlob);
      const downloadURL = await getDownloadURL(storageRef);

      // Clear the input field and title field
      setNewEntry("");
      setNewEntryTitle("");
    } catch (error) {
      console.error("Error saving and uploading entry:", error);
    } finally {
      setIsUploading(false); // Reset uploading state after save/upload is complete
    }
  };

  const deleteEntry = async (id: string) => {
    try {
      await deleteDoc(doc(db, "journalEntries", id));
      setEntries((prevEntries) =>
        prevEntries.filter((entry) => entry.id !== id)
      );
    } catch (error) {
      console.error("Error deleting entry:", error);
    }
  };

  const handleDelete = async () => {
    if (!selectedEntry) return;
    await deleteEntry(selectedEntry.id);
  };

  const handleSelectedEntry = (entry: Entry) => {
    setSelectedEntry(entry);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}> Journal </Text>
      <TextInput
        style={styles.input}
        placeholder="Write your entry title here..."
        value={newEntryTitle}
        onChangeText={setNewEntryTitle}
      />
      <TextInput
        style={styles.input}
        placeholder="Write your journal entry here..."
        value={newEntry}
        onChangeText={setNewEntry}
        multiline
      />
      <CustomButton
        styleType="primary"
        onClick={handleSaveAndUpload}
        disabled={isUploading}
      >
        {isUploading ? "Uploading..." : "Save and Upload Entry"}
      </CustomButton>
      <CustomButton
        styleType="danger"
        onClick={handleDelete}
        disabled={!selectedEntry}
      >
        Delete Selected Entry
      </CustomButton>
      <ScrollView style={styles.entriesContainer}>
        {entries.map((entry) => (
          <JournalEntry
            key={entry.id}
            title={entry.title}
            content={entry.content}
            onSelect={() => handleSelectedEntry(entry)}
            onDelete={() => deleteEntry(entry.id)}
            isSelected={selectedEntry?.id === entry.id}
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
