var ProductModel = require('../models/ProductModel.js');

/**
 *ProductController.js
 * @description: Server-side logic for managing Products
 */

module.exports = {
  list: (req, res) => {
    ProductModel.find((err, products)=>{
      if(err){  
        return res.status(500).json({
          status: 500,
          message: 'Error when getting Product',
        })
      }

      return res.status(200).json({
        status: 200,
        products: products,
      })  
    })
  }
 }