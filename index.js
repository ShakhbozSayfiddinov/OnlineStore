const express = require('express');
const app = express();
require('dotenv').config();
const categoriesRauter = require('./router/categories');
const customersRauter = require('./router/customers');
const { default: mongoose } = require('mongoose');

mongoose.connect(process.env.MONGO_URL)
.then(() => {
    console.log('mongodbga ulanish hosil qilindi' ,);
})
.catch((err)  => {
    console.log('mangooosega ulanishda xatolik ro`y berdi' , err);
})



app.use(express.json());
app.use('/api/categories' , categoriesRauter);
app.use('/api/customers' , customersRauter);


const port = process.env.PORT
app.listen(port, () => {
    console.log('name:',process.env.NAME);
    console.log(`${port} - portni eshitishni boshladim...`);
})