const express = require("express");
const env = require("dotenv");
const app = express();
// const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const path = require("path");
const cors = require("cors");

// routes
const authRoutes = require('./routes/auth');
const adminRoutes = require('./routes/admin/auth');
const postroutes = require('./routes/posts');
const categoryRoutes = require('./routes/category');
const productRoutes = require('./routes/product');
const cartRoutes = require('./routes/cart');
const ReportRoutes = require('./routes/reports');
const EmergencyPhone = require('./routes/EmergencyPhone');


// environment variable or you can say constants
env.config();

// mongobd connection
// mongodb+srv://<username>:<password>@cluster0.giumd.mongodb.net/myFirstDatabase?retryWrites=true&w=majority
// mongodb+srv://safeTransport:safeTransport@cluster0.wskzt.mongodb.net/safeTransport?retryWrites=true&w=majority
mongoose
  .connect(
    `${process.env.DB}`,
    { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true }
  )
  .then(() => {
    console.log('DataBase Connected');
  });
// app.use(bodyParser());
app.use(cors());
app.use(express.json());
app.use('/public', express.static(path.join(__dirname, 'uploads')));
// app.use(bodyParser.urlencoded({extended: true}));
app.use('/api', authRoutes);
app.use('/api', adminRoutes);
app.use('/api', categoryRoutes);
app.use('/api', productRoutes);
app.use('/api', cartRoutes);
app.use('/api', postroutes);
app.use('/api', ReportRoutes);
app.use('/api', EmergencyPhone);


const port = process.env.PORT || 5000;

app.listen(process.env.PORT || 5000, function () {
  console.log('Server listening on port 3000');

});
