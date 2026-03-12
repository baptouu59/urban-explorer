# Urban Explorer

Application mobile développée avec **React Native**, **Expo** et **TypeScript**.  
Le projet a pour objectif de proposer une expérience mobile moderne autour de l’exploration urbaine, avec intégration de la géolocalisation, de cartes, d’outils multimédias et d’une navigation fluide.

## Architecture du projet 

urban-explorer/
              ├── assets/
              ├── components/
              ├── screens/
              ├── navigation/
              ├── services/
              ├── utils/
              ├── App.tsx
              ├── index.ts
              └── package.json

              
## Stack technique

- **Expo** `~54.0.33`
- **React** `19.1.0`
- **React Native** `0.81.5`
- **TypeScript** `~5.9.2`

## Dépendances principales

### Navigation
- `@react-navigation/native`

### Expo / APIs natives
- `expo`
- `expo-camera`
- `expo-location`

### Fonctionnalités métier
- `react-native-maps`
- `react-native-calendars`
- `@react-native-async-storage/async-storage`
- `axios`

## Fonctionnalités

Selon la stack actuellement installée, l’application permet ou prépare les usages suivants :

- navigation multi-écrans avec **stack** et **bottom tabs**
- affichage de **cartes interactives**
- accès à la **caméra**
- sélection d’images depuis la galerie
- gestion ou affichage de **données calendaires**
- communication avec une **API externe** via `axios`

## Prérequis

Avant de lancer le projet, vérifier les éléments suivants :

- **Node.js** installé
- **npm** ou **pnpm**
- **Expo Go** sur mobile, ou un émulateur Android / simulateur iOS
- environnement de développement React Native / Expo correctement configuré

## Installation

Cloner le projet puis installer les dépendances :

```bash

npm run start : démarre le serveur Expo

npm run android : lance l’application sur Android

npm run ios : lance l’application sur iOS

npm run web : lance l’application sur navigateur
