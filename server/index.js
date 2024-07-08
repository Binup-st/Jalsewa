import express from 'express';
import dotenv from 'dotenv'
dotenv.config({ path: './.env' })
import cors from 'cors';
import testRoutes from './routes/authRoutes.js'
import mongoose from 'mongoose' 
import cookieParser from 'cookie-parser'

const app = express();

app.use(express.json())
app.use(cookieParser())
app.use(express.urlencoded({extended: false}))

mongoose.connect(process.env.MONGO_URL)
.then(()=>{
    console.log("Connected to database");
})
.catch((err)=>{
    console.log(err)
})


app.use('/', testRoutes)

app.listen(3000, ()=>{
    console.log('Server runnning on port 3000')
})
