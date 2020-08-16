const express = require('express');
let bodyParser = require('body-parser');
const warehouseRoutes = require('./routes/warehouse');
const customerRoutes = require('./routes/customer');
const deliveryRoutes = require('./routes/delivery');
const adminRoutes = require('./routes/admin');
const authRoutes = require('./routes/auth');
const mongoose = require('mongoose');

const app = express();
const port = process.env.PORT || "5000";
app.use(bodyParser.json({limit: '10MB', extended: true}))
app.use(bodyParser.urlencoded({limit: '10MB', extended: true}))

mongoose.connect("mongodb+srv://4Noob:TRcdjP3XDax3UsWG@cluster0-mqvxr.mongodb.net/test?retryWrites=true&w=majority", { useNewUrlParser: true,  useUnifiedTopology: true })
  .then(() => {
    console.log("Connected to database!");
  })
  .catch(() => {
    console.log("Connection failed!");
  });

app.use((req,res,next) => {
  res.setHeader("Access-Control-Allow-Origin","*");
  res.setHeader("Access-Control-Allow-Headers","Origin, X-Requested-With, Accept, Content-type");
  res.setHeader("Access-Control-Allow-Methods","GET, POST, PUT, PATCH, DELETE, OPTIONS");
  next();
});
app.use('/warehouse', warehouseRoutes);
app.use('/customer', customerRoutes);
app.use('/delivery', deliveryRoutes);
app.use('/admin', adminRoutes);
app.use('/auth', authRoutes);
app.listen(port, () => {
  console.log(`Listening to requests on http://localhost:${port}`);
});
module.exports = app;