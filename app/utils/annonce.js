import {showMessage} from "react-native-flash-message";
import {router} from "expo-router";
import {Alert} from "react-native";

const API_URL = process.env.EXPO_PUBLIC_API_URL;

// Fonction pour récupérer les détails d'une annonce
export const fetchAnnonceDetails = async (id) => {
    try {
        const response = await fetch(`${API_URL}/annonces/show/${id}`);
        if (!response.ok) {
            throw new Error("Erreur lors du chargement de l'annonce.");
        }
        const data = await response.json();
        return data.annonce;
    } catch (error) {
        throw error;
    }
};

//fonction pour supprimer une annonce
export const handleDeleteAnnonce = async (id) => {
    try {
        const response = await fetch(`${API_URL}/annonces/delete/${id}`, {
            method: "DELETE",
            headers: {
                "Content-Type" : "application/json"
            },
        });

        if (!response.ok)
        {
            showMessage({
                message: "Erreur",
                description: "Erreur lors de la suppression de l'annonce.",
                type: "danger",
                icon: "danger"
            });
            return;
        }
        showMessage({
            message: "Succès",
            description: "Annonce supprimée avec succès !",
            type: "success",
            icon: "success",
        });

        router.push('/annonce/liste_annonce');
    } catch (error) {
        Alert.alert("Erreur", error.message);
    }
}

export const handleAddComment = async (annonceId, objet, description, setDescription, setObjet, setLoading) => {
    const userStore = await AsyncStorage.getItem("user");
    const user = JSON.parse(userStore);

    console.log('Je suis ici');
    if (!user || !user.id) {
        Alert.alert("Erreur", "Veuillez vous connecter pour commenter");
        return;
    }

    if (!description.trim() || !objet.trim()) {
        Alert.alert("Erreur", "Tous les champs doivent être remplis");
        /*showMessage({
            message: "Erreur",
            description: "Tous les champs doivent être remplis.",
            type: "danger",
            icon: "danger",
        });*/
        return;
    }
    console.log("URL", API_URL);
    setLoading(true);
    try {
        const response = await fetch(`${API_URL}/commentaires/new`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                description: description.trim(),
                objet: objet.trim(),
                user_id: user?.id,
                annonce_id: annonceId,
            }),
        });

        if (!response.ok) {
            showMessage({
                message: "Erreur",
                description: "Erreur lors de l'ajout du commentaire.",
                type: "danger",
                icon: "danger",
            });
            return;
        }

        const newComment = await response.json();
        setDescription(""); // Réinitialiser le champ de texte
        setObjet(""); // Réinitialiser l'objet
        showMessage({
            message: "Succès",
            description: "Commentaire ajouté avec succès !",
            type: "success",
            icon: "success",
        });

        // Redirection après succès
        router.push({ pathname: "/annonce/showAnnonce", params: { id: annonceId } });
    } catch (error) {
        Alert.alert("Erreur", error.message);
    } finally {
        setLoading(false);
    }
};
