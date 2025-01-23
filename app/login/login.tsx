import React, { useState } from "react";
import {Text, View, StyleSheet, Alert} from "react-native";
import {TextInput, Button, Avatar, Appbar} from "react-native-paper";
import {Link, router, Stack, useRouter} from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import FlashMessage, {showMessage} from "react-native-flash-message";

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
            return showMessage({
                message: 'Erreur',
                description: 'Veuillez remplir tous les champs !',
                type: 'danger',
                icon: 'danger',
            });
        }

        var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if (!re.test(email) || email.length === 0) {
            return showMessage({
                message: 'Erreur',
                description: 'Votre email est invalide',
                type: 'danger',
                icon: 'danger',
            });
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
                console.log("-----------------------------");
                await AsyncStorage.setItem("token", data.token);
                await AsyncStorage.setItem('user', JSON.stringify(data.user));
                const user = await AsyncStorage.getItem('user');
                console.log("User login : ", user);
                console.log("----------------------------");

                showMessage({
                    message: 'Success',
                    description: 'Connexion établie avec succès !',
                    type: 'success',
                    icon: 'success',
                });
                router.push("../annonce/liste_annonce"); // Redirection vers la page d'accueil après connexion
            } else {
                Alert.alert('Erreur', data.message || "Identifiants incorrects.");
            }
        } catch (error) {
            console.error(error);
            Alert.alert('Erreur', "Problème de connexion au serveur.");
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
            <FlashMessage position="center" />
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
