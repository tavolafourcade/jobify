import React, { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Landing, Error, Register } from './pages'

function App() {
  return (
    <BrowserRouter className="App">
      <Routes>
        <Route path="/" element={<div>Dashboard!</div>} />
        <Route path="/register" element={<Register />} />
        <Route path="/landing" element={<Landing />} />
        <Route path="*" element={<Error />} />

      </Routes>
    </BrowserRouter>
  )
}

export default App
