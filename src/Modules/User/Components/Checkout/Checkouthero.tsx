const Checkouthero = () => {
  return (
    <section className="relative flex min-h-[260px] items-center overflow-hidden bg-gray-950 text-white">
      <div
        className="absolute inset-0 bg-cover bg-center opacity-30"
        style={{ backgroundImage: "url('/catalog/products/metro-glide-hybrid-cycle.png')" }}
      />
      <div className="absolute inset-0 bg-gradient-to-r from-gray-950 via-gray-950/85 to-gray-950/40" />
      <div className="relative z-10 mx-auto w-full max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <p className="text-sm font-black uppercase tracking-[0.28em] text-orange-400">
          Checkout
        </p>
        <h1 className="mt-3 text-4xl font-black leading-tight sm:text-5xl">
          Complete Your Order
        </h1>
        <p className="mt-4 max-w-2xl text-base leading-7 text-gray-200">
          Add your billing details and choose how you would like to pay.
        </p>
      </div>
    </section>
  )
}

export default Checkouthero
