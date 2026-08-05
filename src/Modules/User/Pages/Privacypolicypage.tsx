import Header from "../Components/Header";
import Footer from "../Components/Footer";

const sections = [
  {
    title: "1. Who We Are",
    body: [
      "This website is operated by MSA Trades Ltd, 113 Mellitus Street, London, England, W12 0AU.",
    ],
  },
  {
    title: "2. Information We Collect",
    body: [
      "Depending on how you use our website, we may collect your name, email address, telephone number, billing and shipping address where applicable, information provided through contact forms or enquiries, order-related information, payment information processed securely by our payment providers, device and browser information, IP address, website usage information, and cookies or similar technologies.",
      "We only collect personal information that is necessary to respond to enquiries, process transactions where applicable, improve our website, and comply with legal obligations.",
    ],
  },
  {
    title: "3. How We Use Your Information",
    body: [
      "We may use your information to process and fulfil orders, process payments, provide customer support, respond to enquiries, improve our website and customer experience, detect and prevent fraud or unauthorised activity, comply with legal and regulatory requirements, and communicate with you regarding your orders or enquiries.",
    ],
  },
  {
    title: "4. Sharing Your Information",
    body: [
      "We do not sell or rent your personal information.",
      "Where necessary, we may share your information with trusted third parties, including payment service providers, delivery and logistics providers, website hosting providers, IT service providers, professional advisers where required, and government authorities where required by law.",
      "These third parties are only permitted to use your information for the services they provide on our behalf.",
    ],
  },
  {
    title: "5. Cookies",
    body: [
      "Our website may use cookies and similar technologies to enable essential website functionality, improve website performance, remember your preferences, analyse website traffic, and enhance your browsing experience.",
      "You can manage or disable cookies through your browser settings. Please note that some features of the website may not function correctly if cookies are disabled.",
    ],
  },
  {
    title: "6. Data Security",
    body: [
      "We take appropriate technical and organisational measures to protect your personal information against unauthorised access, disclosure, alteration, loss, or destruction.",
      "While we take reasonable steps to safeguard your information, no method of electronic transmission or storage is completely secure. Therefore, we cannot guarantee absolute security.",
    ],
  },
  {
    title: "7. Data Retention",
    body: [
      "We retain personal information only for as long as necessary to fulfil the purposes outlined in this Privacy Policy or to comply with applicable legal and regulatory requirements.",
    ],
  },
  {
    title: "8. Your Rights",
    body: [
      "Subject to applicable data protection laws, you may have the right to access your personal information, correct inaccurate or incomplete information, request deletion of your personal information, restrict certain processing activities, object to processing where applicable, withdraw your consent where processing is based on your consent, request a copy of your personal information where applicable, and lodge a complaint with the UK Information Commissioner's Office (ICO).",
      "To exercise any of these rights, please contact us using the details provided below.",
    ],
  },
  {
    title: "9. Third-Party Websites",
    body: [
      "Our website may contain links to third-party websites. We are not responsible for the privacy practices, content, or security of external websites. We encourage you to review their privacy policies before providing any personal information.",
    ],
  },
  {
    title: "10. Children's Privacy",
    body: [
      "Our website is intended for a general audience and is not directed at individuals under the age of 18. We do not knowingly collect personal information from children.",
    ],
  },
  {
    title: "11. Changes to This Privacy Policy",
    body: [
      "We may update this Privacy Policy from time to time. Any changes will be published on this page together with the revised effective date. Continued use of this website after any changes constitutes acceptance of the updated Privacy Policy.",
    ],
  },
  {
    title: "12. Contact Us",
    body: [
      "If you have any questions regarding this Privacy Policy or how your personal information is handled, please contact MSA Trades Ltd, 113 Mellitus Street, London, England, W12 0AU.",
      "Email: contact@msatrades.com",
    ],
  },
  {
    title: "13. Governing Law",
    body: [
      "This Privacy Policy shall be governed by and construed in accordance with the laws of England and Wales.",
    ],
  },
];

const Privacypolicypage = () => {
  return (
    <div>
      <Header />
      <main className="bg-gray-50 py-12">
        <section className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm sm:p-8">
            <p className="text-sm font-bold uppercase tracking-[0.22em] text-orange-500">
              Effective Date: 21 July 2026
            </p>
            <h1 className="mt-3 text-3xl font-black text-gray-950 sm:text-4xl">
              Privacy Policy
            </h1>
            <p className="mt-4 leading-7 text-gray-600">
              Welcome to the MSA Trades Ltd website. We are committed to protecting your
              privacy and handling your personal information in a secure and responsible manner.
            </p>
            <p className="mt-3 leading-7 text-gray-600">
              This Privacy Policy explains how we collect, use, store, disclose, and protect
              your personal information when you visit our website or contact us.
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

export default Privacypolicypage;
