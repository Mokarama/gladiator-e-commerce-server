const prisma = require('../config/prisma');

const toProductResponse = (product) => {
  if (!product) return null;
  return {
    ...product,
    _id: product.id,
    user: product.userId,
  };
};

// @desc    Fetch all products with filtering, sorting, pagination
// @route   GET /api/products
// @access  Public
const getProducts = async (req, res) => {
  try {
    const pageSize = 8;
    const page = Number(req.query.pageNumber) || 1;

    // Search query
    const keyword = req.query.keyword
      ? {
          title: {
            contains: req.query.keyword,
            mode: 'insensitive',
          },
        }
      : {};

    // Filter by Category
    const category = req.query.category ? { category: req.query.category } : {};

    // Sorting
    let sortObj = {};
    if (req.query.sort) {
      if (req.query.sort === 'price_asc') sortObj = { price: 'asc' };
      else if (req.query.sort === 'price_desc') sortObj = { price: 'desc' };
      else if (req.query.sort === 'rating_desc') sortObj = { rating: 'desc' };
      else sortObj = { createdAt: 'desc' };
    } else {
      sortObj = { createdAt: 'desc' }; // Default sort
    }

    const queryFilter = { ...keyword, ...category };

    const count = await prisma.product.count({ where: queryFilter });
    const products = await prisma.product.findMany({
      where: queryFilter,
      orderBy: sortObj,
      take: pageSize,
      skip: pageSize * (page - 1),
    });

    res.json({ products: products.map(toProductResponse), page, pages: Math.ceil(count / pageSize), total: count });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Fetch single product
// @route   GET /api/products/:id
// @access  Public
const getProductById = async (req, res) => {
  try {
    const product = await prisma.product.findUnique({ where: { id: req.params.id } });
    if (product) {
      res.json(toProductResponse(product));
    } else {
      res.status(404).json({ message: 'Product not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Create a product
// @route   POST /api/products
// @access  Private/Admin
const createProduct = async (req, res) => {
  try {
    const createdProduct = await prisma.product.create({
      data: {
        title: 'Sample name',
        price: 0,
        user: {
          connect: {
            id: req.user._id,
          },
        },
        image: 'https://via.placeholder.com/400',
        category: 'Sample category',
        countInStock: 0,
        numReviews: 0,
        description: 'Sample description',
      },
    });

    res.status(201).json(toProductResponse(createdProduct));
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Update a product
// @route   PUT /api/products/:id
// @access  Private/Admin
const updateProduct = async (req, res) => {
  try {
    const { title, price, description, image, category, countInStock } = req.body;

    const product = await prisma.product.findUnique({ where: { id: req.params.id } });

    if (product) {
      const updatedProduct = await prisma.product.update({
        where: { id: req.params.id },
        data: {
          title: title ?? product.title,
          price: price ?? product.price,
          description: description ?? product.description,
          image: image ?? product.image,
          category: category ?? product.category,
          countInStock: countInStock ?? product.countInStock,
        },
      });

      res.json(toProductResponse(updatedProduct));
    } else {
      res.status(404).json({ message: 'Product not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Delete a product
// @route   DELETE /api/products/:id
// @access  Private/Admin
const deleteProduct = async (req, res) => {
  try {
    const product = await prisma.product.findUnique({ where: { id: req.params.id } });

    if (product) {
      await prisma.product.delete({ where: { id: req.params.id } });
      res.json({ message: 'Product removed' });
    } else {
      res.status(404).json({ message: 'Product not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
};
