import express from "express";
import {
  addProduct,
  getallproduct,
  getProductByProductId,
  updateProductById,
  deleteProductById,
} from "../controllers/product.js";

const router = express.Router();

//add new product
router.post("/new", addProduct);

//get all product
router.get("/all", getallproduct);

//get user specific
router.get("/:id", getProductByProductId);

//update product by id
router.put("/:id", updateProductById);

//delete product by id
router.delete("/:id", deleteProductById);

export default router;
