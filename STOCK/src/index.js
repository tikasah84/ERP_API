require("dotenv").config();
require("./stock/db/connection");
const express = require("express");
const stockRoutes = require("./stock/routes/stockRoutes");
const bodyParser = require("body-parser");

const stock = express();
const stockPort = process.env.PORT_STOCK;
const HOST = process.env.HOST;

stock.use(bodyParser.json());
//app.use(express.json({ limit: "10MB" }));
stock.use(express.urlencoded({ extended: true }));

stock.use("/", stockRoutes);

stock.listen(stockPort, HOST, () => {
  console.log(`Stock is running on https://${HOST}: ${stockPort}`);
});
