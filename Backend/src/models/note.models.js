const mongoose = require('mongoose') ; 
const noteSchema = new mongoose.Schema({
    
        Title : {
            type :String , 
            required : [true , 'Note Title Must Be Present'], 
        }, 
        Name : {
            type : String , 
            required : true , 
        }, 
        Description : {
            type : String , 
            required : true 
        }
    
}, {timestamps : true }); 
const noteModel = mongoose.model('Note' , noteSchema); 
module.exports = noteModel