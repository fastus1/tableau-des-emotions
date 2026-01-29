import { useState, useEffect } from 'react';
import { View } from './types/navigation';
import { Layout } from './components/layout/Layout';
import { BackButton } from './components/layout/BackButton';
import { LoadingScreen } from './components/ui/LoadingScreen';
import { HomePage } from './components/home/HomePage';
import { UnpleasantEmotionsPage } from './components/emotions/UnpleasantEmotionsPage';
import { PleasantSentimentsPage } from './components/emotions/PleasantSentimentsPage';

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [currentView, setCurrentView] = useState<View>('home');

  // Loading screen timer (TECH-04)
  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1500);
    return () => clearTimeout(timer);
  }, []);

  const navigate = (view: View) => setCurrentView(view);
  const goHome = () => setCurrentView('home');

  // Show loading screen
  if (isLoading) {
    return <LoadingScreen />;
  }

  return (
    <Layout>
      {/* Back button - only shown when not on home (NAV-02) */}
      {currentView !== 'home' && <BackButton onClick={goHome} />}

      {/* View routing */}
      {currentView === 'home' && <HomePage onNavigate={navigate} />}
      {currentView === 'unpleasant' && <UnpleasantEmotionsPage />}
      {currentView === 'pleasant' && <PleasantSentimentsPage />}
      {currentView === 'steps' && (
        <div className="text-center py-12">
          <h2 className="text-xl font-semibold mb-2">Les 5 etapes</h2>
          <p className="text-text-secondary">Regulation emotionnelle - A venir dans Phase 4</p>
        </div>
      )}
    </Layout>
  );
}

export default App;
