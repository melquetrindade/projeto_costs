import { useState } from 'react'
import {BrowserRouter as Router, Routes, Route, Link} from 'react-router-dom'
import Home from './components/pages/home'
import Company from './components/pages/company'
import Contact from './components/pages/contact'
import NewProject from './components/pages/newProject'
import Container from './components/layout/container'
import NavBar from './components/layout/navBar'
import Footer from './components/layout/footer'
import Projects from './components/pages/projects'

function App() {

  return (
    <Router>
      <NavBar />
      <Routes>
        <Route element={<Container customClass="min_height"/>}>
          <Route path='/' element={<Home/>} />
          <Route path='/company' element={<Company/>} />
          <Route path='/contact' element={<Contact/>} />
          <Route path='/newProject' element={<NewProject/>} />
          <Route path='/projects' element={<Projects/>} />
        </Route>
      </Routes>
      <Footer />
    </Router>
  )
}

export default App
