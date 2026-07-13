import { useEffect, useRef, useState } from 'react';
import { Users, Smartphone, MapPin, ArrowRight } from 'lucide-react';

export default function GetInvolved() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section id="get-involved" ref={sectionRef} className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">Get Involved</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Participation without hype
          </p>
        </div>

        <div
          className={`max-w-4xl mx-auto transition-all duration-700 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <div className="bg-gradient-to-br from-orange-50 to-orange-100 p-8 sm:p-12 rounded-2xl border border-orange-200">
            <div className="flex items-center space-x-3 mb-6">
              <Users className="w-8 h-8 text-orange-600" />
              <h3 className="text-2xl font-bold text-gray-900">Participate in Studies</h3>
            </div>

            <p className="text-lg text-gray-700 mb-8">
              Usabilo works with a distributed pool of participants to execute real-world testing
              tasks.
            </p>

            <div className="grid sm:grid-cols-3 gap-6 mb-8">
              <div className="bg-white p-6 rounded-xl border border-orange-200">
                <Smartphone className="w-6 h-6 text-orange-600 mb-3" />
                <h4 className="font-semibold text-gray-900 mb-2">Device Variety</h4>
                <p className="text-sm text-gray-600">
                  Studies require different device types and configurations
                </p>
              </div>

              <div className="bg-white p-6 rounded-xl border border-orange-200">
                <MapPin className="w-6 h-6 text-orange-600 mb-3" />
                <h4 className="font-semibold text-gray-900 mb-2">Location Specific</h4>
                <p className="text-sm text-gray-600">
                  Some studies target specific geographic regions
                </p>
              </div>

              <div className="bg-white p-6 rounded-xl border border-orange-200">
                <Users className="w-6 h-6 text-orange-600 mb-3" />
                <h4 className="font-semibold text-gray-900 mb-2">Vetted Pool</h4>
                <p className="text-sm text-gray-600">
                  All participants are reviewed for quality and reliability
                </p>
              </div>
            </div>

            <button className="group w-full sm:w-auto px-8 py-4 bg-orange-600 text-white rounded-lg font-medium hover:bg-orange-700 transition-all flex items-center justify-center space-x-2 shadow-lg hover:shadow-xl hover:scale-105">
              <span>Learn about participation</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>

          <div
            className={`mt-8 space-y-4 transition-all duration-700 delay-300 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            <div className="bg-gray-50 p-6 rounded-xl border border-gray-200">
              <h4 className="font-semibold text-gray-900 mb-2">Study Access</h4>
              <p className="text-gray-600">
                Some studies may require specific devices, locations, or configurations.
              </p>
            </div>

            <div className="bg-gray-50 p-6 rounded-xl border border-gray-200">
              <h4 className="font-semibold text-gray-900 mb-2">Independence</h4>
              <p className="text-gray-600">
                Participation does not imply endorsement or affiliation.
              </p>
            </div>

            <div className="bg-gray-50 p-6 rounded-xl border border-gray-200">
              <h4 className="font-semibold text-gray-900 mb-2">Availability</h4>
              <p className="text-gray-600">
                Participation availability varies by study and device type.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
