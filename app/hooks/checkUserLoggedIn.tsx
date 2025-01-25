import AsyncStorage from "@react-native-async-storage/async-storage";
import { Alert } from "react-native";

export const checkUserLoggedIn = async (router: Router) => {
    try {
        const storedUser = await AsyncStorage.getItem("user");
        if (!storedUser) {
            // Redirigez l'utilisateur vers la page de connexion s'il n'est pas connecté
            Alert.alert("Accès refusé", "Veuillez vous connecter pour ajouter une annonce.");
            router.push("/login/login");
        }
    } catch (error) {
        console.error("Erreur lors de la vérification de l'utilisateur :", error);
        router.push("/login/login");
    }
};
