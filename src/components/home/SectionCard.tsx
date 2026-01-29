import { ChevronRight } from 'lucide-react';
import { Section } from '../../data/sections';

interface SectionCardProps {
  section: Section;
  onClick: () => void;
}

export function SectionCard({ section, onClick }: SectionCardProps) {
  return (
    <button
      onClick={onClick}
      className={`w-full p-6 rounded-2xl ${section.color} ${section.textColor} text-left transition-transform hover:scale-[1.02] active:scale-[0.98] min-h-[120px]`}
    >
      <div className="flex justify-between items-start">
        <div>
          <p className="text-sm opacity-80 mb-1">{section.subtitle}</p>
          <h2 className="text-xl font-semibold mb-2">{section.title}</h2>
          <p className="text-sm opacity-90">{section.description}</p>
        </div>
        <ChevronRight size={24} className="flex-shrink-0 opacity-80" />
      </div>
    </button>
  );
}
