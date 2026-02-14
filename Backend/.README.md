# 📘 Simple Note API (Node.js + Express + MongoDB)

A simple REST API for creating, updating, deleting and reading notes using **Node.js, Express and MongoDB (Mongoose)**.

---

##  Features

* Create Note
* Update Note
* Delete Note
* Get All Notes
* Get Single Note
* MongoDB Database اتصال
* Clean MVC Structure

---

##  Tech Stack

* Node.js
* Express.js
* MongoDB
* Mongoose
* dotenv
* cors
* cookie-parser

---

## 📂 Project Structure

```
project/
│
├── src/
│   ├── config/
│   │   └── db.js
│   │
│   ├── controllers/
│   │   └── noteTakingController.controllers.js
│   │
│   ├── models/
│   │   └── note.models.js
│   │
│   ├── routes/
│   │   └── note.routes.js
│   │
│   └── app.js
│
├── .env
├── .gitignore
├── package.json
├── server.js
└── README.md
```

---

##  Installation & Setup

### 1 Initialize Node Project

```bash
npm init -y
```

---

### 2️ Install Dependencies

```bash
npm install express mongoose dotenv cors cookie-parser
```

---

### 3️ Install Dev Dependency

```bash
npm install nodemon --save-dev
```

---

### 4️ Create `.env` File

```
PORT=3000
MONGOOSE_URI=your_mongodb_connection_string
```

⚠️ Never push `.env` file to GitHub.

---

### 5️⃣ Run Server

```bash
npm run dev
```

or

```bash
node server.js
```


--- 

## 🔌 Database Connection (`src/config/db.js`)

```js
require('dotenv').config();
const mongoose = require('mongoose');

const connectedDatabase = async () => {
  try {
    await mongoose.connect(process.env.MONGOOSE_URI);
    console.log('Database Connected');
  } catch (error) {
    process.exit(1);
  }
};

module.exports = connectedDatabase;
```

---

## 🧩 Note Model (`src/models/note.models.js`)

```js
const mongoose = require('mongoose');

const noteSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Note Title Must Be Present'],
    },
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Note', noteSchema);
```
--- 

# Create Controller function 

```js
const noteModel = require("../models/note.models");

const NoteCreate = async(req,res)=>{
    try{
        const {Title , Name , Description} = req.body; 
        // validation
        if(!Title?.trim() || !Name?.trim() || !Description?.trim()){
            return res.status(400).json({
              statusCode: 400,
              message: "All fields are required",
              success: false,
            });
        }
        //created new note 
        const NewNote = await noteModel.create({
          Title, 
          Name , 
          Description
        });
        res.status(201).json({ // when new data is created , status code should be 201
            success : true , 
            message : 'Note Created Successfully....' , 
            data : NewNote , // data message must be lowercase 
        })
    }catch(error){
        console.error(error);
        return res.status(500).json({
            success : false , 
            message : 'Internal Sever Error' , 
            statusCode : 500 
        }) 
    }
}

const NoteUpdate = async(req,res)=>{
    try{
        const noteId = req.params.id ; 
        const existNote = await noteModel.findById(noteId);
         console.log(existNote);
        if(!existNote){
            return res.status(404).json({
                success : false , 
                statusCode : 404, 
                message : 'Note Not Found'
            })
        }

        const { Title, Name, Description } = req.body; 

        existNote.Title = Title ; 
        existNote.Name = Name ; 
        existNote.Description = Description; 

        await existNote.save(); 

        res.status(200).json({
            success : true , 
            statusCode : 200 , 
            message : "Update Note SuccessFully......."
        })
    }catch(error){
        return res.status(500).json({
            message : 'Internal Server Error', 
            statusCode : 500 , 
            success : false 
        })
    }
}
const NoteDelete = async(req,res)=>{
    try {
        const noteId = req.params.id ; 
       
        const DeletedNote = await noteModel.findByIdAndDelete(noteId); 
        if(!DeletedNote){
            return res.status(404).json({
                success : false , 
                message : 'Resource Not Found', 
                statusCode : 404 
            })
        }
        res.status(200).json({
            success : true , 
            statusCode : 200 , 
            message : 'Note Deleted Successfully....'
        })
    } catch (error) {
        return res.status(500).json({
            statusCode : 500 , 
            message : 'Internal Server Error', 
            success : false 
        })
    }
}

const SeeAllNote = async(req,res)=>{
    try {
        const AllNote = await noteModel.find(); 
        res.status(200).json({
            success : true , 
            statusCode : 200 , 
            data : AllNote
        })
    } catch (error) {
      res.status(500).json({
        message : 'Internal Server Error', 
        success : false , 
        statusCode : 500
      })
    }
}

const SpecificNote = async(req,res)=>{
    try{
        const NoteId = req.params.id;
        const findNote = await noteModel.findById(NoteId); 
        if(!findNote){
            return res.status(404).json({
                success : false , 
                message : 'Note Not Found'
            })
        } 
        res.status(200).json({
            statusCode : 200 , 
            success : true , 
            data : findNote 
        })
    }catch(error){
        return res.status(500).json({
            success : false , 
            statusCode : 500 , 
        })
    }
}

module.exports = { SeeAllNote,SpecificNote, NoteDelete, NoteUpdate, NoteCreate }; 

```


