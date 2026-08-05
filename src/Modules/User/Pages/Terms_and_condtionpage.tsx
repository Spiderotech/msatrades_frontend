import Header from "../Components/Header";
import Footer from "../Components/Footer";

const sections = [
  {
    title: "1. About Us",
    body: [
      "This website is owned and operated by MSA Trades Ltd, 113 Mellitus Street, London, England, W12 0AU.",
      "Email: contact@msatrades.com",
    ],
  },
  {
    title: "2. Use of This Website",
    body: [
      "You agree to use this website only for lawful purposes and in a manner that does not infringe the rights of others or interfere with the operation or security of this website.",
      "You must not use this website for any unlawful or fraudulent purpose, attempt to gain unauthorised access to the website, its servers, or related systems, introduce viruses, malware, or any other harmful software, interfere with or disrupt the operation, security, or functionality of the website, or copy, reproduce, or misuse website content without permission.",
    ],
  },
  {
    title: "3. Website Content",
    body: [
      "The information provided on this website is for general informational purposes only. While we make reasonable efforts to keep the information accurate and up to date, we do not guarantee that all content is complete, accurate, reliable, or current.",
      "We reserve the right to modify, update, or remove any content on this website at any time without prior notice.",
    ],
  },
  {
    title: "4. Intellectual Property",
    body: [
      "Unless otherwise stated, all content on this website, including text, graphics, logos, images, designs, documents, and other materials, is the property of MSA Trades Ltd or is used under appropriate licence.",
      "No content from this website may be copied, reproduced, distributed, modified, published, or otherwise used without our prior written permission.",
    ],
  },
  {
    title: "5. Third-Party Links",
    body: [
      "This website may contain links to third-party websites for your convenience. MSA Trades Ltd is not responsible for the content, availability, security, or privacy practices of external websites.",
      "We encourage you to review the terms and privacy policies of any third-party websites you visit.",
    ],
  },
  {
    title: "6. Disclaimer",
    body: [
      "The information provided on this website is for general informational purposes only. While we make reasonable efforts to ensure the accuracy of the information, MSA Trades Ltd makes no warranties or representations regarding the completeness, accuracy, reliability, or suitability of any content published on this website.",
    ],
  },
  {
    title: "7. Limitation of Liability",
    body: [
      "To the fullest extent permitted by applicable law, MSA Trades Ltd shall not be liable for any direct, indirect, incidental, consequential, special, or punitive damages arising from or relating to your access to or use of this website.",
      "Nothing in these Terms & Conditions excludes or limits liability where such exclusion or limitation is prohibited by law.",
    ],
  },
  {
    title: "8. Privacy",
    body: [
      "Your use of this website is also governed by our Privacy Policy, which explains how we collect, use, and protect your personal information.",
    ],
  },
  {
    title: "9. Changes to These Terms",
    body: [
      "We may revise these Terms & Conditions from time to time. Any updates will be published on this page together with the revised effective date.",
      "By continuing to use this website after any changes become effective, you agree to be bound by the updated Terms & Conditions.",
    ],
  },
  {
    title: "10. Governing Law",
    body: [
      "These Terms & Conditions shall be governed by and construed in accordance with the laws of England and Wales.",
      "Any disputes arising from or relating to these Terms & Conditions or your use of this website shall be subject to the exclusive jurisdiction of the courts of England and Wales.",
    ],
  },
  {
    title: "11. Contact Us",
    body: [
      "If you have any questions regarding these Terms & Conditions, please contact MSA Trades Ltd, 113 Mellitus Street, London, England, W12 0AU.",
      "Email: contact@msatrades.com",
    ],
  },
];

const TermsAndConditionPage = () => {
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
              Terms & Conditions
            </h1>
            <p className="mt-4 leading-7 text-gray-600">
              Welcome to the MSA Trades Ltd website. By accessing or using this website,
              you agree to be bound by these Terms & Conditions. If you do not agree with
              these Terms & Conditions, please do not use this website.
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

export default TermsAndConditionPage;
