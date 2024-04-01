const express = require("express");
const { MongoClient, ObjectId } = require("mongodb");
const cors = require("cors");
const multer = require("multer");
const redisApiRouter = require("./redisApi");

const app = express();
app.use(cors());

//Connexion à MONGODB
const CONNECTION_STRING = "mongodb+srv://admin:rafGQ5BuHQ6WqKJz@cluster0.vsuwfed.mongodb.net/?retryWrites=true&w=majority";
const DATABASE_NAME = "ma-societe";
let database;

app.listen(5038, () => {
    MongoClient.connect(CONNECTION_STRING, (error, client) => {
        if (error) {
            console.error("Erreur de connexion à MongoDB :", error);
            return;
        }
        database = client.db(DATABASE_NAME);
        console.log("Mongo DB connecté !");
    });
});


app.use(express.json()); // Middleware pour traiter les requêtes JSON 

// Utiliser le routeur Redis API
app.use("/api/redis", redisApiRouter);

// Route pour obtenir tous les maillots depuis MongoDB
app.get('/api/GetMaillots', (request, response) => {
    database.collection("maillot").find({}).toArray((error, result) => {
        if (error) {
            console.error("Erreur lors de la récupération des maillots :", error);
            response.status(500).json("Erreur lors de la récupération des maillots.");
        } else {
            response.send(result);
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
            console.error("Erreur lors de l'ajout du maillot :", error);
            response.status(500).json("Erreur lors de l'ajout du maillot.");
        } else {
            response.json("Le maillot a été ajouté avec succès !");
        }
    });
});

// Route pour supprimer un maillot de MongoDB
app.delete('/api/DeleteMaillot', (request, response) => {
    const id = request.query.id;
    database.collection("maillot").deleteOne({ _id: ObjectId(id) }, (error, result) => {
        if (error) {
            console.error("Erreur lors de la suppression du maillot :", error);
            response.status(500).json("Erreur lors de la suppression du maillot.");
        } else {
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
                console.error("Erreur lors de la mise à jour du maillot :", error);
                response.status(500).json("Erreur lors de la mise à jour du maillot.");
            } else {
                response.json("Le maillot a été mis à jour avec succès !");
            }
        }
    );
});

module.exports = app;
