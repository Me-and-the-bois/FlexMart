const express = require('express');
const router = express.Router();
const AdminList = require('../models/admin/adminData');
const DeliverymanList = require('../models/delivery/deliverymanData');
const WarehouseList = require('../models/warehouse/warehouseData');
const CustomerList = require('../models/customer/customerAuthData');
var ObjectId = require('mongodb').ObjectID; 

router.get('/adminList/get', (req,res,next) => {
    AdminList.find({})
        .then(data => {
            res.status(201).json({message: "Admin employee details fetched successfully!!", data: data});
        })
})

router.get('/deliveryList/get', (req,res,next) => {
    DeliverymanList.find({})
        .then(data => {
            res.status(201).json({message: "Delivery employee details fetched successfully!!", data: data});
        })
})

router.get('/warehouseList/get', (req,res,next) => {
    WarehouseList.find({})
        .then(data => {
            res.status(201).json({message: "Warehouse employee details fetched successfully!!", data: data});
        })
})

router.get('/customerList/get', (req,res,next) => {
    CustomerList.find({})
        .then(data => {
            res.status(201).json({message: "Customer details fetched successfully!!", data: data});
        })
})


router.post('/employee/add', (req,res,next) => {
    console.log('Backend', req.body);
    let etype = req.body.etype;
    
    switch(etype)
    {
        case "admin":
            const admin = new AdminList({eimg: req.body.eimg, etype: req.body.etype, ename: req.body.ename, email: req.body.email, epwd: req.body.epwd, esal: req.body.esal});
            admin.save().then(result => {
                console.log(result._id);
                res.status(201).json({message: "Admin employee list added successfully!!"});
              });
              break;
        case "delivery":
            const deliv = new DeliverymanList({eimg: req.body.eimg, etype: req.body.etype, ename: req.body.ename, email: req.body.email, epwd: req.body.epwd, esal: req.body.esal});
            deliv.save().then(result => {
                console.log(result._id);
                res.status(201).json({message: "Delivery employee list added successfully!!"});
              });
              break;
        case "warehouse":
            const ware = new WarehouseList({eimg: req.body.eimg, etype: req.body.etype, ename: req.body.ename, email: req.body.email, epwd: req.body.epwd, esal: req.body.esal});
            ware.save().then(result => {
                console.log(result._id);
                res.status(201).json({message: "Warehouse employee list added successfully!!"});
                });
                break;
        default: break;
    } 
    
})


router.delete('/adminList/delete', (req,res,next) => {
    console.log('Admin Id to be deleted:', req.body);
    AdminList.deleteOne({'_id': ObjectId(req.body.id)})
        .then((result) => {
            res.status(201).json({message: "Admin employee deleted successfully!!"});
        },
        (error) => {
            res.status(500).json({message: "Admin employee deletion unsuccessful!!"})
        })
})

router.delete('/deliveryList/delete', (req,res,next) => {
    console.log('Delivery Id to be deleted:', req.body.id);
    DeliverymanList.deleteOne({'_id': ObjectId(req.body.id)})
        .then((result) => {
            res.status(201).json({message: "Delivery employee deleted successfully!!"});
        },
        (error) => {
            res.status(500).json({message: "Delivery employee deletion unsuccessful!!"})
        })
})

router.delete('/warehouseList/delete', (req,res,next) => {
    console.log('Warehouse Id to be deleted:', req.body.id);
    WarehouseList.deleteOne({'_id': ObjectId(req.body.id)})
        .then((result) => {
            res.status(201).json({message: "Warehouse employee deleted successfully!!"});
        },
        (error) => {
            res.status(500).json({message: "Warehouse employee deletion unsuccessful!!"})
        })
})

router.delete('/customerList/delete', (req,res,next) => {
    console.log('Customer Id to be deleted:', req.body.id);
    CustomerList.deleteOne({'_id': ObjectId(req.body.id)})
        .then((result) => {
            res.status(201).json({message: "Customer deleted successfully!!"});
        },
        (error) => {
            res.status(500).json({message: "Customer deletion unsuccessful!!"})
        })
})



router.put('/adminList/update', (req,res,next) => {
    console.log('Admin Id to be updated:', req.body.eid);
    AdminList.updateOne({'_id': ObjectId(req.body.eid)}, {eimg: req.body.eimg, etype: req.body.etype, ename: req.body.ename, email: req.body.email, epwd: req.body.epwd, esal: req.body.esal}).then(result => {
        console.log(result._id);
        res.status(201).json({message: "Admin employee updated successfully!!"});
      });
})

router.put('/warehouseList/update', (req,res,next) => {
    console.log('Warehouse Id to be updated:', req.body.eid);
    WarehouseList.updateOne({'_id': ObjectId(req.body.eid)}, {eimg: req.body.eimg, etype: req.body.etype, ename: req.body.ename, email: req.body.email, epwd: req.body.epwd, esal: req.body.esal}).then(result => {
        console.log(result._id);
        res.status(201).json({message: "Warehouse employee updated successfully!!"});
      });
})

router.put('/deliveryList/update', (req,res,next) => {
    console.log('Delivery Id to be updated:', req.body.eid);
    DeliverymanList.updateOne({'_id': ObjectId(req.body.eid)}, {eimg: req.body.eimg, etype: req.body.etype, ename: req.body.ename, email: req.body.email, epwd: req.body.epwd, esal: req.body.esal}).then(result => {
        console.log(result._id);
        res.status(201).json({message: "Delivery employee updated successfully!!"});
      });
})

router.put('/customerList/update', (req,res,next) => {
    console.log('Customer Id to be updated:', req.body.id);
    CustomerList.updateOne({'_id': ObjectId(req.body.id)}, {type: req.body.type, name: req.body.name, email: req.body.email, pwd: req.body.pwd, phone: req.body.phone}).then(result => {
        console.log(result._id);
        res.status(201).json({message: "Customer updated successfully!!"});
      });
})

module.exports = router;