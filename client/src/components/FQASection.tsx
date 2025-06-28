const FaqSection = () => {
  return (
    <section id="faqs" className="bg-purple-50 py-16 px-4 sm:px-8 lg:px-32 text-[rgb(63,56,70)] font-[Poppins]">
      <h2 className="text-3xl font-bold text-center mb-10">Frequently Asked Questions</h2>

      <div className="space-y-6 max-w-4xl mx-auto">
        {faqItems.map((item, i) => (
          <details
            key={i}
            className="bg-white border border-purple-200 rounded-xl p-4 shadow-md transition-all"
          >
            <summary className="cursor-pointer text-lg font-semibold text-purple-800">
              {item.question}
            </summary>
            <p className="mt-2 text-sm text-gray-700">{item.answer}</p>
          </details>
        ))}
      </div>
    </section>
  );
};

const faqItems = [
  {
    question: "How long does delivery take?",
    answer: "Delivery typically takes 30–60 minutes depending on your location and order size.",
  },
  {
    question: "What areas do you deliver to?",
    answer: "We currently deliver within Nairobi and its surrounding areas. More locations coming soon!",
  },
  {
    question: "Can I schedule a delivery?",
    answer: "Yes! You can schedule your delivery at checkout for a time that suits you best.",
  },
  {
    question: "What payment methods do you accept?",
    answer: "We accept cash on delivery, M-Pesa, and card payments via Stripe.",
  },
  {
    question: "What if I have an issue with my order?",
    answer: "You can contact our support team through the Contact Us page, and we’ll resolve it quickly.",
  },
];

export default FaqSection;
