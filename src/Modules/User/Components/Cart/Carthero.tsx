import cartImage from "../../../../assets/cart.png";

const Carthero = () => {
  return (
    <section className="relative flex min-h-[260px] items-center overflow-hidden bg-gray-950 text-white">
      <div
        className="absolute inset-0 bg-cover bg-center opacity-70"
        style={{ backgroundImage: `url(${cartImage})` }}
      />
      <div className="absolute inset-0 bg-gradient-to-r from-gray-950 via-gray-950/80 to-gray-950/25" />
      <div className="relative z-10 mx-auto w-full max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <p className="text-sm font-black uppercase tracking-[0.28em] text-orange-400">
          Cart
        </p>
        <h1 className="mt-3 text-4xl font-black leading-tight sm:text-5xl">
          Review Your Bag
        </h1>
        <p className="mt-4 max-w-2xl text-base leading-7 text-gray-200">
          Check quantities, remove items, and continue to checkout when everything looks right.
        </p>
      </div>
    </section>
  )
}

export default Carthero
