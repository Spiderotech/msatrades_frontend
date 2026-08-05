import { useState } from "react";
import { FaChevronDown, FaEnvelope, FaQuestionCircle, FaTruck } from "react-icons/fa";

const faqs = [
  {
    question: "Do you ship bicycles across the UK?",
    answer:
      "Yes. We deliver bicycles, spare parts, and accessories across the UK. Bicycles are shipped with protective packaging and clear handling details.",
  },
  {
    question: "What is your return policy?",
    answer:
      "If you wish to return an item, contact us as soon as possible with your order details and return reason. Returned items should be unused, in original condition where reasonably possible, and include proof of purchase.",
  },
  {
    question: "Can I ask about supplier or wholesale enquiries?",
    answer:
      "Yes. MSA Trades Ltd welcomes supplier enquiries, business partnerships, distribution opportunities, wholesale enquiries, and general business enquiries.",
  },
  {
    question: "How do I contact customer support?",
    answer:
      "Please email contact@msatrades.com with as much information as possible so our team can respond efficiently.",
  },
];

const Faq = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <section className="bg-gray-50 py-14">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
          <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm sm:p-8">
            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-gray-950 text-orange-400">
              <FaQuestionCircle />
            </div>
            <p className="mt-6 text-sm font-black uppercase tracking-[0.24em] text-orange-500">
              FAQ
            </p>
            <h2 className="mt-3 text-3xl font-black text-gray-950 sm:text-4xl">
              Frequently Asked Questions
            </h2>
            <p className="mt-4 text-sm leading-7 text-gray-600">
              Quick answers for orders, returns, support, and business enquiries.
            </p>

            <div className="mt-7 grid gap-3 sm:grid-cols-2 lg:grid-cols-1">
              <div className="rounded-lg border border-orange-100 bg-orange-50 p-4">
                <FaTruck className="text-orange-500" />
                <h3 className="mt-3 font-black text-gray-950">UK Delivery</h3>
                <p className="mt-1 text-sm leading-6 text-gray-700">
                  Local catalog shopping with delivery support details handled during order review.
                </p>
              </div>
              <div className="rounded-lg border border-gray-200 bg-gray-50 p-4">
                <FaEnvelope className="text-orange-500" />
                <h3 className="mt-3 font-black text-gray-950">Need More Help?</h3>
                <a
                  href="mailto:contact@msatrades.com"
                  className="mt-1 inline-flex text-sm font-black text-orange-500 hover:text-orange-600"
                >
                  contact@msatrades.com
                </a>
              </div>
            </div>
          </div>

          <div className="overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm">
            {faqs.map((faq, index) => {
              const isOpen = activeIndex === index;

              return (
                <article key={faq.question} className="border-b border-gray-100 last:border-b-0">
                  <button
                    type="button"
                    className="flex w-full items-center justify-between gap-4 px-5 py-5 text-left transition hover:bg-gray-50 sm:px-6"
                    onClick={() => setActiveIndex(isOpen ? -1 : index)}
                  >
                    <span className="text-base font-black text-gray-950 sm:text-lg">
                      {faq.question}
                    </span>
                    <span
                      className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-gray-200 bg-gray-50 text-orange-500 transition ${
                        isOpen ? "rotate-180 bg-orange-500 text-white" : ""
                      }`}
                    >
                      <FaChevronDown />
                    </span>
                  </button>
                  {isOpen && (
                    <div className="px-5 pb-5 sm:px-6">
                      <p className="rounded-lg bg-gray-50 p-4 text-sm leading-7 text-gray-600">
                        {faq.answer}
                      </p>
                    </div>
                  )}
                </article>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Faq;
