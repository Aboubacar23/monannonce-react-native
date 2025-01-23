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
