import React from "react";
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";

export default function HomeScreen() {
  const renderCard = (title: string, isAccent: boolean = false) => (
    <TouchableOpacity
      style={[styles.card, isAccent ? styles.accentCard : null]}
    >
      <View style={styles.cardContent}>
        <Text
          style={[
            styles.cardTitle,
            isAccent ? styles.accentText : styles.standardText,
          ]}
        >
          {title}
        </Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <LinearGradient colors={["#E6EEF6", "#F5E6E6"]} style={styles.gradient}>
        <View style={styles.header}>
          <Text style={styles.welcomeText}>Welcome Back!</Text>
          <Text style={styles.subtitleText}>
            Your daily journal awaits your thoughts and reflections
          </Text>
        </View>

        <ScrollView style={styles.content}>
          <View style={styles.grid}>
            {renderCard("Journal", true)}
            {renderCard("Add Entry")}
            {renderCard("Recent Entries")}
            {renderCard("Settings")}
          </View>
        </ScrollView>

        <View style={styles.tabBar}>
          <TouchableOpacity style={styles.tabItem}>
            <Text style={styles.tabText}>Journal</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.tabItem}>
            <Text style={styles.tabText}>Settings</Text>
          </TouchableOpacity>
        </View>
      </LinearGradient>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  gradient: {
    flex: 1,
  },
  header: {
    padding: 24,
    paddingTop: 40,
  },
  welcomeText: {
    fontSize: 32,
    fontWeight: "700",
    color: "#1A1A1A",
    marginBottom: 8,
  },
  subtitleText: {
    fontSize: 16,
    color: "#666666",
    lineHeight: 24,
  },
  content: {
    flex: 1,
    padding: 16,
  },
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  card: {
    width: "48%",
    aspectRatio: 1,
    borderRadius: 20,
    marginBottom: 16,
    padding: 16,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  standardCard: {
    backgroundColor: "#FFFFFF",
  },
  accentCard: {
    backgroundColor: "#E6F2F2",
  },
  cardContent: {
    flex: 1,
    justifyContent: "flex-end",
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: "600",
  },
  standardText: {
    color: "#1A1A1A",
  },
  accentText: {
    color: "#006666",
  },
  tabBar: {
    flexDirection: "row",
    backgroundColor: "rgba(255, 255, 255, 0.9)",
    paddingBottom: 20,
    paddingHorizontal: 16,
    borderTopWidth: 1,
    borderTopColor: "rgba(0, 0, 0, 0.1)",
  },
  tabItem: {
    flex: 1,
    alignItems: "center",
    paddingVertical: 12,
  },
  tabText: {
    fontSize: 14,
    color: "#1A1A1A",
    fontWeight: "500",
  },
});
