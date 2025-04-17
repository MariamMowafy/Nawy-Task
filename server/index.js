import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import userRouter from "./routes/user.routes.js";
import authRouter from "./routes/auth.route.js";



dotenv.config();

mongoose
  .connect(process.env.MONGO_STRING, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("MongoDB Connected Successfully");
  })
  .catch((err) => {
    console.log("Error Connecting to MongoDB: ", err);
  });

const app = express();
app.use(express.json());

app.listen(4000, () => {
  console.log("Server is running on port 4000");
});


app.use('/server/user/',userRouter)
app.use('/server/auth/',authRouter)

app.use((err, req, res, next) => {
    const statusCode = err.status || 500;
    const message = err.message || "Internal Server Error";
    return res.status(statusCode).json({ status: "Request Failed", statusCode, message });
});

