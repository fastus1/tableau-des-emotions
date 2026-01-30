export function LoadingScreen() {
  return (
    <div className="fixed inset-0 bg-bg-primary flex flex-col items-center justify-center">
      {/* Subtle gradient background */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at 50% 40%, rgba(59, 130, 246, 0.1) 0%, transparent 60%)',
        }}
        aria-hidden="true"
      />

      {/* Logo text - Montserrat 900 italic with fade-in */}
      <h1
        className="relative font-brand text-4xl sm:text-5xl italic font-black text-text-primary mb-10 tracking-tight"
        style={{
          animation: 'fade-in 0.6s ease-out forwards',
        }}
      >
        Cartes des Émotions
      </h1>

      {/* Animated dots loader */}
      <div className="relative flex items-center gap-2">
        {[0, 1, 2].map((index) => (
          <div
            key={index}
            className="w-2.5 h-2.5 rounded-full bg-brand-primary"
            style={{
              animation: 'pulse-soft 1.2s ease-in-out infinite',
              animationDelay: `${index * 150}ms`,
            }}
          />
        ))}
      </div>
    </div>
  );
}
