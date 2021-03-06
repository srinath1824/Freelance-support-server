const express = require("express");
// const authMiddleware = require("../middleware/auth");
const router = express.Router();
const axios = require("axios");
require("dotenv").config();
const {
  getClientDetails,
  createClientDetails,
  updateClientDetails,
  deleteClientDetails,
  clientDeveloperMapping,
  clientDeveloperUnmapping,
  clientPaymentDetails,
} = require("../mongoDB");

// Using callback

router.get("/getClientDetails", async (req, res) => {
  const data = await getClientDetails();
  res.status(200).send(data);
});

router.post("/createClientDetails", async (req, res) => {
  const data = await createClientDetails(req.body);
  res.status(200).send(data);
});

router.put("/updateClientDetails/:id", async (req, res) => {
  const { id } = req.params;
  const response = await updateClientDetails(req.body, id);
  res.status(200).send(response);
});

router.delete("/deleteClientDetails/:id", async (req, res) => {
  const { id } = req.params;
  const response = await deleteClientDetails(id);
  res.status(200).send(response);
});

router.post("/clientDeveloperMapping", async (req, res) => {
  const data = await clientDeveloperMapping(req.body);
  res.status(200).send(data);
});

router.post("/clientDeveloperUnmapping", async (req, res) => {
  const data = await clientDeveloperUnmapping(req.body);
  res.status(200).send(data);
});

router.put("/clientPaymentDetails/:id", async (req, res) => {
  const { id } = req.params;
  const data = await clientPaymentDetails(req.body, id);
  res.status(200).send(data);
});

module.exports = router;