import { ArrowRight, Eye } from 'lucide-react';
import { useEffect, useState } from 'react';

export default function Hero() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

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
    <section id="home" className="pt-32 pb-20 bg-gradient-to-b from-white to-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-4xl mx-auto">
          <div
            className={`inline-flex items-center space-x-2 px-4 py-2 bg-orange-50 rounded-full mb-8 transition-all duration-700 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            }`}
          >
            <Eye className="w-4 h-4 text-orange-600" />
            <span className="text-sm font-medium text-orange-600">Modern Crowdtesting Platform</span>
          </div>

          <h1
            className={`text-5xl sm:text-6xl lg:text-7xl font-bold text-gray-900 mb-6 transition-all duration-700 delay-100 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            }`}
          >
            Surface usability issues that don't show up in
            <span className="text-orange-600"> QA</span>
          </h1>

          <p
            className={`text-xl sm:text-2xl text-gray-600 mb-12 leading-relaxed transition-all duration-700 delay-200 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            }`}
          >
            Usabilo runs structured crowdtesting studies across real devices and environments to
            identify usability, flow, and interaction issues missed by internal testing.
          </p>

          <div
            className={`flex flex-col sm:flex-row items-center justify-center gap-4 transition-all duration-700 delay-300 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            }`}
          >
            <button
              onClick={() => scrollToSection('how-it-works')}
              className="group px-8 py-4 bg-orange-600 text-white rounded-lg font-medium hover:bg-orange-700 transition-all flex items-center space-x-2 shadow-lg hover:shadow-xl hover:scale-105"
            >
              <span>View how it works</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
            <button
              onClick={() => scrollToSection('capabilities')}
              className="px-8 py-4 bg-white text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition-all border border-gray-200 hover:border-gray-300 hover:scale-105"
            >
              Explore capabilities
            </button>
          </div>
        </div>

        <div className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
          {[
            { label: 'Real Devices', icon: '📱' },
            { label: 'Live Environments', icon: '🌐' },
            { label: 'Vetted Testers', icon: '✓' },
            { label: 'Active Studies', icon: '📊' }
          ].map((item, index) => (
            <div
              key={item.label}
              className={`text-center transition-all duration-700 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
              }`}
              style={{ transitionDelay: `${400 + index * 100}ms` }}
            >
              <div className="text-4xl mb-2">{item.icon}</div>
              <div className="text-sm font-medium text-gray-700">{item.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
