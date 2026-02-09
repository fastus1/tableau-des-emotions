import { useState, useEffect } from 'react';
import { View } from './types/navigation';
import { Layout } from './components/layout/Layout';
import { BackButton } from './components/layout/BackButton';
import { LoadingScreen } from './components/ui/LoadingScreen';
import { PasswordGate } from './components/ui/PasswordGate';
import { HomePage } from './components/home/HomePage';
import { UnpleasantEmotionsPage } from './components/emotions/UnpleasantEmotionsPage';
import { PleasantSentimentsPage } from './components/emotions/PleasantSentimentsPage';
import { StepsPage } from './components/steps/StepsPage';
import { AnchorPhrasesPage } from './components/anchors/AnchorPhrasesPage';

function App() {
  const isStaging = import.meta.env.VITE_APP_ENV === 'staging';
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
    return (
      <PasswordGate>
        <LoadingScreen />
      </PasswordGate>
    );
  }

  return (
    <PasswordGate>
      <Layout>
        {/* Back button - only shown when not on home (NAV-02) */}
        {currentView !== 'home' && <BackButton onClick={goHome} />}

        {/* View routing */}
        {currentView === 'home' && <HomePage onNavigate={navigate} />}
        {currentView === 'unpleasant' && <UnpleasantEmotionsPage />}
        {currentView === 'pleasant' && <PleasantSentimentsPage />}
        {currentView === 'steps' && <StepsPage />}
        {currentView === 'anchors' && <AnchorPhrasesPage />}
      </Layout>
      {isStaging && (
        <div className="fixed bottom-2 left-2 bg-orange-500 text-white text-xs font-bold px-2 py-1 rounded z-50">
          STAGING
        </div>
      )}
    </PasswordGate>
  );
}

export default App;
