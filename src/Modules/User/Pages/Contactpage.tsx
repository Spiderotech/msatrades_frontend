import React from 'react'
import Header from "../Components/Header"
import Footer from '../Components/Footer'
import Contacthero from '../Components/Contactus/Contacthero'
import Contactmap from '../Components/Contactus/Contactmap'
import ContactUsform from '../Components/Contactus/ContactUsform'

const Contactpage = () => {
    return (
        <>
            <Header />
            <Contacthero/>
            <Contactmap/>
            <ContactUsform/>
            <Footer />
        </>
    )
}

export default Contactpage
