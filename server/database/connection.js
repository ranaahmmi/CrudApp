const mongoos=require('mongoose');


const connectDB=async()=>{
    try{
     const con =   await mongoos.connect(process.env.MONGO_URI,{
            useNewUrlParser:true,
            useUnifiedTopology: true 
        });
        console.log(`MongoDB Connected : ${con.connection.host}`);
    }catch(err){
        console.log(`MongoDB Error : ${err.message}`);
        process.exit(1);
    }
}

module.exports=connectDB;