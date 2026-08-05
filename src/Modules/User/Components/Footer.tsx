import { FaArrowRight, FaEnvelope, FaMapMarkerAlt } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import logo from "../../../assets/ChatGPT Image Jul 29, 2026, 04_36_38 AM.png";

const Footer = () => {
  const navigate = useNavigate();

  const linkClass = "text-left text-sm text-gray-300 transition hover:text-orange-400";
  const goTo = (path: string) => {
    navigate(path);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="bg-gray-950 text-white">
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-[1.15fr_0.65fr_0.75fr_1fr]">
          <div>
            <button
              type="button"
              onClick={() => goTo("/")}
              className="flex items-center"
              aria-label="MSAtrades home"
            >
              <img src={logo} alt="MSAtrades Logo" className="h-14 w-52 object-contain object-left" />
            </button>
            <p className="mt-4 max-w-sm text-sm leading-6 text-gray-300">
              Modern cycles, useful accessories, and spare parts with local catalog data and a
              simple storefront experience.
            </p>
          </div>

          <div>
            <h2 className="text-sm font-black uppercase tracking-[0.18em] text-white">Company</h2>
            <div className="mt-4 flex flex-col gap-2.5">
              <button className={linkClass} onClick={() => goTo("/about-us")}>About Us</button>
              <button className={linkClass} onClick={() => goTo("/contact")}>Contact Us</button>
              <button className={linkClass} onClick={() => goTo("/shop")}>Shop</button>
            </div>
          </div>

          <div>
            <h2 className="text-sm font-black uppercase tracking-[0.18em] text-white">Support</h2>
            <div className="mt-4 flex flex-col gap-2.5">
              <button className={linkClass} onClick={() => goTo("/privacy-policy")}>Privacy Policy</button>
              <button className={linkClass} onClick={() => goTo("/refund-policy")}>Refund Policy</button>
              <button className={linkClass} onClick={() => goTo("/terms-and-conditions")}>Terms of Service</button>
            </div>
          </div>

          <div>
            <h2 className="text-sm font-black uppercase tracking-[0.18em] text-white">Get Updates</h2>
            <p className="mt-4 text-sm leading-6 text-gray-300">
              Receive product updates, category additions, and local storefront news.
            </p>
            <div className="mt-4 flex overflow-hidden rounded-md border border-white/10 bg-white">
              <input
                type="email"
                className="min-w-0 flex-1 px-4 py-3 text-sm text-gray-900 outline-none"
                placeholder="Enter your email"
              />
              <button
                type="button"
                className="grid w-12 place-items-center bg-orange-500 text-white transition hover:bg-orange-600"
                aria-label="Subscribe"
              >
                <FaArrowRight />
              </button>
            </div>
          </div>
        </div>

        <div className="mt-8 grid gap-4 rounded-lg border border-white/10 bg-white/5 p-4 text-sm text-gray-300 md:grid-cols-[1fr_auto] md:items-center">
          <div className="flex items-start gap-3">
            <FaMapMarkerAlt className="mt-1 shrink-0 text-orange-400" />
            <p className="leading-6">
              <span className="font-bold text-white">Registered Office:</span>{" "}
              113 Mellitus Street, London, England, W12 0AU
            </p>
          </div>
          <a
            className="flex items-center gap-3 font-semibold transition hover:text-orange-400"
            href="mailto:contact@msatrades.com"
          >
            <FaEnvelope className="shrink-0 text-orange-400" />
            contact@msatrades.com
          </a>
        </div>

        <div className="mt-6 border-t border-white/10 pt-5 text-sm text-gray-400">
          <p>© 2026 MSA Trades Ltd. All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
