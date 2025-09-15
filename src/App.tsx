import React, { useState } from 'react';
// import { Header } from './components/Header';
import { LoginForm } from './components/auth/LoginForm';
import { SignupFlow } from './components/auth/SignupFlow';
import Dashboard from './components/dashboard/Dashboard';
import { Leaderboards } from './components/leaderboards/Leaderboards';
import { PostureAnalysis } from './components/PostureAnalysics/PostureAnalysics';
import { Challenges } from './components/challenges/Challenges';
import { GymsDirectory } from './components/gyms/GymsDirectory';
import ChatBot from './components/chatbot/ChatBot';
import { UserProvider } from './context/UserContext';
import './App.css';
import { Flame } from 'lucide-react';
import { useEffect } from 'react';
import { GymDashboard } from './components/dashboard/GymDashboard';
// import {PostureAnalysis} from './components/dashboard/PostureAnalysis';

type View = 'home' | 'login' | 'signup' | 'dashboard' | 'gymDashboard' | 'leaderboards' | 'challenges' | 'gyms' | 'chatbot' | 'posture';

function App() {
  const [showWelcome, setShowWelcome] = useState(false);
  const [currentView, setCurrentView] = useState<View>('home');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [fadeIn, setFadeIn] = useState(false);
  const [userRole, setUserRole] = useState<string | null>(null);

  useEffect(() => {
    // Trigger fade-in animation on view change
    setFadeIn(false);
    const timer = setTimeout(() => setFadeIn(true), 100);
    return () => clearTimeout(timer);
  }, [currentView]);

  const handleLogin = (role?: string) => {
    setIsLoggedIn(true);
    setShowWelcome(true);
    setTimeout(() => setShowWelcome(false), 3500);
    if (role === 'gym') {
      setCurrentView('gymDashboard');
    } else {
      setCurrentView('home');
    }
    setUserRole(role || null);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setCurrentView('home');
    setShowWelcome(false);
  };

  const renderContent = () => {
    switch (currentView) {
      case 'login':
        return <LoginForm onLogin={handleLogin} onSwitchToSignup={() => setCurrentView('signup')} />;
      case 'signup':
        return <SignupFlow onComplete={(role) => handleLogin(role)} onSwitchToLogin={() => setCurrentView('login')} />;
      case 'dashboard':
        return isLoggedIn ? <Dashboard /> : <LoginForm onLogin={handleLogin} onSwitchToSignup={() => setCurrentView('signup')} />;
      case 'gymDashboard':
        return isLoggedIn ? <GymDashboard /> : <LoginForm onLogin={handleLogin} onSwitchToSignup={() => setCurrentView('signup')} />;
      case 'leaderboards':
        return <Leaderboards />;
      case 'challenges':
        return <Challenges />;
      case 'gyms':
        return <GymsDirectory />;
      case 'chatbot':
        return <ChatBot />;
      case 'posture':
        return <PostureAnalysis />;
        // return isLoggedIn ? <PostureAnalysis /> : <LoginForm onLogin={handleLogin} onSwitchToSignup={() => setCurrentView('signup')} />;
      case 'home':    
      default:
        return <HomeView onGetStarted={() => setCurrentView('signup')} onLogin={() => setCurrentView('login')} showWelcome={showWelcome} />;
    }
  };

  return (
    <UserProvider>
      <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-cyan-100 to-teal-50 flex flex-col">
        <Header
          currentView={currentView}
          onViewChange={setCurrentView}
          isLoggedIn={isLoggedIn}
          onLogout={handleLogout}
        />
        <main className={`pt-16 px-4 sm:px-8 md:px-12 lg:px-24 max-w-7xl mx-auto flex-grow 
                          transition-opacity duration-700 ease-in-out ${fadeIn ? 'opacity-100' : 'opacity-0'}`}>
          {renderContent()}
        </main>
      </div>
    </UserProvider>
  );
}

