import { View } from '../../types/navigation';
import { sections } from '../../data/sections';
import { SectionCard } from './SectionCard';

interface HomePageProps {
  onNavigate: (view: View) => void;
}

export function HomePage({ onNavigate }: HomePageProps) {
  return (
    <div>
      {/* Brand header */}
      <header className="text-center mb-8">
        <h1 className="font-brand text-2xl italic font-black text-text-primary mb-2">
          Cartes des Emotions
        </h1>
        <p className="text-text-secondary text-sm">
          Explorez et comprenez vos emotions
        </p>
      </header>

      {/* Section cards */}
      <div className="flex flex-col gap-4">
        {sections.map((section) => (
          <SectionCard
            key={section.id}
            section={section}
            onClick={() => onNavigate(section.id)}
          />
        ))}
      </div>
    </div>
  );
}
