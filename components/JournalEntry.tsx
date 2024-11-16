import { View, Text, StyleSheet } from 'react-native';
import { useState } from 'react';

interface JournalEntryProps {
    title: string;
    content: string;
}

export function JournalEntry({ title, content }: JournalEntryProps) {
    
    return (
        <View style={styles.container}>
            <Text style={styles.title}>{title}</Text>
            <Text style={styles.content}>{content}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        padding: 16,
        borderBottomWidth: 1,
        borderBottomColor: 'gray',
    },
    title: {
        fontSize: 18, 
        fontWeight: 'bold',
    },
    content: {
        marginTop: 8,
        fontSize: 16,
    },
})