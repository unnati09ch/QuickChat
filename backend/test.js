const express=require("express");
const app=express();
let p=new Promise((resolve,reject)=>{
    setTimeout(()=>{
        resolve(5);
    },5000)
}).then(value=>{
    console.log(value);
}).catch(error=>{
    console.log(error);
});
app.listen(5000,function(){
    console.log("server started");
});
