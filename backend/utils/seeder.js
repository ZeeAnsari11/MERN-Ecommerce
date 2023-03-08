import dotenv from "dotenv"
import {ProductModel} from '../models/products.js' ;
import products from '../data/product.json' assert {type: "json"};
import {connectDataBase} from '../configuration/database.js';

// setting up the dotenv
dotenv.config();

// connecting to Database;
 await connectDataBase();

const seedProducts = ()=>{
    try{
        ProductModel.deleteMany().then((res)=>{console.log("===========Prodcts are deleted")});
        ProductModel.insertMany(products).then((res)=>{console.log("=============All Producst are added");
        process.exit()});
        
    }
    catch(e){
        console.log("======error=======>>>> "+e); process.exit();
    }
}
seedProducts();