# Router 

```js
const express = require('express'); 
const { SeeAllNote, SpecificNote, NoteCreate, NoteUpdate, NoteDelete } = require('../controllers/noteTakingController.controllers');
const router = express.Router() ; 

router.get('/' , SeeAllNote); 
router.get('/:id' , SpecificNote); 
router.post('/createdNote' , NoteCreate); 
router.put('/updateNote/:id', NoteUpdate); 
router.delete('/deleteNote/:id', NoteDelete); 

module.exports = router;  
```

# App.js file 

```js
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
```


# Server.js file 

```js
require('dotenv').config() ; 
const app = require('./src/app'); 
const port = process.env.PORT; 
const connectedDb = require('./src/config/db'); 

connectedDb() ; 

app.listen(port , async()=>{
    console.log(`server start at the port - ${port}`);
})
```

---

## 🌐 API Endpoints

| Method | Endpoint                | Description     |
| ------ | ----------------------- | --------------- |
| GET    | `/api/notes`            | Get all notes   |
| GET    | `/api/notes/:id`        | Get single note |
| POST   | `/api/notes/create`     | Create note     |
| PUT    | `/api/notes/update/:id` | Update note     |
| DELETE | `/api/notes/delete/:id` | Delete note     |

---

## 📥 Example Request Body

```json
{
  "title": "My First Note",
  "name": "Shahriar",
  "description": "Learning Node.js CRUD API"
}
```

---

```
node_modules/
.env
```



---

## 👨‍💻 Author

**Songram Modak**

Backend Developer (Node.js | Express | MongoDB)

---

# Flow 

Project Flow (Backend Structure)

প্রথমে আমরা project initialize করেছি:

npm init -y দিয়ে Node project create করেছি

প্রয়োজনীয় packages install করেছি (express, mongoose, dotenv ইত্যাদি)

root এ server.js file create করেছি (server run করার জন্য)

এরপর আমরা src folder এর ভিতরে main structure তৈরি করেছি:

1. App Setup

src/app.js → এখানে express app configure করেছি (middleware, routes, etc.)

2. Database Config

src/config/db.js → এখানে MongoDB connection setup করেছি

3. Models

src/models/note.model.js → এখানে mongoose schema তৈরি করেছি
 Database কে জানানো হয় data structure কেমন হবে (Title, Name, Description)

4. Controller

src/controllers/note.controller.js → এখানে CRUD functionality লিখেছি

Create Note

Get Notes

Update Note

Delete Note

5. Routes

src/routes/note.routes.js → এখানে API routes define করেছি
 Controller এর function গুলোকে route এর সাথে connect করেছি

---

