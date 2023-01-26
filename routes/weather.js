const url = require("url");
const express = require("express");
const router = express.Router();
const needle = require("needle");
const apicache = require("apicache");
const cities = require("../assets/cities.json");

// Environment vars
const API_BASE_URL = process.env.API_BASE_URL;
const API_KEY_NAME = process.env.API_KEY_NAME;
const API_KEY_VALUE = process.env.API_KEY_VALUE;

// Initialise cache
let cache = apicache.middleware;

router.get("/", cache("2 minutes"), async (req, res) => {
  try {
    // Pass in API key, plus query params from req URL
    const params = new URLSearchParams({
      [API_KEY_NAME]: API_KEY_VALUE,
      ...url.parse(req.url, true).query,
    });

    // Get data from API
    const apiResponse = await needle("get", `${API_BASE_URL}?${params}`);
    const data = apiResponse.body;

    // Log request made
    if (process.env.NODE_ENV !== "production") {
      console.log(`REQUEST: ${API_BASE_URL}?${params}`);
    }

    // Send data
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error });
  }
});

router.get("/city/:id", cache("2 minutes"), async (req, res) => {
  try {
    if (cities.find((c) => c.id == req.params.id)) {
      // Pass in API key, plus query params from req URL
      const params = new URLSearchParams({
        [API_KEY_NAME]: API_KEY_VALUE,
        id: req.params.id,
        units: "metric",
      });

      // Get data from API
      const apiResponse = await needle("get", `${API_BASE_URL}?${params}`);
      const data = apiResponse.body;

      // Log request made
      if (process.env.NODE_ENV !== "production") {
        console.log(`REQUEST: ${API_BASE_URL}?${params}`);
      }

      res.status(200).json(data);
    } else {
      res.status(404).json({ error: "City not found" });
    }
  } catch (error) {
    res.status(500).json({ error });
  }
});

module.exports = router;
