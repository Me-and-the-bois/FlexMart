const express = require('express');
const router = express.Router();
const EdeviceList = require('../models/edevice');
const ClothesList = require('../models/clothes');
const FoodList = require('../models/food');
const FurnitureList = require('../models/furniture');

router.post('/productList/edevice/add', (req,res,next) => {
    //console.log('Backend', req.body[0].pname);
    EdeviceList.remove({})
        .then((response) => {
            for(let i=0;i<req.body.length;i++) {
                const product = new EdeviceList({pimg: req.body[i].pimg,ptype: req.body[i].ptype,pid: req.body[i].pid,pname: req.body[i].pname,pno: req.body[i].pno,pprice: req.body[i].pprice});
                product.save().then(result => {
                    console.log(result._id);
                  });
                if(i === req.body.length-1) {
                    res.status(201).json({message: "E-device list updated successfully!!"});
                }
            }  
        })
})

router.post('/productList/food/add', (req,res,next) => {
    //console.log('Backend', req.body[0].pname);
    FoodList.remove({})
        .then((response) => {
            for(let i=0;i<req.body.length;i++) {
                const product = new FoodList({pimg: req.body[i].pimg,ptype: req.body[i].ptype,pid: req.body[i].pid,pname: req.body[i].pname,pno: req.body[i].pno,pprice: req.body[i].pprice});
                product.save().then(result => {
                    console.log(result._id);
                  });
                if(i === req.body.length-1) {
                    res.status(201).json({message: "Food list updated successfully!!"});
                }
            }
        })
})

router.post('/productList/furniture/add', (req,res,next) => {
    //console.log('Backend', req.body[0].pname);
    FurnitureList.remove({})
        .then((response) => {
            for(let i=0;i<req.body.length;i++) {
                const product = new FurnitureList({pimg: req.body[i].pimg,ptype: req.body[i].ptype,pid: req.body[i].pid,pname: req.body[i].pname,pno: req.body[i].pno,pprice: req.body[i].pprice});
                product.save().then(result => {
                    console.log(result._id);
                  });
                if(i === req.body.length-1) {
                    res.status(201).json({message: "Furniture list updated successfully!!"});
                }
            }
        })
})

router.post('/productList/clothes/add', (req,res,next) => {
    //console.log('Backend', req.body[0].pname);
    ClothesList.remove({})
        .then((response) => {
            for(let i=0;i<req.body.length;i++) {
                const product = new ClothesList({pimg: req.body[i].pimg,ptype: req.body[i].ptype,pid: req.body[i].pid,pname: req.body[i].pname,pno: req.body[i].pno,pprice: req.body[i].pprice});
                product.save().then(result => {
                    console.log(result._id);
                  });
                if(i === req.body.length-1) {
                    res.status(201).json({message: "Clothes list updated successfully!!"});
                }
            }
        })
})

router.get('/edevices/data', (req,res,next) => {
    EdeviceList.find({})
        .then((response) => {
            res.status(201).json({message: "E-devices list received successfully!!", data: response});
        })
})

router.get('/clothes/data', (req,res,next) => {
    ClothesList.find({})
        .then((response) => {
            res.status(201).json({message: "Clothes list received successfully!!", data: response});
        })
})

router.get('/food/data', (req,res,next) => {
    FoodList.find({})
        .then((response) => {
            res.status(201).json({message: "Food list received successfully!!", data: response});
        })
})

router.get('/furniture/data', (req,res,next) => {
    FurnitureList.find({})
        .then((response) => {
            res.status(201).json({message: "Furniture list received successfully!!", data: response});
        })
})

module.exports = router;