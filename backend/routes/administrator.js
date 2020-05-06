const express = require('express');
const router = express.Router();
const AdminList = require('../models/employeeData');
const DeliveryList = require('../models/employeeData');
const WarehouseList = require('../models/employeeData');
const CustomerList = require('../models/employeeData');

router.get('/adminList/get', (req,res,next) => {
    AdminList.find({})
        .then(data => {
            res.status(201).json({message: "Admin employee details fetched successfully!!", data: data});
        })

})

router.get('/deliveryList/get', (req,res,next) => {
    DeliveryList.find({})
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
    epost = req.body.epost;
    switch(epost)
    {
        case "Administrator":
            const admin = new AdminList({eid: req.body.eid, ename: req.body.ename,eemail: req.body.eemail,epass: req.body.epass,eaddress: req.body.eaddress,emob: req.body.emob,epost: req.body.epost,esalary: req.body.esalary});
            admin.save().then(result => {
                console.log(result._id);
                res.status(201).json({message: "Admin employee list received successfully!!"});
              });
              break;
        case "Delivery Personnel":
            const deliv = new DeliveryList({eid: req.body.eid, ename: req.body.ename,eemail: req.body.eemail,epass: req.body.epass,eaddress: req.body.eaddress,emob: req.body.emob,epost: req.body.epost,esalary: req.body.esalary});
            deliv.save().then(result => {
                console.log(result._id);
                res.status(201).json({message: "Delivery employee list received successfully!!"});
              });
              break;
        case "Delivery Personnel":
            const ware = new WarehouseList({eid: req.body.eid, ename: req.body.ename,eemail: req.body.eemail,epass: req.body.epass,eaddress: req.body.eaddress,emob: req.body.emob,epost: req.body.epost,esalary: req.body.esalary});
            ware.save().then(result => {
                console.log(result._id);
                res.status(201).json({message: "Warehouse employee list received successfully!!"});
                });
                break;
        default:
            

    } 

})


router.delete('/adminList/delete', (req,res,next) => {
    console.log('Admin Id to be deleted:', req.body.id);
    AdminList.deleteOne({'eid': req.body.id})
        .then((result) => {
            res.status(201).json({message: "Admin employee deleted successfully!!"});
        },
        (error) => {
            res.status(500).json({message: "Admin employee deletion unsuccessful!!"})
        })
})

router.delete('/deliveryList/delete', (req,res,next) => {
    console.log('Delivery Id to be deleted:', req.body.id);
    DeliveryList.deleteOne({'eid': req.body.id})
        .then((result) => {
            res.status(201).json({message: "Delivery employee deleted successfully!!"});
        },
        (error) => {
            res.status(500).json({message: "Delivery employee deletion unsuccessful!!"})
        })
})

router.delete('/warehouseList/delete', (req,res,next) => {
    console.log('Warehouse Id to be deleted:', req.body.id);
    WarehouseList.deleteOne({'eid': req.body.id})
        .then((result) => {
            res.status(201).json({message: "Warehouse employee deleted successfully!!"});
        },
        (error) => {
            res.status(500).json({message: "Warehouse employee deletion unsuccessful!!"})
        })
})

router.delete('/customerList/delete', (req,res,next) => {
    console.log('Customer Id to be deleted:', req.body.id);
    CustomerList.deleteOne({'eid': req.body.id})
        .then((result) => {
            res.status(201).json({message: "Customer deleted successfully!!"});
        },
        (error) => {
            res.status(500).json({message: "Customer deletion unsuccessful!!"})
        })
})



router.put('/adminList/update', (req,res,next) => {
    console.log('Admin Id to be updated:', req.body.data.data.pid);
    AdminList.updateOne({'eid': req.body.data.data.eid}, {eid: req.body.eid, ename: req.body.data.data.ename,eemail: req.body.data.data.eemail,epass: req.body.data.data.epass,eaddress: req.body.data.data.eaddress,emob: req.body.data.data.emob,epost: req.body.data.data.epost,esalary: req.body.data.data.esalary}).then(result => {
        console.log(result._id);
        res.status(201).json({message: "Admin employee updated successfully!!"});
      });
})

router.put('/warehouseList/update', (req,res,next) => {
    console.log('Warehouse Id to be updated:', req.body.data.data.pid);
    WarehouseList.updateOne({'eid': req.body.data.data.eid}, {eid: req.body.eid, ename: req.body.data.data.ename,eemail: req.body.data.data.eemail,epass: req.body.data.data.epass,eaddress: req.body.data.data.eaddress,emob: req.body.data.data.emob,epost: req.body.data.data.epost,esalary: req.body.data.data.esalary}).then(result => {
        console.log(result._id);
        res.status(201).json({message: "Warehouse employee updated successfully!!"});
      });
})

router.put('/deliveryList/update', (req,res,next) => {
    console.log('Delivery Id to be updated:', req.body.data.data.pid);
    DeliveryList.updateOne({'eid': req.body.data.data.eid}, {eid: req.body.eid, ename: req.body.data.data.ename,eemail: req.body.data.data.eemail,epass: req.body.data.data.epass,eaddress: req.body.data.data.eaddress,emob: req.body.data.data.emob,epost: req.body.data.data.epost,esalary: req.body.data.data.esalary}).then(result => {
        console.log(result._id);
        res.status(201).json({message: "Delivery employee updated successfully!!"});
      });
})

router.put('/customerList/update', (req,res,next) => {
    console.log('Customer Id to be updated:', req.body.data.data.pid);
    CustomerList.updateOne({'eid': req.body.data.data.eid}, {eid: req.body.eid, ename: req.body.data.data.ename,eemail: req.body.data.data.eemail,epass: req.body.data.data.epass,eaddress: req.body.data.data.eaddress,emob: req.body.data.data.emob,epost: req.body.data.data.epost,esalary: req.body.data.data.esalary}).then(result => {
        console.log(result._id);
        res.status(201).json({message: "Customer updated successfully!!"});
      });
})

module.exports = router;