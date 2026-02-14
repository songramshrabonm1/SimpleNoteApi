const express = require('express') ; 
const app = express() ; // Here Create Server Instance . 
const cors = require('cors');
const cookieparser = require('cookie-parser'); 


// require note router 
const NoteRouter = require("./routes/note.routes"); 

// Create Middleware 
app.use(express.json()) ; 
// server frontend এর Data সরারসরি পড়তে পারে না এই ডাটা পড়ার জন্য express.json() এই middleware এর দরকার পড়ে 
app.use(express.urlencoded({extended: true })); 
app.use(cors({
    origin : true , 
    credentials : true 
})) ; 
app.use(cookieparser());


// routes
app.use("/NOTE", NoteRouter);

module.exports = app ; 