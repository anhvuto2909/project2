const Product = require('../models/ProductModels')

const createProduct = (newProduct) => {
  return new Promise(async (resolve, reject) => {
    const { name, image, type, countInStock, price, rating, description } = newProduct
    try {
      const checkProduct = await Product.findOne({
        name: name
      })

      if (checkProduct !== null) {
        resolve({
          status: "OK",
          message: "The name of product is already"
        })
      }
      const newProduct = await Product.create({
        name,
        image,
        type,
        countInStock,
        price,
        rating,
        description
      })
      if (newProduct) {
        resolve({
          status: 'Ok',
          message: 'SUCCESS',
          data: newProduct,
        })
      }
    } catch (e) {
      reject(e)
    }
  })
}

const updateProduct = (id, data) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!id) {
        return resolve({
          status: 'ERR',
          message: 'Product ID is required'
        });
      }

      if (!data || Object.keys(data).length === 0) {
        return resolve({
          status: 'ERR',
          message: 'Update data is required'
        });
      }

      const checkProduct = await Product.findOne({ _id: id });
      if (!checkProduct) {
        return resolve({
          status: 'ERR',
          message: 'Product not found'
        });
      }

      const updatedProduct = await Product.findByIdAndUpdate(id, data, { new: true });
      resolve({
        status: 'OK',
        message: 'SUCCESS',
        data: updatedProduct
      });
    } catch (e) {
      reject({
        status: 'ERR',
        message: `Update failed: ${e.message}`
      });
    }
  });
};

const getDetailsProduct = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      const product = await Product.findOne({
        _id: id
      });

      if (product === null) {
        resolve({
          status: "OK",
          message: "The product is not defined"
        });
      }

      resolve({
        status: 'Ok',
        message: 'Sucess',
        data: product
      })
    } catch (e) {
      reject(e)
    }
  })
}

const deleteProduct = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      const checkProduct = await Product.findOne({
        _id: id
      });

      if (checkProduct === null) {
        resolve({
          status: "OK",
          message: "The product is not defined"
        });
      }

      await Product.findByIdAndDelete(id)

      resolve({
        status: 'Ok',
        message: 'Delete product SUCCESS',
      })
    } catch (e) {
      reject(e)
    }
  })
}

const getAllProduct = (limit, page, sort, filter) => {
  console.log("sort", sort)
  return new Promise(async (resolve, reject) => {
    try {
      const totalProduct = await Product.countDocuments()
      console.log('filter', filter)
      if (filter) {
        const label = filter[0]
        const allObjectFilter = await Product.find({ [label]: { '$regex': filter[1] } }).limit(limit).skip(page * limit)
        resolve({
          status: 'Ok',
          message: 'SUCCESS',
          data: allObjectFilter,
          total: totalProduct,
          pageCurrent: Number(page + 1),
          totalPage: Math.ceil(totalProduct / limit)
        })
      }

      if (sort) {
        const objectSort = {}
        objectSort[sort[1]] = sort[0]
        console.log('objectSort', objectSort)
        const allProductSort = await Product.find().limit(limit).skip(page * limit).sort(objectSort)
        resolve({
          status: 'Ok',
          message: 'SUCCESS',
          data: allProductSort,
          total: totalProduct,
          pageCurrent: Number(page + 1),
          totalPage: Math.ceil(totalProduct / limit)
        })
      }
      const allProduct = await Product.find().limit(limit).skip(page * limit)
      resolve({
        status: 'Ok',
        message: 'SUCCESS',
        data: allProduct,
        total: totalProduct,
        pageCurrent: Number(page + 1),
        totalPage: Math.ceil(totalProduct / limit)
      })
    } catch (e) {
      reject(e)
    }
  })
}


module.exports = {
  createProduct,
  updateProduct,
  getDetailsProduct,
  deleteProduct,
  getAllProduct
};
