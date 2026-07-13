import { useEffect, useRef, useState } from 'react';
import { Globe, Laptop, GitBranch, Eye } from 'lucide-react';

export default function Capabilities() {
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

  const capabilities = [
    {
      icon: Globe,
      title: 'Real-World Usage Testing',
      description: 'Observe how products behave across uncontrolled environments',
      features: [
        'Authentic user environments',
        'Uncontrolled conditions',
        'Real-world scenarios',
        'Genuine device configurations'
      ]
    },
    {
      icon: Laptop,
      title: 'Device & Environment Variance',
      description: 'Identify issues tied to specific conditions',
      features: [
        'Device models',
        'OS versions',
        'Network quality',
        'Regional conditions'
      ]
    },
    {
      icon: GitBranch,
      title: 'Flow Validation',
      description: 'Test onboarding, settings, and critical flows end-to-end',
      features: [
        'Complete user journeys',
        'Critical path testing',
        'Onboarding flows',
        'Settings configuration'
      ]
    },
    {
      icon: Eye,
      title: 'Observation-Based Findings',
      description: 'Findings are based on observed behavior, not inferred intent',
      features: [
        'Direct observation',
        'Behavioral analysis',
        'Evidence-based reporting',
        'Objective findings'
      ]
    }
  ];

  return (
    <section id="capabilities" ref={sectionRef} className="py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">Capabilities</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Anchored in execution
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {capabilities.map((capability, index) => {
            const Icon = capability.icon;
            return (
              <div
                key={capability.title}
                className={`group bg-white p-8 rounded-2xl border border-gray-200 hover:border-orange-300 hover:shadow-xl transition-all duration-500 ${
                  isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                }`}
                style={{ transitionDelay: `${index * 150}ms` }}
              >
                <div className="flex items-start space-x-4 mb-6">
                  <div className="w-14 h-14 bg-orange-100 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:bg-orange-500 transition-all">
                    <Icon className="w-7 h-7 text-orange-600 group-hover:text-white transition-colors" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">{capability.title}</h3>
                    <p className="text-gray-600">{capability.description}</p>
                  </div>
                </div>

                <div className="space-y-3">
                  {capability.features.map((feature) => (
                    <div
                      key={feature}
                      className="flex items-center space-x-3 text-gray-700 group-hover:translate-x-1 transition-transform"
                    >
                      <div className="w-1.5 h-1.5 bg-orange-500 rounded-full"></div>
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
