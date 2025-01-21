import {useState} from "react";
import {useRouter} from "expo-router";
import {showMessage} from "react-native-flash-message";


export const useRegister = () =>{
    const [nom, setNom] = useState("");
    const [prenom, setPrenom] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const API_URL = process.env.EXPO_PUBLIC_API_URL;

    const handleRegister = async () => {
        if (password !== confirmPassword)
        {
            showMessage({
                message: "Erreur",
                description: "les mots de passe ne correspondent pas",
                type: "danger",
                icon: "danger"
            });
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
            const data = await  res.json();

            if (res.ok){
                showMessage({
                    message: "Erreur",
                    description: "les mots de passe ne correspondent pas",
                    type: "danger",
                    icon: "danger"
                });
                router.push("..//login/login");

            }else {
                showMessage({
                    message: "Erreur",
                    description: data.message || "Une erreur est survenue.",
                    type: "danger",
                    icon: "danger",
                });
            }
        }catch (error)
        {
            console.log(error);
            showMessage({
                message: "Erreur",
                description: "Erreur de connexion au serveur.",
                type: "danger",
                icon: "danger",
            });
        }finally {
            setLoading(false);
        }
    };

    return {
        nom,
        setNom,
        prenom,
        setPrenom,
        email,
        setEmail,
        password,
        setPassword,
        confirmPassword,
        setConfirmPassword,
        loading,
        handleRegister,
    };
}
