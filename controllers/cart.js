import { Cart } from "../models/Cart.js";

//add to cart
export const addToCart = async (req, res) => {
  try {
    const { productId, title, price, qty } = req.body;
    const userId = req.user;

    // Convert strings to numbers
    const numPrice = Number(price);
    const numQty = Number(qty);

    // Input validation
    if (
      !productId ||
      !title ||
      !numPrice ||
      !numQty ||
      numQty <= 0 ||
      numPrice <= 0
    ) {
      return res.status(400).json({
        message: "Invalid input: all fields required with positive values",
        success: false,
      });
    }

    // Calculate unit price from the total price being sent
    const unitPrice = numPrice / numQty;

    let cart = await Cart.findOne({ userId });

    if (!cart) {
      cart = new Cart({ userId, items: [] });
    }

    const itemIndex = cart.items.findIndex(
      (item) => item.productId.toString() === productId
    );

    if (itemIndex > -1) {
      // Product already exists in cart
      const existingItem = cart.items[itemIndex];
      const existingUnitPrice = existingItem.price / existingItem.qty;

      // Add new quantity
      existingItem.qty += numQty;
      // Recalculate total price using existing unit price
      existingItem.price = existingItem.qty * existingUnitPrice;
    } else {
      // New product - store the total price as sent
      cart.items.push({
        productId,
        title,
        price: numPrice, // Store total price as received
        qty: numQty,
      });
    }

    await cart.save();
    res.json({ message: "Items added to cart", cart, success: true });
  } catch (error) {
    console.error("Error adding to cart:", error);
    res.status(500).json({
      message: "Internal server error",
      success: false,
    });
  }
};

//get user cart
export const userCart = async (req, res) => {
  const userId = req.user;

  let cart = await Cart.findOne({ userId });
  if (!cart) return res.json({ message: "cart not found", success: false });
  res.json({ message: "user cart", cart, success: true });
};

//remove product from cart
export const removeProductFromCart = async (req, res) => {
  const productId = req.params.productId;
  const userId = req.user;

  let cart = await Cart.findOne({ userId });
  if (!cart) return res.json({ message: "cart not found" });

  cart.items = cart.items.filter(
    (item) => item.productId.toString() !== productId
  );

  await cart.save();
  res.json({ message: "product has been removed from cart", success: true });
};

//clear cart
export const clearCart = async (req, res) => {
  const userId = req.user;
  let cart = await Cart.findOne({ userId });
  if (!cart) {
    cart = new Cart({ items: [] });
  } else {
    cart.items = [];
  }

  await cart.save();
  res.json({ message: "user cart cleared", success: true });
};

// decrease qty from cart
export const decreaseProductQty = async (req, res) => {
  try {
    const { productId } = req.params;
    const { qty } = req.body;
    const userId = req.user._id || req.user; // adapt based on your middleware

    if (!productId || !qty || qty <= 0) {
      return res.status(400).json({ message: "Invalid input", success: false });
    }

    let cart = await Cart.findOne({ userId });

    if (!cart) {
      return res
        .status(404)
        .json({ message: "Cart not found", success: false });
    }

    const itemIndex = cart.items.findIndex(
      (item) => item.productId.toString() === productId
    );

    if (itemIndex === -1) {
      return res
        .status(404)
        .json({ message: "Product not found in cart", success: false });
    }

    const item = cart.items[itemIndex];

    if (item.qty > qty) {
      const pricePerUnit = item.qty > 0 ? item.price / item.qty : 0;
      item.qty -= qty;
      item.price -= pricePerUnit * qty;
    } else {
      cart.items.splice(itemIndex, 1);
    }

    await cart.save();
    return res.json({
      message: "Item quantity decreased",
      cart,
      success: true,
    });
  } catch (err) {
    console.error("Error in decreaseProductQty:", err);
    return res
      .status(500)
      .json({ message: "Internal Server Error", success: false });
  }
};
