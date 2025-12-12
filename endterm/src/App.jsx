import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import RootLayout from './components/RootLayout.jsx'
import Home from './pages/Home.jsx'
import About from './pages/About.jsx'
import Login from './pages/Login.jsx'
import MovieList from './components/MovieList.jsx'
import MovieDetails from './components/MovieDetails.jsx'
import Signup from './pages/Signup.jsx'
import Profile from './pages/Profile.jsx'
import Favorites from './pages/Favorites.jsx'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<RootLayout />}>
          <Route index element={<Home />} />   {/* 👈 лучше так */}
          <Route path="about" element={<About />} />
          <Route path="items" element={<MovieList />} />
          <Route path="items/:id" element={<MovieDetails />} />
          <Route path="login" element={<Login />} />
          <Route path="signup" element={<Signup />} />
          <Route path="profile" element={<Profile />} />
          <Route path="favorites" element={<Favorites />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
