import { useState } from 'react'
import Navbar from './Navbar'
import About from './About'
import './App.css'


function App() {

  return (
    <>
      <Navbar/>
       <div className="pt-15">
        <About />
      </div>
    </>
  )
}

export default App
