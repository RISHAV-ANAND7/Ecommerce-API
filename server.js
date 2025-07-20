import express from "express";
import mongoose from "mongoose";
import user_router from "./routes/user_router.js";
import product_router from "./routes/product_router.js";
import cart_router from "./routes/cart_router.js";
import { config } from "dotenv";

const app = express();
app.use(express.json());

//.env setup
config({ path: ".env" });

app.use("/api/user", user_router);
app.use("/api/product", product_router);
app.use("/api/cart", cart_router);

//connect to mongodb
mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.error("Error connecting to MongoDB:", err);
  });

const port = process.env.PORT;
app.listen(port, () => {
  console.log(`http://localhost:${port}`);
});
