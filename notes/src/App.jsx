import './App.css'
import dayjs from 'dayjs';
import { useEffect, useRef, useState } from 'react';
import { Pencil, Trash2, Check } from "lucide-react";





function InputNote({ setEditingId, editingId, setNotes, notes, setNoteTitle, noteTitle, setNoteContent, noteContent }) {

  const textareaRef = useRef(null);

  useEffect(()=>{
    const element = textareaRef.current;
    element.style.height = "auto";
    element.style.height = element.scrollHeight + "px";
  },[noteContent]);

  return (
    <div className={"relative w-65 h-80 mt-3 flex flex-col justify-between p-4 bg-[#111111] text-gray-100 border border-[#2a2a2a] rounded-xl "} >
      <input
      className='outline-none text-3xl '
        type="text"
        placeholder="Title"
        value={noteTitle}
        onChange={(e) => {
          setNoteTitle(e.target.value);
        }}
      />

      {/* <input
        className="bg-white text-black h-50"
        type="text"
        value={noteContent}
        placeholder="Note"
        onChange={(e) => {
          setNoteContent(e.target.value);
        }}
      /> */}

      <textarea
        ref={textareaRef}
        value={noteContent}
        onChange={(e)=>{
          setNoteContent(e.target.value);
        }}
        placeholder='Write your note..'
        className='w-full text-xl min-h-[100px] resize-none overflow-hidden outline-none'
      />

      <div className='flex justify-center'>
        <button
          className="w-20 h-10 bg-green-500 rounded-xl text-black font-semi-bold 
          
          md:bg-black md:text-white md:hover:transition-all md:hover:ring-3 md:hover:ring-green-500 md:border md:border-[#2a2a2a] md:shadow-none
          md:hover:shadow-[0_0_10px_rgba(34,197,94,0.6)]

            transition-all duration-300
          "
          onClick={() => {
            if (editingId) {
              setNotes(
                notes.map((note) =>
                  note.id === editingId
                    ? {
                      ...note,
                      noteTitle: noteTitle,
                      noteContent: noteContent,
                      date: dayjs().format('DD MMMM, YYYY'),
                      completed: false,
                    }
                    : note
                )
              );

            } else {
              const newNote = {
                noteTitle,
                noteContent,
                id: crypto.randomUUID(),
                date: dayjs().format('DD MMMM, YYYY'),
                completed: false
              }
              console.log(newNote);
              setNotes([...notes, newNote]);
              console.log(notes);
            }

            setEditingId("");
            setNoteTitle("");
            setNoteContent("");
          }}>
          {editingId ? "Change" : "Add"}
        </button>
      </div>
    </div>
  )
}


const DisplayNotes = ({ setNotes, notes, setEditingId, setNoteTitle, setNoteContent }) => {
  return notes.map((note) => {
    return (
      <div
        className="relative w-70 min-h-[200px] mt-3 flex flex-col justify-between p-4 bg-[#111111] text-gray-100 border border-[#2a2a2a] rounded-xl
        
        transition-all duration-300 hover:-translate-y-1 hover:scale-[1.01] hover:shadow-xl hover:border-[#3a3a3a]
        "
        key={note.id}
      >
        <h3
          className={note.completed ? "break-words line-through text-xl text-gray-500 pr-9" : "font-semibold text-xl break-words pr-9"}
        >{note.noteTitle}</h3>
        <p
          className={note.completed ? "break-words line-through text-lg text-gray-500 pt-6 pr-9" : "font-normal text-lg text-gray-200 pt-6 pr-9 break-words"}
        >{note.noteContent}</p>
        <p className={note.completed ? " line-through text-gray-500 pt-6" : "font-light pt-6 text-md text-gray-500"}
        >{note.date}</p>

        <div className='absolute top-0.5 right-2 flex gap-2' >
          <button
            className='rounded-lg p-2 mt-1 text-black

            bg-blue-600 

            md:bg-black md:text-white md:border md:border-[#2a2a2a] md:shadow-none
            md:hover:ring-2 md:hover:ring-blue-500/60
            md:hover:shadow-[0_0_10px_rgba(59,130,246,0.6)]

            transition-all duration-300
            '
            onClick={
              () => {
                setEditingId(note.id)
                setNoteTitle(note.noteTitle)
                setNoteContent(note.noteContent)
              }}
          >
            <Pencil size={14} />
          </button>
        </div>

        <div className='absolute top-9.5 right-2 flex gap-2'>
          <button
            className='rounded-lg p-2 mt-1 text-black

            bg-green-600

            md:bg-black md:text-white md:border md:border-[#2a2a2a] md:shadow-none
            md:hover:ring-2 md:hover:ring-green-500/60
            md:hover:shadow-[0_0_10px_rgba(34,197,94,0.6)]

            transition-all duration-300
            '
            onClick={() => {
              const clickedId = note.id;
              setNotes(
                notes.map((note) => {
                  if (clickedId === note.id) {
                    console.log("Match found> updating status", note.id);
                    return {
                      ...note,
                      date: dayjs().format('DD MMMM, YYYY'),
                      completed: !note.completed
                    };
                  }
                  return note;
                })
              );
            }}

          >
            <Check size={14} />
          </button>
        </div>

        <div className='absolute top-18.5 right-2 flex gap-2 ' >
          <button
            className='rounded-lg p-2 mt-1 text-black

            bg-red-600 

            md:bg-black md:text-white md:border md:border-[#2a2a2a] md:shadow-none
            md:hover:ring-2 md:hover:ring-red-500/60
            md:hover:shadow-[0_0_10px_rgba(239,68,68,0.6)]

            transition-all duration-300
            '
            onClick={() => {
              const clickedId = note.id;
              setNotes(
                notes.filter(note => clickedId !== note.id)
              );
            }}
          >
            <Trash2 size={14} />
          </button>
        </div>
      </div>
    )
  })
}

function App() {

  const notesData = JSON.parse(localStorage.getItem('MyNotes'));

  const MyNotes = notesData || [{
    noteTitle: "First note",
    noteContent: "This is my first note",
    id: crypto.randomUUID(),
    date: dayjs().format('DD MMMM, YYYY'),
    completed: false
  }, {
    noteTitle: "Second note",
    noteContent: "This is my second note",
    id: crypto.randomUUID(),
    date: dayjs().format('DD MMMM, YYYY'),
    completed: false
  }]





  const [notes, setNotes] = useState(notesData || MyNotes);
  const [noteTitle, setNoteTitle] = useState("");
  const [noteContent, setNoteContent] = useState("");
  const [editingId, setEditingId] = useState("");

  useEffect(() => {
    localStorage.setItem('MyNotes', JSON.stringify(notes))
  }, [notes]);

  return (
    <>
      <div className="w-full p-5 min-h-screen flex flex-wrap gap-7 items-start bg-black gap-4" >
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
