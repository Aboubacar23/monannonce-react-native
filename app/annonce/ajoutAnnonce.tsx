import React, { useState } from "react";
import { View, Text, TextInput, StyleSheet, Alert } from "react-native";
import {Appbar, Button, Title} from "react-native-paper";
import {useNavigation} from "expo-router"; // Importer le bouton de react-native-paper

export default function AjouterAnnonce() {
  const [titre, setTitre] = useState("");
  const [description, setDescription] = useState("");
  const [prix, setPrix] = useState("");
  const navigation = useNavigation();
  const handleSubmit = () => {
    if (!titre || !description || !prix) {
      Alert.alert("Erreur", "Tous les champs doivent être remplis");
      return;
    }
    Alert.alert("Annonce ajoutée", `Titre : ${titre}\nDescription : ${description}\nPrix : ${prix}`);
  };

  // @ts-ignore
    return (
      <View style={styles.container}>
        <Appbar.Header style={styles.appbar}>
          <Appbar.BackAction color="white"  onPress={() => navigation.goBack()}/>
          <Appbar.Content title="Ajouter Annonce" color="white" />
        </Appbar.Header>

        <View style={styles.childContainer}>

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

        </View>
      </View>
  );
}

const styles = StyleSheet.create({
  childContainer: {
    paddingTop: 20,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    margin: 20,
    backgroundColor: "#E8EBEE",

  },
  container: {
    flex: 1,
    paddingHorizontal: 0,
    paddingTop: 0,
    backgroundColor: "#E8EBEE",
  },
  title: {
    fontSize: 30,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#333",
  },
  appbar: {
    backgroundColor: "#357AB7",
    color: "#fff",
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
    marginVertical: 5,
    backgroundColor: "#045659"
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
