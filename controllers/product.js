import express from "express";
import { Product } from "../models/Product.js";

//add product
export const addProduct = async (req, res) => {
  try {
    let product = await Product.create(req.body);
    res.json({ message: "product added successfully", product, success: true });
  } catch (error) {
    res.json(error.message);
  }
};

//get all product

export const getallproduct = async (req, res) => {
  try {
    let products = await Product.find();
    if (!products)
      return res.json({ message: "no product available", success: false });

    res.json({ message: "fetched all product", Success: true, products });
  } catch (error) {
    res.json(error.message);
  }
};

//get specfic product id

export const getProductByProductId = async (req, res) => {
  const id = req.params.id;
  try {
    let product = await Product.findById(id);
    if (!product) {
      return res.json({ message: "Invalid Id", success: false });
    }
    res.json({ message: "product fetched by id", product, Success: true });
  } catch (error) {
    res.json(error.message);
  }
};

//update product by id

export const updateProductById = async (req, res) => {
  const id = req.params.id;
  try {
    let product = await Product.findByIdAndUpdate(id, req.body, { new: true });
    if (!product) {
      return res.json({ message: "invalid id", success: false });
    }
    res.json({
      message: "product updated successfully",
      success: true,
      product,
    });
  } catch (error) {
    res.json(error.message);
  }
};

export const deleteProductById = async (req, res) => {
  try {
    const id = req.params.id;
    const product = await Product.findByIdAndDelete(id);
    if (!product) {
      return res.json({ message: "invalid id", success: false });
    }
    res.json({ message: "product deleted", success: true });
  } catch (error) {
    res.json({ message: error.message });
  }
};
