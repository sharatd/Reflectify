import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { useState } from "react";
import CustomButton from '@/components/CustomButton';

interface JournalEntryProps {
  title: string;
  content: string;
  onSelect: () => void;
  onDelete: () => void;
  isSelected: boolean;
}

export function JournalEntry({
  title,
  content,
  onDelete,
  onSelect,
  isSelected
}: JournalEntryProps) {
  return (
    <View style={styles.card}>
      <TouchableOpacity onPress={onSelect}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.content}>{content}</Text>
      </TouchableOpacity>
      {isSelected && (
        <CustomButton styleType="danger" onClick={onDelete}>
            Delete Entry
        </CustomButton>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    padding: 10,
    marginVertical: 8,
    borderRadius: 8,
    backgroundColor: "#fff",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
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
