import { StyleSheet } from "react-native";

export const journalStyles = StyleSheet.create({
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
