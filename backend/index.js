const cors=require('cors')
const express=require('express');
const app=express();
const dotenv=require('dotenv');
const connectDB = require('./config/database.js');
const userRouter = require('./routes/userRoutes.js');
const messageRouter = require('./routes/messageRoutes.js');
const cookieParser = require('cookie-parser');
dotenv.config({});

app.use(cors());

app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);

const PORT=2000;

//middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());

//routes
app.use("/api/vi/user",userRouter);
app.use("/api/vi/message",messageRouter);




app.listen(PORT,()=>{
    connectDB();
    console.log(`App is runnig on port number ${PORT}`);
})