import { useEffect, useRef, useState } from 'react';
import { Smartphone, Wifi, MousePointer, AlertTriangle } from 'lucide-react';

export default function FocusAreas() {
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

  const focusAreas = [
    {
      icon: Smartphone,
      title: 'Real device usage',
      description: 'Testing across actual devices users own and use daily'
    },
    {
      icon: Wifi,
      title: 'Environment and network variance',
      description: 'Observing behavior across different network conditions and contexts'
    },
    {
      icon: MousePointer,
      title: 'User interaction flows',
      description: 'Analyzing how users navigate through critical pathways'
    },
    {
      icon: AlertTriangle,
      title: 'Edge-case behavior',
      description: 'Identifying unusual scenarios that surface in real-world use'
    }
  ];

  return (
    <section ref={sectionRef} className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">What Usabilo Focuses On</h2>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {focusAreas.map((area, index) => {
            const Icon = area.icon;
            return (
              <div
                key={area.title}
                className={`group bg-white p-8 rounded-xl border border-gray-200 hover:border-orange-300 hover:shadow-lg transition-all duration-500 ${
                  isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                }`}
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mb-4 group-hover:bg-orange-500 group-hover:scale-110 transition-all">
                  <Icon className="w-6 h-6 text-orange-600 group-hover:text-white transition-colors" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{area.title}</h3>
                <p className="text-gray-600">{area.description}</p>
              </div>
            );
          })}
        </div>

        <div
          className={`mt-16 text-center transition-all duration-700 delay-500 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <p className="text-xl text-gray-700 font-medium">
            Usabilo emphasizes observation over speculation.
          </p>
        </div>
      </div>
    </section>
  );
}
