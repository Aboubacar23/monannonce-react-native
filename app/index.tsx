import * as React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import {NavigationContainer, NavigationIndependentTree} from '@react-navigation/native';
import {createBottomTabNavigator} from "@react-navigation/bottom-tabs";
import Icon  from "react-native-vector-icons/Ionicons";
import ListAnnonceSreen from "@/app/annonce/liste_annonce";
import LoginScreen from "@/app/login/login";

// Composants des écrans
// Composants des écrans avec styles
function HomeScreen() {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Page d'accueil</Text>
        </View>
    );
}


// Création du Tab Navigator
const Tab = createBottomTabNavigator();

export default function App() {
    return (
        <NavigationIndependentTree>
            <NavigationContainer>
                <Tab.Navigator
                    initialRouteName="Home"
                    screenOptions={({ route }) => ({
                        headerShown: false,
                        tabBarStyle: styles.tabBar,
                        tabBarActiveTintColor: '#007AFF',
                        tabBarInactiveTintColor: '#8e8e93',
                        tabBarIcon: ({ color, size }) => {
                            let iconName;

                            if (route.name === 'Home') {
                                iconName = 'home-outline'; // Icône pour Home
                            } else if (route.name === 'Annonce') {
                                iconName = 'megaphone-outline'; // Icône pour Annonce
                            } else if (route.name === 'Login') {
                                iconName = 'person-outline'; // Icône pour Login
                            }

                            // Retourne l'icône appropriée
                            // @ts-ignore
                            return <Icon name={iconName} size={size} color={color} />;
                        },
                    })}
                >
                    <Tab.Screen name="Home" component={HomeScreen} options={{ title: "Home" }} />
                    <Tab.Screen name="Annonce" component={ListAnnonceSreen} options={{ title: "Annonces" }} />
                    <Tab.Screen name="Login" component={LoginScreen} options={{ title: "Login" }} />
                </Tab.Navigator>
            </NavigationContainer>
        </NavigationIndependentTree>
    );
}

// Styles CSS
const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#f5f5f5',
        padding: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 20,
    },
    button: {
        backgroundColor: '#5b33ff',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 5,
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
    tabBar: {
        backgroundColor: '#ffffff',
        borderTopWidth: 1,
        borderTopColor: '#d1d1d1',
        height: 60,
    },
});
