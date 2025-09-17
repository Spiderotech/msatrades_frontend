import React from 'react'
import Header from "../Components/Header"
import Footer from '../Components/Footer'
import Carthero from '../Components/Cart/Carthero'
import CartSection from '../Components/Cart/CartSection'
import SuggestedProducts from '../Components/Product/SuggestedProducts'

const Cartpage = () => {
  return (
    <>
    <Header/>
    <Carthero/>
    <CartSection/>
    <SuggestedProducts/>
    <Footer/>
    </>
  )
}

export default Cartpage
