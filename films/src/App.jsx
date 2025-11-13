import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import RootLayout from './components/RootLayout.jsx'
import Home from './pages/Home.jsx'
import About from './pages/About.jsx'
import Login from './pages/Login.jsx'
import MovieList from './components/MovieList.jsx'
import MovieDetails from './components/MovieDetails.jsx'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<RootLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/items" element={<MovieList />} />
          <Route path="/items/:id" element={<MovieDetails />} />
          <Route path="/login" element={<Login />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

