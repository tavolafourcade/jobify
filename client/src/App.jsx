import React, { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Landing, Error, Register } from './pages'
import {
  AddJob, AllJobs, Profile, SharedLayout, Stats,
} from './pages/dashboard'

function App() {
  return (
    <BrowserRouter className="App">
      <Routes>
        <Route path="/">
          <Route path="addjob" element={<AddJob />} />
          <Route path="all-jobs" element={<AllJobs />} />
          <Route path="profile" element={<Profile />} />
          <Route path="stats" element={<Stats />} />
        </Route>
        <Route path="/register" element={<Register />} />
        <Route path="/landing" element={<Landing />} />
        <Route path="*" element={<Error />} />

      </Routes>
    </BrowserRouter>
  )
}

export default App
