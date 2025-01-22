import {Alert, StyleSheet, Text, View} from "react-native";
import {Appbar, Avatar, Button, TextInput} from "react-native-paper";
import {Link, Stack, useNavigation, useRouter} from "expo-router";
import React, {useState} from "react";
import { useRegister } from "@/components/register";
import {showMessage} from "react-native-flash-message";


const register =() => {
    const [nom, setNom] = useState("");
    const [prenom, setPrenom] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const router = useRouter();
    const navigation = useNavigation();
    const API_URL = process.env.EXPO_PUBLIC_API_URL;

    const handleRegister = async () => {
        console.log("Password : ", password);
        console.log("Confirme Password : ", confirmPassword);
        if (password !== confirmPassword) {
            Alert.alert('Erreur', 'Les mots de passe ne correspondent pas.');
            /*showMessage({
                 message: "Erreur",
                 description: "les mots de passe ne correspondent pas",
                 type: "danger",
                 icon: "danger"
             });*/
            return;
        }
        setLoading(true);
        try {
            const res = await fetch(`${API_URL}/users/register`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    nom,
                    prenom,
                    email,
                    password
                }),
            });
            const data = await res.json();
            if (res.ok) {

                Alert.alert('Erreur', 'User créé avec succès !');
                /*showMessage({
                    message: "Erreur",
                    description: "les mots de passe ne correspondent pas",
                    type: "danger",
                    icon: "danger"
                });*/
                router.push("../login/login");

            } else {
                Alert.alert('Erreur', data.message || "Une erreur est survenue.");
                /*showMessage({
                    message: "Erreur",
                    description: data.message || "Une erreur est survenue.",
                    type: "danger",
                    icon: "danger",
                });**/
            }
        } catch (error) {
            console.log(error);
            Alert.alert('Erreur',"Erreur de connexion au serveur.");

            /*showMessage({
                message: "Erreur",
                description: "Erreur de connexion au serveur.",
                type: "danger",
                icon: "danger",
            });*/

        } finally {
            setLoading(false);
        }
    }

    return (
        <View style={styles.container}>
            <Appbar.Header style={styles.appbar}>
                <Appbar.BackAction color="white" onPress={() => navigation.goBack() } />
                <Appbar.Content title="Register" color="white" />
                <Appbar.Action icon="plus" color="white" onPress={() => router.push({pathname: "/annonce/ajoutAnnonce"})} />
            </Appbar.Header>
            <View style={styles.childContainer}>
                <Avatar.Icon size={60} icon="account" style={styles.avatar} />
                <Text style={styles.title}>Register Form</Text>
                <TextInput
                    label="Nom"
                    mode="outlined"
                    value={nom}
                    onChangeText={setNom}
                    style={styles.input}
                    autoCapitalize="none"
                />
                <TextInput
                    label="Prenom"
                    mode="outlined"
                    value={prenom}
                    onChangeText={setPrenom}
                    style={styles.input}
                    autoCapitalize="none"
                />
                <TextInput
                    label="Email"
                    mode="outlined"
                    value={email}
                    onChangeText={setEmail}
                    style={styles.input}
                    keyboardType="email-address"
                    autoCapitalize="none"
                />
                <TextInput
                    label="Password"
                    mode="outlined"
                    value={password}
                    onChangeText={setPassword}
                    style={styles.input}
                    secureTextEntry
                />
                <TextInput
                    label="Confirm Password"
                    mode="outlined"
                    value={confirmPassword}
                    onChangeText={setConfirmPassword}
                    style={styles.input}
                    secureTextEntry
                />
                <Button
                    icon="login"
                    mode="contained"
                    style={styles.button}
                    loading={loading}
                    onPress={handleRegister}
                >
                    Créer un compte
                </Button>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 0,
        backgroundColor: '#1A3D5B',
    },
    childContainer: {
        flex: 1,
        alignItems: "center",
        padding: 20,
        backgroundColor: "#E8EBEE",
    },

    avatar: {
        backgroundColor: "#f9f9f9",
        marginBottom: 20,
    },
    appbar: {
        backgroundColor: "#045659",
        color: "#fff",
    },
    title: {
        fontSize: 30,
        fontWeight: "bold",
        marginBottom: 20,
        color: "#333",
    },

    input: {
        width: "100%",
        marginBottom: 15,
    },
    button: {
        width: "100%",
        paddingVertical: 5,
        marginVertical: 10,
        backgroundColor: "#045659",
    },

    link: {
        marginTop: 10,
    },

    link2: {
        textDecorationLine: "underline", // Souligne le texte
        color: "#5b33ff", // Couleur bleue pour le style lien
        marginHorizontal: 10, // Ajoute un espace entre les liens
        fontSize: 16, // Taille de texte confortable
    },

    linksContainer: {
        flexDirection: "row", // Aligner les liens horizontalement
        justifyContent: "center", // Centre les liens horizontalement
        alignItems: "center", // Centre verticalement
        marginTop: 10,
    }
});
export default register;
