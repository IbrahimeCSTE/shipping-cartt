const express=require("express");
const Product = require("../model/Product");
const data=require("../data.json")
const productRouter=express.Router()

productRouter.get('/',(req,res)=>{
 // const products = await Product.find({});
  res.send(data.products);
})

productRouter.post("/", async (req, res) => {
    const newProduct = new Product(req.body);
    const savedProduct = await newProduct.save();
    res.send(savedProduct);
  });
  
  productRouter.delete("/:id", async (req, res) => {
    const deletedProduct = await Product.findByIdAndDelete(req.params.id);
    res.send(deletedProduct);
  });

  module.exports=productRouter