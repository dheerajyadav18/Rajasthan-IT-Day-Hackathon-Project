import React from 'react'
import Home from '../components/Home/Home'
import Nav from '../components/NavBar/Nav'
import Footer from '../components/NavBar/Footer'

const HomePage = () => {
  return (
    <div className='mb-50'>
        <Nav />
        <Home />
        <Footer />
    </div>
  )
}

export default HomePage