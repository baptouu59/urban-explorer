# Urban Explorer - Paris 🏙️

Urban Explorer est une application mobile développée avec React Native et Expo, permettant aux utilisateurs de découvrir des lieux culturels et touristiques à Paris.

## 🏗️ Architecture Globale de l'Application

L'application suit une structure modulaire pour faciliter la maintenance et l'évolution :

- **Navigation** : Utilisation de `@react-navigation` avec une double structure :
    - **TabNavigator** : Une barre de navigation basse (Tab Bar) pour basculer entre les sections principales (Explorer, Carte, Profil).
    - **DiscoverStack** : Un gestionnaire de pile (Stack) pour la navigation fluide entre la liste des lieux et les détails d'un lieu spécifique.
- **Composants** : Découpage en composants réutilisables (`LieuCard`, `CalendarModal`) situés dans `src/components`.
- **Services** : Centralisation des appels API dans `src/services/api.ts`.
- **Thème** : Centralisation des styles, couleurs et espacements dans `src/constants/Theme.ts`.

## 🌐 Intégration API et Gestion des Données

- **API** : Utilisation de **Axios** pour consommer l'API **Paris Open Data** (Que faire à Paris ?).
- **Gestion du State** : Utilisation des hooks React (`useState`, `useEffect`) pour gérer l'état local des données.
- **Résilience** : En cas d'échec de l'API (timeout ou erreur serveur), l'application bascule automatiquement sur un jeu de données "Mock" local pour garantir une expérience utilisateur ininterrompue.

## 📱 Implémentation des Composants Natifs

### 1. Location & Maps (`react-native-maps` & `expo-location`)
- **Défi** : Obtenir la position de l'utilisateur de manière fiable tout en gérant le centrage initial de la carte.
- **Permissions** : Utilisation de `requestForegroundPermissionsAsync` pour demander l'accès à la position.
- **Solution** : Une fois la position obtenue via `getCurrentPositionAsync`, l'état `region` du composant `MapView` est mis à jour pour centrer immédiatement la vue sur l'utilisateur.

### 2. Calendrier (`react-native-calendars`)
- **Implémentation** : Intégration dans un `Modal` accessible depuis la page de détails d'un lieu.
- **Usage** : Permet de sélectionner une date de planification. La date sélectionnée est visualisée directement sur le calendrier puis confirmée.

### 3. Caméra & Images (`expo-image-picker`)
- **Implémentation** : Utilisé dans l'écran de profil pour permettre à l'utilisateur de prendre un selfie via la caméra.
- **Défi** : Gérer les permissions caméras et le recadrage de l'image.
- **Solution** : Utilisation de `launchCameraAsync` avec l'option `allowsEditing: true` pour assurer un format carré (1:1) propre pour l'avatar.

## 🌟 Bonus et Fonctionnalités Avancées

Nous avons implémenté plusieurs fonctionnalités supplémentaires pour améliorer l'expérience utilisateur :

- **Géolocalisation Dynamique** : Centrage automatique de la carte sur l'utilisateur dès l'ouverture.
- **Stockage Local (AsyncStorage)** :
    - Persistence de la photo de profil (elle reste présente même après redémarrage).
    - Persistence des dates de visites planifiées pour chaque lieu spécifique.
- **Système de Recherche & Filtre** : Une barre de recherche en temps réel sur l'écran "Explorer" permettant de filtrer instantanément les lieux par leur nom.
- **Gestion UI/UX (Feedback)** :
    - Ajout d'indicateurs de chargement (`ActivityIndicator`) durant les appels API et la récupération de la position.
    - Design premium avec effets de flous, ombres et transitions fluides.
