import Cart from "../models/cartModel.js";
import Product from "../models/Project.js";

// Middleware to find or create a common cart
export const getCommonCart = async (req, res, next) => {
    try {
        let cart = await Cart.findOne({});
        if (!cart) {
            cart = new Cart({ items: [] });
            await cart.save();
        }
        req.cart = cart;
        next();
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// GET /api/cart - Get the contents of the common cart with product details
export const getCart = async (req, res) => {
    try {
        // Populate the cart with product details
        const populatedCart = await req.cart.populate('items.productId');
        res.json({ items: populatedCart.items });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// POST /api/cart/add - Add an item to the cart
export const addItemToCart = async (req, res) => {
    const { product } = req.body;
    const existingItem = req.cart.items.find(item => item.productId.toString() === product._id);

    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        const productFromDb = await Product.findById(product._id);
        if (!productFromDb) {
            return res.status(404).json({ message: "Product not found" });
        }
        req.cart.items.push({
            productId: productFromDb._id,
            quantity: 1,
        });
    }

    try {
        await req.cart.save();
        // Respond with the populated cart
        const populatedCart = await req.cart.populate('items.productId');
        res.status(201).json({ items: populatedCart.items });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// PUT /api/cart/update/:id - Update an item's quantity in the cart
export const updateCartItemQuantity = async (req, res) => {
    const { id } = req.params; 
    const { quantity } = req.body; 

    const itemToUpdate = req.cart.items.id(id);

    if (itemToUpdate) {
        itemToUpdate.quantity = quantity;
    } else {
        return res.status(404).json({ message: "Item not found in cart" });
    }

    try {
        await req.cart.save();
        const populatedCart = await req.cart.populate('items.productId');
        res.json({ items: populatedCart.items });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// DELETE /api/cart/remove/:id - Remove an item from the cart
export const removeItemFromCart = async (req, res) => {
    const { id } = req.params;
    // Ab hum CartItem ki _id se filter kar rahe hain, na ki productId se
    req.cart.items = req.cart.items.filter(item => item._id.toString() !== id);

    try {
        await req.cart.save();
        const populatedCart = await req.cart.populate('items.productId');
        res.json({ items: populatedCart.items });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// DELETE /api/cart/clear - Clear the entire cart
export const clearCart = async (req, res) => {
    req.cart.items = [];
    try {
        await req.cart.save();
        res.json({ items: [] });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};
