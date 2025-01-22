import * as React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import {NavigationContainer, NavigationIndependentTree} from '@react-navigation/native';
import {createBottomTabNavigator} from "@react-navigation/bottom-tabs";
import Icon  from "react-native-vector-icons/Ionicons";
import ListAnnonceSreen from "@/app/annonce/liste_annonce";
import LoginScreen from "@/app/login/login";
import AccueilScreen from "@/app/accueil";
import RegisterScreen from "@/app/login/register";
import {createStackNavigator} from "@react-navigation/stack";
// Composants des écrans
// Composants des écrans avec styles



// Création du Tab Navigator
const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();
// Stack imbriqué pour Login
function LoginStack() {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="Register" component={RegisterScreen} />
        </Stack.Navigator>
    );
}

export default function App() {
    return (
        <NavigationIndependentTree>
            <NavigationContainer>
                <Tab.Navigator
                    initialRouteName="Home"
                    screenOptions={({ route }) => ({
                        headerShown: false,
                        tabBarStyle: styles.tabBar,
                        tabBarActiveTintColor: '#00ffc4',
                        tabBarInactiveTintColor: '#fff',
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
                    <Tab.Screen name="Home" component={AccueilScreen} options={{ title: "Home" }} />
                    <Tab.Screen name="Annonce" component={ListAnnonceSreen} options={{ title: "Annonces" }} />
                    <Tab.Screen name="Login" component={LoginStack} options={{ title: "Mon Compte" }} />
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
        backgroundColor: '#1A3D5B',
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
        backgroundColor: '#045659',
        borderTopWidth: 1,
        borderTopColor: '#d1d1d1',
        height: 60,
    },
});
