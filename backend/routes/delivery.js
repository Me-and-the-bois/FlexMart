const express = require('express');
const router = express.Router();
var ObjectId = require('mongodb').ObjectID;
const DeliveryList = require('../models/delivery/productForDelivery');

router.post('/add', (req,res,next) => {
    const deliveryList = new DeliveryList({delivered: "No", deliveryman: "No", list: req.body.data});
    deliveryList.save()
        .then(result => {
            console.log(result._id);
            res.status(201).json({message: "Products bought successfully!!"});
        })
})

router.get('/get', (req,res,next) => {
    DeliveryList.find({})
        .then(result => {
            res.status(201).json({message: "Products bought successfully!!", data: result});
        })
})

router.get('/get/deliverymen', (req,res,next) => {
    const list = ["John", "Jack"];
    res.status(201).json({message: "Deliverymen list received successfully!!", data: list});
})

router.put('/update', (req,res,next) => {
    console.log('Delivery Id to be updated:', req.body);
    DeliveryList.updateOne({'_id': ObjectId(req.body._id)}, {deliveryman: req.body.deliveryman, delivered: "Yes"}).then(result => {
        console.log(result._id);
        res.status(201).json({message: "Delivery details updated successfully!!"});
      });
})

module.exports = router;