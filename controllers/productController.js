import Product from "../models/Project.js";

// GET (with pagination, filter, sort)
export const getProducts = async (req, res) => {
  try {
    const { page = 1, limit = 6, sortBy = "price", order = "asc", brand, category, minPrice, maxPrice } = req.query;
    
    let filter = {};
    if (brand) filter.brand = brand;
    if (category) filter.category = category;
    if (minPrice && maxPrice) filter.price = { $gte: minPrice, $lte: maxPrice };

    const products = await Product.find(filter)
      .sort({ [sortBy]: order === "asc" ? 1 : -1 })
      .skip((page - 1) * limit)
      .limit(Number(limit));

    const total = await Product.countDocuments(filter);

    res.json({ products, total });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// POST (Add Product)
export const addProduct = async (req, res) => {
  try {
    const product = new Product(req.body);
    await product.save();
    res.status(201).json(product);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// PUT (Update Product)
export const updateProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(product);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// DELETE (Remove Product)
export const deleteProduct = async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id);
    res.json({ message: "Product deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const clearCart = async (req, res) => {
    req.cart.items = [];
    try {
        await req.cart.save();
        res.json({ items: [] });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};