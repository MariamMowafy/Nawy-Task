import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv"
dotenv.config()

mongoose.connect(process.env.MONGO_STRING
, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}
).then(()=>{
    console.log("MongoDB Connected Successfully")
}).catch((err)=> {
    console.log("Error Connecting to MongoDB: ", err)
})

const app = express();
app.listen(4000, () => {
    console.log("Server is running on port 4000")
}) 