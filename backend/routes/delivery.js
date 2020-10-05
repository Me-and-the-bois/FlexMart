const express = require('express');
const router = express.Router();
var ObjectId = require('mongodb').ObjectID;
const DeliveryList = require('../models/delivery/productForDelivery');
const CustomerAuthList = require('../models/customer/customerAuthData');

router.post('/add', (req,res,next) => {
    CustomerAuthList.find({email: req.body.custid})
        .then(data => {
            if(data.length>0) {
                console.log('Customer detail', data);
                const tempObj = {name: data[0].name, email: data[0].email, phone: data[0].phone, pwd: data[0].pwd, type: data[0].type};
                const deliveryList = new DeliveryList({delivered: "No", deliveryman: "No", prodlist: req.body.data, custdetail: tempObj});
                deliveryList.save()
                    .then(result => {
                        console.log(result._id);
                        res.status(201).json({message: "Products bought successfully!!"});
                    })
            } else {
                res.sendStatus(404);
            }
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