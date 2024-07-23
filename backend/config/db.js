const mongoose=require("mongoose");
require('dotenv').config();
async function connectToMongoDB() {
  

  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log('Connected to MongoDB Atlas');
    // Your application logic here
  } catch (error) {
    console.error('MongoDB connection error unni resolve:', error.message);
  }
}

module.exports=connectToMongoDB;
