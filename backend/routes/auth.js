const express = require('express');
const router = express.Router();
const CustomerAuthList = require('../models/customer/customerAuthData');
const AdminAuthList = require('../models/admin/adminData');
const WarehouseAuthList = require('../models/warehouse/warehouseData');
const DeliveryAuthList = require('../models/delivery/deliverymanData');

router.post('/customer/signup', (req,res,next) => {
    console.log(req.body);
    CustomerAuthList.find({email: req.body.email})
        .then(data => {
            console.log(data);
            if(data.length>0) {
                res.sendStatus(404);
            } else {
                const user = new CustomerAuthList({name: req.body.name, email: req.body.email, phone: req.body.phone, pwd: req.body.password, type: req.body.type});
                user.save().then(result => {
                    console.log(result._id);
                    res.status(201).json({message: "User registered successfully!!"});
                });
            }
        })
        
})

router.post('/customer/signin', (req,res,next) => {
    console.log(req.body);
    CustomerAuthList.find({email: req.body.email})
        .then(data => {
            console.log(data);
            if(data.length>0) {
                if(data[0].pwd === req.body.password) {
                    res.status(201).json({message: "User signed in successfully!!", token: data[0].type});
                } else {
                    res.sendStatus(404);
                }
            } else {
                res.sendStatus(404);
            }
        })
        
})

router.post('/admin/signin', (req,res,next) => {
    console.log(req.body);
    AdminAuthList.find({email: req.body.email})
        .then(data => {
            console.log(data);
            if(data.length>0) {
                if(data[0].epwd === req.body.password) {
                    res.status(201).json({message: "User signed in successfully!!", token: data[0].etype});
                } else {
                    res.sendStatus(404);
                }
            } else {
                res.sendStatus(404);
            }
        })
        
})

router.post('/delivery/signin', (req,res,next) => {
    console.log(req.body);
    DeliveryAuthList.find({email: req.body.email})
        .then(data => {
            console.log(data);
            if(data.length>0) {
                if(data[0].epwd === req.body.password) {
                    res.status(201).json({message: "User signed in successfully!!", token: data[0].etype});
                } else {
                    res.sendStatus(404);
                }
            } else {
                res.sendStatus(404);
            }
        })
        
})

router.post('/warehouse/signin', (req,res,next) => {
    console.log(req.body);
    WarehouseAuthList.find({email: req.body.email})
        .then(data => {
            console.log(data);
            if(data.length>0) {
                if(data[0].epwd === req.body.password) {
                    res.status(201).json({message: "User signed in successfully!!", token: data[0].etype});
                } else {
                    res.sendStatus(404);
                }
            } else {
                res.sendStatus(404);
            }
        })
        
})

module.exports = router;