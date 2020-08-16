const express = require('express');
const router = express.Router();
const ProductList = require('../models/delivery/productData');
var ObjectId = require('mongodb').ObjectID;


router.get('/', (req,res,next) => {
    ProductList.find({})
        .then(data => {
            res.status(201).json({message: "Product details fetched successfully!!", data: data});
        })

})

router.post('/productList/add', (req,res,next) => {
    console.log('Backend', req.body);
    const product = new ProductList({pimg: req.body.pimg,ptype: req.body.ptype,pcategory: req.body.pcategory,pname: req.body.pname,pno: req.body.pno,pprice: req.body.pprice,pdiscount: req.body.pdiscount,pdesc: req.body.pdesc});
    product.save().then(result => {
        console.log(result._id);
        res.status(201).json({message: "Product list received successfully!!"});
      });
})

router.delete('/productList/delete', (req,res,next) => {
    // console.log('Product Id to be deleted:', req.body.id);
    ProductList.deleteOne({'_id': ObjectId(req.body.id)})
        .then((result) => {
            res.status(201).json({message: "Product deleted successfully!!"});
        },
        (error) => {
            res.status(500).json({message: "Product deletion unsuccessful!!"})
        })
})

router.put('/productList/update', (req,res,next) => {
    console.log('Product Id to be updated:', req.body.data.data.pid);
    ProductList.updateOne({'_id': ObjectId(req.body.data.data.pid)}, {pimg: req.body.data.data.pimg,ptype: req.body.data.data.ptype,pcategory: req.body.data.data.pcategory,pname: req.body.data.data.pname,pno: req.body.data.data.pno,pprice: req.body.data.data.pprice,pdiscount: req.body.data.data.pdiscount,pdesc: req.body.data.data.pdesc}).then(result => {
        console.log(result._id);
        res.status(201).json({message: "Product updated successfully!!"});
      });
})

module.exports = router;