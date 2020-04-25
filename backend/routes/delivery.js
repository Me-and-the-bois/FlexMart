const express = require('express');
const router = express.Router();
const DeliveryList = require('../models/productForDelivery');

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

module.exports = router;