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
    <View style={styles.container}>
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
  container: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "gray",
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
