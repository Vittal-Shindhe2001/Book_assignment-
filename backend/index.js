const express=require('express')
const cors=require('cors')
const app=express()
const port=3089
const configDb=require('./config/mongodb')
const router=require('./config/routes')
const fs=require('fs')

// middleware
app.use(express.urlencoded({extended: true}));
const uploadFolder = 'uploads/';
// Check if the directory exists, if not, create it
if (!fs.existsSync(uploadFolder)) {
    fs.mkdirSync(uploadFolder);
    console.log('Uploads folder created successfully');
} else {
    console.log('Uploads folder already exists');
}
app.use(express.urlencoded({ extended: true }))
app.use('/uploads', express.static('uploads'))
app.use(express.json())
app.use(cors())
configDb()
app.use(router)

app.listen(port,()=>{
    console.log(`server Running on port http://localhost:${port}`);
    
})