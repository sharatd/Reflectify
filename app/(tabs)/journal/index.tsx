import { View, Text, StyleSheet } from 'react-native';

export default function JournalScreen() {
    return (
        <View style={styles.container}>
            <Text>Journal</Text>
        </View>
    );
}

const styles = StyleSheet.create({
        container: {
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
        }
    })