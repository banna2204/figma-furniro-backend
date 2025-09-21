import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  name: String,
  category: String,
  brand: String,
  price: Number,
  discount: Number,
  image: String
}, { timestamps: true });

export default mongoose.model("Product", productSchema);
