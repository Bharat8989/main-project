import React from 'react'
import Header from './Header.jsx'
// import Footer from './Footer/Footer.jsx'
import {Outlet} from 'react-router-dom'

const Layout = () => {
  return (
    <>
      {/* <Header/> */}
      <Header/>
      <Outlet/>
      {/* <Footer/> */}
    </>
  )
}

export default Layout
 