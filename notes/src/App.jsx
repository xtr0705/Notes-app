import './App.css'
import dayjs from 'dayjs';
import { useState } from 'react';





function InputNote({setNotes, notes, setNoteTitle,noteTitle, setNoteContent, noteContent}) {
  
  return (
    <div className="w-60 h-70 flex flex-col justify-center items-center bg-mauve-600 rounded-2xl " >
      <input 
        type="text" 
        placeholder="Title" 
        onChange={(e) => {
          setNoteTitle(e.target.value);
        }} 
      />

      <input
        className="h-10 w-30 rounded-2xl"
        type="text"
        placeholder="Note"
        onChange={(e) => {
          setNoteContent(e.target.value);
        }} 
      />
      <button
        className="w-20 h-10 bg-green-500 rounded-2xl text-white font-bold"
        onClick={()=>{
          const newNote={
            noteTitle,
            noteContent,
            id: Math.random(),
            date: dayjs().format('DD MMMM, YYYY')
          }
          console.log(newNote);
          setNotes([...notes, newNote]);
          console.log(notes);
        }} 
      />

    </div>
  )
}


const DisplayNotes = ({notes}) => {
  return notes.map((note) => {
    return (
      <div className="w-60 h-70 flex flex-col justify-center items-center bg-mauve-600 rounded-2xl " >
        <h3
          className='font-bold text-3xl'
        >{note.noteTitle}</h3>
        <p
          className='font-semibold text-lg'
        >{note.noteContent}</p>
        <p className='font-light text-md'
        >{note.date}</p>
      </div> 
    )
  })
}

function App() {

  
  const MyNotes = [{
    noteTitle: "First note",
    noteContent: "This is my first note",
    // eslint-disable-next-line react-hooks/purity
    id: Math.random(),
    date: dayjs().format('DD MMMM, YYYY')
  }, {
    noteTitle: "Second note",
    noteContent: "This is my second note",
    // eslint-disable-next-line react-hooks/purity
    id: Math.random(),
    date: dayjs().format('DD MMMM, YYYY')
  }];
  
  const [notes, setNotes] = useState(MyNotes);
  const [noteTitle, setNoteTitle] = useState("");
  const [noteContent, setNoteContent] = useState("");

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
        />
        <DisplayNotes 
          notes={notes}
        />
      </div>
    </>
  )
}

export default App
