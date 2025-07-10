import { FaBoxOpen, FaMotorcycle, FaCity, FaUsers } from "react-icons/fa";
import { IoFastFood } from "react-icons/io5";

const AboutSection = () => {
  return (
    <section
      className="bg-white py-14 px-6 font-[Poppins] space-y-20"
      id="about"
    >
      {/* Top Section: Logo and Intro */}
      <div className="max-w-6xl mx-auto flex flex-col items-center gap-6 text-center">
        <IoFastFood className="text-purple-800" size={120} />
        <p className="text-gray-800 text-lg leading-relaxed max-w-3xl">
          <strong className="text-purple-800">Urban Munch</strong> is your
          trusted neighborhood partner for quick meals, fresh groceries, and
          refreshing drinks. Designed with your busy lifestyle in mind, we bring
          the market to your fingertips. No more long queues or rushed
          shopping—just seamless service, quality products, and delicious
          convenience. Our platform is built to make your daily choices
          healthier, faster, and easier, with care at every step. Experience
          hassle-free orders and timely deliveries with a brand that understands
          your urban rhythm.
        </p>
      </div>

      {/* middle section */}
      <div className="bg-gray-100 py-10 px-6">
        <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          <div>
            <FaCity size={36} className="mx-auto text-purple-700 mb-2" />
            <h3 className="text-2xl font-bold">5</h3>
            <p className="text-sm">Serving Cities</p>
          </div>
          <div>
            <FaMotorcycle size={36} className="mx-auto text-purple-700 mb-2" />
            <h3 className="text-2xl font-bold">1K+</h3>
            <p className="text-sm">Monthly Deliveries</p>
          </div>
          <div>
            <FaBoxOpen size={36} className="mx-auto text-purple-700 mb-2" />
            <h3 className="text-2xl font-bold">3K+</h3>
            <p className="text-sm">Products Delivered</p>
          </div>
          <div>
            <FaUsers size={36} className="mx-auto text-purple-700 mb-2" />
            <h3 className="text-2xl font-bold">500+</h3>
            <p className="text-sm">Happy Customers</p>
          </div>
        </div>
      </div>

      {/*  Image & Services Detail */}
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold text-slate-800 text-center mb-10">
          Explore Our Categories
        </h2>
        <div className="grid md:grid-cols-2 gap-10 items-center">
          <img
            src="/about.jpg"
            alt="Our Services"
            className="rounded-3xl shadow-lg w-full object-cover"
          />
          <div>
            <div className="space-y-6 text-slate-700">
              <div>
                <h4 className="text-xl font-semibold text-purple-700 mb-1">
                  Meals
                </h4>
                <p>
                  Craving a quick bite or a hearty plate? Our meals range from
                  delicious wraps and savory rice dishes to wholesome local
                  favorites. Every dish is crafted with fresh ingredients and
                  delivered hot—ready to satisfy your appetite without delay.
                </p>
              </div>
              <div>
                <h4 className="text-xl font-semibold text-purple-700 mb-1">
                  Groceries
                </h4>
                <p>
                  Forget the long lines—our groceries section brings the market to
                  your door. From ripe fruits and leafy greens to pantry
                  must-haves and essentials, everything is handpicked for
                  freshness and affordability.
                </p>
              </div>
              <div>
                <h4 className="text-xl font-semibold text-purple-700 mb-1">
                  Drinks
                </h4>
                <p>
                  Stay refreshed all day with our diverse drink collection.
                  Whether it is cold soda, fresh juice, or a healthy smoothie, we
                  have the perfect beverage for every mood and moment.
                </p>
              </div>
            </div>
            <p className="mt-6 font-medium text-gray-800">
              Join Urban Munch and make your day tastier, fresher, and more
              convenient.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
