const mongoose=require('mongoose')
const dbname='latracal_solution'
require('dotenv').config()
const url = `${process.env.MONGO_URI}${dbname}`

const configDb=()=>{
const db=async()=>{
    try {
        const db=await mongoose.connect(url)
        console.log('db connected success')
    } catch (error) {
        console.log(error);
        
    }
}
db()
}

module.exports=configDb