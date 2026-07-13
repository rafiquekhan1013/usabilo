import { Eye } from 'lucide-react';
import { Link } from "react-router-dom";

export default function Footer() {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const offset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          <div className="md:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <div className="p-2 bg-orange-500 rounded-lg">
                <Eye className="w-5 h-5 text-white" />
              </div>
              <span className="text-2xl font-bold text-white">USABILO</span>
            </div>
            <p className="text-gray-400 mb-4 max-w-md">
              Usabilo provides observational testing services. Findings are informational and
              reflect observed behavior under defined conditions.
            </p>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <button
                  onClick={() => scrollToSection('how-it-works')}
                  className="hover:text-orange-400 transition-colors"
                >
                  How It Works
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection('capabilities')}
                  className="hover:text-orange-400 transition-colors"
                >
                  Capabilities
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection('active-studies')}
                  className="hover:text-orange-400 transition-colors"
                >
                  Active Studies
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection('methodology')}
                  className="hover:text-orange-400 transition-colors"
                >
                  Methodology
                </button>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4">Get Started</h3>
            <ul className="space-y-2">
              <li>
                <button
                  onClick={() => scrollToSection('get-involved')}
                  className="hover:text-orange-400 transition-colors"
                >
                  Get Involved
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection('about')}
                  className="hover:text-orange-400 transition-colors"
                >
                  About
                </button>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-8">
          <div className="flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0">
            <p className="text-sm text-gray-400">
              © 2026 Usabilo. All rights reserved.
            </p>
            <div className="flex space-x-6 text-sm text-gray-400">
              <Link to="/terms" className="hover:text-orange-400 transition-colors">
                Terms of Service
              </Link>
              {/* <button className="hover:text-orange-400 transition-colors">Contact</button> */}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
