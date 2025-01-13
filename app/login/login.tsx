import React from 'react';
import { Text, View, StyleSheet } from 'react-native';

import { TextInput, Button, Avatar } from "react-native-paper";
import {Link, Stack} from "expo-router";

const Login = () => {
    return (
        <View style={styles.container}>
            <Stack.Screen options={{
                title: "Login"
            }} />
            <Avatar.Icon size={80} icon="account" style={styles.avatar} />
            <Text style={styles.title}>Welcome Back</Text>
            <TextInput
                label="Email"
                mode="outlined"
                style={styles.input}
                keyboardType="email-address"
                autoCapitalize="none"
            />
            <TextInput
            label="Password"
            mode="outlined"
            style={styles.input}
            secureTextEntry
            />
            <Button
                icon="login"
                mode="contained"
                style={styles.button}
                onPress={() => console.log("Login pressed")}
            >
                Se Connecter
            </Button>
            <View style={styles.linksContainer}>
                <Link href={{ pathname : '/login/register'}} style={styles.link2}>Créer un compte</Link>
                <Link href={{ pathname : '/login/register'}} style={styles.link2}>Mot de passe oublié ?</Link>
            </View>
        </View>

    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
        backgroundColor: '#f5f5f5',
    },
    avatar: {
        backgroundColor: "#f9f9f9",
        marginBottom: 20,
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
    },

    link: {
        marginTop: 10,
    },

    link2: {
        textDecorationLine: "underline", // Souligne le texte
        color: "#1e90ff", // Couleur bleue pour le style lien
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

export default Login;
