import contactImage from "../../../../assets/contact.png";

const Contacthero = () => {
  return (
    <section className="relative flex min-h-[320px] w-full items-center overflow-hidden bg-gray-950 text-white">
      <div
        className="absolute inset-0 bg-cover bg-center opacity-70"
        style={{ backgroundImage: `url(${contactImage})` }}
      />
      <div className="absolute inset-0 bg-gradient-to-r from-gray-950 via-gray-950/80 to-gray-950/25" />

      <div className="relative z-10 mx-auto w-full max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <p className="text-sm font-black uppercase tracking-[0.28em] text-orange-400">
          Contact Us
        </p>
        <h1 className="mt-4 max-w-3xl text-4xl font-black leading-tight sm:text-5xl">
          Get in Touch
        </h1>
        <p className="mt-5 max-w-2xl text-lg leading-8 text-gray-200">
          Whether you have a general enquiry, need customer support, or want to
          discuss a business opportunity, our team is here to help.
        </p>
      </div>
    </section>
  )
}

export default Contacthero
