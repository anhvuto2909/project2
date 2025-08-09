const ProductService = require('../services/ProductService')

const createProduct = async (req, res) => {
  try {
    const { name, image, type, countInStock, price, rating, description } = req.body
    if (!name || !image || !type || !countInStock || !price || !rating) {
      return res.status(400).json({
        status: 'ERR',
        message: 'All fields are required'
      });
    }
    const response = await ProductService.createProduct(req.body);
    return res.status(200).json(response);
  } catch (e) {
    return res.status(404).json({
      message: e
    })
  }
}

const updateProduct = async (req, res) => {
  try {
    const productId = req.params.id;
    const data = req.body;

    if (!productId) {
      return res.status(400).json({
        status: 'ERR',
        message: 'The productId is required'
      });
    }

    if (!data || Object.keys(data).length === 0) {
      return res.status(400).json({
        status: 'ERR',
        message: 'Update data is required'
      });
    }

    const response = await ProductService.updateProduct(productId, data);

    if (response.status === 'ERR') {
      return res.status(404).json({
        status: 'ERR',
        message: response.message
      });
    }

    return res.status(200).json({
      status: 'OK',
      message: 'Success',
      data: response.data
    });
  } catch (e) {
    return res.status(500).json({
      status: 'ERR',
      message: `Server error: ${e.message}`
    });
  }
};

const getDetailsProduct = async (req, res) => {
  try {
    const productId = req.params.id
    if (!productId) {
      return res.status(400).json({
        status: "ERR",
        message: "The productID is required"
      })
    }

    const response = await ProductService.getDetailsProduct(productId);
    return res.status(200).json(response);
  } catch (e) {
    return res.status(500).json({
      message: e
    })
  }
}

const deleteProduct = async (req, res) => {
  try {
    const productId = req.params.id
    if (!productId) {
      return res.status(400).json({
        status: "ERR",
        message: "The userID is required"
      })
    }

    const response = await ProductService.deleteProduct(productId);
    return res.status(200).json(response);
  } catch (e) {
    return res.status(500).json({
      message: e
    })
  }
}

const getAllProduct = async (req, res) => {
  try {
    const { limit, page, sort, filter } = req.query
    const response = await ProductService.getAllProduct(Number(limit) || 8, Number(page) || 0, sort, filter);
    return res.status(200).json(response);
  } catch (e) {
    return res.status(500).json({
      message: e
    })
  }
}

module.exports = {
  createProduct,
  updateProduct,
  getDetailsProduct,
  deleteProduct,
  getAllProduct
}