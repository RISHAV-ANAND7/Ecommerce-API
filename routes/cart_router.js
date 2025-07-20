import express from "express";
import {
  addToCart,
  clearCart,
  decreaseProductQty,
  removeProductFromCart,
  userCart,
} from "../controllers/cart.js";
import { isAuthenticated } from "../Middlewares/Auth.js";

const router = express.Router();

router.post("/add", isAuthenticated, addToCart);

//get user cart
router.get("/user", isAuthenticated, userCart);

//delete product from cart
router.delete("/remove/:productId", isAuthenticated, removeProductFromCart);

//clear cart
router.delete("/clear", isAuthenticated, clearCart);

// Decrease product quantity
router.put("/decrease/:productId", isAuthenticated, decreaseProductQty);

export default router;
