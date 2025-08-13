import { useState } from 'react';
import headshot from './assets/headshot.jpg';
import './App.css';
import { Link, Routes, Route } from 'react-router-dom';
import Projects from './pages/projects.jsx';

function App() {

  return (
    <div>
      <header>
        <h1 className='text-white p-5 '>Daniel Morris</h1>
        <div className='grid grid-cols-3'>
            <a href='https://www.linkedin.com/in/daniel-w-morris/'>LinkedIn</a>
            <a href='https://github.com/dmorris95'>GitHub</a>
            <a>Cardinalfanfrommi@gmail.com</a>
        </div>
        <img className='rounded-full size-50 m-8 mx-auto border-3 border-zinc-500' src={headshot} alt="Daniel Morris"/>
        <nav className='flex gap-4 text-md'>
          <Link to='/' className='opacity-80 hover:opacity-100'>Home</Link>
          <Link to='/projects' className='opacity-80 hover:opacity-100'>Projects</Link>
          <Link to='/contact' className='opacity-80 hover:opacity-100'>Contact</Link>
        </nav>
      </header>
      
      <main>
        <Routes>
          <Route path='/projects' element={<Projects />} />
        </Routes>
      </main>
    </div>
  )
}

export default App
