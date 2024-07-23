const User=require("../models/usermodel");
const express=require("express");
const bcrypt=require("bcrypt");
const generatetoken=require("../config/generatetoken")
exports.login=async (req,res)=>{
  console.log("req accepted");
   if(!req.body.email||!req.body.password)
  res.send({
message:"Please fill all the fields",
});
//res.send("enter fields");

//throw new Error("enter all fields");

else{
   const result = await User.findOne({ email: req.body.email });
 
   if (result) {
  bcrypt.compare(req.body.password,result.password,function(err,resul){
    
      if(resul){
        console.log(result.name);
    

     res.send({
      _id:result._id,
      token:generatetoken(result._id),
      name:result.name,
      email:result.email,
      pic:result.pic,
      isAdmin:result.isAdmin


     });

    }
     
    else{
     res.send({
      message:"wrong pas",
     });
    //res.send("wrong pas")
    }
     
    });
    
    }
   else {
res.send({
  message:"user not found",
});
//throw new Error("user not found");
//res.send("user not found");

  }
}
}





exports.signup=async(req,res)=>{
  console.log("got");
  if(!req.body.email||!req.body.name||!req.body.password||!req.body.confirmpassword)
  res.send("Please fill all the fields");
else{
  try{

 const result= await User.findOne({email:req.body.email});
 
      if(!result)
      {
        if(req.body.confirmpassword==req.body.password){

            console.log("success");
       
          const user=new User({
           
            name:req.body.name,
            email:req.body.email,
            password:req.body.password,
            pic:req.body.pic
           
          });
         
       await user.save();
       const a=generatetoken(user._id);
    //  console.log(a);
        console.log("signed succesfully");
        res.send()
        }
         
      else{
       
    console.log("passdont match");
        res.send("passwords dont match");
      }
    }
      else
      {
        //console.log(result.email);
        res.send("user exists"); 
        
      }
    }
    catch(err){
      console.log(err);
    }
  }

};
    
exports.Allusers=async(req,res)=>{
  const keyword = req.query.search
  ? {
      $or: [
        { name: { $regex: req.query.search, $options: "i" } },
        { email: { $regex: req.query.search, $options: "i" } },
      ],
    }
  : {};
  //const users = await User.find(keyword);

  const users = await User.find(keyword).find({ _id: { $ne: req.user._id } });
  console.log("got")
  res.send(users);


};
  







