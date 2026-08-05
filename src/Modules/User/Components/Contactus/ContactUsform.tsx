import { useState } from "react";
import {
  FaBriefcase,
  FaCheckCircle,
  FaClock,
  FaEnvelope,
  FaMapMarkerAlt,
  FaPaperPlane,
  FaSpinner,
} from "react-icons/fa";

const enquiryTypes = [
  "Business Partnerships",
  "Supplier Enquiries",
  "Distribution Opportunities",
  "Wholesale Enquiries",
  "General Business Enquiries",
];

const inputClass =
  "w-full rounded-lg border border-gray-200 bg-white px-4 py-3 text-sm font-semibold text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-orange-500 focus:ring-4 focus:ring-orange-100";

const ContactUsform = () => {
  const [formData, setFormData] = useState({
    name: "",
    company: "",
    email: "",
    subject: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [isSending, setIsSending] = useState(false);

  const handleChange = (e) => {
    setSubmitted(false);
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitted(false);
    setIsSending(true);
    await new Promise((resolve) => setTimeout(resolve, 1100));
    setIsSending(false);
    setSubmitted(true);
    setFormData({
      name: "",
      company: "",
      email: "",
      subject: "",
      message: "",
    });
  };

  return (
    <section className="bg-gray-50 py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
          <div className="space-y-6">
            <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
              <p className="text-sm font-black uppercase tracking-[0.22em] text-orange-500">
                Thank you for your interest
              </p>
              <h2 className="mt-3 text-2xl font-black text-gray-950">Get in Touch</h2>
              <p className="mt-3 text-sm leading-7 text-gray-600">
                Whether you have a general enquiry, require customer support, or would
                like to discuss a business opportunity, we are here to help.
              </p>
              <p className="mt-3 text-sm leading-7 text-gray-600">
                Our team aims to respond to all enquiries as promptly as possible.
              </p>
            </div>

            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1">
              <article className="rounded-lg border border-gray-200 bg-white p-5 shadow-sm">
                <div className="flex items-start gap-3">
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-orange-50 text-orange-500">
                    <FaMapMarkerAlt />
                  </span>
                  <div>
                    <h3 className="font-black text-gray-950">Contact Information</h3>
                    <p className="mt-3 text-sm font-bold text-gray-900">MSA Trades Ltd</p>
                    <p className="mt-1 text-sm leading-6 text-gray-600">
                      113 Mellitus Street<br />
                      London<br />
                      England<br />
                      W12 0AU
                    </p>
                    <a
                      href="mailto:contact@msatrades.com"
                      className="mt-3 inline-flex text-sm font-black text-orange-500 hover:text-orange-600"
                    >
                      contact@msatrades.com
                    </a>
                  </div>
                </div>
              </article>

              <article className="rounded-lg border border-gray-200 bg-white p-5 shadow-sm">
                <div className="flex items-start gap-3">
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-orange-50 text-orange-500">
                    <FaClock />
                  </span>
                  <div>
                    <h3 className="font-black text-gray-950">Office Hours</h3>
                    <div className="mt-3 space-y-3 text-sm leading-6 text-gray-600">
                      <p>
                        <span className="block font-black text-gray-900">Monday - Friday</span>
                        9:00 AM - 5:00 PM (UK Time)
                      </p>
                      <p>
                        <span className="block font-black text-gray-900">Saturday & Sunday</span>
                        Closed
                      </p>
                    </div>
                  </div>
                </div>
              </article>
            </div>
          </div>

          <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
            <div className="grid gap-6 xl:grid-cols-[0.85fr_1.15fr]">
              <div>
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-gray-950 text-orange-400">
                  <FaBriefcase />
                </div>
                <h2 className="mt-4 text-2xl font-black text-gray-950">
                  Business Enquiries
                </h2>
                <p className="mt-3 text-sm leading-7 text-gray-600">
                  We welcome enquiries relating to partnerships, supply,
                  distribution, wholesale, and general business support.
                </p>
                <div className="mt-5 flex flex-wrap gap-2">
                  {enquiryTypes.map((item) => (
                    <span
                      key={item}
                      className="rounded-full bg-gray-100 px-3 py-2 text-xs font-black uppercase tracking-wide text-gray-700"
                    >
                      {item}
                    </span>
                  ))}
                </div>

                <div className="mt-6 rounded-lg border border-orange-100 bg-orange-50 p-4">
                  <div className="flex items-center gap-2 text-sm font-black text-gray-950">
                    <FaEnvelope className="text-orange-500" />
                    Customer Support
                  </div>
                  <p className="mt-2 text-sm leading-6 text-gray-700">
                    Please include as much information as possible so we can respond
                    efficiently.
                  </p>
                </div>
              </div>

              <div>
                <h2 className="text-2xl font-black text-gray-950">Send Us a Message</h2>
                <p className="mt-2 text-sm leading-6 text-gray-600">
                  Complete the form and a member of our team will get back to you as
                  soon as possible.
                </p>

                {submitted && (
                  <div className="mt-4 flex items-start gap-3 rounded-lg border border-green-200 bg-green-50 p-4 text-sm text-green-800">
                    <FaCheckCircle className="mt-0.5 shrink-0" />
                    <p className="font-semibold">
                      Your message has been submitted successfully. Our team will respond
                      as soon as possible.
                    </p>
                  </div>
                )}

                <form className="mt-5 space-y-4" onSubmit={handleSubmit}>
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Full Name"
                      className={inputClass}
                      required
                    />
                    <input
                      type="text"
                      name="company"
                      value={formData.company}
                      onChange={handleChange}
                      placeholder="Company Name (Optional)"
                      className={inputClass}
                    />
                  </div>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Email Address"
                    className={inputClass}
                    required
                  />
                  <input
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    placeholder="Subject"
                    className={inputClass}
                    required
                  />
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Message"
                    className={`${inputClass} min-h-32 resize-none`}
                    required
                  />
                  <button
                    type="submit"
                    disabled={isSending}
                    className="inline-flex w-full items-center justify-center gap-3 rounded-lg bg-orange-500 px-6 py-4 text-sm font-black uppercase tracking-wide text-white shadow-sm transition hover:bg-orange-600 disabled:cursor-not-allowed disabled:bg-gray-300"
                  >
                    {isSending ? (
                      <>
                        Sending
                        <FaSpinner className="animate-spin" />
                      </>
                    ) : (
                      <>
                        Send Message
                        <FaPaperPlane />
                      </>
                    )}
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactUsform;
