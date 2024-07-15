import mongoose from "mongoose";

const DB_URL=process.env.DB_URL || ''

const connectToDB = async () => {
    mongoose.connect(DB_URL).then(()=>{
        console.log('Mongodb connected')
    }).catch(err=>{
        console.log('Error in connecting mongodb',err)
    })
}

export default connectToDB