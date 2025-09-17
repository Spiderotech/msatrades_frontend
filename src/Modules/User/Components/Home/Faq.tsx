import React, { useState } from "react";

const Faq = () => {
  const [show, setShow] = useState(false);
  const [show2, setShow2] = useState(false);
  const [show3, setShow3] = useState(false);
  const [show4, setShow4] = useState(false);

  return (
    <div className="2xl:container 2xl:mx-auto md:py-12 lg:px-20 md:px-6 py-9 px-4">
      <h2 className="font-semibold lg:text-4xl text-3xl lg:leading-9 md:leading-7 leading-9 text-gray-800">
        Frequently Asked Questions
      </h2>
      <div className="mt-4 flex md:justify-between md:items-start md:flex-row flex-col justify-start items-start">
        <div>
          <p className="font-normal text-base leading-6 text-gray-600 lg:w-8/12 md:w-9/12">
            Here are some of the most common questions our cycling customers ask
            before placing their orders 
          </p>
        </div>
      </div>

      <div className="flex md:flex-row flex-col md:space-x-8 md:mt-16 mt-8">
        <div className="md:w-5/12 lg:w-4/12 w-full">
          <img
            src="https://templatekit.jegtheme.com/trail/wp-content/uploads/sites/91/2021/05/handsome-bearded-traveler-dressed-in-a-trendy-camouflage-jacket-standing-with-sports-bicycle-e1620723643548.jpg"
            alt="Cyclist with bicycle"
            className="w-full md:block hidden"
          />
          <img
            src="https://templatekit.jegtheme.com/trail/wp-content/uploads/sites/91/2021/05/handsome-bearded-traveler-dressed-in-a-trendy-camouflage-jacket-standing-with-sports-bicycle-e1620723643548.jpg"
            alt="Cyclist with bicycle"
            className="w-full md:hidden block"
          />
        </div>

        <div className="md:w-7/12 lg:w-8/12 w-full md:mt-0 sm:mt-14 mt-10">
          {/* Shipping Section */}
          <div>
            <div className="flex justify-between items-center cursor-pointer">
              <h3 className="font-semibold text-xl leading-5 text-gray-800">
                Do you ship bicycles across UK?
              </h3>
              <button
                aria-label="toggle"
                className="cursor-pointer focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-800"
                onClick={() => setShow(!show)}
              >
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    className={show ? "hidden" : "block"}
                    d="M10 4.1665V15.8332"
                    stroke="#1F2937"
                    strokeWidth="1.25"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M4.16602 10H15.8327"
                    stroke="#1F2937"
                    strokeWidth="1.25"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
            </div>
            <p
              className={
                "font-normal text-base leading-6 text-gray-600 mt-4 w-11/12 " +
                (show ? "block" : "hidden")
              }
            >
              Yes! We deliver bicycles, spare parts, and accessories across
              the UK. Bicycles are shipped in semi-assembled condition with
              protective packaging, and local assembly support is available in
              major cities.
            </p>
          </div>

          <hr className="my-7 bg-gray-200" />

          {/* Returns Section */}
          <div>
            <div className="flex justify-between items-center cursor-pointer">
              <h3 className="font-semibold text-xl leading-5 text-gray-800">
                What is your return policy?
              </h3>
              <button
                aria-label="toggle"
                className="cursor-pointer focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-800"
                onClick={() => setShow2(!show2)}
              >
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    className={show2 ? "hidden" : "block"}
                    d="M10 4.1665V15.8332"
                    stroke="#1F2937"
                    strokeWidth="1.25"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M4.16602 10H15.8327"
                    stroke="#1F2937"
                    strokeWidth="1.25"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
            </div>
            <p
              className={
                "font-normal text-base leading-6 text-gray-600 mt-4 w-11/12 " +
                (show2 ? "block" : "hidden")
              }
            >
              You can return accessories and spare parts within 7 days of
              delivery if unused and in original packaging. For bicycles, returns
              are accepted only in case of manufacturing defects or shipping
              damage.
            </p>
          </div>

          <hr className="my-7 bg-gray-200" />

          {/* Exchange Section */}
          <div>
            <div className="flex justify-between items-center cursor-pointer">
              <h3 className="font-semibold text-xl leading-5 text-gray-800">
                Can I exchange my cycle for a different size or model?
              </h3>
              <button
                aria-label="toggle"
                className="cursor-pointer focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-800"
                onClick={() => setShow3(!show3)}
              >
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    className={show3 ? "hidden" : "block"}
                    d="M10 4.1665V15.8332"
                    stroke="#1F2937"
                    strokeWidth="1.25"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M4.16602 10H15.8327"
                    stroke="#1F2937"
                    strokeWidth="1.25"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
            </div>
            <p
              className={
                "font-normal text-base leading-6 text-gray-600 mt-4 w-11/12 " +
                (show3 ? "block" : "hidden")
              }
            >
              Yes, exchanges are possible within 5 days of delivery for unused
              cycles. Frame size and color exchanges depend on availability.
              Shipping charges may apply.
            </p>
          </div>

          <hr className="my-7 bg-gray-200" />

          {/* Tracking Section */}
          <div>
            <div className="flex justify-between items-center cursor-pointer">
              <h3 className="font-semibold text-xl leading-5 text-gray-800">
                How can I track my cycle order?
              </h3>
              <button
                aria-label="toggle"
                className="cursor-pointer focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-800"
                onClick={() => setShow4(!show4)}
              >
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    className={show4 ? "hidden" : "block"}
                    d="M10 4.1665V15.8332"
                    stroke="#1F2937"
                    strokeWidth="1.25"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M4.16602 10H15.8327"
                    stroke="#1F2937"
                    strokeWidth="1.25"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
            </div>
            <p
              className={
                "font-normal text-base leading-6 text-gray-600 mt-4 w-11/12 " +
                (show4 ? "block" : "hidden")
              }
            >
              Once your order is dispatched, you will receive a tracking link
              via email and SMS. You can check the live status of your shipment
              anytime.
            </p>
          </div>

          <hr className="my-7 bg-gray-200" />
        </div>
      </div>
    </div>
  );
};

export default Faq;
