import React from "react";
import { View, Text, StyleSheet, FlatList, Image, SafeAreaView } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import {Appbar} from "react-native-paper";
import {router, useNavigation} from "expo-router";
import ajouterAnnonce from "./annonce/ajoutAnnonce";

// Importez le logo
const logo = require("../assets/images/s.png");

const DATA = [
  { id: "1", name: "Henry Curtis", role: "Vendeur", rating: 5, image: "https://randomuser.me/api/portraits/men/1.jpg" },
  { id: "2", name: "Michael Harvey", role: "Vendeur", rating: 3, image: "https://randomuser.me/api/portraits/men/2.jpg" },
  { id: "3", name: "Craig Arnold", role: "Vendeur", rating: 5, image: "https://randomuser.me/api/portraits/men/3.jpg" },
  { id: "4", name: "Ortiz Wheeler", role: "Acheteur", rating: 0, image: "https://randomuser.me/api/portraits/men/4.jpg" },
  { id: "5", name: "Curtis Michael", role: "Acheteur", rating: 0, image: "https://randomuser.me/api/portraits/men/5.jpg" },
];

export default function AccueilScreen() {
  const navigation = useNavigation();
  const renderStars = (rating: number) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <Icon
          key={i}
          name={i <= rating ? "star" : "star-outline"}
          size={16}
          color="#FFD700"
        />
      );
    }
    return stars;
  };

  // @ts-ignore
  const renderItem = ({ item }) => (
    <View style={styles.card}>
      <Image source={{ uri: item.image }} style={styles.avatar} />
      <View style={styles.cardContent}>
        <Text style={styles.name}>{item.name}</Text>
        <Text style={styles.role}>{item.role}</Text>
        {item.role === "Vendeur" && (
          <View style={styles.stars}>{renderStars(item.rating)}</View>
        )}
      </View>
      {item.role === "Vendeur" && item.rating === 5 && (
        <Image
          source={{
            uri: "https://icon-library.com/images/medal-icon-png/medal-icon-png-26.jpg",
          }}
          style={styles.badge}
        />
      )}
    </View>
  );

  return (
      <View style={styles.container}>
        <Appbar.Header style={styles.appbar}>
          <Appbar.Action icon="menu" color="white"/>
          <Appbar.Content title="Mon Annonce" color="white" />
          <Appbar.Action icon="plus" color="white" onPress={() => router.push({pathname: "/annonce/ajoutAnnonce"})} />
        </Appbar.Header>

        <SafeAreaView style={styles.container}>
          {/* Logo avant le titre */}
          <Image source={logo} style={styles.logo} />
          <Text style={styles.header}>Aller plus loin avec nos annonces</Text>
          <FlatList
              data={DATA}
              renderItem={renderItem}
              keyExtractor={(item) => item.id}
              showsVerticalScrollIndicator={false}
          />
        </SafeAreaView>
      </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#E8EBEE",
    paddingHorizontal: 0,
    paddingTop: 0,
  },
  logo: {
    width: 100, // Largeur du logo
    height: 100, // Hauteur du logo
    resizeMode: "contain", // Garde les proportions de l'image
    alignSelf: "center", // Centre le logo horizontalement
    marginBottom: 10, // Espace entre le logo et le titre
  },
  appbar: {
    backgroundColor: "#045659",
    color: "#fff",
  },
  iconHom: {
    color: "#fff"
  },
  header: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#3b5998",
    textAlign: "center",
    marginBottom: 10,
    letterSpacing: 1.2,
  },
  card: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#ffffff",
    borderRadius: 12,
    padding: 15,
    marginBottom: 12,
    shadowColor: "#3b5998",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
    width: "90%",
    alignSelf: "center",
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 15,
  },
  cardContent: {
    flex: 1,
  },
  name: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
  },
  role: {
    fontSize: 14,
    color: "#777",
    marginTop: 2,
    fontStyle: "italic",
  },
  stars: {
    flexDirection: "row",
    marginTop: 5,
  },
  badge: {
    width: 24,
    height: 24,
    marginLeft: 10,
  },
});
