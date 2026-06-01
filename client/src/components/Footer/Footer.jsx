import { Link } from 'react-router-dom';
import { FiGlobe, FiMail, FiPhone, FiMapPin } from 'react-icons/fi';
import { FaFacebookF, FaTwitter, FaInstagram, FaYoutube, FaPinterestP } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-slate-900 text-slate-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          {/* Brand */}
          <div className="lg:col-span-1">
            <Link to="/" className="flex items-center gap-2 mb-4">
              <div className="w-9 h-9 bg-orange-500 rounded-xl flex items-center justify-center">
                <FiGlobe className="text-white text-xl" />
              </div>
              <span className="text-xl font-bold text-white">
                Roam<span className="text-orange-500">ly</span>
              </span>
            </Link>
            <p className="text-sm leading-relaxed mb-6 text-slate-400">
              Your trusted travel partner for unforgettable adventures around the world. We craft personalized journeys that create lifelong memories.
            </p>
            <div className="flex gap-3">
              {[FaFacebookF, FaTwitter, FaInstagram, FaYoutube, FaPinterestP].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="w-9 h-9 bg-slate-800 hover:bg-orange-500 rounded-lg flex items-center justify-center transition-colors duration-200"
                >
                  <Icon className="text-sm" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-semibold mb-5">Quick Links</h4>
            <ul className="space-y-3">
              {[
                { label: 'Home', path: '/' },
                { label: 'Destinations', path: '/destinations' },
                { label: 'Tour Packages', path: '/destinations' },
                { label: 'About Us', path: '/about' },
                { label: 'Contact', path: '/contact' },
              ].map((link) => (
                <li key={link.label}>
                  <Link
                    to={link.path}
                    className="text-sm text-slate-400 hover:text-orange-400 transition-colors duration-200 flex items-center gap-2"
                  >
                    <span className="w-1.5 h-1.5 bg-orange-500 rounded-full"></span>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Tour Types */}
          <div>
            <h4 className="text-white font-semibold mb-5">Tour Types</h4>
            <ul className="space-y-3">
              {['Adventure Tours', 'Luxury Escapes', 'Family Holidays', 'Honeymoon Packages', 'Beach Getaways', 'Wildlife Safaris'].map((type) => (
                <li key={type}>
                  <Link
                    to="/destinations"
                    className="text-sm text-slate-400 hover:text-orange-400 transition-colors duration-200 flex items-center gap-2"
                  >
                    <span className="w-1.5 h-1.5 bg-orange-500 rounded-full"></span>
                    {type}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-white font-semibold mb-5">Contact Us</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <FiMapPin className="text-orange-500 mt-0.5 shrink-0" />
                <span className="text-sm text-slate-400">42 MG Road, Connaught Place, New Delhi – 110001</span>
              </li>
              <li className="flex items-center gap-3">
                <FiPhone className="text-orange-500 shrink-0" />
                <a href="tel:+919876543210" className="text-sm text-slate-400 hover:text-orange-400 transition-colors">
                  +91 98765 43210
                </a>
              </li>
              <li className="flex items-center gap-3">
                <FiMail className="text-orange-500 shrink-0" />
                <a href="mailto:hello@roamly.com" className="text-sm text-slate-400 hover:text-orange-400 transition-colors">
                  hello@roamly.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-slate-800 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-slate-500">
            © 2024 Roamly. All rights reserved.
          </p>
          <div className="flex gap-6">
            {['Privacy Policy', 'Terms of Service', 'Cookie Policy'].map((item) => (
              <a key={item} href="#" className="text-xs text-slate-500 hover:text-orange-400 transition-colors">
                {item}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
