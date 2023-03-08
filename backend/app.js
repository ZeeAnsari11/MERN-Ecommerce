import  express  from "express";
import {productRouter} from './routes/products.js'
import { userAuthRouter } from "./routes/userAuth.js";
import { orderRouter } from "./routes/orders.js";
import { reviewRouter } from "./routes/review.js";
import {errorHandlerMiddleWare} from './middlewares/errorHandler.js'
import cookieParser from "cookie-parser";
import cors from 'cors'


const app =  express();
 
process.on('uncaughtException',(err)=>{
    console.log("Shutting down the server due to uncaughtException")
    console.log(`Error : ${err}`)
    process.exit();
})

app.use(cors());
app.use(express.json());
app.use(cookieParser());





// app.use((req, res, next) => {
//     console.log("Middleware 1 called.")
//     console.log(req.path)
//     next() // calling next middleware function or handler
//   })

app.use('/api/v1', productRouter);
app.use('/api/v1', userAuthRouter);
app.use('/api/v1', orderRouter);
app.use('/api/v1', reviewRouter);




// app.use((x,req, res, next) => {
//     console.log("Middleware 22222222 called.")
//     console.log(req.path)
//     next() // calling next middleware function or handler
//   })

// MiddleWare to Handle Error
app.use(errorHandlerMiddleWare)

export default app;