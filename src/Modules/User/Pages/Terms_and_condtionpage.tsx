import React from 'react';
import Header from "../Components/Header";
import Footer from '../Components/Footer';

const TermsAndConditionPage = () => {
  return (
    <div className="terms-page">
      <Header />
      <main style={{ padding: '2rem', maxWidth: '800px', margin: '0 auto' }}>
        <h1 style={{ textAlign: 'center', marginBottom: '1rem',fontWeight: 600, fontSize: 'larger' }}>Terms and Conditions</h1>

        <p>
          Welcome to MSAtrades. By accessing or using our website and services, you agree to comply with and be bound by these Terms and Conditions. 
          Please read them carefully.
        </p>

        <h5 style={{ fontWeight: 600, fontSize: 'larger', marginTop: '2rem' }}>1. Use of Services</h5>
        <p>
          You agree to use MSAtrades services only for lawful purposes and in accordance with these Terms. You must not use our services to engage in illegal or harmful activities.
        </p>

        <h5 style={{ fontWeight: 600, fontSize: 'larger', marginTop: '2rem' }}>2. User Accounts</h5>
        <p>
          Some services may require you to create an account. You are responsible for maintaining the confidentiality of your account and password, and for all activities under your account.
        </p>

        <h5 style={{ fontWeight: 600, fontSize: 'larger', marginTop: '2rem' }}>3. Intellectual Property</h5>
        <p>
          All content on MSAtrades, including text, graphics, logos, and software, is the property of MSAtrades or its licensors and is protected by intellectual property laws. 
          You may not reproduce, distribute, or create derivative works without permission.
        </p>

        <h5 style={{ fontWeight: 600, fontSize: 'larger', marginTop: '2rem' }}>4. Payments and Refunds</h5>
        <p>
          All payments made through MSAtrades are subject to our payment terms. Refunds, if applicable, will be processed according to our refund policy.
        </p>

        <h5 style={{ fontWeight: 600, fontSize: 'larger', marginTop: '2rem' }}>5. Limitation of Liability</h5>
        <p>
          MSAtrades shall not be liable for any indirect, incidental, or consequential damages arising from the use of our services. Use our services at your own risk.
        </p>

        <h5 style={{ fontWeight: 600, fontSize: 'larger', marginTop: '2rem' }}>6. Modifications</h5>
        <p>
          MSAtrades reserves the right to modify these Terms and Conditions at any time. Updated terms will be posted on this page with the effective date.
        </p>

        <h5 style={{ fontWeight: 600, fontSize: 'larger', marginTop: '2rem' }}>7. Governing Law</h5>
        <p>
          These Terms and Conditions are governed by and construed in accordance with the laws of the jurisdiction in which MSAtrades operates.
        </p>

        <p style={{ marginTop: '2rem' }}>
          By using MSAtrades services, you acknowledge that you have read, understood, and agreed to these Terms and Conditions.
        </p>
      </main>
      <Footer />
    </div>
  );
};

export default TermsAndConditionPage;
