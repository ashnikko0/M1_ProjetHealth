# Membres du groupe
- COLELLA Maxime
- SIPP Jules
- SCHANG Amandine

# TODO

## Spécifications fonctionnelles

- [ ] L'application sera affichée dans le navigateur web, en format mobile (orientation portrait). Vous opterez pour une approche "Mobile First".
- [ ] Composition de l'application à l'aide de plusieurs composants React, conçus et implémentés par vos soins,
- [ ] Emploi du pattern ergonomique Master / Details (Master = liste d'items, Details = écran dédié à la présentation d'un item sélectionné),
- [ ] Navigation entre écrans à l'aide du module react-router (https://reactrouter.com/en/main),
- [ ] Emploi des props pour transmettre des données d'un composant React "parent" à un composant "enfant",
- [ ]  Interactions avec l'API REST (avec fetch ou avec le module Axios, https://axios-http.com/),
    - [ ] Authentification d'un utilisateur,
    - [ ] Récupération de la liste des patients (écran Master),
    - [ ] Récupération des détails d'un patient à partir de son id (écran Details),
    - [ ] Récupération des activités physiques d'un patient,
    - [ ] Récupération de l'évolution physiologique d'un patient,
    - [ ] En option, récupération de l'évolution psychique d'un patient.
- [ ] Affichage de l'évolution physiologique ou des activités physiques d'un patient au moyen d'un diagramme à l'aide d'une bibliothèque spécialisée telle que Recharts (https://recharts.org/en-US/) ou toute autre représentation graphique de votre choix.
- [ ] Mise en place d'au moins un formulaire avec le module react-hook-form https://react-hook-form.com/ permettant à l'utilisateur de se connecter (Sign In), saisir de données, effectuer une recherche dans les données…
- [ ] Emploi des hooks React useState, useEffect, useContext
    - [ ] Gestion d'état avec useState,
    - [ ] Partage de données avec useContext,
    - [ ] Initialisation des requêtes auprès de l'API avec useEffect.
- [ ] Formulaire de connexion : Sign In (récupération de l'access_token JWT).
- [ ] Affichage de l'état de connexion de l'utilisateur courant dans l'UI (ex : "john@doe.com est connecté"),
- [ ] Bouton de déconnexion (Sign Out) de l'utilisateur courant.

## Fonctionnalités optionnelles

- [ ] Conservation de l'access_token dans le localstorage dans la mémoire vive de l'application,
- [ ] Emploi du refresh_token pour obtenir un nouvel access_token et éviter la déconnexion de l'utilisateur courant,
- [ ] Interactions avec des routes privées de l'API en communiquant l'access_token dans le header HTTP authorization en mode Bearer (ex : endpoint /items/psychicData).
- [ ] Intégration d'1 ou plusieurs autres API tierce(s) au projet.