export function LoadingScreen() {
  return (
    <div className="fixed inset-0 bg-bg-primary flex flex-col items-center justify-center">
      {/* Logo text - Montserrat 900 italic */}
      <h1 className="font-brand text-3xl italic font-black text-text-primary mb-8">
        Cartes des Emotions
      </h1>

      {/* Spinner - simple CSS animation */}
      <div className="w-10 h-10 border-4 border-bg-secondary border-t-brand-primary rounded-full animate-spin" />
    </div>
  );
}
