import app from './app.js'
import dotenv from "dotenv"

import {connectDataBase} from './configuration/database.js'

// // seting COnfig FIle
dotenv.config();

// Conntecting to DataBase
connectDataBase();

let server  = app.listen(process.env.PORT,()=>{
console.log(`server start at ${process.env.PORT} and mode ${process.env.NODE_ENV}`)
})

process.on("unhandledRejection", err=>{
    console.log("Shutting down the server due to unhandled promise rejection")
    console.log("Stack" , err.stack);
    console.log(`Error : ${err}`)
        server.close(()=>{
            process.exit();
        })
})