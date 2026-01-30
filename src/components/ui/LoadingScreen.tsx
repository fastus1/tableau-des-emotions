export function LoadingScreen() {
  return (
    <div className="fixed inset-0 bg-bg-primary flex flex-col items-center justify-center px-6 text-center">
      {/* Subtle gradient background */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at 50% 40%, rgba(59, 130, 246, 0.1) 0%, transparent 60%)',
        }}
        aria-hidden="true"
      />

      {/* Logo Avancer Simplement */}
      <div
        className="relative flex flex-col items-center mb-10"
        style={{
          animation: 'fade-in 0.6s ease-out forwards',
        }}
      >
        <img
          src="https://res.cloudinary.com/dxhn08di4/image/upload/v1768749285/avancer-simplement/_shared/logos/logo-blanc-320.png"
          alt=""
          className="w-20 sm:w-24 mb-4"
        />
        <span className="font-brand text-2xl sm:text-3xl italic font-black text-white tracking-wide">
          AVANCER SIMPLEMENT
        </span>
      </div>

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
