const mongoose = require("mongoose");

mongoose
  .connect(process.env.MONGO_URI_STOCK, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connection successfull!");
  })
  .catch((e) => {
    console.log("Connection failed!", e);
  });
