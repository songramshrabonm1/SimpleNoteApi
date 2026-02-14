require('dotenv').config(); 
const mongoose = require('mongoose') ; 

const connectedDatabase = async()=>{
    try{
        await mongoose.connect(process.env.MONGOOSE_URI);
        console.log('Connected Database'); 
    }catch(error){
        console.error(error.message); 
        process.exit(1); // যদি mongodb এর সাথে server connected না হয় তাহলে সাথে সাথে বের হয়ে যাবে 
        // কারণ databse ছাড়া server run করার কোন দরকার নাই 
    }
}
module.exports = connectedDatabase; 