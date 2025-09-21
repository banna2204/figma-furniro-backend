const express = require('express');
const router = express.Router();
const { getCommonCart, getCart, addItemToCart, updateCartItemQuantity, removeItemFromCart, clearCart } = require('../controllers/cartController.js');

// This middleware runs for every cart-related request to ensure the single cart document exists.
router.use(getCommonCart);

router.get('/', getCart);
router.post('/add', addItemToCart);
router.put('/update', updateCartItemQuantity);
router.delete('/remove/:id', removeItemFromCart);
router.delete('/clear', clearCart);

module.exports = router;