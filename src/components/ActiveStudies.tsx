import { useEffect, useRef, useState } from 'react';
import { Clock, CheckCircle, Activity } from 'lucide-react';

export default function ActiveStudies() {
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

  const studies = [
    {
      id: 'OB-041',
      focus: 'Account setup flow',
      devices: 'Mobile (iOS / Android)',
      status: 'Running',
      icon: Activity,
      statusColor: 'text-green-600',
      bgColor: 'bg-green-50',
      borderColor: 'border-green-200'
    },
    {
      id: 'OB-042',
      focus: 'Transaction confirmation visibility',
      devices: 'Web and mobile',
      status: 'Reviewing',
      icon: Clock,
      statusColor: 'text-orange-600',
      bgColor: 'bg-orange-50',
      borderColor: 'border-orange-200'
    },
    {
      id: 'OB-043',
      focus: 'Navigation usability across device sizes',
      devices: 'Responsive web',
      status: 'Running',
      icon: Activity,
      statusColor: 'text-green-600',
      bgColor: 'bg-green-50',
      borderColor: 'border-green-200'
    },
    {
      id: 'OB-044',
      focus: 'Payment flow edge cases',
      devices: 'Mobile (iOS / Android)',
      status: 'Completed',
      icon: CheckCircle,
      statusColor: 'text-gray-600',
      bgColor: 'bg-gray-50',
      borderColor: 'border-gray-200'
    }
  ];

  return (
    <section id="active-studies" ref={sectionRef} className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="inline-flex items-center space-x-2 px-4 py-2 bg-green-50 rounded-full mb-4">
            <Activity className="w-4 h-4 text-green-600 animate-pulse" />
            <span className="text-sm font-medium text-green-600">Operational and Current</span>
          </div>
          <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">Active Studies</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Active studies are structured and time-bound
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {studies.map((study, index) => {
            const Icon = study.icon;
            return (
              <div
                key={study.id}
                className={`group bg-white p-6 rounded-xl border-2 ${study.borderColor} hover:shadow-lg transition-all duration-500 ${
                  isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                }`}
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <div className="inline-block px-3 py-1 bg-gray-100 rounded-lg mb-2">
                      <span className="text-sm font-mono font-semibold text-gray-700">
                        Study ID: {study.id}
                      </span>
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">{study.focus}</h3>
                  </div>
                  <div className={`${study.bgColor} p-2 rounded-lg`}>
                    <Icon className={`w-5 h-5 ${study.statusColor}`} />
                  </div>
                </div>

                <div className="space-y-2 mb-4">
                  <div className="flex items-center text-gray-600">
                    <span className="font-medium mr-2">Devices:</span>
                    <span>{study.devices}</span>
                  </div>
                  <div className="flex items-center">
                    <span className="font-medium mr-2 text-gray-600">Status:</span>
                    <span className={`${study.statusColor} font-medium`}>{study.status}</span>
                  </div>
                </div>

                <div className="pt-4 border-t border-gray-100">
                  <div className="flex items-center justify-between text-sm text-gray-500">
                    <span>Real-world conditions</span>
                    <span className="font-medium">Vetted testers</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div
          className={`mt-12 text-center transition-all duration-700 delay-500 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <p className="text-gray-600">
            Studies may vary in scope and duration
          </p>
        </div>
      </div>
    </section>
  );
}
