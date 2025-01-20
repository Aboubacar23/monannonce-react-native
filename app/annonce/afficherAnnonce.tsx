import React from "react";
import { View, Text, StyleSheet, Image, Button } from "react-native";
import { useRouter} from "expo-router";

export default function AfficherAnnonce() {
  const router = useRouter();


  return (
    <View style={styles.container}>
    <Text style={styles.title}>Bienvenue </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#f9f9f9",
    alignItems: "center",
  },
  image: {
    width: "100%",
    height: 200,
    resizeMode: "cover",
    borderRadius: 10,
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
    textAlign: "center",
  },
  description: {
    fontSize: 16,
    color: "#666",
    marginBottom: 10,
    textAlign: "center",
  },
  price: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#1e90ff",
    marginBottom: 20,
  },
});

