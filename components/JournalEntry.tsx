import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { useState } from "react";
import CustomButton from "@/components/CustomButton";

interface JournalEntryProps {
  title: string;
  hashtags: string;
  content: string;
  onSelect: () => void;
  onDelete: () => void;
  isSelected: boolean;
}

export function JournalEntry({
  title,
  hashtags,
  content,
  onDelete,
  onSelect,
  isSelected,
}: JournalEntryProps) {
  return (
    <TouchableOpacity
      onPress={onSelect}
      style={[styles.card, isSelected && styles.selectedCard]}
    >
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.content}>{hashtags}</Text>
      <Text style={styles.content}>{content}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    padding: 10,
    marginVertical: 8,
    borderRadius: 8,
    backgroundColor: "#fff",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  selectedCard: {
    backgroundColor: "#e6f2ff",
    borderWidth: 1,
    borderColor: "blue",
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
  },
  content: {
    marginTop: 8,
    fontSize: 16,
  },
});
