const express = require('express');
const router = express.Router();
var ObjectId = require('mongodb').ObjectID;
const DeliveryList = require('../models/delivery/productForDelivery');
const EmpList = require('../models/empData');
const CustomerAuthList = require('../models/customer/customerAuthData');

router.post('/add', (req,res,next) => {
    CustomerAuthList.find({email: req.body.custid})
        .then(data => {
            if(data.length>0) {
                console.log('Customer detail', data);
                const tempObj = {name: data[0].name, email: data[0].email, phone: data[0].phone, pwd: data[0].pwd, type: data[0].type};
                const deliveryList = new DeliveryList({delivered: "No", deliveryman: "Not assigned", prodlist: req.body.data, custdetail: tempObj});
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
    EmpList.find({etype: 'delivery'})
        .then(data => {
            const list = [];
            data.forEach(obj => {
                list.push(obj.ename);
            })
            res.status(201).json({message: "Deliverymen list received successfully!!", data: list});
        })
})

router.put('/update/man', (req,res,next) => {
    console.log('Delivery Id to be updated:', req.body);
    DeliveryList.updateOne({'_id': ObjectId(req.body._id)}, {deliveryman: req.body.deliveryman, delivered: "No"}).then(result => {
        console.log(result._id);
        res.status(201).json({message: "Delivery details updated successfully!!"});
      });
})

router.put('/update/delivery', (req,res,next) => {
    console.log('Delivery Id to be updated:', req.body);
    DeliveryList.updateOne({'_id': ObjectId(req.body._id)}, {delivered: "Yes"}).then(result => {
        console.log(result._id);
        res.status(201).json({message: "Delivery details updated successfully!!"});
      });
})

router.delete('/remove', (req,res,next) => {
    console.log('Delivery Id to be removed:', req.body);
    DeliveryList.deleteOne({'_id': ObjectId(req.body._id)}).then(result => {
        console.log(result._id);
        res.status(201).json({message: "Delivery details updated successfully!!"});
      });
})

module.exports = router;