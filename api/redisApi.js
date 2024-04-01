const express = require("express");
const redis = require("redis");

const router = express.Router();

const redisClient = redis.createClient({
  host: "127.0.0.1", // Adresse IP de Redis
  port: 6380, // Port de Redis
});

redisClient.on("connect", () => {
  console.log("Connexion à Redis établie avec succès");
});

redisClient.on("error", (error) => {
  console.error("Erreur de connexion à Redis:", error);
});

const searchInRedis = (club, callback) => {
  const redisKey = `search:${club}`;

  redisClient.get(redisKey, (error, redisResult) => {
    callback(JSON.parse(redisResult));
  });
};

router.get('/SearchMaillots', (request, response) => {
  const club = request.query.club.toLowerCase();

  searchInRedis(club, (result) => {
    if (result) {
      response.send(result);
    } else {
      response.send([]);
    }
  });
});

module.exports = router;
