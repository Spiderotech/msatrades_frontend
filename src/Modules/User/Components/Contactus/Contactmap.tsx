import React from 'react'

const Contactmap = () => {
    return (
        <section className="container mx-auto px-4 py-20">
            <div className="w-full h-[400px]">
                <iframe
                    title="Google Map"
                    className="w-full h-full rounded-lg shadow-lg"
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d19806.914083087087!2d-0.14196422846872396!3d51.50735074767362!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x48760352c5e120f7%3A0xa65b162f3a0b4e2a!2sLondon%20Eye!5e0!3m2!1sen!2suk!4v1700000000000"
                    allowFullScreen
                    loading="lazy"
                ></iframe>
            </div>

        </section>
    )
}

export default Contactmap
