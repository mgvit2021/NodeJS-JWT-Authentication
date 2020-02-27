const express=require('express');
const dotenv=require('dotenv');
const PORT = process.env.PORT || 3000;
const mongoose=require('mongoose');
const authRoute=require('./routes/auth');
const postsRoute=require('./routes/posts');
const app=express();
dotenv.config();

//Connect to db
mongoose.connect(process.env.DB_CONNECT,{useNewUrlParser:true},()=>{
    console.log('connected to database')
})

//Middleware
app.use(express.json());
app.use(express.urlencoded({extended:false}));



app.use('/api/user',authRoute);
app.use('/api/posts',postsRoute);


app.listen(PORT,()=>{console.log(`Server running on port ${PORT}`)});