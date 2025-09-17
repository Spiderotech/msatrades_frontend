import React from 'react'
import Header from "../Components/Header"
import Footer from '../Components/Footer'
import AboutHero from '../Components/Aboutus/AboutHero'
import Aboutcontent from '../Components/Aboutus/Aboutcontent'
import Aboutuscontent2 from '../Components/Aboutus/Aboutuscontent2'
import AboutCommitmentSection from '../Components/Aboutus/AboutCommitmentSection'
import Aboutcompany from '../Components/Aboutus/Aboutcompany'


const AboutUspage = () => {
  return (
    <>
    <Header/>
    <AboutHero/>
    <Aboutcompany/>
    <Aboutcontent/>
    <Aboutuscontent2/>
    <AboutCommitmentSection/>
     <Footer/>
    </>
  )
}

export default AboutUspage
