import { useState } from 'react'
import Navbar from './Navbar'
import About from './About'
import Experience from './Experience'
import './App.css'


function App() {

  return (
    <>
      <Navbar/>
       <div className="pt-15">
        <About/>
        <Experience/>
      </div>
    </>
  )
}

export default App
