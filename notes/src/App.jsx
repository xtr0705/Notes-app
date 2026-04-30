import './App.css'
import dayjs from 'dayjs';
import { useState } from 'react';





function InputNote({setEditingId,editingId,setNotes, notes, setNoteTitle,noteTitle, setNoteContent, noteContent}) {
  
  return (
    <div className={"w-60 h-70 flex flex-col justify-center items-center bg-mauve-600 rounded-2xl "} >
      <input 
        type="text" 
        placeholder="Title" 
        value={noteTitle}
        onChange={(e) => {
          setNoteTitle(e.target.value);
        }} 
      />

      <input
        className="h-10 w-30 rounded-2xl"
        type="text"
        value={noteContent}
        placeholder="Note"
        onChange={(e) => {
          setNoteContent(e.target.value);
        }} 
      />
      <button
        className="w-20 h-10 bg-green-500 rounded-2xl text-white font-bold"
        onClick={()=>{
          if (editingId) {
            setNotes(
              notes.map((note)=>
                note.id === editingId 
                  ?{
                    ...note,
                    noteTitle:noteTitle,
                    noteContent:noteContent,
                    date: dayjs().format('DD MMMM, YYYY'),
                    completed:false,
                  }
                  : note
              )
            );
            
          }else{
            const newNote={
              noteTitle,
              noteContent,
              id: crypto.randomUUID(),
              date: dayjs().format('DD MMMM, YYYY'),
              completed:false
            }
            console.log(newNote);
            setNotes([...notes, newNote]);
            console.log(notes);
          }

          setEditingId("");
          setNoteTitle("");
          setNoteContent("");
        }} 
      />

    </div>
  )
}


const DisplayNotes = ({setNotes,notes,setEditingId,setNoteTitle,setNoteContent}) => {
  return notes.map((note) => {
    return (
      <div 
      className={note.completed?"line-through text-3xl":"w-60 h-70 flex flex-col justify-center items-center bg-mauve-600 rounded-2xl"} 
      key={note.id}
      >
        <h3
          className='font-bold text-3xl'
        >{note.noteTitle}</h3>
        <p
          className='font-semibold text-lg'
        >{note.noteContent}</p>
        <p className='font-light text-md'
        >{note.date}</p>
        <button 
        className='bg-white font-bold rounded-lg p-2 mt-3'
        onClick={
         ()=>{
          setEditingId(note.id)
          setNoteTitle(note.noteTitle)
          setNoteContent(note.noteContent)
        }}
        >Edit</button>

      <button 
      className='bg-black text-amber-50 rounded-lg'
      onClick={()=>{
        const clickedId = note.id;
        setNotes(
          notes.map((note) => {
            if (clickedId === note.id) {
              console.log("Match found> updating status",note.id);
              return {
                ...note,
                completed: !note.completed
              };
            }
            return note;
          })
        );
      }}
          
      >
        Done
      </button>
      </div> 
    )
  })
}

function App() {

  
  const MyNotes = [{
    noteTitle: "First note",
    noteContent: "This is my first note",
    // eslint-disable-next-line react-hooks/purity
    id: crypto.randomUUID(),
    date: dayjs().format('DD MMMM, YYYY'),
    completed:false
  }, {
    noteTitle: "Second note",
    noteContent: "This is my second note",
    // eslint-disable-next-line react-hooks/purity
    id: crypto.randomUUID(),
    date: dayjs().format('DD MMMM, YYYY'),
    completed:false
  }];
  
  const [notes, setNotes] = useState(MyNotes);
  const [noteTitle, setNoteTitle] = useState("");
  const [noteContent, setNoteContent] = useState("");
  const [editingId, setEditingId]=useState("");

  return (
    <>
      <div className="w-full min-h-screen flex items-start bg-black gap-4" >
        <InputNote
          setNoteTitle={setNoteTitle}
          noteTitle={noteTitle}
          setNoteContent={setNoteContent}
          noteContent={noteContent}
          setNotes={setNotes}
          notes={notes}
          editingId={editingId}
          setEditingId={setEditingId}
        />
        <DisplayNotes 
          notes={notes}
          setEditingId={setEditingId}
          setNoteTitle={setNoteTitle}
          setNoteContent={setNoteContent}
          setNotes={setNotes}
        />
      </div>
    </>
  )
}

export default App
