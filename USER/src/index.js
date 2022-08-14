require("dotenv").config();
require("./user/db/connection");
const express = require("express");
const userRoutes = require("./user/routes/userRoutes");
const addressRoutes = require("./user/routes/addressRoutes");
const bodyParser = require("body-parser");

const app = express();
const port = process.env.PORT_USER;
const HOST = process.env.HOST;

app.use(bodyParser.json());
//app.use(express.json({ limit: "10MB" }));
app.use(express.urlencoded({ extended: true }));

app.use("/", userRoutes);
app.use("/address", addressRoutes);

app.listen(port, HOST, () => {
  console.log(`Server is running on https://${HOST}: ${port}`);
});
