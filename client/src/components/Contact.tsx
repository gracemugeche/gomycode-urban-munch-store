const ContactSection = () => {
  return (
    <section
      id="contact"
      className="bg-white text-purple-900 py-16 px-4 sm:px-8 lg:px-32 font-[Poppins]"
    >
      <h2 className="text-3xl font-bold  text-[rgb(63,56,70)] text-center mb-8">Contact Us</h2>
      <p className="text-center max-w-xl mx-auto mb-10 text-sm text-gray-600">
        Have questions, feedback, or want to reach out? Fill the form below and we'll get back to you shortly.
      </p>

      <form
        className="max-w-2xl mx-auto space-y-6 bg-purple-50 p-8 rounded-xl shadow-md"
        onSubmit={(e) => {
          e.preventDefault();
          alert("Form submitted! (Functionality not yet connected)");
        }}
      >
        <div>
          <label htmlFor="name" className="block text-sm font-semibold mb-1">
            Name
          </label>
          <input
            id="name"
            type="text"
            required
            className="w-full px-4 py-2 border border-purple-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400"
          />
        </div>

        <div>
          <label htmlFor="email" className="block text-sm font-semibold mb-1">
            Email
          </label>
          <input
            id="email"
            type="email"
            required
            className="w-full px-4 py-2 border border-purple-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400"
          />
        </div>

        <div>
          <label htmlFor="message" className="block text-sm font-semibold mb-1">
            Message
          </label>
          <textarea
            id="message"
            rows={4}
            required
            className="w-full px-4 py-2 border border-purple-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400"
          ></textarea>
        </div>

        <button
          type="submit"
          className="w-full bg-purple-600 text-white py-2 rounded-lg hover:bg-purple-700 transition"
        >
          Send Message
        </button>
      </form>
    </section>
  );
};

export default ContactSection;
