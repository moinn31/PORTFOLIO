import { useState, useEffect } from 'react'
import { AnimatePresence } from 'framer-motion'

// Components
import ParticleBackground from './components/ParticleBackground'
import Navbar from './components/Navbar'
import Loader from './components/Loader'
import FloatingShapes from './components/FloatingShapes'

// Sections
import Hero from './sections/Hero'
import About from './sections/About'
import Skills from './sections/Skills'
import Certificates from './sections/Certificates'
import Experience from './sections/Experience'
import Projects from './sections/Projects'
import Analytics from './sections/Analytics'
import Contact from './sections/Contact'
import Footer from './sections/Footer'

function App() {
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Prevent scroll during loading
    if (loading) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }

    return () => {
      document.body.style.overflow = ''
    }
  }, [loading])

  return (
    <>
      <AnimatePresence>
        {loading && <Loader onComplete={() => setLoading(false)} />}
      </AnimatePresence>

      {!loading && (
        <>
          <ParticleBackground />
          <FloatingShapes />
          <Navbar />
          <main style={{ position: 'relative', zIndex: 1 }}>
            <Hero />
            <About />
            <Skills />
            <Certificates />
            <Experience />
            <Projects />
            <Analytics />
            <Contact />
          </main>
          <Footer />
        </>
      )}
    </>
  )
}

export default App
