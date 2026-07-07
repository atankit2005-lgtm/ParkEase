import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import SectionTitle from '../ui/SectionTitle';
import { faqs } from '../../data/dummyData';

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <section className="py-20 md:py-28 bg-bgsoft">
      <div className="max-w-3xl mx-auto px-6 lg:px-8">
        <SectionTitle eyebrow="FAQ" title="Common questions" />
        <div className="space-y-3">
          {faqs.map((item, i) => {
            const isOpen = openIndex === i;
            return (
              <div
                key={item.q}
                className="bg-white rounded-2xl border border-border/60 overflow-hidden"
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? -1 : i)}
                  className="w-full flex items-center justify-between px-5 py-4 text-left"
                >
                  <span className="text-sm font-semibold text-darktext">{item.q}</span>
                  <ChevronDown
                    size={18}
                    className={`text-lighttext shrink-0 transition-transform duration-300 ${
                      isOpen ? 'rotate-180 text-primary' : ''
                    }`}
                  />
                </button>
                {isOpen && (
                  <div className="px-5 pb-4 text-sm text-lighttext leading-relaxed animate-fade-up">
                    {item.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