function Header({
  currentView,
  onViewChange,
  isLoggedIn,
  onLogout,
}: {
  currentView: View;
  onViewChange: (v: View) => void;
  isLoggedIn: boolean;
  onLogout: () => void;
}) {
  return (
    <header className="fixed top-0 left-0 right-0 bg-gradient-to-r from-blue-700 via-green-400 to-orange-400 shadow-lg z-40 transition-all duration-300 ">
      <nav className="max-w-7xl mx-auto flex justify-between items-center px-6 py-4 ">
        <div
          className="text-3xl text-3xl font-bold text-blue-600 animate-bounce font-extrabold bg-gradient-to-r from-blue-600 via-green-400 to-orange-500 bg-clip-text text-transparent cursor-pointer select-none transition-transform duration-300 hover:scale-105"
          onClick={() => onViewChange('home')}
        >
          NeuroFitEdu
        </div>
              <ul className="hidden md:flex space-x-8 text-gray-700 font-medium bg-navy">
                {['home', 'dashboard', 'leaderboards', 'challenges', 'gyms', 'chatbot'].map((view) => {
                  if (view === 'dashboard' && !isLoggedIn) return null;
                  const isActive = currentView === view;
                  return (
                    <li
                      key={view}
                      onClick={() => onViewChange(view as View)}
                      className={`cursor-pointer relative pb-1 transition-colors duration-300 hover:text-blue-600 ${
                        isActive ? 'text-blue-600 font-semibold' : ''
                      }`}
                    >
                      {view.charAt(0).toUpperCase() + view.slice(1)}
                      {isActive && (
                        <span className="absolute inset-x-0 -bottom-0.5 h-1 rounded-full bg-gradient-to-r from-blue-500 via-green-400 to-orange-400" />
                      )}
                    </li>
                  );
                })}
                {/* Show Posture Analysis link only if logged in */}
                {isLoggedIn && (
                  <li
                    key="posture"
                    onClick={() => onViewChange('posture')}
                    className={`cursor-pointer relative pb-1 transition-colors duration-300 hover:text-blue-600 ${
                      currentView === 'posture' ? 'text-blue-600 font-semibold' : ''
                    }`}
                  >
                    Posture Analysis
                    {currentView === 'posture' && (
                      <span className="absolute inset-x-0 -bottom-0.5 h-1 rounded-full bg-gradient-to-r from-blue-500 via-green-400 to-orange-400" />
                    )}
                  </li>
                )}
        </ul>
        <div className="space-x-4">
          {!isLoggedIn ? (
            <>
              <button
                onClick={() => onViewChange('login')}
                className="rounded-lg px-5 py-2 font-semibold text-blue-600 border-2 border-blue-600 hover:bg-blue-600 hover:text-white transition duration-300 shadow-md"
              >
                Sign In
              </button>
              <button
                onClick={() => onViewChange('signup')}
                className="rounded-lg px-5 py-2 font-semibold bg-gradient-to-r from-green-400 to-blue-600 text-white hover:from-green-500 hover:to-blue-700 transition shadow-lg"
              >
                Get Started
              </button>
            </>
          ) : (
            <button
              onClick={onLogout}
              className="rounded-lg px-5 py-2 font-semibold bg-red-500 hover:bg-red-600 text-white transition shadow-lg"
            >
              Log Out
            </button>
          )}
        </div>
      </nav>
    </header>
  );
}

