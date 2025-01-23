import React, {use, useEffect, useState} from "react";
import {View, Text, StyleSheet, Image, Button, Alert, ActivityIndicator, FlatList} from "react-native";
import {useLocalSearchParams, useNavigation, useRouter} from "expo-router";
import {Appbar} from "react-native-paper";
import {fetchAnnonceDetails} from "@/app/utils/annonce";
import FlashMessage, {showMessage} from "react-native-flash-message";

export default function ShowAnnonce() {
  const API_URL = process.env.EXPO_PUBLIC_API_URL;
  const {id} = useLocalSearchParams();
  const [loading, setLoading] = useState(true); // État pour l'indicateur de chargement
  const [annonce, setAnnonce] = useState(null); // État pour stocker l'annonce
  const [user, setUser] = useState(null); // État pour stocker l'annonce
  const navigation = useNavigation();
  const [objet, setObjet] = useState("");
  const [description, setDescription ] = useState("");
  const [commentaires, setCommentaires] = useState([]);

  //const id = id.id;
  // Charger les détails de l'annonce et de l'utilisateur
  const loadAnnonceAndUser = async () => {
    try {
      const annonceData = await fetchAnnonceDetails(id); // Récupérer les détails de l'annonce
      setAnnonce(annonceData);
      setCommentaires(annonceData.commentaires)
      setUser(annonceData.user);
    } catch (error) {
      Alert.alert("Erreur", error.message);
    } finally {
      setLoading(false); // Désactiver l'indicateur de chargement
    }
  };


  useEffect(() => {
    if (id) {
      loadAnnonceAndUser();
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
  const renderItem = ({ item }) => (
      <View style={styles.card}>
        <View style={styles.cardContent}>
          <Text style={styles.name}>{item.objet}</Text>
          <Text style={styles.role}>{item.user.nom} {item.user.nom}</Text>
          <Text style={styles.commentContent}>{item.description}</Text>
        </View>
      </View>
  );

  return (
      <View style={styles.container}>
        <Appbar.Header style={styles.appbar}>
          <Appbar.BackAction color="white"  onPress={() => navigation.goBack()}/>
          <Appbar.Content title="Détails annonce" color="white" />
          <Appbar.Action icon="plus" color="white" onPress={() => router.push({pathname: "/annonce/ajoutAnnonce"})} />
        </Appbar.Header>
        <FlashMessage position="center" />
        <View style={styles.chilDContainer}>
            <Image source={{ uri: annonce.image }} style={styles.image} />
            <Text style={styles.title}>{annonce.titre} | Prix : {annonce.prix.toFixed(2)} €</Text>
            <Text style={styles.description}>{annonce.description}</Text>
            <Text style={styles.contact}>Annonceur : {user.nom} {user.prenom}</Text>
        </View>

        <View style={styles.chilDContainer}>
          <Text style={styles.title}>Commentaires</Text>
          <FlatList
              data={commentaires}
              keyExtractor={(item) => item.id.toString()}
              renderItem={renderItem}
          />
        </View>
      </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 0,
    backgroundColor: "#E8EBEE",
  },
  chilDContainer: {
    flex: 1,
    padding: 20,
    backgroundColor: "#E8EBEE",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  appbar: {
    backgroundColor: "#045659",
    color: "#fff",
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
  commentSection: {
    padding: 20,
    backgroundColor: "#f9f9f9",
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
  commentAuthor: {
    fontWeight: "bold",
    marginBottom: 5,
  },
  commentContent: {
    color: "#333",
  },
  comment: {
    marginBottom: 15,
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },

  commentInputContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10,
  },
  commentInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    padding: 10,
    marginRight: 10,
  },
  card: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#ffffff",
    borderRadius: 10,
    padding: 10,
    marginBottom: 5,
    shadowColor: "#3b5998",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 2,
    width: "100%",
    alignSelf: "center",
  },

  cardContent: {
    flex: 1,
  },
  name: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
  },
  role: {
    fontSize: 12,
    color: "#777",
    marginTop: 2,
    fontStyle: "italic",
  },
});
