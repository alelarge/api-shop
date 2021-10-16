var ProductModel = require('../models/ProductModel.js');
const fs = require('fs');

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
        result: products,
      })  
    })
  },
  show: (req, res)=>{
    const id = req.params.id;
    ProductModel.findOne({ _id: id },(err, product)=>{
      if(err){  
        return res.status(500).json({
          status: 500,
          message: 'Error when getting Product',
        })
      }
      if(!product){
        return res.status(404).json({
          status : 404,
          message : "No such product"
        })   
      }
      return res.status(200).json(
        {
          status: 200,
          result: product,
        })
    })
  },
  create: (req, res)=>{
    if(!req.file){
      return res.status(500).json({
        status : 500,
        message : 'Product Image Required'


      })
    }
    const product = JSON.parse(req.product.body);
    delete product._id;
    if(!req.file){
      return res.status(500).json({
        status : 500,
        message : "Product Image Required"
      })
    }

    let Product = new ProductModel({
      ...product,
      image: `${req.protocol}://${req.get('host')}/images/products/${req.file.filename}`
    });
    
    Product.save((err, Product) => {
      if (err) {
        return res.status(500).json({
          message: 'Error when creating Product',
          error: err,
        });
      }
      return res.status(201).json({
        status: 201,
        message: 'Product Created',
      });
    })
  },
  update: (req,res) =>{
    const id = req.params.id;
    var product = JSON.parse(req.body.product)

    if(req.file) {
      product.image = `${req.protocol}://${req.get('host')}/images/products/${req.file.filename}`;
      ProductModel.findOne({ _id: id}, {image : true},(err, product)=>{
        if(err){
          console.log(err);
          return;
        }

        const filename = product.image.split('/products')[1];
        fs.unlink(`public/images/products/${filename}`, (err)=> {
          if(err){
            console.log(err.message)
          }
        });

      })
    }
      
    ProductModel.updateOne({_id : id} , {...product, _id}, (err, data) =>{
      if(err){
        return res.status(500).json({
          status : 500,
          message : 'Error when updating Product',
          error : err
        })
      }

      return res.status(200).json({
        status : 200,
        product : product
      })
      
    });
  },

  remove: (req, res) => {
    const id = req.params.id;

    ProductModel.findByIdAndRemove(id, (err, Product)=>{
      if(err){
        return res.status(500).json({
          status: 500,
          message: "Error when deleting Product",
          error : err
        });
      }

      if(!Product){
        return res.status(404).json({
          status:404,
          message: "No such Product!"
        })
      }

      const filename = Product.image.split('/products/')[1];
      fs.unlink(`public/images/products/${filename}`, (err)=> {
        if(err){
          console.log(err.message);
        }
      });
      
      return res.status(204).json({
        status : 204,
        message : "Product Deleted!"
      });
    })
  }
}