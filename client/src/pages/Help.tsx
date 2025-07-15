import {
  FaTruck,
  FaLock,
  FaExchangeAlt,
  FaUserFriends,
  FaCcStripe,
  FaMoneyBillWave,
  FaMobileAlt,
  FaQuestionCircle,
} from "react-icons/fa";
import { FiMapPin } from "react-icons/fi";

const Help = () => {
  return (
    <div className="max-w-6xl mx-auto px-6 py-10 font-[Poppins] space-y-16">
      {/* Header Section */}
      <section className="text-center">
        <h1 className="text-4xl font-bold text-purple-900 mb-2">
          Help & Support
        </h1>
      </section>

      {/* How Can We Help Section */}
      <section className="text-white bg-[rgb(38,34,43)] rounded-md p-8 text-center">
        <h2 className="text-3xl font-bold mb-4 text-white">How Can We Help?</h2>
        <p className="mb-2">💬 Chat with us</p>
        <p className="mb-2">
          📱 Send us a text:{" "}
          <span className="font-medium">+254 780 453 070</span>
        </p>
        <p className="mb-2">
          📞 Call us on: <span className="font-medium">+254 780 453 070</span>
        </p>
        <p className="mb-2">🕒 Opening Hours:</p>
        <p className="mb-1">
          Monday - Friday:{" "}
          <span className="font-medium">7:00 AM – 9:00 PM</span>
        </p>
        <p>
          Saturday - Sunday:{" "}
          <span className="font-medium">9:00 AM – 5:00 PM</span>
        </p>
      </section>

      {/* FAQ Section Header */}
      <section className="text-center" id="faqs">
        <h2 className="text-3xl font-semibold text-gray-800">
          Frequently Asked Questions
        </h2>
      </section>

      {/* FAQs / Info Cards */}
      <section className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 text-center">
        <div className="bg-gray-50 p-6 rounded-lg shadow-sm">
          <FaTruck size={28} className="mx-auto text-purple-600 mb-3" />
          <h4 className="font-bold mb-2">Delivery Information</h4>
          <p>
            Delivery is fast and secure via motorbikes or vehicle. Flat fee:{" "}
            <strong>$4</strong> for all orders within Nairobi.
          </p>
        </div>

        <div className="bg-gray-50 p-6 rounded-lg shadow-sm">
          <FiMapPin size={28} className="mx-auto text-purple-600 mb-3" />
          <h4 className="font-bold mb-2">Our Location</h4>
          <p>We are located in Nairobi Town, Hazina Towers, 6th Floor.</p>
        </div>

        <div className="bg-gray-50 p-6 rounded-lg shadow-sm">
          <FaLock size={28} className="mx-auto text-purple-600 mb-3" />
          <h4 className="font-bold mb-2">Payment Methods</h4>
          <div className="flex justify-center gap-6 text-2xl text-purple-700 mb-2">
            <FaMobileAlt title="M-Pesa" />
            <FaCcStripe title="Stripe" />
            <FaMoneyBillWave title="Cash" />
          </div>
          <p>We accept M-Pesa, Stripe, and Cash on Delivery.</p>
        </div>

        <div className="bg-gray-50 p-6 rounded-lg shadow-sm">
          <FaExchangeAlt size={28} className="mx-auto text-purple-600 mb-3" />
          <h4 className="font-bold mb-2">Return & Exchange</h4>
          <p>
            Items can be returned or exchanged within 30 days with valid reason.
          </p>
        </div>

        <div className="bg-gray-50 p-6 rounded-lg shadow-sm">
          <FaUserFriends size={28} className="mx-auto text-purple-600 mb-3" />
          <h4 className="font-bold mb-2">Friendly Support</h4>
          <p>
            Our support team is always ready to assist you with any concerns or
            inquiries.
          </p>
        </div>

        <div className="bg-gray-50 p-6 rounded-lg shadow-sm">
          <FaQuestionCircle
            size={28}
            className="mx-auto text-purple-600 mb-3"
          />
          <h4 className="font-bold mb-2">Order Tracking</h4>
          <p>
            You can track your order in real-time via your dashboard under order
            history.
          </p>
        </div>
      </section>

      {/* quick help guide section */}
      <section className="bg-white p-8 rounded-lg shadow-sm border border-gray-200">
        <h3 className="text-2xl font-semibold text-gray-800 mb-6 text-center">
          Quick Help Guide
        </h3>

        <div className="max-w-xl mx-auto space-y-4">
          <div className="flex flex-col gap-2">
            <div className="bg-gray-100 rounded-lg px-4 py-3 w-fit self-start">
              <p>❓ I can't find my order.</p>
            </div>
            <div className="bg-purple-100 rounded-lg px-4 py-3 w-fit self-end">
              <p>➡ Go to your dashboard → Orders.</p>
            </div>

            <div className="bg-gray-100 rounded-lg px-4 py-3 w-fit self-start">
              <p>❓ My delivery is late.</p>
            </div>
            <div className="bg-purple-100 rounded-lg px-4 py-3 w-fit self-end">
              <p>➡ Call or WhatsApp us directly for updates.</p>
            </div>

            <div className="bg-gray-100 rounded-lg px-4 py-3 w-fit self-start">
              <p>❓ I have a payment issue.</p>
            </div>
            <div className="bg-purple-100 rounded-lg px-4 py-3 w-fit self-end">
              <p>➡ Check our Payment FAQs above for guidance.</p>
            </div>

            <div className="bg-gray-100 rounded-lg px-4 py-3 w-fit self-start">
              <p>❓ I want to return an item.</p>
            </div>
            <div className="bg-purple-100 rounded-lg px-4 py-3 w-fit self-end">
              <p>➡ Returns allowed within 30 days. See our Returns FAQ.</p>
            </div>

            <div className="bg-gray-100 rounded-lg px-4 py-3 w-fit self-start">
              <p>❓ My order wasn’t delivered.</p>
            </div>
            <div className="bg-purple-100 rounded-lg px-4 py-3 w-fit self-end">
              <p>➡ Contact us by phone or WhatsApp right away.</p>
            </div>

            <div className="bg-gray-100 rounded-lg px-4 py-3 w-fit self-start">
              <p>❓ Still need help?</p>
            </div>
            <div className="bg-purple-100 rounded-lg px-4 py-3 w-fit self-end">
              <p>➡ Chat with us on WhatsApp for fast answers.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Help;
