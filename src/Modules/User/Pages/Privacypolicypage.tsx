import React from 'react';
import Header from "../Components/Header";
import Footer from '../Components/Footer';

const Privacypolicypage = () => {
  return (
    <div className="privacy-page">
      <Header />
      <main style={{ padding: '2rem', maxWidth: '800px', margin: '0 auto' }}>
        <h1 style={{ textAlign: 'center', marginBottom: '1rem',fontWeight: 600, fontSize: 'larger' }}>Privacy Policy</h1>
        
        <p>
          At MSAtrades, we strive to provide exceptional products and services to our customers while respecting their privacy. 
          We understand the importance of protecting personal data and have created this Policy to explain how we collect and use 
          the data we receive from you on this site or through other forms of communication.
        </p>

        <h5 style={{ fontWeight: 600, fontSize: 'larger', marginTop: '2rem' }}>Our Privacy Commitment</h5>
        <p>
          We are committed to safeguarding and keeping your data private. We will not sell your personal data to third parties. 
          We only collect and process your personal data when we have a legitimate reason to do so, and only the data necessary 
          for our business operations. The reasons for collecting and processing your data are as follows:
        </p>
        <p>
          <strong>Consent</strong> – when you give us permission to use your data in a certain way.<br />
          <strong>Performance of a contract</strong> – when we need to use your data to provide you with goods and services as part 
          of our business operations.<br />
          <strong>Compliance with legal obligations</strong> – when we must provide data to the police or other authorities to comply with the law.<br />
          <strong>Legitimate interests</strong> – when we have a legitimate interest, such as marketing, preventing fraud or crime, 
          or collecting money owed to us.
        </p>

        <h5 style={{ fontWeight: 600, fontSize: 'larger', marginTop: '2rem' }}>Who We Share Your Personal Data With</h5>
        <p>
          We will only share your personal data with trusted third-party suppliers and legitimate agencies, such as agents and advisers 
          who assist us in running your customer accounts and services, collecting payments, and exploring new business opportunities. 
          Regulators and other authorities. Credit reference agencies. Fraud prevention agencies. Companies you ask us to share your data with.
        </p>

        <h5 style={{ fontWeight: 600, fontSize: 'larger', marginTop: '2rem' }}>Where We Store and Protect Your Data</h5>
        <p>
          Personal data stored or processed electronically is kept within the European Economic Area (EEA) or may be transferred securely 
          to a trusted third-party provider outside of the EEA who has a contractual agreement with us requiring appropriate safeguards 
          and an adequate level of protection comparable to that within the EEA. Our trusted third-party provider outside of the EEA is Google LLC. 
          All physical media is securely retained by MSAtrades within the UK.
        </p>

        <h5 style={{ fontWeight: 600, fontSize: 'larger', marginTop: '2rem' }}>How Long We Will Keep Your Data</h5>
        <p>
          We will keep your data for as long as reasonably necessary, depending on the nature of the data provided.
        </p>

        <h5 style={{ fontWeight: 600, fontSize: 'larger', marginTop: '2rem' }}>Cookies</h5>
        <p>
          Cookies are a technology that allows websites to provide tailored information to users. A cookie is a small data file sent to your browser 
          by a website and stored on your device. You can set your browser to notify you when you receive a cookie and decide whether to accept it. 
          MSAtrades does not make use of cookies on this site.
        </p>

      </main>
      <Footer />
    </div>
  );
};

export default Privacypolicypage;
