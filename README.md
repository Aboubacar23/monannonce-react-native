# MonAnnonce - Projet Frontend React Native

Bienvenue dans le frontend de l'application mobile **MonAnnonce**, développée avec [React Native](https://reactnative.dev) et gérée avec [Expo](https://expo.dev). Cette application offre une expérience utilisateur intuitive pour gérer des annonces à partir de dispositifs mobiles.

## Pré-requis

Avant de commencer, assurez-vous d'avoir les éléments suivants installés sur votre système :

- [Node.js](https://nodejs.org) (version LTS recommandée)
- [npm](https://www.npmjs.com/) ou [yarn](https://yarnpkg.com/)
- Expo CLI :
  ```bash
  npm install -g expo-cli
  ```

## Installation

Clonez le dépôt et installez les dépendances nécessaires :

```bash
git clone https://github.com/votre-utilisateur/monannonce-react-native.git
cd monannonce-react-native
npm install
```

## Lancer l'application

Pour lancer l'application en mode développement, exécutez :

```bash
npx expo start
```

Cela ouvrira une interface web où vous pourrez choisir :

- D'ouvrir l'application dans l'émulateur Android ou iOS (si configuré).
- De scanner le QR Code avec l'application **Expo Go** pour tester sur un appareil physique.

## Structure du projet

- **app/** : Contient les écrans principaux de l'application.
- **components/** : Composants réutilisables.
- **assets/** : Ressources comme les images, icônes ou polices.
- **styles/** : Fichiers de styles pour les éléments de l'interface.

## Fonctionnalités principales

- **Gestion des annonces** : Créer, consulter, modifier et supprimer des annonces.
- **Connexion à une API Backend** : Communication avec le backend via des requêtes HTTP pour synchroniser les données.

## Variables d'environnement

Ajoutez un fichier `.env` à la racine pour configurer les variables liées à l'API :

```env
API_URL=http://localhost:3000/api
```

## Commandes utiles

### Installer ou mettre à jour les dépendances

```bash
npm install
```

### Lancer en mode développement

```bash
npx expo start
```

### Nettoyer le cache Expo

```bash
npx expo start -c
```

### Réinitialiser le projet

```bash
npm run reset-project
```

## Tests

Actuellement, aucun test automatisé n'est configuré pour ce projet. Vous pouvez en ajouter avec des frameworks comme [Jest](https://jestjs.io/) ou [React Native Testing Library](https://testing-library.com/docs/react-native-testing-library/intro/).

## Contributions

Les contributions sont les bienvenues ! Si vous trouvez un bug ou souhaitez proposer une amélioration, ouvrez une issue ou une pull request.

## Ressources utiles

- [Documentation Expo](https://docs.expo.dev/)
- [Documentation React Native](https://reactnative.dev/docs/getting-started)
- [API Backend](https://github.com/votre-utilisateur/monannonce-backend) (dépôt associé au backend)
