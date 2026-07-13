import { useEffect, useRef, useState } from 'react';
import { FileText, PlayCircle, BarChart3 } from 'lucide-react';

export default function HowItWorks() {
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

  const steps = [
    {
      number: '01',
      icon: FileText,
      title: 'Define the Study',
      description: 'Each study begins with a defined scope',
      details: [
        'Target flows or interactions',
        'Devices and environments',
        'Geographic or contextual constraints'
      ]
    },
    {
      number: '02',
      icon: PlayCircle,
      title: 'Execute Crowdtesting',
      description: 'Vetted testers execute tasks on real devices in real conditions',
      details: [
        'Device types',
        'Operating systems',
        'Network conditions',
        'User contexts'
      ]
    },
    {
      number: '03',
      icon: BarChart3,
      title: 'Review Usabilotions',
      description: 'Findings are aggregated and reviewed, highlighting:',
      details: [
        'Usability friction',
        'Flow breakdowns',
        'Unexpected behaviors'
      ]
    }
  ];

  return (
    <section id="how-it-works" ref={sectionRef} className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">How It Works</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Structure without overengineering
          </p>
        </div>

        <div className="space-y-12">
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <div
                key={step.number}
                className={`relative transition-all duration-700 ${
                  isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'
                }`}
                style={{ transitionDelay: `${index * 200}ms` }}
              >
                <div className="flex flex-col lg:flex-row gap-8 items-start">
                  <div className="flex-shrink-0">
                    <div className="relative">
                      <div className="w-20 h-20 bg-orange-500 rounded-2xl flex items-center justify-center shadow-lg">
                        <Icon className="w-10 h-10 text-white" />
                      </div>
                      <div className="absolute -top-2 -right-2 w-10 h-10 bg-white rounded-full flex items-center justify-center border-2 border-orange-500 font-bold text-orange-600">
                        {step.number}
                      </div>
                    </div>
                  </div>

                  <div className="flex-1">
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">
                      Step {index + 1}: {step.title}
                    </h3>
                    <p className="text-lg text-gray-600 mb-4">{step.description}</p>
                    <div className="bg-gray-50 p-6 rounded-xl border border-gray-200">
                      <p className="text-sm font-medium text-gray-700 mb-3">
                        {step.number === '01' && 'Testing occurs across:'}
                        {step.number === '02' && 'Testing occurs across:'}
                        {step.number === '03' && 'Key focus areas:'}
                      </p>
                      <ul className="space-y-2">
                        {step.details.map((detail) => (
                          <li key={detail} className="flex items-center text-gray-700">
                            <div className="w-1.5 h-1.5 bg-orange-500 rounded-full mr-3"></div>
                            {detail}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>

                {index < steps.length - 1 && (
                  <div className="hidden lg:block absolute left-10 top-24 w-0.5 h-12 bg-gray-200"></div>
                )}
              </div>
            );
          })}
        </div>

        <div
          className={`mt-16 text-center transition-all duration-700 delay-700 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <div className="inline-block bg-orange-50 px-6 py-3 rounded-lg">
            <p className="text-gray-700">
              Usabilo focuses on <span className="font-semibold text-orange-600">what occurred</span>, not why it occurred
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
