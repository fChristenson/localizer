const express = require("express");
const path = require("path");
const proxy = require("express-http-proxy");
const app = express();

app.use(express.static(path.resolve(__dirname, "dist")));
app.use("/images", express.static(path.resolve(__dirname, "client", "images")));

app.use(proxy("localhost:8080"));

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log("Running server on port:", port);
  console.log("--------------------------");
});
