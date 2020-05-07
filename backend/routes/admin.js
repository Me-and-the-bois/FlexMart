const express = require('express');
const router = express.Router();
const AdminList = require('../models/adminData');
const DeliverymanList = require('../models/deliverymanData');
const WarehouseList = require('../models/warehouseData');
const CustomerList = require('../models/customerData');

router.get('/', (req,res,next) => {
    console.log('Backend', req.body);
    res.status(200).json({message: "You are at the admin route!", data: req.body.data});
})


router.get('/adminList/get', (req,res,next) => {
    AdminList.find({})
        .then(data => {
            res.status(201).json({message: "Admin employee details fetched successfully!!", data: data});
        })

})

router.get('/deliverymanList/get', (req,res,next) => {
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
                res.status(201).json({message: "Admin employee list added successfully!!"});
              });
              break;
        case "Delivery Personnel":
            const deliv = new DeliverymanList({eid: req.body.eid, ename: req.body.ename,eemail: req.body.eemail,epass: req.body.epass,eaddress: req.body.eaddress,emob: req.body.emob,epost: req.body.epost,esalary: req.body.esalary});
            deliv.save().then(result => {
                console.log(result._id);
                res.status(201).json({message: "Delivery employee list added successfully!!"});
              });
              break;
        case "Warehouse Operator":
            const ware = new WarehouseList({eid: req.body.eid, ename: req.body.ename,eemail: req.body.eemail,epass: req.body.epass,eaddress: req.body.eaddress,emob: req.body.emob,epost: req.body.epost,esalary: req.body.esalary});
            ware.save().then(result => {
                console.log(result._id);
                res.status(201).json({message: "Warehouse employee list added successfully!!"});
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

router.delete('/deliverymanList/delete', (req,res,next) => {
    console.log('Delivery Id to be deleted:', req.body.id);
    DeliverymanList.deleteOne({'eid': req.body.id})
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
    console.log('Admin Id to be updated:', req.body.eid);
    AdminList.updateOne({'eid': req.body.eid}, {eid: req.body.eid, ename: req.body.ename,eemail: req.body.eemail,epass: req.body.epass,eaddress: req.body.eaddress,emob: req.body.emob,epost: req.body.epost,esalary: req.body.esalary}).then(result => {
        console.log(result._id);
        res.status(201).json({message: "Admin employee updated successfully!!"});
      });
})

router.put('/warehouseList/update', (req,res,next) => {
    console.log('Warehouse Id to be updated:', req.body.eid);
    WarehouseList.updateOne({'eid': req.body.eid}, {eid: req.body.eid, ename: req.body.ename,eemail: req.body.eemail,epass: req.body.epass,eaddress: req.body.eaddress,emob: req.body.emob,epost: req.body.epost,esalary: req.body.esalary}).then(result => {
        console.log(result._id);
        res.status(201).json({message: "Warehouse employee updated successfully!!"});
      });
})

router.put('/deliverymanList/update', (req,res,next) => {
    console.log('Delivery Id to be updated:', req.body.eid);
    DeliverymanList.updateOne({'eid': req.body.eid}, {eid: req.body.eid, ename: req.body.ename,eemail: req.body.eemail,epass: req.body.epass,eaddress: req.body.eaddress,emob: req.body.emob,epost: req.body.epost,esalary: req.body.esalary}).then(result => {
        console.log(result._id);
        res.status(201).json({message: "Delivery employee updated successfully!!"});
      });
})

router.put('/customerList/update', (req,res,next) => {
    console.log('Customer Id to be updated:', req.body.eid);
    CustomerList.updateOne({'eid': req.body.eid}, {eid: req.body.eid, ename: req.body.ename,eemail: req.body.eemail,epass: req.body.epass,eaddress: req.body.eaddress,emob: req.body.emob,epost: req.body.epost,esalary: req.body.esalary}).then(result => {
        console.log(result._id);
        res.status(201).json({message: "Customer updated successfully!!"});
      });
})

module.exports = router;