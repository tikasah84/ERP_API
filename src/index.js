require("dotenv").config();
require("./db/connection");
const express = require("express");
const userRoutes = require("./routes/userRoutes");
const addressRoutes = require("./routes/addressRoutes");
const bodyParser = require("body-parser");

const app = express();
const port = process.env.PORT;

app.use(bodyParser.json());
//app.use(express.json({ limit: "10MB" }));
app.use(express.urlencoded({ extended: true }));

app.use("/", userRoutes);
app.use("/address", addressRoutes);

app.listen(port, () => {
  console.log(`Server is running at ${port}`);
});
