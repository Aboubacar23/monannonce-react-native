import React from "react";
import { View, Text, StyleSheet, Image, Button } from "react-native";
import { useRouter} from "expo-router";
 
export default function AfficherAnnonce() {
  const router = useRouter();
 
  const { titre, description, prix, photo } = route.params || {};
 
  return (
<View style={styles.container}>
<Image source={{ uri: photo }} style={styles.image} />
<Text style={styles.title}>{titre}</Text>
<Text style={styles.description}>{description}</Text>
<Text style={styles.price}>Prix : {prix}</Text>
<Button title="Retour à l'accueil" onPress={() => router.push("/accueil")} />
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

