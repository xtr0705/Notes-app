import './App.css'
import dayjs from 'dayjs';
import { useEffect, useState } from 'react';
import { Pencil, Trash2, Check } from "lucide-react";





function InputNote({ setEditingId, editingId, setNotes, notes, setNoteTitle, noteTitle, setNoteContent, noteContent }) {

  return (
    <div className={"relative w-60 h-70 mt-3 flex flex-col justify-between p-4 bg-[#111111] text-gray-100 border border-[#2a2a2a] rounded-xl "} >
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
  )
}


const DisplayNotes = ({ setNotes, notes, setEditingId, setNoteTitle, setNoteContent }) => {
  return notes.map((note) => {
    return (
      <div
        className="relative w-60 h-70 mt-3 flex flex-col justify-between p-4 bg-[#111111] text-gray-100 border border-[#2a2a2a] rounded-xl"
        key={note.id}
      >
        <h3
          className={note.completed ? " line-through text-3xl" : "font-semibold text-3xl"}
        >{note.noteTitle}</h3>
        <p
          className={note.completed ? " line-through text-3xl" : "font-normal text-lg text-gray-200"}
        >{note.noteContent}</p>
        <p className={note.completed ? " line-through" : "font-light text-md text-gray-500"}
        >{note.date}</p>

        <div className='absolute top-0.5 right-2 flex gap-2' >
          <button
            className=' bg-white text-black rounded-lg p-2 mt-1'
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
            className='bg-green-500 text-black rounded-lg p-2 mt-1'
            onClick={() => {
              const clickedId = note.id;
              setNotes(
                notes.map((note) => {
                  if (clickedId === note.id) {
                    console.log("Match found> updating status", note.id);
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
            <Check size={14} />
          </button>
        </div>

        <div className='absolute top-18.5 right-2 flex gap-2' >
          <button
            className='bg-red-800 rounded-lg p-2 mt-1 text-black'
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
    // eslint-disable-next-line react-hooks/purity
    id: crypto.randomUUID(),
    date: dayjs().format('DD MMMM, YYYY'),
    completed: false
  }, {
    noteTitle: "Second note",
    noteContent: "This is my second note",
    // eslint-disable-next-line react-hooks/purity
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
