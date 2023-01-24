const url = require("url");
const express = require("express");
const router = express.Router();
const apicache = require("apicache");
const popularCities = require("../assets/popular-cities.json");

// Initialise cache
let cache = apicache.middleware;

router.get("/popular", cache("1 hour"), async (req, res) => {
  try {
    res.status(200).json(popularCities);
  } catch (error) {
    res.status(500).json({ error });
  }
});

module.exports = router;
