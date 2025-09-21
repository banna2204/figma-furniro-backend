// src/controllers/orderController.js

import Order from '../models/orderModel.js';

export const createOrder = async (req, res) => {
  try {
    const { customerInfo, products, totalAmount } = req.body;

    const newOrder = new Order({
      customerInfo,
      products,
      totalAmount,
    });

    const savedOrder = await newOrder.save();

    res.status(201).json({ message: 'Order created successfully!', order: savedOrder });
  } catch (error) {
    console.error('Error creating order:', error);
    res.status(500).json({ message: 'Error creating order', error });
  }
};