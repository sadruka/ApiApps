const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const app = express();
app.use(bodyParser.json());
const port = 3000;

mongoose
  .connect(
    `mongodb+srv://APiProjectLabSOlve:I6Vz1kKtRq0uIpMK@cluster0.wscwdwb.mongodb.net/ApiApps?retryWrites=true&w=majority&appName=Cluster0`
  )

  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => console.log(err));

//schema
const allProduct = mongoose.Schema({
  name: String,
  price: String,
  description: String,
});

//model
const product = mongoose.model("Product", allProduct);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

//post method
app.post("/add-product", async (req, res) => {
  try {
    const { name, price, description } = req.body;
    const productInstance = new product({ name, price, description });
    const savedProduct = await productInstance.save();
    res.status(200).json(savedProduct);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});

//get method
app.get("/all-product", async (req, res) => {
  try {
    const products = await product.find();
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});

//specific get product

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
