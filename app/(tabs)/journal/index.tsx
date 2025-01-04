import { View, Text, ScrollView, TextInput } from "react-native";
import { useState, useEffect } from "react";
import { JournalEntry } from "@/components/JournalEntry";
import CustomButton from "@/components/CustomButton";
import { db, storage } from "@/firebaseConfig";
import {
  collection,
  addDoc,
  deleteDoc,
  doc,
  onSnapshot,
} from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { journalStyles } from "@/styles/journalStyles";

interface Entry {
  id: string;
  title: string;
  hashtags: string;
  content: string;
}

export default function JournalScreen() {
  const [entries, setEntries] = useState<Entry[]>([]);
  const [newEntryTitle, setNewEntryTitle] = useState<string>("");
  const [newEntry, setNewEntry] = useState<string>("");
  const [isUploading, setIsUploading] = useState<boolean>(false);
  const [selectedEntry, setSelectedEntry] = useState<Entry | null>(null);
  const [entryHashtags, setEntryHashtags] = useState<string>("");

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

  const formatHashtags = (hashtags: string): string => {
    //Split on any whitespace
    const parts = hashtags.split(/\s+/);
    console.log("Raw input:", hashtags);
    console.log("Split parts:", parts);

    const processed = parts
      .map((tag) => {
        //Trim to remove extra spaces
        const trimmed = tag.trim();
        if (!trimmed) return "";

        // Remove leading # symbols
        const noHashes = trimmed.replace(/^#+/, "");

        // Add single # if there's anything left
        const finalTag = noHashes ? `#${noHashes}` : "";
        console.log(`Tag "${tag}" => "${finalTag}"`);
        return finalTag;
      })
      .filter(Boolean) //remove empty results
      .join(" ");

    console.log("Final hashtags:", processed);
    return processed;
  };

  const handleSaveAndUpload = async () => {
    if (!newEntry.trim()) return;

    setIsUploading(true); // Indicate that a save/upload is in progress

    try {
      const formattedHashtags = formatHashtags(entryHashtags);

      // Create a new entry object
      const newEntryObject = {
        title: newEntryTitle,
        hashtags: formattedHashtags,
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
      setEntryHashtags("");
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
    <View style={journalStyles.container}>
      <Text style={journalStyles.title}> Journal </Text>
      <TextInput
        style={journalStyles.input}
        placeholder="Write your entry title here..."
        value={newEntryTitle}
        onChangeText={setNewEntryTitle}
      />
      <TextInput
        style={journalStyles.input}
        placeholder="Any hashtags for this entry?"
        value={entryHashtags}
        onChangeText={setEntryHashtags}
      />
      <TextInput
        style={journalStyles.input}
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
      <ScrollView style={journalStyles.entriesContainer}>
        {entries.map((entry) => (
          <JournalEntry
            key={entry.id}
            title={entry.title}
            hashtags={entry.hashtags}
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
