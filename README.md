# Membres du groupe
- COLELLA Maxime
- SIPP Jules
- SCHANG Amandine

# TODO

## Spécifications fonctionnelles

- [X] L'application sera affichée dans le navigateur web, en format mobile (orientation portrait). Vous opterez pour une approche "Mobile First".
- [X] Composition de l'application à l'aide de plusieurs composants React, conçus et implémentés par vos soins,
- [X] Emploi du pattern ergonomique Master / Details (Master = liste d'items, Details = écran dédié à la présentation d'un item sélectionné),
- [X] Navigation entre écrans à l'aide du module react-router (https://reactrouter.com/en/main),
- [X] Emploi des props pour transmettre des données d'un composant React "parent" à un composant "enfant",
- [ ]  Interactions avec l'API REST (avec fetch ou avec le module Axios, https://axios-http.com/),
    - [X] Authentification d'un utilisateur,
    - [X] Récupération de la liste des patients (écran Master),
    - [X] Récupération des détails d'un patient à partir de son id (écran Details),
    - [X] Récupération des activités physiques d'un patient,
    - [X] Récupération de l'évolution physiologique d'un patient,
    - [ ] En option, récupération de l'évolution psychique d'un patient.
- [X] Affichage de l'évolution physiologique ou des activités physiques d'un patient au moyen d'un diagramme à l'aide d'une bibliothèque spécialisée telle que Recharts (https://recharts.org/en-US/) ou toute autre représentation graphique de votre choix.
- [X] Mise en place d'au moins un formulaire avec le module react-hook-form https://react-hook-form.com/ permettant à l'utilisateur de se connecter (Sign In), saisir de données, effectuer une recherche dans les données…
- [ ] Emploi des hooks React useState, useEffect, useContext
    - [X] Gestion d'état avec useState,
    - [ ] Partage de données avec useContext,
    - [X] Initialisation des requêtes auprès de l'API avec useEffect.
- [X] Formulaire de connexion : Sign In (récupération de l'access_token JWT).
- [x] Affichage de l'état de connexion de l'utilisateur courant dans l'UI (ex : "john@doe.com est connecté"),
- [x] Bouton de déconnexion (Sign Out) de l'utilisateur courant.

## Fonctionnalités optionnelles

- [X] Conservation de l'access_token dans le localstorage dans la mémoire vive de l'application, --> (Pas vraiment, on a utilisé les cookies)
- [x] Emploi du refresh_token pour obtenir un nouvel access_token et éviter la déconnexion de l'utilisateur courant,
- [ ] Interactions avec des routes privées de l'API en communiquant l'access_token dans le header HTTP authorization en mode Bearer (ex : endpoint /items/psychicData).
- [X] Intégration d'1 ou plusieurs autres API tierce(s) au projet.