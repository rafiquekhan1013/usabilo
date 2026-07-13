import { useEffect, useRef, useState } from 'react';

export default function IntroSection() {
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
    <section ref={sectionRef} className="py-20 bg-white">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div
          className={`transition-all duration-700 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <div className="prose prose-lg max-w-none">
            <p className="text-xl text-gray-700 leading-relaxed mb-6">
              Internal QA and controlled testing environments are necessary, but incomplete.
            </p>
            <p className="text-xl text-gray-700 leading-relaxed mb-6">
              Usabilo complements existing testing processes by observing real-world usage across
              varied devices, networks, and user contexts.
            </p>
            <p className="text-xl text-gray-900 font-medium leading-relaxed">
              We focus on how products behave in practice, not just how they behave in ideal
              conditions.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
