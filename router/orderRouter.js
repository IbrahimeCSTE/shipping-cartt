const express=require("express");
const Order = require("../model/Order");
const orderRouter=express.Router()
orderRouter.post("/", async (req, res) => {
    if (
      !req.body.name ||
      !req.body.email ||
      !req.body.address ||
      !req.body.total ||
      !req.body.cartItems
    ) {
      return res.send({ message: "Data is required." });
    }
    const order = await Order(req.body).save();
    res.send(order);
  });
  orderRouter.get("/", async (req, res) => {
    const orders = await Order.find({});
    res.send(orders);
  });
  orderRouter.delete("/:id", async (req, res) => {
    const order = await Order.findByIdAndDelete(req.params.id);
    res.send(order);
  });
  module.exports=orderRouter