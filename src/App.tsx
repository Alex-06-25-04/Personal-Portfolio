import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Nav';
import Hero from './pages/Hero';
import Projects from './pages/Projects';
import About from './pages/About';
import Contact from './pages/Contact';
import Toaster from './components/Toaster';
import Footer from './components/Footer';
import './App.css'

function App() {

  return (
    <>
      <Navbar />

      <Routes>
        <Route path="/" element={<Hero />} />
        <Route path='/projects' element={<Projects />} />
        <Route path='/about' element={<About />} />
        <Route path='/contact' element={<Contact />} />
      </Routes>

      <Toaster />

      <Footer />
    </>
  )
}

export default App
