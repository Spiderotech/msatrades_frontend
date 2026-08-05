import Header from "../Components/Header";
import Footer from "../Components/Footer";

const sections = [
  {
    title: "Returns",
    body: [
      "If you wish to return an item, please contact us as soon as possible with your order details and the reason for your return.",
      "Returns that do not meet these conditions may not be eligible for a refund.",
    ],
    items: [
      "Be returned within the applicable return period.",
      "Be unused and in their original condition where reasonably possible.",
      "Include proof of purchase where available.",
      "Include all original accessories and packaging where applicable.",
    ],
  },
  {
    title: "Refunds",
    body: [
      "Once a returned item has been received and inspected, we will notify you of the outcome of your refund request.",
      "If approved, refunds will be processed using the original payment method where possible. Processing times may vary depending on your payment provider.",
    ],
  },
  {
    title: "Faulty or Damaged Items",
    body: [
      "If you receive an item that is faulty, damaged, or incorrect, please contact us promptly. We will work with you to resolve the issue, which may include a replacement, repair, or refund where appropriate and in accordance with your statutory rights.",
    ],
  },
  {
    title: "Non-Refundable Items",
    body: [
      "Certain items may not be eligible for return or refund where permitted by law, including:",
    ],
    items: [
      "Items that have been used, altered, or damaged after delivery.",
      "Personalised or customised products.",
      "Products excluded from return under applicable consumer protection legislation.",
    ],
  },
  {
    title: "Contact Us",
    body: [
      "If you have any questions regarding this Refund Policy or wish to request a return or refund, please contact MSA Trades Ltd, 113 Mellitus Street, London, England, W12 0AU.",
      "Email: contact@msatrades.com",
    ],
  },
  {
    title: "Changes to This Policy",
    body: [
      "We may update this Refund Policy from time to time. Any changes will be published on this page together with the revised effective date.",
    ],
  },
  {
    title: "Governing Law",
    body: [
      "This Refund Policy shall be governed by and construed in accordance with the laws of England and Wales.",
    ],
  },
];

const RefundPolicypage = () => {
  return (
    <div>
      <Header />
      <main className="bg-gray-50 py-12">
        <section className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm sm:p-8">
            <p className="text-sm font-bold uppercase tracking-[0.22em] text-orange-500">
              Effective Date: 28 July 2026
            </p>
            <h1 className="mt-3 text-3xl font-black text-gray-950 sm:text-4xl">
              Refund Policy
            </h1>
            <p className="mt-4 leading-7 text-gray-600">
              At MSA Trades Ltd, customer satisfaction is important to us. We are
              committed to resolving any issues fairly and in accordance with applicable
              consumer protection laws.
            </p>

            <div className="mt-8 grid gap-4">
              {sections.map((section) => (
                <article key={section.title} className="rounded-lg border border-gray-200 bg-gray-50 p-5">
                  <h2 className="text-lg font-black text-gray-950">{section.title}</h2>
                  {section.body.map((paragraph) => (
                    <p key={paragraph} className="mt-2 text-sm leading-7 text-gray-600">
                      {paragraph}
                    </p>
                  ))}
                  {section.items && (
                    <ul className="mt-3 space-y-2 pl-5 text-sm leading-7 text-gray-600">
                      {section.items.map((item) => (
                        <li key={item} className="list-disc">
                          {item}
                        </li>
                      ))}
                    </ul>
                  )}
                </article>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default RefundPolicypage;
