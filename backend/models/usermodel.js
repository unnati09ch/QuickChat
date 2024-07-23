const mongoose=require("mongoose");
const bcrypt=require("bcrypt");
const salt=10;
//mongoose.connect("mongodb://0.0.0.0:27017/UserDb");
const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },

pic: {
    type: "String",
    required: true,
    default:
      "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg",
  },
},
{
    timestamps:true

}

);
userSchema.pre('save', async function (next) {
    // Only hash the password if it has been modified (or is new)
    //if (!this.isModified('password')) return next();
  
  
      const hashedPassword = await bcrypt.hash(this.password, salt);
      this.password = hashedPassword;
      next();
     
  });
  
    const User=mongoose.model("User",userSchema);
    


module.exports=User;