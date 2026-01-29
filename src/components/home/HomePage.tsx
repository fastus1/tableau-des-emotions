import { View } from '../../types/navigation';
import { sections } from '../../data/sections';
import { SectionCard } from './SectionCard';

interface HomePageProps {
  onNavigate: (view: View) => void;
}

const LOGO_URL = 'https://res.cloudinary.com/dxhn08di4/image/upload/v1768749285/avancer-simplement/_shared/logos/logo-blanc-320.png';

export function HomePage({ onNavigate }: HomePageProps) {
  return (
    <div className="animate-fade-in">
      {/* Brand header */}
      <header className="text-center mb-10 pt-6">
        {/* Logo + Brand name */}
        <div className="mb-6">
          <img
            src={LOGO_URL}
            alt="Logo Avancer Simplement"
            className="h-14 sm:h-16 w-auto mx-auto mb-3"
          />
          <p className="font-brand text-lg sm:text-xl italic font-black text-text-primary uppercase tracking-wide">
            Avancer Simplement
          </p>
        </div>

        {/* Presenter text */}
        <p className="text-text-secondary text-sm tracking-widest mb-3">
          <span className="italic">présente</span>
        </p>

        {/* App title */}
        <h1 className="font-brand text-3xl sm:text-4xl lg:text-5xl italic font-black text-text-primary mb-4 tracking-tight">
          Le Tableau des Émotions
        </h1>

        {/* Subtitle */}
        <p className="text-text-secondary text-base sm:text-lg max-w-md mx-auto leading-relaxed">
          Explorez et comprenez vos émotions avec les tableaux de régulation émotionnelle
        </p>

        {/* Decorative divider */}
        <div className="flex items-center justify-center gap-3 mt-6">
          <div className="h-px w-12 bg-gradient-to-r from-transparent to-brand-primary/50" />
          <div className="w-1.5 h-1.5 rounded-full bg-brand-primary/60" />
          <div className="h-px w-12 bg-gradient-to-l from-transparent to-brand-primary/50" />
        </div>
      </header>

      {/* Section cards */}
      <div className="flex flex-col gap-5 stagger-children">
        {sections.map((section) => (
          <SectionCard
            key={section.id}
            section={section}
            onClick={() => onNavigate(section.id)}
          />
        ))}
      </div>

      {/* Footer attribution */}
      <footer className="mt-10 pt-6 border-t border-white/5 text-center">
        <p className="text-text-muted text-xs">
          Basé sur les tableaux de régulation émotionnelle de{' '}
          <span className="text-text-secondary">Diane Lapensée</span>
        </p>
      </footer>
    </div>
  );
}
