const express=require('express');
require('dotenv').config();
const rte=require('./routes/url.route');
var cors = require('cors');
const dbConnect=require('./utils/url.db');

const app=express();
const port=process.env.PORT;

dbConnect();

app.use(cors());
app.use('/api',rte);


app.listen(port,()=>{
    console.log(`Listening to port ${port}`);
})