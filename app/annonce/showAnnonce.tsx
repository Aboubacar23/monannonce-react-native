import React, {use, useEffect, useState} from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  Button,
  Alert,
  ActivityIndicator,
  FlatList,
  TouchableOpacity, TextInput
} from "react-native";
import {router, useLocalSearchParams, useNavigation, useRouter} from "expo-router";
import {Appbar, Card} from "react-native-paper";
import {fetchAnnonceDetails, handleDeleteAnnonce, handleAddComment} from "@/app/utils/annonce";
import FlashMessage, {showMessage} from "react-native-flash-message";
import moment from "moment/moment";
import AsyncStorage from "@react-native-async-storage/async-storage";

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
          <Appbar.BackAction color="white"  onPress={() => router.push('/')}/>
          <Appbar.Content title="Détails annonce" color="white" />
          <Appbar.Action icon="plus" color="white" onPress={() => router.push({pathname: "/annonce/ajoutAnnonce"})} />
        </Appbar.Header>

        <FlashMessage position="center" />

        <View style={styles.chilDContainer}>
          <Card style={styles.card}>
            <Image source={{ uri: annonce.image }} style={styles.image} />
            <View style={styles.titleContainer}>
              <Text style={styles.titre}>{annonce.titre}</Text>
              <Text style={styles.prix}>{annonce.prix.toFixed(2)} Є</Text>
            </View>
            <View style={styles.featuresContainer}>
              <View style={styles.feature}>
                <Text style={styles.featureTitle}>Catégorie</Text>
                <Text style={styles.featureValue}>{annonce.categorie}</Text>
              </View>
              <View style={styles.feature}>
                <Text style={styles.featureTitle}>Statut</Text>
                <Text style={styles.featureValue}>{annonce.statut}</Text>
              </View>
              <View style={styles.feature}>
                <Text style={styles.featureTitle}>Date</Text>
                <Text style={styles.featureValue}>{moment(annonce.createdAt).locale('fr').format('DD-MM-YYYY')}</Text>
              </View>
            </View>
            <View style={styles.actionsContainer}>
              <TouchableOpacity style={styles.buttonPrimary}
                                onPress={() => Alert.alert("Description", annonce.description)}>
                <Text style={styles.buttonPrimaryText}>Voir Description</Text>
              </TouchableOpacity>
              <TouchableOpacity
                  style={styles.buttonSecondary}
                  onPress={() =>
                      Alert.alert(
                          "Confirmation",
                          "Êtes-vous sûr de vouloir supprimer cette annonce ?",
                          [
                            { text: "Annuler", style: "cancel" },
                            {
                              text: "Supprimer",
                              style: "destructive",
                              onPress: () => handleDeleteAnnonce(annonce.id),
                            },
                          ]
                      )
                  }>
                <Text style={styles.buttonSecondaryText}>Delete</Text>
              </TouchableOpacity>
            </View>
          </Card>
        </View>

        <View style={[styles.commentInputContainer, styles.card]}>
          <TextInput
              style={styles.commentInput}
              placeholder="Ajouter objet..."
              placeholderTextColor="#777"
              value={objet}
              onChangeText={(text) => setObjet(text)}
          />
          <TextInput
            style={styles.commentInput}
            placeholder="Ajouter un commentaire..."
            value={description}
            onChangeText={(text) => setDescription(text)}
          />
          <TouchableOpacity
              style={styles.buttonPrimary}
              onPress={() => handleAddComment(
                  annonce?.id,
                  objet,
                  description,
                  setObjet,
                  setDescription,
                  setLoading
              )}
          >
            <Text style={styles.buttonPrimaryText}>Envoyer</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.chilDContainer}>
          <Text style={styles.titre}>Commentaires</Text>
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
    padding: 2,
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

  errorContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    width: "100%",
    height: 150,
    resizeMode: "cover",
  },

  commentSection: {
    padding: 20,
    backgroundColor: "#f9f9f9",
  },
  description: {
    fontSize: 16,
    marginBottom: 10,
    color: "#f9f9f9",
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
    flexDirection: "column",
   // alignItems: "center",
    marginVertical: 10,
    marginTop: 110,
    padding: 10,
    color: "#000",
    paddingHorizontal: 10,
  },
  commentInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#045659",
    fontWeight: "bold",
    borderRadius: 5,
    padding: 15,
    margin: 10,
    marginRight: 10,
    backgroundColor: "#f0f8ff",
    color: "#000",
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 10,
    shadowColor: "#fff",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 3,
    margin: 10,
    padding: 5,
    overflow: "hidden",
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
  titre: {
    fontSize: 15,
    fontWeight: "bold",
    color: "#333",
  },
  prix: {
    fontSize: 15,
    fontWeight: "bold",
    color: "#045659",
  },
  featuresContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 5,
    paddingVertical: 5,
    backgroundColor: "#f9f9f9",
  },
  feature: {
    alignItems: "center",
  },
  featureTitle: {
    fontSize: 13,
    color: "#777",
    marginBottom: 5,
  },
  featureValue: {
    fontSize: 15,
    fontWeight: "bold",
    color: "#333",
  },
  actionsContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    padding: 15,
    backgroundColor: "#fff",
  },
  buttonPrimary: {
    backgroundColor: "#045659",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  buttonPrimaryText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
    alignItems: "center"
  },
  buttonSecondary: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "#cb1414",
  },
  buttonSecondaryText: {
    color: "#cb1414",
    fontSize: 16,
    fontWeight: "bold",
  },
  navLinks: {
    flexDirection: "row", // Les liens sont alignés horizontalement
    alignItems: "center",
  },
  titleContainer: {
    padding: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
});
