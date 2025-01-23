import React, { useState } from "react";
import { View, Text, TextInput, StyleSheet, Alert } from "react-native";
import {Appbar, Avatar, Button, Title} from "react-native-paper";
import {useNavigation, useRouter} from "expo-router";
import {SelectList} from "react-native-dropdown-select-list"; // Importer le bouton de react-native-paper

export default function AjouterAnnonce() {
  const [titre, setTitre] = useState("");
  const [description, setDescription] = useState("");
  const [prix, setPrix] = useState("");
  const [categorie, setCategorie] = useState("");
  const [image, setImage] = useState("");
  const [selected, setSelected ] = useState('Véhicule');
  const [loading, setLoading ] = useState(false);
  const navigation = useNavigation();
  const router = useRouter();

  const API_URL = process.env.EXPO_PUBLIC_API_URL;

  const data = [
    {key: 'Véhicule', value: "Véhicule"},
    {key: 'Électronique', value: "Électronique"},
    {key: 'Immobilier', value: "Immobilier"},
    {key: 'Autres', value: "Autres"},
  ];

  const handleSubmit = async () => {
    if (!titre || !categorie || !prix) {
      Alert.alert("Erreur", "Tous les champs doivent être remplis");
      return;
    }
    setLoading(true);
    try {
      const res = await fetch(`${API_URL}/annonces/new`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          titre,
          prix,
          image,
          categorie,
          description
        }),
      });
      const data = await res.json();
      if (res.ok){
        Alert.alert("Erreur", "Annonce créé avec succès !");
        router.push("../annonce/liste_annonce");
      }else {
        Alert.alert('Erreur', data.message || "Une erreur est survenue.");
      }
    }catch (error)
    {
      console.log(error);
      Alert.alert('Erreur',"Erreur de connexion au serveur.");
    } finally {
      setLoading(false);
    }
  };

  // @ts-ignore
    return (
      <View style={styles.container}>
        <Appbar.Header style={styles.appbar}>
          <Appbar.BackAction color="white"  onPress={() => navigation.goBack()}/>
          <Appbar.Content title="Ajouter Annonce" color="white" />
        </Appbar.Header>
        <View style={styles.childContainer}>
          <Avatar.Icon icon="folder" size={60} style={styles.avatar}/>
          <View style={styles.viewInput}>
            <TextInput
                style={styles.input}
                placeholder="Titre de l'annonce"
                value={titre}
                onChangeText={setTitre}
            />
          </View>
          <View style={styles.viewInput}>
            <TextInput
                style={styles.input}
                placeholder="Prix de l'annonce"
                value={prix}
                onChangeText={setPrix}
                keyboardType="numeric"
            />
          </View>
          <View style={styles.viewInput}>
            <TextInput
                style={[styles.input, styles.textarea]}
                placeholder="Description de l'annonce"
                value={description}
                onChangeText={setDescription}
                multiline
            />
          </View>
          <View style={styles.viewInput}>
            <TextInput
                style={styles.input}
                placeholder="Image"
                value={image}
                onChangeText={setDescription}
                multiline
            />
          </View>
          <View style={styles.selectedContenair}>
            <SelectList
                setSelected={setSelected}
                data={data}
                save="value"
                placeholder="Choisir une catégorie"
            />
          </View>
          <View style={styles.viewInput}>
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
  viewInput:{
    width: "100%",
    color: "#045659",
  },
  selectedText: {
    marginTop: 20,
    fontSize: 16,
  },
  selectedContenair: {
    justifyContent: 'center',
    paddingBottom: 40,
    padding: 10,
    width: "100%",
    height: 80,
  },
  avatar: {
    backgroundColor: "#045659",
    marginBottom: 20,
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
    backgroundColor: "#045659",
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
