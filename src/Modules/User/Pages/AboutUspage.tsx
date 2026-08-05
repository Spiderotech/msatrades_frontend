import {
  FaCheckCircle,
  FaEnvelope,
  FaHandshake,
  FaMapMarkerAlt,
  FaSeedling,
} from "react-icons/fa";
import Header from "../Components/Header";
import Footer from "../Components/Footer";
import aboutImage from "../../../assets/about.png";

const values = [
  "Integrity and professionalism",
  "Quality and reliability",
  "Customer-focused service",
  "Strong business partnerships",
  "Continuous improvement",
  "Responsible business practices",
];

const AboutUspage = () => {
  return (
    <>
      <Header />
      <main className="bg-gray-50">
        <section className="relative flex min-h-[340px] items-center overflow-hidden bg-gray-950 text-white">
          <div
            className="absolute inset-0 bg-cover bg-center opacity-70"
            style={{ backgroundImage: `url(${aboutImage})` }}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-gray-950 via-gray-950/80 to-gray-950/25" />
          <div className="relative z-10 mx-auto w-full max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
            <p className="text-sm font-black uppercase tracking-[0.28em] text-orange-400">
              About Us
            </p>
            <h1 className="mt-4 max-w-3xl text-4xl font-black leading-tight sm:text-5xl">
              About MSA Trades Ltd
            </h1>
            <p className="mt-5 max-w-3xl text-lg leading-8 text-gray-200">
              A UK-registered trading company committed to quality, reliability,
              and professional service across every part of our business.
            </p>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
          <div className="grid gap-6 lg:grid-cols-[1.15fr_0.85fr]">
            <article className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm sm:p-8">
              <p className="text-sm font-black uppercase tracking-[0.22em] text-orange-500">
                Company Profile
              </p>
              <h2 className="mt-3 text-3xl font-black text-gray-950">
                Quality sourcing, dependable service, clear communication.
              </h2>
              <div className="mt-6 space-y-4 text-sm leading-7 text-gray-600 sm:text-base">
                <p>
                  MSA Trades Ltd specialises in identifying, sourcing, and supplying
                  carefully selected consumer products through trusted commercial
                  channels.
                </p>
                <p>
                  By working closely with manufacturers, suppliers, and business
                  partners, we aim to provide products that meet high standards of
                  quality, performance, and value.
                </p>
                <p>
                  Our approach is built on long-term relationships, responsible
                  business practices, and a commitment to continuous improvement.
                  Strong partnerships, attention to detail, and customer-focused
                  service are the foundations of sustainable business growth.
                </p>
                <p>
                  We are dedicated to providing responsive support and clear
                  communication. Whether assisting customers, working with suppliers,
                  or exploring new business opportunities, we strive to deliver a
                  professional and dependable experience.
                </p>
                <p>
                  We welcome enquiries from customers, manufacturers, suppliers,
                  distributors, and businesses interested in building long-term
                  commercial relationships.
                </p>
              </div>
            </article>

            <aside className="space-y-6">
              <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-orange-50 text-orange-500">
                  <FaMapMarkerAlt />
                </div>
                <h2 className="mt-4 text-2xl font-black text-gray-950">
                  Company Information
                </h2>
                <p className="mt-4 text-sm font-black text-gray-950">MSA Trades Ltd</p>
                <p className="mt-2 text-sm leading-7 text-gray-600">
                  113 Mellitus Street<br />
                  London<br />
                  England<br />
                  W12 0AU
                </p>
                <a
                  href="mailto:contact@msatrades.com"
                  className="mt-4 inline-flex items-center gap-2 text-sm font-black text-orange-500 hover:text-orange-600"
                >
                  <FaEnvelope />
                  contact@msatrades.com
                </a>
              </div>

              <div className="rounded-lg border border-orange-100 bg-orange-50 p-6 shadow-sm">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-white text-orange-500">
                  <FaHandshake />
                </div>
                <h2 className="mt-4 text-2xl font-black text-gray-950">
                  Our Commitment
                </h2>
                <p className="mt-3 text-sm leading-7 text-gray-700">
                  Our commitment is simple: to build lasting relationships through
                  trust, professionalism, and consistently high standards while
                  delivering excellent service at every stage.
                </p>
              </div>
            </aside>
          </div>

          <section className="mt-6 rounded-lg border border-gray-200 bg-white p-6 shadow-sm sm:p-8">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <p className="text-sm font-black uppercase tracking-[0.22em] text-orange-500">
                  Our Values
                </p>
                <h2 className="mt-3 text-3xl font-black text-gray-950">
                  The standards behind our work
                </h2>
              </div>
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-gray-950 text-orange-400">
                <FaSeedling />
              </div>
            </div>

            <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {values.map((value) => (
                <div
                  key={value}
                  className="flex items-center gap-3 rounded-lg border border-gray-200 bg-gray-50 p-4"
                >
                  <FaCheckCircle className="shrink-0 text-orange-500" />
                  <span className="text-sm font-black text-gray-800">{value}</span>
                </div>
              ))}
            </div>
          </section>
        </section>
      </main>
      <Footer />
    </>
  );
};

export default AboutUspage;
