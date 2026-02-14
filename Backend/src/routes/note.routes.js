const express = require('express'); 
const { SeeAllNote, SpecificNote, NoteCreate, NoteUpdate, NoteDelete } = require('../controllers/noteTakingController.controllers');
const router = express.Router() ; 

router.get('/' , SeeAllNote); 
router.get('/:id' , SpecificNote); 
router.post('/createdNote' , NoteCreate); 
router.put('/updateNote/:id', NoteUpdate); 
router.delete('/deleteNote/:id', NoteDelete); 

module.exports = router;  