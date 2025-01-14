import {Text, View, Button, Alert, Image, StyleSheet, TouchableOpacity, FlatList} from "react-native";
import { Link } from "expo-router";
import {Appbar, Card, Drawer, List} from "react-native-paper";
import {useState} from "react";

export default function Accueil() {
    const handleAccueilButtonPress = () => {
        Alert.alert("Bienvenue", "Ceci est l'écran d'accueil !");
    };

    const annonces = [
        {
            id: "1",
            titre: "Maison à louer",
            prix: "1200€/mois",
            photo: "https://www.trnd.com/fr/blog/lieux-insolites-ou-loger/01-kens-dreamhouse-airbnb-exterior-credit-hogwash-studios_half.jpg",
        },
        {
            id: "2",
            titre: "Voiture d'occasion",
            prix: "5000€",
            photo: "https://www.lafinancepourtous.com/wp-content/thumbnails/uploads/2021/10/assurance_location_option_achat460-tt-width-460-height-260-fill-1-crop-0-bgcolor-ffffff.png",
        },
        {
            id: "3",
            titre: "Bureau en bois",
            prix: "150€",
            photo: "https://www.liberateurdidees.com/web/image/product.template/4939/image_1024?unique=af1fbcb",
        },
    ];
    const [drawerVisible, setDrawerVisible] = useState(false);
    const toggleDrawer = () => {
        setDrawerVisible(!drawerVisible);
    }
    // Rendu d'une annonce
    const renderAnnonce = ({ item }) => (
        <Card style={styles.card}>
            <Card.Content>
                <Image source={{ uri: item.photo }} style={styles.image} />
                <Text style={styles.title}>{item.titre}</Text>
                <Text style={styles.price}>{item.prix}</Text>
            </Card.Content>
        </Card>
    );


    return (
        <View style={styles.container}>
             <Appbar.Header style={styles.header}>
                <View style={styles.navLinks}>
                        <Appbar.Content title="Acceuil" titleStyle={styles.headerTitle} />
                        <Link href="/" style={styles.navLink}>Home</Link>
                        <Link href={{ pathname: '/annonce/ajoutAnnonce'}} style={styles.navLink}>Annonce</Link>
                        <Link href={{ pathname: '/login/login'}} style={styles.navLink}>Login</Link>
                </View>
            </Appbar.Header>


            {/*    <Appbar.Header style={styles.header}>
                <Appbar.Action icon="menu" onPress={toggleDrawer} />
                <Appbar.Content title="Mon Annonce" style={styles.title} />
            </Appbar.Header>
            { drawerVisible && (
                <Drawer.Section style={styles.drawer}>
                    <Drawer.Item
                        label="Home"
                        icon="home"
                        onPress={() => console.log("Navigate to Home")}
                    />
                    <Drawer.Item
                        label="Annonce"
                        icon="format-list-bulleted"
                        onPress={() => console.log("Navigate to Annonce")}
                    />
                    <Drawer.Item
                        label="Login"
                        icon="login"
                        onPress={() => console.log("Navigate to Login")}
                    />
                </Drawer.Section>
            )}*/}

            <FlatList
                data={annonces}
                renderItem={renderAnnonce}
                keyExtractor={(item) => item.id}
                contentContainerStyle={styles.list}
            />
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

    header: {
        backgroundColor: "#1e90ff", // Bleu comme l'image
    },
    headerTitle: {
        color: "white", // Couleur du titre
        fontSize: 20,
        fontWeight: "bold",
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
        color: "#1e90ff",
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
});
