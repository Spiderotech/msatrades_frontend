const Contactmap = () => {
    return (
        <section className="bg-gray-50 pb-12">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
              <div className="mb-5 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
                <div>
                  <p className="text-sm font-black uppercase tracking-[0.22em] text-orange-500">Registered Office</p>
                  <h2 className="mt-2 text-2xl font-black text-gray-950">Find MSA Trades Ltd</h2>
                </div>
                <p className="text-sm font-semibold text-gray-500">113 Mellitus Street, London, England, W12 0AU</p>
              </div>
              <div className="h-[340px] w-full overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm">
                <iframe
                    title="Google Map"
                    className="h-full w-full"
                    src="https://www.google.com/maps?q=113%20Mellitus%20Street%2C%20London%2C%20England%2C%20W12%200AU&output=embed"
                    allowFullScreen
                    loading="lazy"
                ></iframe>
              </div>
            </div>
        </section>
    )
}

export default Contactmap
