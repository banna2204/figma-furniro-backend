import express from "express";
import { getProducts, addProduct, updateProduct, deleteProduct ,clearCart} from "../controllers/productController.js";

const router = express.Router();

router.get("/", getProducts);
router.post("/", addProduct);
router.put("/:id", updateProduct);
router.delete("/:id", deleteProduct);
router.delete('/clear', clearCart);

export default router;
