require("dotenv").config();

const express=require("express");
const mongoose=require("mongoose")
const session=require("express-session");

const routers=require("./routes/router")

//dependencies

const app=express();

const port= process.env.PORT ||3000;

mongoose.connect("mongodb://localhost:27017/crudapp")
.then(()=>{console.log("connection is succesful")})
.catch((error)=>{console.log("error",error)})

app.listen(port,()=>{
    console.log(`the app is listening on https://localhost:${port}`);
})
//connection codes

app.use(express.json());
app.use(express.urlencoded({extended:false}));

app.use(session({
    secret:"my key i told you",
    saveUninitialized:false,
    resave:false
}))

app.use((req,res,next)=>{
    res.locals.message=req.session.message;
    delete req.session.message;
    next();
})

app.use(routers);

app.use(express.static("uploads"));

//template engines

app.set("view engine","ejs")