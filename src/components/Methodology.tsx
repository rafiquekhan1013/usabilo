import { useEffect, useRef, useState } from 'react';
import { Eye, Shield, Database } from 'lucide-react';

export default function Methodology() {
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

  const methodologyItems = [
    {
      icon: Eye,
      title: 'Usabilotion-First Approach',
      description:
        'Usabilo prioritizes direct observation of user interaction over surveys or self-reported feedback.',
      details: [
        'Real-time behavior capture',
        'Objective data collection',
        'Action-based insights',
        'No interpretation bias'
      ]
    },
    {
      icon: Shield,
      title: 'Tester Vetting',
      description: 'Participants are vetted for quality and relevance',
      details: [
        'Device ownership verification',
        'Environment relevance',
        'Task reliability history',
        'Quality standards maintained'
      ]
    },
    {
      icon: Database,
      title: 'Data Handling',
      description:
        'Findings are aggregated and anonymized. Usabilo does not attribute results to individual testers.',
      details: [
        'Aggregated reporting',
        'Anonymized data',
        'Privacy-first approach',
        'Secure storage'
      ]
    }
  ];

  return (
    <section id="methodology" ref={sectionRef} className="py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">Methodology</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Discipline without sounding academic
          </p>
        </div>

        <div className="space-y-8">
          {methodologyItems.map((item, index) => {
            const Icon = item.icon;
            return (
              <div
                key={item.title}
                className={`group bg-white p-8 rounded-2xl border border-gray-200 hover:border-orange-300 hover:shadow-lg transition-all duration-500 ${
                  isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'
                }`}
                style={{ transitionDelay: `${index * 150}ms` }}
              >
                <div className="flex flex-col lg:flex-row gap-6">
                  <div className="flex-shrink-0">
                    <div className="w-16 h-16 bg-orange-100 rounded-xl flex items-center justify-center group-hover:bg-orange-500 transition-all">
                      <Icon className="w-8 h-8 text-orange-600 group-hover:text-white transition-colors" />
                    </div>
                  </div>

                  <div className="flex-1">
                    <h3 className="text-2xl font-bold text-gray-900 mb-3">{item.title}</h3>
                    <p className="text-lg text-gray-600 mb-6">{item.description}</p>

                    <div className="grid sm:grid-cols-2 gap-3">
                      {item.details.map((detail) => (
                        <div
                          key={detail}
                          className="flex items-center space-x-3 text-gray-700 group-hover:translate-x-1 transition-transform"
                        >
                          <div className="w-1.5 h-1.5 bg-orange-500 rounded-full flex-shrink-0"></div>
                          <span>{detail}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
