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
app.get("/single-product/:id", async (req, res) => {
  try {
    const singleProduct = await product.findById(req.params.id);
    if (singleProduct) {
      res.json(singleProduct);
    } else {
      res.status(404).json({ error: "Product not found" });
    }
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});

//delete method
app.delete("/product/del/:id", async (req, res) => {
  try {
    const deletedProduct = await product.findByIdAndDelete(req.params.id);
    if (deletedProduct) {
      res.send("deleted product");
    } else {
      res.status(404).json({ error: "Product not found" });
    }
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});

//update a single product
app.put("/product/update/:id", async (req, res) => {
  try {
    const _id = req.params.id.trim();
    const { name, price, description } = req.body;
    const updateProduct = await product.findByIdAndUpdate(
      _id,
      { name, price, description },
      { new: true }
    );
    res.json(updateProduct);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
