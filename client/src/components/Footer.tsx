import { Link } from "react-router-dom";
import { FaFacebook, FaTwitter, FaInstagram } from "react-icons/fa";

const Footer = () => {
  const exploreLinks = [
    { text: "About Us", to: "/about" },
    { text: "Contact", to: "/contact" },
    { text: "Careers", to: "/careers" },
    { text: "Blog", to: "/blog" },
  ];

  const helpLinks = [
    { text: "FAQs", to: "/faqs" },
    { text: "Support", to: "/support" },
    { text: "Delivery Info", to: "/checkout#delivery-info" },
    { text: "Returns", to: "/returns" },
  ];

  const socials = [
    { icon: FaFacebook, href: "https://facebook.com" },
    { icon: FaTwitter, href: "https://twitter.com" },
    { icon: FaInstagram, href: "https://instagram.com" },
  ];

  const FooterList = ({
    title,
    links,
  }: {
    title: string;
    links: { text: string; to: string }[];
  }) => (
    <div>
      <h3 className="text-lg font-semibold text-purple-800 mb-3">{title}</h3>
      <ul className="space-y-2 text-sm">
        {links.map(({ text, to }, i) => (
          <li key={i}>
            <Link to={to} className="hover:text-purple-600 transition-all">
              {text}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );

  return (
    <footer className="bg-purple-100 text-gray-800 mt-20 rounded-t-3xl shadow-lg">
      <div className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
        <div>
          <h2 className="text-2xl font-bold text-purple-700 mb-3">Urban Munch</h2>
          <p className="text-sm leading-relaxed">
            Fresh groceries and ready meals delivered with care.<br />
            Bringing flavor to your doorstep.
          </p>
        </div>
        <FooterList title="Explore" links={exploreLinks} />
        <FooterList title="Help" links={helpLinks} />
        <div>
          <h3 className="text-lg font-semibold text-purple-800 mb-3">Follow Us</h3>
          <div className="flex space-x-4">
            {socials.map(({ icon: Icon, href }, i) => (
              <a
                key={i}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-purple-700 hover:scale-125 transition-transform"
              >
                <Icon size={22} />
              </a>
            ))}
          </div>
        </div>
      </div>
      <div className="text-center text-xs text-purple-900 bg-purple-200 py-4 border-t">
        &copy; {new Date().getFullYear()} Urban Munch. Crafted with 💜 by Grace.
      </div>
    </footer>
  );
};

export default Footer;
