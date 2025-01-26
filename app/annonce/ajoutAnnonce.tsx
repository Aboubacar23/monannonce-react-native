import React, {useEffect, useState} from "react";
import {View, TextInput, StyleSheet, Alert, Image, ActivityIndicator, Text} from "react-native";
import {Appbar, Avatar, Button} from "react-native-paper";
import {useRouter} from "expo-router";
import {SelectList} from "react-native-dropdown-select-list";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {checkUserLoggedIn} from "@/app/hooks/checkUserLoggedIn";
import FlashMessage from "react-native-flash-message";
import * as ImagePicker from 'expo-image-picker';

export default function AjouterAnnonce() {
  const [titre, setTitre] = useState("");
  const [description, setDescription] = useState("");
  const [prix, setPrix] = useState();
  const [image, setImage] = useState("");
  const [selected, setSelected ] = useState('Véhicule');
  const [loading, setLoading ] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

  const router = useRouter();

  const API_URL = process.env.EXPO_PUBLIC_API_URL;

  const data = [
    {key: 'Véhicule', value: "Véhicule"},
    {key: 'Électronique', value: "Électronique"},
    {key: 'Immobilier', value: "Immobilier"},
    {key: 'Autres', value: "Autres"},
  ];
  // Vérifiez si l'utilisateur est connecté au montage du composant
  useEffect(() => {
    checkUserLoggedIn(router);
  }, []);

  const handleSubmit = async () => {
    const userStore = await AsyncStorage.getItem('user');
    const user = JSON.parse(userStore);
    if (!user || !user.id) {
      Alert.alert("Erreur", "Utilisateur non connecté.");
      return;
    }
    if (!titre || !selected || !prix) {
      Alert.alert("Erreur", "Tous les champs doivent être remplis");
      return;
    }
    setLoading(true);
      // Construction de FormData pour envoyer les données et l'image
      const formData = new FormData();
      formData.append("titre", titre);
      formData.append("prix", prix);
      formData.append("categorie", selected);
      formData.append("description", description);
      formData.append("user_id", user.id);
      formData.append("image", {
        uri: image,
        name: "image.jpg",
        type: "image/jpeg",
      });
    try {
      const res = await fetch(`${API_URL}/annonces/new`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: formData,
      });
      const data = await res.json();
      console.log(data);
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
  const selectImage = async () => {
    try {
      const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (!permission.granted) {
        Alert.alert("Permission requise", "Veuillez autoriser l'accès à la galerie.");
        return;
      }

      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        quality: 1,
      });

      if (!result.canceled) {
        setImage(result.assets[0].uri);
      }
    } catch (error) {
      console.error(error);
      Alert.alert("Erreur", "Impossible de sélectionner une image.");
    }
  };

  // @ts-ignore
    return (
      <View style={styles.container}>
        <Appbar.Header style={styles.appbar}>
          <Appbar.BackAction color="white"  onPress={() => router.push('/')}/>
          <Appbar.Content title="Ajouter Annonce" color="white" />
        </Appbar.Header>
        <FlashMessage position="center" />
        <View style={styles.childContainer}>
          <Avatar.Icon icon="folder" size={60} style={styles.avatar}/>
          <View style={styles.viewInput}>
            <Text>Titre</Text>
            <TextInput
                style={styles.input}
                placeholder="Titre de l'annonce"
                value={titre}
                onChangeText={setTitre}
            />
          </View>
          <View style={styles.viewInput}>
            <Text>Prix</Text>
            <TextInput
                style={styles.input}
                placeholder="Prix de l'annonce"
                value={prix}
                onChangeText={setPrix}
                keyboardType="numeric"
            />
          </View>
          <View style={styles.viewInput}>
            <Text>Description</Text>
            <TextInput
                style={[styles.input, styles.textarea]}
                placeholder="Description de l'annonce"
                value={description}
                onChangeText={setDescription}
                multiline
            />
          </View>
          <View style={styles.selectedContenair}>
            <Text>Catégorie</Text>
            <SelectList
                setSelected={setSelected}
                data={data}
                save="value"
                placeholder="Choisir une catégorie"
            />
          </View>
          <View style={styles.viewInput}>
            <Button
                icon="image"
                mode="contained"
                onPress={selectImage} style={styles.buttonImage}></Button>
            {image && <Image source={{ uri: image }} style={{ width: 100, height: 100 }} />}
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
  },
  selectedText: {
    marginTop: 20,
    fontSize: 16,
  },
  selectedContenair: {
    justifyContent: 'center',
    paddingBottom: 40,
    padding: 5,
    width: "100%",
    height: 100,
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
    color: "#544c4c",
    borderColor: "#045659",
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
  buttonImage:  {
    width: "100%",
    height: 80,
    fontSize: 50,
    paddingVertical: 10,
    marginVertical: 5,
    backgroundColor: "#b9c5d9"
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
