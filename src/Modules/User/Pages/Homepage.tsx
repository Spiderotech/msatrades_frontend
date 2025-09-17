import React from 'react'
import Headerpromo from '../Components/Home/Headerpromo'
import Header from "../Components/Header"
import VideoHeroSlider from '../Components/Home/VideoHeroSlider'
import Footer from '../Components/Footer'
import Faq from '../Components/Home/Faq'
import Categoryselection from '../Components/Home/Categoryselection'
import Banner2 from '../Components/Home/Banner2'
import WhyChooseUs from '../Components/Home/WhyChooseUs'


const Homepage = () => {
  return (
    <>
    <Header/>
    <Headerpromo/>
    <VideoHeroSlider/>
    <WhyChooseUs/>
    <Banner2/>
    <Categoryselection/>
    <Faq/>
    <Footer/>
    </>
  )
}

export default Homepage
