import mongoose from "mongoose";

const CartItemSchema = new mongoose.Schema({
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product', // 'Product' model ko reference karta hai
    required: true
  },
  quantity: {
    type: Number,
    required: true,
    min: 1
  }
});

const cartSchema = new mongoose.Schema({
  items: [CartItemSchema] // CartItemSchema ka array
}, { timestamps: true });

export default mongoose.model("Cart", cartSchema);