const express = require("express");
const router = express.Router();
require("dotenv").config();
const {
  getDashBoradDetails,
  getClientDetailsDashborad,
} = require("../mongoDB");

//payment details dashborad
router.get("/getPaymentDetails", async (req, res) => {
  const data = await getDashBoradDetails();
  res.status(200).send(data);
});

//client details dashborad
router.get("/getClientDashboradDetails", async (req, res) => {
  const data = await getClientDetailsDashborad();
  res.status(200).send(data);
});

module.exports = router;
