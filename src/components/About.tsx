import { useEffect, useRef, useState } from 'react';
import { Target, Shield, Users } from 'lucide-react';

export default function About() {
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

  const aboutSections = [
    {
      icon: Target,
      title: 'Purpose',
      content:
        'Usabilo exists to complement internal QA and product validation processes by capturing real-world behavior.',
      highlight: 'Usabilo does not replace internal testing.'
    },
    {
      icon: Shield,
      title: 'Independence',
      content:
        'Usabilo operates independently and does not promote products or services.',
      highlight: 'Objective observation only.'
    },
    {
      icon: Users,
      title: 'Use Cases',
      content: 'Usabilo supports Product teams, QA teams, and UX teams.',
      highlight: 'Built for teams that ship.'
    }
  ];

  return (
    <section id="about" ref={sectionRef} className="py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">About</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Grounded as a serious operation
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {aboutSections.map((section, index) => {
            const Icon = section.icon;
            return (
              <div
                key={section.title}
                className={`bg-white p-8 rounded-2xl border border-gray-200 hover:border-orange-300 hover:shadow-lg transition-all duration-500 ${
                  isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                }`}
                style={{ transitionDelay: `${index * 150}ms` }}
              >
                <div className="w-14 h-14 bg-orange-100 rounded-xl flex items-center justify-center mb-6">
                  <Icon className="w-7 h-7 text-orange-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">{section.title}</h3>
                <p className="text-gray-600 mb-4">{section.content}</p>
                <div className="pt-4 border-t border-gray-100">
                  <p className="text-sm font-medium text-orange-600">{section.highlight}</p>
                </div>
              </div>
            );
          })}
        </div>

        <div
          className={`max-w-4xl mx-auto transition-all duration-700 delay-500 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <div className="bg-white p-8 sm:p-12 rounded-2xl border border-gray-200">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">Who Usabilo Supports</h3>

            <div className="space-y-6">
              <div className="flex items-start space-x-4">
                <div className="w-8 h-8 bg-orange-100 rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                  <span className="text-orange-600 font-bold">P</span>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">Product Teams</h4>
                  <p className="text-gray-600">
                    Validate product decisions with real-world usage data before major releases
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="w-8 h-8 bg-orange-100 rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                  <span className="text-orange-600 font-bold">Q</span>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">QA Teams</h4>
                  <p className="text-gray-600">
                    Extend testing coverage beyond controlled environments to catch edge cases
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="w-8 h-8 bg-orange-100 rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                  <span className="text-orange-600 font-bold">U</span>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">UX Teams</h4>
                  <p className="text-gray-600">
                    Understand how users actually interact with interfaces in their natural contexts
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-8 pt-8 border-t border-gray-200 text-center">
              <p className="text-gray-700 font-medium">
                Usabilo does not replace internal testing.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
