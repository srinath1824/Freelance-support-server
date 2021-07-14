const express = require("express");
// const authMiddleware = require("../middleware/auth");
const router = express.Router();
const axios = require("axios");
require("dotenv").config();
const { getDeveloperDetails, getDeveloperDetailsById, createDeveloperDetails, updateDeveloperDetails, deleteDeveloperDetails } = require("../mongoDB");

// Using callback

router.get("/getDeveloperDetails", async (req, res) => {
    const data = await getDeveloperDetails();
    res.status(200).send(data);
});

router.get("/getDeveloperDetailsById/:id", async (req, res) => {
    const { id } = req.params;
    const data = await getDeveloperDetailsById(id);
    res.status(200).send(data);
});

router.post("/createDeveloperDetails", async (req, res) => {
    const data = await createDeveloperDetails(req.body);
    res.status(200).send(data);
});

router.put("/updateDeveloperDetails/:id", async (req, res) => {
    const { id } = req.params;
    const response = await updateDeveloperDetails(req.body, id);
    res.status(200).send(response);
});

router.delete("/deleteDeveloperDetails/:id", async (req, res) => {
    const { id } = req.params;
    const response = await deleteDeveloperDetails(id);
    res.status(200).send(response);
});

module.exports = router;