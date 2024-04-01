const express = require("express");
const { MongoClient, ObjectId } = require("mongodb");
const cors = require("cors");
const multer = require("multer");
const redis = require('@redis/client');

const app = express();
app.use(cors());

// Créer une instance du client Redis
const redisClient = redis.createClient({
    host: '127.0.0.1', // Remplacez par l'adresse IP de votre serveur Redis
    port: 6380, // Remplacez par le port de votre serveur Redis
});

// Vérifier si la connexion au client Redis est réussie
redisClient.on('connect', () => {
    console.log('Connecté à Redis');
});

// Gérer les erreurs de connexion au client Redis
redisClient.on('error', (err) => {
    console.error('Erreur de connexion à Redis :', err);
});

// Exemple d'utilisation du client Redis
/*
redisClient.set('key', 'value', (err, reply) => {
    if (err) {
        console.error('Erreur lors de la définition de la clé :', err);
    } else {
        console.log('Clé définie avec succès :', reply);
    }
});*/


const CONNECTION_STRING = "mongodb+srv://admin:rafGQ5BuHQ6WqKJz@cluster0.vsuwfed.mongodb.net/?retryWrites=true&w=majority";
const DATABASE_NAME = "ma-societe";
let database;

app.listen(5038, () => {
    MongoClient.connect(CONNECTION_STRING, (error, client) => {
        if (error) {
            console.error("Erreur de connexion à MongoDB:", error);
            return;
        }
        database = client.db(DATABASE_NAME);
        console.log("Mongo DB connecté !");
    });
});

app.use(express.json());

// Route pour obtenir tous les maillots depuis MongoDB ou le cache Redis
app.get('/api/GetMaillots', (request, response) => {
    redisClient.get("maillots", (error, redisResult) => {
        if (redisResult) {
            console.log("Données récupérées depuis Redis");
            response.send(JSON.parse(redisResult));
        } else {
            database.collection("maillot").find({}).toArray((error, result) => {
                if (error) {
                    console.error("Erreur lors de la récupération des maillots depuis MongoDB:", error);
                    response.status(500).json("Erreur lors de la récupération des maillots.");
                } else {
                    redisClient.setex("maillots", 3600, JSON.stringify(result));
                    console.log("Données récupérées depuis MongoDB et stockées dans Redis");
                    response.send(result);
                }
            });
        }
    });
});

// Route pour ajouter un maillot dans MongoDB
app.post('/api/AddMaillot', multer().any(), (request, response) => {
    const newMaillot = {
        club: request.body.club,
        quantite: request.body.quantite,
        prix: request.body.prix,
        reference: request.body.reference
    };

    database.collection("maillot").insertOne(newMaillot, (error, result) => {
        if (error) {
            console.error("Erreur lors de l'ajout du maillot dans MongoDB:", error);
            response.status(500).json("Erreur lors de l'ajout du maillot.");
        } else {
            redisClient.del("maillots", (error, redisResult) => {
                if (error) {
                    console.error("Erreur lors de la suppression des données en cache dans Redis:", error);
                } else {
                    console.log("Données en cache supprimées après ajout d'un maillot");
                }
            });
            response.json("Le maillot a été ajouté avec succès !");
        }
    });
});

// Route pour supprimer un maillot de MongoDB
app.delete('/api/DeleteMaillot', (request, response) => {
    const id = request.query.id;
    database.collection("maillot").deleteOne({ _id: ObjectId(id) }, (error, result) => {
        if (error) {
            console.error("Erreur lors de la suppression du maillot dans MongoDB:", error);
            response.status(500).json("Erreur lors de la suppression du maillot.");
        } else {
            redisClient.del("maillots", (error, redisResult) => {
                if (error) {
                    console.error("Erreur lors de la suppression des données en cache dans Redis:", error);
                } else {
                    console.log("Données en cache supprimées après suppression d'un maillot");
                }
            });
            response.json("Le maillot a été supprimé !");
        }
    });
});

// Route pour mettre à jour un maillot dans MongoDB
app.put('/api/UpdateMaillot', multer().any(), (request, response) => {
    const id = request.body.id;
    const updatedMaillot = {
        club: request.body.club,
        quantite: request.body.quantite,
        prix: request.body.prix,
        reference: request.body.reference
    };

    database.collection("maillot").updateOne(
        { _id: ObjectId(id) },
        { $set: updatedMaillot },
        (error, result) => {
            if (error) {
                console.error("Erreur lors de la mise à jour du maillot dans MongoDB:", error);
                response.status(500).json("Erreur lors de la mise à jour du maillot.");
            } else {
                redisClient.del("maillots", (error, redisResult) => {
                    if (error) {
                        console.error("Erreur lors de la suppression des données en cache dans Redis:", error);
                    } else {
                        console.log("Données en cache supprimées après mise à jour d'un maillot");
                    }
                });
                response.json("Le maillot a été mis à jour avec succès !");
            }
        }
    );
});

module.exports = app;
