import { useState } from 'react'
import './App.css'
import dayjs from 'dayjs'

function App() {
  const MyNotes = {
    title:"First note",
    note:"This is my first note",
    id:1,
    date: dayjs()
  }

  console.log(MyNotes.date.format('DD MMMM, YYYY'));

  return (
    <>
      <div className="w-full min-h-screen flex justify-center items-center" >
        <p>{MyNotes.date.format('DD MMMM, YYYY')}</p>
      </div>
    </>
  )
}

export default App
