import mongoose from "mongoose";

export const connectDataBase = async ()=>{
    mongoose.set('strictQuery', true);
    let con  = await mongoose.connect(process.env.DB_LOCAL_URI, {
        useNewUrlParser : true,
        useUnifiedTopology : true
    });
    console.log("DB is Connected "+ con.connection.host);
}