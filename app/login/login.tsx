import React, { useState } from "react";
import {Text, View, StyleSheet, Alert} from "react-native";
import {TextInput, Button, Avatar, Appbar} from "react-native-paper";
import {Link, router, Stack, useRouter} from "expo-router";
import { showMessage } from "react-native-flash-message";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const router = useRouter();
    const API_URL = process.env.EXPO_PUBLIC_API_URL;
    const handleLogin = async () => {
        console.log("Email", email);
        console.log("Password", password);
        if (!email || !password) {
            Alert.alert('Erreur', 'Veuillez remplir tous les champs !');
            /*showMessage({
                message: "Erreur",
                description: "Veuillez remplir tous les champs.",
                type: "danger",
                icon: "danger",
            });*/
            return;
        }

        setLoading(true);
        try {
            const response = await fetch(`${API_URL}/users/login`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    email,
                    password,
                }),
            });

            const data = await response.json();

            if (response.ok) {
                Alert.alert('Success', 'Connexion !');
                /*showMessage({
                    message: "Succès",
                    description: "Connexion réussie!",
                    type: "success",
                    icon: "success",
                });*/
                router.push("../annonce/liste_annonce"); // Redirection vers la page d'accueil après connexion
            } else {
                Alert.alert('Erreur', data.message || "Identifiants incorrects.");
                /*showMessage({
                    message: "Erreur",
                    description: data.message || "Identifiants incorrects.",
                    type: "danger",
                    icon: "danger",
                });*/
            }
        } catch (error) {
            console.error(error);
            Alert.alert('Erreur', "Problème de connexion au serveur.");
            /*showMessage({
                message: "Erreur",
                description: "Problème de connexion au serveur.",
                type: "danger",
                icon: "danger",
            });*/
        } finally {
            setLoading(false);
        }
    };

    return (
        <View style={styles.container}>
            <Appbar.Header style={styles.appbar}>
                <Appbar.Action icon="menu" color="white"/>
                <Appbar.Content title="Se Connecter" color="white" />
                <Appbar.Action icon="plus" color="white" onPress={() => router.push({pathname: "/annonce/ajoutAnnonce"})} />
            </Appbar.Header>
            <View style={styles.childContainer}>
                <Avatar.Icon size={60} icon="account" style={styles.avatar} />
                <Text style={styles.title}>Welcome Back</Text>
                <TextInput
                    label="Email"
                    mode="outlined"
                    style={styles.input}
                    value={email}
                    onChangeText={setEmail}
                    keyboardType="email-address"
                    autoCapitalize="none"
                />
                <TextInput
                    label="Password"
                    mode="outlined"
                    style={styles.input}
                    value={password}
                    onChangeText={setPassword}
                    secureTextEntry
                />
                <Button
                    icon="login"
                    mode="contained"
                    style={styles.button}
                    loading={loading}
                    onPress={handleLogin}
                >
                    Se Connecter
                </Button>
                <View style={styles.linksContainer}>
                    <Link href={{ pathname : '/login/register'}} style={styles.link2}>Créer un compte</Link>
                    <Link href={{ pathname : '/login/register'}} style={styles.link2}>Mot de passe oublié ?</Link>
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 0,
        backgroundColor: "#1A3D5B",
    },
    childContainer: {
        flex: 1,
        //justifyContent: "center",
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
        marginBottom: 10,
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
        backgroundColor: "#045659"
    },
    link2: {
        textDecorationLine: "underline",
        color: "#045659",
        marginHorizontal: 10,
        fontSize: 16,
    },
    linksContainer: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        marginTop: 10,
    },
});

export default Login;
