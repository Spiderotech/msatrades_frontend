import React from 'react'
import Header from "../Components/Header"
import Footer from '../Components/Footer'
import Whishlisthero from '../Components/Whishlist/Wishlisthero'
import WishlistSection from '../Components/Whishlist/Whishlistsection'
import SuggestedProducts from '../Components/Product/SuggestedProducts'
const Whishlistpage = () => {
  return (
   <>
    <Header/>
    <Whishlisthero/>
    <WishlistSection/>
    <SuggestedProducts/>
    <Footer/></>
  )
}

export default Whishlistpage
