import { Text, View, Button, Alert, Image, StyleSheet, TouchableOpacity } from "react-native";
import { Link } from "expo-router";

export default function Accueil() {
  const handleAccueilButtonPress = () => {
    Alert.alert("Bienvenue", "Ceci est l'écran d'accueil !");
  };

  return (
    <View style={styles.container}>
      
      <Image
        source={{
        uri: "https://www.w3schools.com/w3images/fjords.jpg",
        }}
        style={styles.image}
      />

      <Text style={styles.title}>Bienvenue sur l'Accueil !</Text>

      <Text style={styles.subtitle}>
        Découvrez une interface simple mais jolie pour Notre projet React Native.
      </Text>
      

      
      <TouchableOpacity style={styles.button} onPress={handleAccueilButtonPress}>
        <Text style={styles.buttonText}>Cliquez-moi</Text>
      </TouchableOpacity>

      <Link href={{ pathname: "/" }} style={styles.link}>
        <Text style={styles.linkText}>Retour à l'écran principal</Text>
      </Link>
    </View>
  );
}

const styles = StyleSheet.create({

    container: {    
        flex: 1,
            justifyContent: 'center',
            alignItems: 'center',    
            padding: 20,
            backgroundColor: '#f5f5f5',
        },
  image: {
    width: 200,
    height: 200,
    borderRadius: 100,
    marginBottom: 20,
    borderWidth: 2,
    borderColor: "#4a90e2",
  },
  
  title: {    
    fontSize: 30,    
    fontWeight: "bold",    
    marginBottom: 20,    
    color: "#333",
    },

  subtitle: {
    fontSize: 16,
    textAlign: "center",
    color: "#555",
    marginBottom: 20,
  },

  button: {    
    width: "100%",    
    paddingVertical: 5,    
    marginVertical: 10,
    },

  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
  link: {    
    marginTop: 10,
    },
    
  linkText: {
    fontSize: 16,
    color: "#4a90e2",
    textDecorationLine: "underline",
  },

  
});
