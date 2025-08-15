const mongoose = require("mongoose");
async function ConnectDB(retries=3,delay=500){
    while(retries){
  try{
     await mongoose.connect(process.env.MONGO_URI);
     console.log("Mongodb server connected");
     break;
}catch(error){
    console.error("Error in connecting with Mongodb" , error);
   retries-=1;
   
}
if(!retries){
     console.error("❌ All connection attempts failed. Exiting...");
        process.exit(1);
}
await new Promise(()=> setTimeout((res)=>{res},delay))
    }


}
//good for render , it retries after failing to connect .
module.exports = ConnectDB ;
