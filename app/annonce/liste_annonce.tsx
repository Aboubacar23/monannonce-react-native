import {
    Text,
    View,
    Alert,
    Image,
    StyleSheet,
    FlatList,
    ActivityIndicator,
    TouchableOpacity,
    TextInput
} from "react-native";
import {Appbar, Card, Drawer, List} from "react-native-paper";
import React, {useEffect, useState} from "react";
import Icon from "react-native-vector-icons/Ionicons";
import {router, useRouter} from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import moment from "moment";

export default function ListeAnnonce() {
    const API_URL = process.env.EXPO_PUBLIC_API_URL;
    const PATH_URL = process.env.EXPO_PUBLIC_PATH_URL;
    const [annonces, setAnnonces] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState("");
    const [filteredAnnonces, setFilteredAnnonces] = useState([]);
    const router = useRouter();

    const fetchAnnonces = async () => {
        try {
            const response = await fetch(`${API_URL}/annonces/lists`);
            if (!response.ok)
            {
                throw new Error("Erreur lors de la récuperations des annonce");
            }
            const data = await response.json();
            setAnnonces(data.annonces);
            setFilteredAnnonces(data.annonces);
        }catch (error){
            // @ts-ignore
            Alert.alert("Erreur", error.message);
        }finally {
            setLoading(false);
        }
    };

    // fonction de recherche
    const handleSearch = (query) => {
        setSearchQuery(query);
        if (query.trim() === "")
        {
            setFilteredAnnonces(annonces);
        }else{
            const filtreAnnonce = annonces.filter((annonce) =>
            annonce.titre.toLowerCase().includes(query.toLowerCase())
            );
            setFilteredAnnonces(filtreAnnonce);
        }
    }

    useEffect(() => {
        fetchAnnonces();
        //setFilteredAnnonces(annonces);
    }, []);



    // Rendu d'une annonce
    // @ts-ignore
    const renderAnnonce = ({ item }) => (
        <Card style={styles.card}>
                <Image source={{ uri: `${PATH_URL}/${item.image}` }} style={styles.image} />
            <View style={styles.titleContainer}>
                <Text style={styles.titre}>{item.titre}</Text>
                <Text style={styles.prix}>{item.prix.toFixed(2)} Є</Text>
            </View>
            <View style={styles.featuresContainer}>
                <View style={styles.feature}>
                    <Text style={styles.featureTitle}>Catégorie</Text>
                    <Text style={styles.featureValue}>{item.categorie}</Text>
                </View>
                <View style={styles.feature}>
                    <Text style={styles.featureTitle}>Statut</Text>
                    <Text style={styles.featureValue}>{item.statut}</Text>
                </View>
                <View style={styles.feature}>
                    <Text style={styles.featureTitle}>Date</Text>
                    <Text style={styles.featureValue}>{moment(item.createdAt).locale('fr').format('DD-MM-YYYY')}</Text>
                </View>
            </View>
            <View style={styles.actionsContainer}>
                <TouchableOpacity style={styles.buttonPrimary}
                                  onPress={() => router.push({ pathname:"/annonce/showAnnonce", params: { id: item.id } })}>
                    <Text style={styles.buttonPrimaryText}>Show</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.buttonSecondary}
                                  onPress={() => Alert.alert("Description", item.description)}>
                    <Text style={styles.buttonSecondaryText}>Voir Description</Text>
                </TouchableOpacity>
            </View>
        </Card>
    );


    return (
        <View style={styles.container}>
            <Appbar.Header style={styles.appbar}>
                <Appbar.BackAction color="white"  onPress={() => router.push({pathname: "/"})}/>
                <Appbar.Content title="Listes des annonces" color="white" />
                <Appbar.Action icon="plus" color="white" onPress={() => router.push({pathname: "/annonce/ajoutAnnonce"})} />
            </Appbar.Header>
            <View style={styles.searchContainer}>
                <TextInput
                    style={styles.searchInput}
                    placeholder="Rechercher une annonce..."
                    value={searchQuery}
                    onChangeText={handleSearch}
                    placeholderTextColor="#777"
                />
            </View>
            {/* Indicateur de Chargement */}
            {loading ? (
                <ActivityIndicator
                    size="large"
                    color="#1e90ff"
                    style={styles.loader}
                />
            ) : (
                <FlatList
                    data={filteredAnnonces}
                    renderItem={renderAnnonce}
                    keyExtractor={(item) => item.id.toString()} // Assurez-vous que `id` est unique
                    contentContainerStyle={styles.list}
                />
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#E8EBEE",
    },
    menuItem: {
        marginVertical: 5, // Espacement entre les éléments du menu
    },
    appbar: {
        backgroundColor: "#045659",
        color: "#fff",
    },
    row: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        marginTop: 5,
    },
    eye: {
        fontSize: 17,
        width: 15,
        padding: 25,
    },
    header: {
        backgroundColor: "#5b33ff", // Bleu comme l'image
    },
    headerTitle: {
        color: "white", // Couleur du titre
        fontSize: 20,
        fontWeight: "bold",
    },
    loader: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    featuresContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        paddingHorizontal: 10,
        paddingVertical: 15,
        backgroundColor: "#f9f9f9",
    },
    feature: {
        alignItems: "center",
    },
    featureTitle: {
        fontSize: 14,
        color: "#777",
        marginBottom: 5,
    },
    featureValue: {
        fontSize: 16,
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
    },
    buttonSecondary: {
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 5,
        borderWidth: 1,
        borderColor: "#045659",
    },
    buttonSecondaryText: {
        color: "#045659",
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
    navLink: {
        marginHorizontal: 10,
        color: "white",
        textDecorationLine: "underline",
        fontSize: 16,
    },
    list: {
        padding: 10,
    },
    card: {
        backgroundColor: "#fff",
        borderRadius: 10,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 5,
        elevation: 3,
        margin: 10,
        overflow: "hidden",
    },
    image: {
        width: "100%",
        height: 150,
        resizeMode: "cover",
    },
    titre: {
        fontSize: 20,
        fontWeight: "bold",
        color: "#333",
    },
    prix: {
        fontSize: 18,
        fontWeight: "bold",
        color: "#045659",
    },
    drawer: {
        backgroundColor: "#f0f0f0",
        padding: 10,
        position: "absolute",
        top: 0, // Juste en dessous de la barre d'application
        left: 0,
        right: 0,
        elevation: 4, // Ombre pour le drawer
    },
    detailsButton: {
        marginTop: 10,
        padding: 10,
        backgroundColor: "#045659",
        paddingVertical: 10,
        borderRadius: 5,
        alignItems: "center",
    },
    detailsButtonText: {
        color: "#fff",
        fontSize: 16,
        fontWeight: "bold",
    },
    searchContainer: {
        padding: 10,
        backgroundColor: "#E8EBEE",
    },
    searchInput: {
        height: 40,
        borderWidth: 1,
        borderColor: "#045659",
        borderRadius: 5,
        paddingHorizontal: 10,
        backgroundColor: "#fff",
        color: "#000",
    },
});
