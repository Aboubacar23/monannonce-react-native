import React, { useState } from "react";
import { View, Text, TextInput, StyleSheet, Alert } from "react-native";
import { Button, Title } from "react-native-paper"; // Importer le bouton de react-native-paper
import { Link, Stack } from "expo-router";

export default function AjouterAnnonce() {
  const [titre, setTitre] = useState("");
  const [description, setDescription] = useState("");
  const [prix, setPrix] = useState("");

  const handleSubmit = () => {
    if (!titre || !description || !prix) {
      Alert.alert("Erreur", "Tous les champs doivent être remplis");
      return;
    }
    Alert.alert("Annonce ajoutée", `Titre : ${titre}\nDescription : ${description}\nPrix : ${prix}`);
  };

  return (
    <View style={styles.container}>
        <Stack.Screen options={{
            title : "Ajouter annonce"
        }} />
        
      <Text style={styles.title}>Ajouter une annonce</Text>

      {/* Champ Titre */}
      <TextInput
        style={styles.input}
        placeholder="Titre de l'annonce"
        value={titre}
        onChangeText={setTitre}
      />

      {/* Champ Description */}
      <TextInput
        style={[styles.input, styles.textarea]}
        placeholder="Description de l'annonce"
        value={description}
        onChangeText={setDescription}
        multiline
      />

      {/* Champ Prix */}
      <TextInput
        style={styles.input}
        placeholder="Prix de l'annonce"
        value={prix}
        onChangeText={setPrix}
        keyboardType="numeric"
      />

      {/* Nouveau bouton Ajouter */}
      <Button
        icon="plus-circle"
        mode="contained"
        onPress={handleSubmit}
        style={styles.button}
      >
        Ajouter l'annonce
      </Button>

      {/* Lien pour retourner à l'accueil */}
      <Link href="/accueil" style={styles.link}>
        <Text style={styles.linkText}>Retour à l'accueil</Text>
      </Link>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    backgroundColor: "#f5f5f5",
  },
  title: {
    fontSize: 30,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#333",
  },
  input: {
    width: "100%",
    height: 40,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 5,
    paddingLeft: 10,
    marginBottom: 15,
  },
  textarea: {
    height: 80,
    textAlignVertical: "top", // Pour aligner le texte au haut de la zone
  },
  paperButton: {
    width: "100%",
    marginVertical: 10,
    borderRadius: 5,
  },
  button: {
    width: "100%",
    fontSize: 16,
    paddingVertical: 10,
    marginVertical: 5
  },
  link: {
    marginTop: 10,
  },
  linkText: {
    fontSize: 16,
    color: "#4a90e2",
    textDecorationLine: "underline",
  },
});
