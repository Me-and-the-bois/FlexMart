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

router.post('/productList/edevice/update', (req,res,next) => {
    const edevice = req.body;
    let updatedEdeviceList = [];
    edevice.forEach(element =>{
        EdeviceList.findById(element.pid, (obj) => {
            if(obj.pno > element.pno){
                obj.pno -= element.pno;
            } else if(obj.pno === element.pno) {
                obj.pno = "0";
            } else {
                res.status(400).json({message: "Product demand exceeds limit!!"});
            }
        });
    })
    EdeviceList.find({})
        .then(data => {
            edevice.forEach(element => {
                updatedEdeviceList = data.map(obj => {
                    if(obj.pid === element.pid) {
                        if(obj.pno > element.pno){
                            obj.pno -= element.pno;
                        } else if(obj.pno === element.pno) {
                            obj.pno = "0";
                        } else {
                            res.status(400).json({message: "Product demand exceeds limit!!"});
                        }
                    }
                    return obj;
                });
            });
            for(let i=0;i<updatedEdeviceList.length;i++) {
                const product = new EdeviceList({pimg: updatedEdeviceList[i].pimg,ptype: updatedEdeviceList[i].ptype,pid: updatedEdeviceList[i].pid,pname: updatedEdeviceList[i].pname,pno: updatedEdeviceList[i].pno,pprice: updatedEdeviceList[i].pprice});
                product.save().then(result => {
                    console.log(result._id);
                  });
            }  
            res.status(201).json({message: "E-device list updated successfully!!"});
        });
})

router.post('/productList/food/update', (req,res,next) => {
    const food = req.body;
    let updatedFoodList = [];
    FoodList.find({})
        .then(data => {
            food.forEach(element => {
                updatedFoodList = data.map(obj => {
                    if(obj.pid === element.pid) {
                        if(obj.pno > element.pno){
                            obj.pno -= element.pno;
                        } else if(obj.pno === element.pno) {
                            obj.pno = "0";
                        } else {
                            res.status(400).json({message: "Product demand exceeds limit!!"});
                        }
                    }
                    return obj;
                });
            });
            for(let i=0;i<updatedFoodList.length;i++) {
                const product = new EdeviceList({pimg: updatedFoodList[i].pimg,ptype: updatedFoodList[i].ptype,pid: updatedFoodList[i].pid,pname: updatedFoodList[i].pname,pno: updatedFoodList[i].pno,pprice: updatedFoodList[i].pprice});
                product.save().then(result => {
                    console.log(result._id);
                  });
            }  
            res.status(201).json({message: "Food list updated successfully!!"});
        });
})

router.post('/productList/furniture/update', (req,res,next) => {
    const furniture = req.body;
    let updatedFurnitureList = [];
    FurnitureList.find({})
        .then(data => {
            furniture.forEach(element => {
                updatedFurnitureList = data.map(obj => {
                    if(obj.pid === element.pid) {
                        if(obj.pno > element.pno){
                            obj.pno -= element.pno;
                        } else if(obj.pno === element.pno) {
                            obj.pno = "0";
                        } else {
                            res.status(400).json({message: "Product demand exceeds limit!!"});
                        }
                    }
                    return obj;
                });
            });
            for(let i=0;i<updatedFurnitureList.length;i++) {
                const product = new EdeviceList({pimg: updatedFurnitureList[i].pimg,ptype: updatedFurnitureList[i].ptype,pid: updatedFurnitureList[i].pid,pname: updatedFurnitureList[i].pname,pno: updatedFurnitureList[i].pno,pprice: updatedFurnitureList[i].pprice});
                product.save().then(result => {
                    console.log(result._id);
                  });
            }  
            res.status(201).json({message: "Furniture list updated successfully!!"});
        });
})

router.post('/productList/clothes/update', (req,res,next) => {
    const clothes = req.body;
    let updatedClothesList = [];
    ClothesList.find({})
        .then(data => {
            clothes.forEach(element => {
                updatedClothesList = data.map(obj => {
                    if(obj.pid === element.pid) {
                        if(obj.pno > element.pno){
                            obj.pno -= element.pno;
                        } else if(obj.pno === element.pno) {
                            obj.pno = "0";
                        } else {
                            res.status(400).json({message: "Product demand exceeds limit!!"});
                        }
                    }
                    return obj;
                });
            });
            for(let i=0;i<updatedClothesList.length;i++) {
                const product = new EdeviceList({pimg: updatedClothesList[i].pimg,ptype: updatedClothesList[i].ptype,pid: updatedClothesList[i].pid,pname: updatedClothesList[i].pname,pno: updatedClothesList[i].pno,pprice: updatedClothesList[i].pprice});
                product.save().then(result => {
                    console.log(result._id);
                  });
            }  
            res.status(201).json({message: "Clothes list updated successfully!!"});
        });
})


module.exports = router;