import { useState } from 'react'
import './App.css'
import Navbar from './components/shared/navbar'
import Footer from './components/shared/footer'

function App() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Navbar */}
      <Navbar />

      {/* Main content area */}
      <main>
        
      </main>

      {/* Footer */}
      <Footer />
    </div>
  )
}

export default App
