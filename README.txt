# Gestionnaire de Boutique de Maillots de Football

Cette API permet de gérer les données d'une boutique de maillots de football, y compris l'ajout, la suppression et la mise à jour des maillots. 
Back-end : JavaScript avec Node.js et Express.js.
Front-end : React.js et Bootstrap 

## Table des matières

1. [Installation]
2. [Utilisation]
3. [Objectif]

## Installation

Pour installer et exécuter cette API localement, suivez ces étapes :

1. Clonez ce dépôt sur votre machine locale.
2. Assurez-vous d'avoir Node.js et MongoDB installés sur votre système.
3. Exécutez `npm install` pour installer toutes les dépendances. (npm install express mongodb cors multer @redis/client)
4. Démarrez MongoDB en faisant CMD, aller dans API (C:\Users\noege\ma-societe\api> par exemple et faire la commande "node index.js". Vous devriez avoir une réponse "Mongo DB connecté !".
5. Allez dans redis en faisant CMD, faites la commande suivante : C:votre\dossier\ma-societe\redis>redis-server C:\votre\dossier\ma-societe\redis\redis.windows.conf
6. Dans my-react-app installez bootstrap avec la commande suivante : npm install bootstrap
7. Enfin Exécutez `npm start` dans C:\votre\chemin\ma-societe\my-react-app.



## Utilisation

Une fois l'API lancée, vous pouvez effectuer les opérations suivantes :

- **GET /api/GetMaillots** : Récupère tous les maillots disponibles dans la boutique.
- **POST /api/AddMaillot** : Ajoute un nouveau maillot à la boutique.
- **DELETE /api/DeleteMaillot?id={maillotId}** : Supprime un maillot de la boutique en spécifiant son ID.
- **PUT /api/UpdateMaillot** : Met à jour les détails d'un maillot existant.

Pour plus de détails vous pouvez directement visualiser dans le code 




## Rappel OBJECTIF

Réalisé une application web de gestion de stock d'un magasin.

Front :

2 page , une page pour saisir un nouvel article et l'enregistrer dans la base mongodb , et une page de recherche

back :

#Etape 1

Charger une collection mongoDB avec des articles ( designation , prix unitaire)

#Etape 2

faire un système de recherche qui me permet de chercher des articles dans la base mongo

#Etape 3

chaque recherche est stocké dans une base redis (durée de vie 1h)

#Etape 4

A chaque recherche on vient vérifier sur l'articles est présent dans redis si oui on le recupère de redis sinon de mongoDB