function HomeView({ onGetStarted, onLogin, showWelcome = false }: { onGetStarted: () => void; onLogin: () => void; showWelcome?: boolean }) {
  // Rotating hero background images
  const heroImages = [
    'https://imgs.search.brave.com/0wtjrzadVyeCiE3BCbog4YcunOkMY8UqWcnVLn3WpZc/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9tZWRp/YS5nZXR0eWltYWdl/cy5jb20vaWQvNjI1/NzM5ODc0L3Bob3Rv/L2hlYXZ5LXdlaWdo/dC1leGVyY2lzZS5q/cGc_cz02MTJ4NjEy/Jnc9MCZrPTIwJmM9/QjF1ekpXMURCZWky/Ung1aG50MTM5dHQ5/ZHQzTDdUYktycGd3/Yk1SLUxyST0',
    'https://imgs.search.brave.com/8meYkBrOCoatEqfT_iFUqcGZa89iOqoEbIfYJyWSfao/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9pbWFn/ZXM1LmFscGhhY29k/ZXJzLmNvbS8zMjQv/dGh1bWJiaWctMzI0/OTg3LndlYnA',
    'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?auto=format&fit=crop&w=1950&q=80',
    'https://images.unsplash.com/photo-1518611012118-696072aa579a?auto=format&fit=crop&w=1950&q=80',
    'https://imgs.search.brave.com/0zhHa1LpX3IuvoCjkEmxeJ5XaMaNVc1xX2OOr4SL4Qs/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly93d3cu/YXZpa2FscC5jb20v/Y2RuL3Nob3AvcHJv/ZHVjdHMvTVdaMzYx/Ml93YWxscGFwZXIx/XzUzM3guanBnP3Y9/MTY1MzIyOTE2MA',
    'https://imgs.search.brave.com/aGPI68YOIOjrA_1MusFyyap0ANGCQe38CaTmvvl1Hb8/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly93YWxs/cGFwZXJjYXZlLmNv/bS93cC93cDMxNTcx/NzcuanBn',
  ];
  const [heroIndex, setHeroIndex] = React.useState(0);
  React.useEffect(() => {
    const interval = setInterval(() => {
      setHeroIndex((prev) => (prev + 1) % heroImages.length);
    }, 6000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative overflow-hidden">
      {/* Hero Section */}
      <div
        className="relative overflow-hidden bg-gradient-to-r from-blue-50 via-green-50 to-orange-50 mt-20 shadow-2xl rounded-3xl mx-auto max-w-6xl animate-fade-in"
        style={{
          backgroundImage: `url('${heroImages[heroIndex]}')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          transition: 'background-image 1s ease-in-out',
        }}
      >
        {/* Background overlay for better text contrast */}
        <div className="text-white absolute inset-0 bg-gradient-to-r from-navy-900/70 via-green-600/40 to-orange-400/40 mix-blend-multiply pointer-events-none"></div>
        <section className="relative px-4 py-24 mx-auto max-w-7xl sm:px-6 lg:px-8 text-center z-10">
          {showWelcome && (
            <div className="mb-6">
              <div className="inline-block bg-white/80 text-blue-700 font-bold text-2xl px-8 py-4 rounded-2xl shadow-lg animate-fade-in">
                Welcome to NeuroFitEdu.
              </div>
            </div>
          )}
          {/* Animated gradient overlay */}
          <div className="absolute inset-0 pointer-events-none animate-gradient-move bg-gradient-to-r from-blue-400/30 via-green-300/20 to-orange-300/30 blur-2xl opacity-80" />
          <h1 className="text-5xl md:text-6xl font-extrabold mb-6 text-navy-900 drop-shadow-lg animate-float relative z-10">
            <span className="text-blue-700 hover:text-blue-900 transition-colors duration-300 cursor-default">Neuro</span>
            <span className="text-green-700 hover:text-green-900 transition-colors duration-300 cursor-default">Fit</span>
            <span className="text-orange-600 hover:text-orange-700 transition-colors duration-300 cursor-default">Edu</span>
          </h1>
          <p className="text-xl md:text-2xl text-white mb-8 max-w-3xl mx-auto leading-relaxed transition-colors duration-500 drop-shadow-md">
            The revolutionary platform combining{' '}
            <span className="font-semibold text-blue-700">Live Yoga Training with AI</span>,{' '}
            <span className="font-semibold text-green-700">Personalized Workout Planning</span>, and{' '}
            <span className="font-semibold text-orange-600">Real-Time Progress Monitoring</span>{' '}
            to empower students, trainers, and gyms. Register your gym as a digital gym to boost motivation and growth.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <button
              onClick={onGetStarted}
              className="px-8 py-4 bg-gradient-to-r from-blue-700 to-blue-900 text-white font-semibold rounded-xl shadow-lg transform transition-transform duration-300 hover:scale-105 hover:shadow-xl hover:from-blue-900 hover:to-navy-900"
              aria-label="Get Started Free"
            >
              Get Started Free
            </button>
            <button
              onClick={onLogin}
              className="px-8 py-4 bg-gradient-to-r from-blue-700 to-blue-900 text-white font-semibold rounded-xl shadow-lg transform transition-transform duration-300 hover:scale-105 hover:shadow-xl hover:from-blue-900 hover:to-navy-900"
              aria-label="Sign In"
            >
              Sign In
            </button>
          </div>
        </section>
      </div>
      {/* Features Grid */}
      <section className="px-4 py-16 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Why NeuroFitEdu is Different
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            The only platform that combines cognitive and physical wellness with AI-powered personalization
          </p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          <FeatureCard
            title="AI-Powered Guidance"
            description="24/7 personalized chatbot for fitness, nutrition, and academic support"
            icon={<Flame className="w-8 h-8 text-red-500" />}
            highlight="Only platform with AI integration"
          />
          <FeatureCard
            title="Posture Correction"
            description="Real-time workout form analysis using computer vision"
            icon="🧍"
            highlight="Live feedback technology"
          />
          <FeatureCard
            title="Academic + Fitness"
            description="Unique leaderboards combining academic achievements with fitness goals"
            icon="🏆"
            highlight="Cognitive-physical synergy"
          />
          <FeatureCard
            title="Multi-Role Ecosystem"
            description="Students, trainers, and gyms all connected in one platform"
            icon="🏢"
            highlight="Complete wellness community"
          />
          <FeatureCard
            title="Smart Programs"
            description="Adaptive routines based on academic schedules and health profiles"
            icon="📋"
            highlight="Personalized for students"
          />
          <FeatureCard
            title="Live Classes"
            description="Virtual training sessions with real-time AI assistance"
            icon="🎥"
            highlight="Coming soon"
          />
        </div>
      </section>
      {/* Stats Section */}
      <section className="bg-white py-16">
        <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-3xl font-bold text-blue-600 mb-2">10K+</div>
              <div className="text-gray-600">Active Students</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-green-600 mb-2">500+</div>
              <div className="text-gray-600">Certified Trainers</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-orange-500 mb-2">200+</div>
              <div className="text-gray-600">Partner Gyms</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-purple-600 mb-2">95%</div>
              <div className="text-gray-600">User Satisfaction</div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

function FeatureCard({
  title,
  description,
  icon,
  highlight,
}: {
  title: string;
  description: string;
  icon: React.ReactNode;  // Updated to accept JSX
  highlight: string;
}) {
  return (
    <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 border border-gray-100">
      <div className="text-4xl mb-4">{icon}</div>
      <h3 className="text-xl font-bold text-gray-900 mb-3">{title}</h3>
      <p className="text-gray-600 mb-4">{description}</p>
      <div className="inline-block px-3 py-1 bg-gradient-to-r from-blue-100 to-green-100 text-blue-800 text-sm font-semibold rounded-full">
        {highlight}
      </div>
    </div>
  );
}

export default App;
