import React, { useState } from "react";
import { FaFacebookF, FaTwitter, FaInstagram, FaYoutube } from "react-icons/fa";

const ContactUsform = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Replace with your WhatsApp number (in international format, without "+")
    const phoneNumber = "7736162340";  

    // Encode message for URL
    const whatsappMessage = `Hello, my name is ${formData.name}.
    Email: ${formData.email}
    Subject: ${formData.subject}
    Message: ${formData.message}`;

    const encodedMessage = encodeURIComponent(whatsappMessage);
    const whatsappURL = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;

    // Redirect user to WhatsApp
    window.open(whatsappURL, "_blank");
  };

  return (
    <section className="container mx-auto px-4 py-10">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        {/* Contact Form */}
        <div>
          <h2 className="text-3xl font-bold">GET IN TOUCH</h2>
          <p className="text-gray-600 mt-2">
            Please enter the details of your request. A member of our support
            staff will respond as soon as possible.
          </p>

          <form className="mt-6 space-y-4" onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="YOUR NAME"
                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                required
              />
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="YOUR EMAIL"
                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                required
              />
            </div>
            <input
              type="text"
              name="subject"
              value={formData.subject}
              onChange={handleChange}
              placeholder="SUBJECT"
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
              required
            />
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              placeholder="YOUR MESSAGE"
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 h-32"
              required
            ></textarea>
            <button
              type="submit"
              className="w-full bg-black text-white py-3 rounded-md hover:bg-gray-900 transition"
            >
              Submit Now
            </button>
          </form>
        </div>

        {/* Contact Details */}
        <div>
          <div className="space-y-4">
            <p className="text-lg font-semibold">Address:</p>
            <p className="text-gray-600">
              113 mellitus street, East Acton, W120AU, United Kingdom
            </p>

            <p className="text-lg font-semibold">Email:</p>
            <p className="text-gray-600">Uk@msatrades.com</p>

            <p className="text-lg font-semibold">Call Us:</p>
            <p className="text-gray-600">+44 7466 506239</p>

          </div>

          {/* Social Media Links */}
          
        </div>
      </div>
    </section>
  );
};

export default ContactUsform;
