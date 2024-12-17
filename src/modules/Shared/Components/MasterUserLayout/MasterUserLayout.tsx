import React from 'react'
import Navbar from '../../../User/Components/Shared/Components/Navbar/Navbar'
import { Outlet } from 'react-router-dom'
import Footer from '../../../User/Components/Shared/Components/Footer/Footer'

export default function MasterUserLayout() {
  return (
 <>
    <Navbar/>
    <Outlet/>
    <Footer/>
 </>
  )
}
