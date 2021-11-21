const express = require("express");
const app = express();
const port = process.env.PORT || 5000;
const db = require("./database/db");
const route = require("./routes");
const host = "0.0.0.0";
require("dotenv").config();
db();

app.get("/", (req, res) => {
  res.status(200).send({
    status: "success",
    message: "API is online",
  });
});
app.use(express.json());
app.use("/api/v1", route);

app.listen(port, () => {
  console.log(`server started at port ${port}`);
});
