import React, {useEffect, useState} from "react";
import {View, Text, StyleSheet, Image, Button, Alert, ActivityIndicator} from "react-native";
import {useLocalSearchParams, useRouter} from "expo-router";
import {useSearchParams} from "expo-router/build/hooks";
import {Appbar} from "react-native-paper";

export default function ShowAnnonce() {
  const {id} = useLocalSearchParams();
  const [loading, setLoading] = useState(true); // État pour l'indicateur de chargement
  const [annonce, setAnnonce] = useState(null); // État pour stocker l'annonce

  //const id = id.id;
  const fetchAnnonceDetails = async () => {
    try {
      const response = await fetch(`https://cf0b-185-48-252-9.ngrok-free.app/api/annonces/show/${id}`);
      if (!response.ok) {
        throw new Error("Erreur lors du chargement de l'annonce.");
      }

      const data = await response.json();
      setAnnonce(data.annonce);

      console.log("response de fetch");
      console.log(data.annonce);
    }catch (error) {
      // @ts-ignore
      Alert.alert("Erreur", error.message);
    } finally {
      setLoading(false); // Désactive l'indicateur de chargement
    }
  };

  useEffect(() => {
    if (id) {
      fetchAnnonceDetails();
    }
  }, [id]);


  // Affichage de l'indicateur de chargement
  if (loading) {
    return (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#0000ff" />
          <Text>Chargement des détails de l'annonce...</Text>
        </View>
    );
  }

  // Affichage des détails de l'annonce
  if (!annonce) {
    return (
        <View style={styles.errorContainer}>
          <Text>Impossible de charger les détails de l'annonce.</Text>
        </View>
    );
  }

  return (

      <View style={styles.container}>
        <View style={styles.container}>
            <Image source={{ uri: annonce.image }} style={styles.image} />
            <Text style={styles.title}>{annonce.titre}</Text>
            <Text style={styles.description}>{annonce.description}</Text>
            <Text style={styles.price}>Prix : {annonce.prix.toFixed(2)} €</Text>
            <Text style={styles.contact}>Contact : {annonce.contact}</Text>
        </View>
      </View>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  header: {
    backgroundColor: "#5b33ff", // Bleu comme l'image
  },
  errorContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    width: "100%",
    height: 200,
    resizeMode: "cover",
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
  },
  description: {
    fontSize: 16,
    marginBottom: 10,
    color: "#555",
  },
  price: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  contact: {
    fontSize: 16,
    color: "#007BFF",
  },
});
