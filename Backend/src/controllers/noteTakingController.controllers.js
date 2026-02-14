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