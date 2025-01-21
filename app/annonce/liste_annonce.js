import {Text, View, Alert, Image, StyleSheet, FlatList, ActivityIndicator, TouchableOpacity} from "react-native";
import {Appbar, Card, Drawer, List} from "react-native-paper";
import {useEffect, useState} from "react";
import Icon from "react-native-vector-icons/Ionicons";
import {useRouter} from "expo-router";

export default function ListeAnnonce() {
    const API_URL = process.env.EXPO_PUBLIC_API_URL;
    const [annonces, setAnnonces] = useState([]);
    const [loading, setLoading] = useState(true);
    const router = useRouter();
    console.log('Base URL:', API_URL);
    const fetchAnnonces = async () => {
        try {
            const response = await fetch(`${API_URL}/annonces/lists`);
            if (!response.ok)
            {
                throw new Error("Erreur lors de la récuperations des annonce");
            }
            const data = await response.json();
            setAnnonces(data.annonces);
        }catch (error){
            // @ts-ignore
            Alert.alert("Erreur", error.message);
        }finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchAnnonces();
    }, []);



    // Rendu d'une annonce
    // @ts-ignore
    const renderAnnonce = ({ item }) => (
        <Card style={styles.card}>
            <Card.Content>
                <Image source={{ uri: item.image }} style={styles.image} />
                <Text style={styles.title}>{item.titre}</Text>
                <View style={styles.row}>
                    <Text style={styles.price}>{item.prix} Є</Text>
                    <TouchableOpacity style={styles.detailsButton}
                        onPress={() => router.push({ pathname:"/annonce/showAnnonce", params: { id: item.id } })}>
                    <Text style={styles.detailsButtonText}>
                            <Icon name="eye" style={styles.eye} />
                        </Text>
                    </TouchableOpacity>
                </View>
            </Card.Content>
        </Card>
    );


    return (
        <View style={styles.container}>
            {/*<Appbar.Header style={styles.header}>
                <Appbar.Content title="Liste des annonces"  style={styles.title}/>
            </Appbar.Header>*/}

            {/* Indicateur de Chargement */}
            {loading ? (
                <ActivityIndicator
                    size="large"
                    color="#1e90ff"
                    style={styles.loader}
                />
            ) : (
                <FlatList
                    data={annonces}
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
        backgroundColor: "#f9f9f9",
    },
    menuItem: {
        marginVertical: 5, // Espacement entre les éléments du menu
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
        padding: 25
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

    navLinks: {
        flexDirection: "row", // Les liens sont alignés horizontalement
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
        marginBottom: 10,
        borderRadius: 8,
        overflow: "hidden",
        elevation: 2,
    },
    image: {
        width: "100%",
        height: 150,
        resizeMode: "cover",
    },
    title: {
        fontSize: 18,
        fontWeight: "bold",
        marginTop: 10,
    },
    price: {
        fontSize: 16,
        color: "#5b33ff",
        marginTop: 5,
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
        backgroundColor: "#5b33ff",
        paddingVertical: 10,
        borderRadius: 5,
        alignItems: "center",
    },
    detailsButtonText: {
        color: "#fff",
        fontSize: 16,
        fontWeight: "bold",
    },
});
