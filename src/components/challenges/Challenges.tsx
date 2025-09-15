import React, { useState } from 'react';
import { 
  Target, 
  Calendar, 
  Users, 
  Trophy, 
  Clock, 
  Star,
  CheckCircle,
  Play,
  Award,
  TrendingUp,
  Zap,
  BookOpen,
  Dumbbell
} from 'lucide-react';

type ChallengeCategory = 'all' | 'fitness' | 'academic' | 'wellness' | 'social';
type ChallengeStatus = 'active' | 'upcoming' | 'completed';

interface Challenge {
  id: string;
  title: string;
  description: string;
  category: ChallengeCategory;
  status: ChallengeStatus;
  duration: string;
  participants: number;
  maxParticipants?: number;
  reward: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  progress?: number;
  startDate: string;
  endDate: string;
  requirements: string[];
  currentStreak?: number;
  bestStreak?: number;
}

export function Challenges() {
  const [activeCategory, setActiveCategory] = useState<ChallengeCategory>('all');
  const [showJoined, setShowJoined] = useState(false);

  const challenges: Challenge[] = [
    {
      id: '1',
      title: '30-Day Fitness Revolution',
      description: 'Complete daily workouts for 30 consecutive days and transform your fitness habits',
      category: 'fitness',
      status: 'active',
      duration: '30 days',
      participants: 1247,
      maxParticipants: 2000,
      reward: '1000 points + Fitness Champion badge',
      difficulty: 'Intermediate',
      progress: 67,
      startDate: 'Jan 1',
      endDate: 'Jan 30',
      requirements: ['Complete minimum 20min workout daily', 'Log workout in app', 'Maintain form quality >85%'],
      currentStreak: 20,
      bestStreak: 20
    },
    {
      id: '2',
      title: 'Academic Excellence Sprint',
      description: 'Boost your study efficiency and academic performance in just 14 days',
      category: 'academic',
      status: 'active',
      duration: '14 days',
      participants: 892,
      maxParticipants: 1500,
      reward: '750 points + Scholar badge',
      difficulty: 'Beginner',
      progress: 85,
      startDate: 'Jan 8',
      endDate: 'Jan 21',
      requirements: ['Study minimum 2 hours daily', 'Complete daily quiz', 'Maintain >90% attendance'],
      currentStreak: 12,
      bestStreak: 12
    },
    {
      id: '3',
      title: 'Mindfulness Master',
      description: 'Develop a consistent meditation practice and improve mental wellness',
      category: 'wellness',
      status: 'upcoming',
      duration: '21 days',
      participants: 234,
      maxParticipants: 1000,
      reward: '600 points + Zen Master badge',
      difficulty: 'Beginner',
      startDate: 'Feb 1',
      endDate: 'Feb 21',
      requirements: ['Meditate 10 minutes daily', 'Complete wellness check-in', 'Practice breathing exercises']
    },
    {
      id: '4',
      title: 'Social Fitness League',
      description: 'Team up with friends and compete in group fitness challenges',
      category: 'social',
      status: 'upcoming',
      duration: '4 weeks',
      participants: 156,
      maxParticipants: 500,
      reward: '1500 points + Team Champion badge',
      difficulty: 'Advanced',
      startDate: 'Feb 5',
      endDate: 'Mar 4',
      requirements: ['Form team of 3-5 members', 'Complete group workouts', 'Achieve team goals']
    },
    {
      id: '5',
      title: 'Study Streak Champion',
      description: 'Maintain the longest study streak and climb the academic leaderboard',
      category: 'academic',
      status: 'completed',
      duration: 'Ongoing',
      participants: 2341,
      reward: '500 points + Consistency King badge',
      difficulty: 'Intermediate',
      progress: 100,
      startDate: 'Dec 1',
      endDate: 'Dec 31',
      requirements: ['Study every day', 'Minimum 1 hour sessions', 'Track progress'],
      currentStreak: 45,
      bestStreak: 45
    }
  ];

  const filteredChallenges = challenges.filter(challenge => {
    const categoryMatch = activeCategory === 'all' || challenge.category === activeCategory;
    const statusMatch = showJoined ? challenge.progress !== undefined : true;
    return categoryMatch && statusMatch;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          <span className="text-orange-500">🎯</span> Challenges
        </h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Push your limits, build lasting habits, and compete with the community in fitness and academic challenges
        </p>
      </div>

      {/* Filter Controls */}
      <div className="flex flex-col sm:flex-row gap-4 mb-8">
        <div className="flex-1">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-2">
            <CategoryButton
              active={activeCategory === 'all'}
              onClick={() => setActiveCategory('all')}
              icon={<Target size={18} />}
              label="All Challenges"
              count={challenges.length}
            />
            <CategoryButton
              active={activeCategory === 'fitness'}
              onClick={() => setActiveCategory('fitness')}
              icon={<Dumbbell size={18} />}
              label="Fitness"
              count={challenges.filter(c => c.category === 'fitness').length}
            />
            <CategoryButton
              active={activeCategory === 'academic'}
              onClick={() => setActiveCategory('academic')}
              icon={<BookOpen size={18} />}
              label="Academic"
              count={challenges.filter(c => c.category === 'academic').length}
            />
            <CategoryButton
              active={activeCategory === 'wellness'}
              onClick={() => setActiveCategory('wellness')}
              icon={<Star size={18} />}
              label="Wellness"
              count={challenges.filter(c => c.category === 'wellness').length}
            />
            <CategoryButton
              active={activeCategory === 'social'}
              onClick={() => setActiveCategory('social')}
              icon={<Users size={18} />}
              label="Social"
              count={challenges.filter(c => c.category === 'social').length}
            />
          </div>
        </div>
        
        <div className="flex items-center gap-4">
          <label className="flex items-center">
            <input
              type="checkbox"
              checked={showJoined}
              onChange={(e) => setShowJoined(e.target.checked)}
              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded mr-2"
            />
            <span className="text-sm text-gray-700">Show My Challenges Only</span>
          </label>
        </div>
      </div>

      <div className="grid lg:grid-cols-4 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-3">
          <div className="grid gap-6">
            {filteredChallenges.map((challenge) => (
              <ChallengeCard key={challenge.id} challenge={challenge} />
            ))}
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Your Progress */}
          <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
            <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center">
              <TrendingUp size={20} className="text-blue-600 mr-2" />
              Your Progress
            </h3>
            
            <div className="space-y-4">
              <ProgressItem 
                label="Active Challenges" 
                value="3" 
                color="text-blue-600"
              />
              <ProgressItem 
                label="Completed Challenges" 
                value="12" 
                color="text-green-600"
              />
              <ProgressItem 
                label="Total Points Earned" 
                value="8,450" 
                color="text-purple-600"
              />
              <ProgressItem 
                label="Current Streak" 
                value="20 days" 
                color="text-orange-600"
              />
            </div>
          </div>

          {/* Achievement Badges */}
          <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
            <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center">
              <Award size={20} className="text-yellow-600 mr-2" />
              Recent Badges
            </h3>
            
            <div className="grid grid-cols-2 gap-3">
              <BadgeItem 
                name="Fitness Streak"
                icon="🔥"
                earned={true}
              />
              <BadgeItem 
                name="Study Master"
                icon="📚"
                earned={true}
              />
              <BadgeItem 
                name="Team Player"
                icon="👥"
                earned={false}
              />
              <BadgeItem 
                name="Zen Master"
                icon="🧘"
                earned={false}
              />
            </div>
          </div>

          {/* Weekly Highlights */}
          <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
            <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center">
              <Zap size={20} className="text-orange-600 mr-2" />
              This Week's Highlights
            </h3>
            
            <div className="space-y-3">
              <HighlightItem 
                achievement="20-day streak maintained!"
                points={"+100 bonus points"}
                type="success"
              />
              <HighlightItem 
                achievement="Ranked #12 in Fitness Challenge"
                points={"↗️ +3 positions"}
                type="info"
              />
              <HighlightItem 
                achievement="Perfect academic week"
                points={"+250 points"}
                type="success"
              />
            </div>
          </div>

          {/* Community Stats */}
          <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
            <h3 className="text-lg font-bold text-gray-900 mb-4">Community Stats</h3>
            
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Total Participants</span>
                <span className="font-semibold text-gray-900">4,870</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Active Challenges</span>
                <span className="font-semibold text-gray-900">15</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Points Awarded Today</span>
                <span className="font-semibold text-gray-900">12,450</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Helper Components
function CategoryButton({ active, onClick, icon, label, count }: {
  active: boolean;
  onClick: () => void;
  icon: React.ReactNode;
  label: string;
  count: number;
}) {
  return (
    <button
      onClick={onClick}
      className={`flex flex-col items-center justify-center px-3 py-3 rounded-lg font-medium transition-all duration-200 ${
        active 
          ? 'bg-blue-600 text-white shadow-lg transform scale-105' 
          : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
      }`}
    >
      {icon}
      <span className="text-xs mt-1">{label}</span>
      <span className="text-xs opacity-75">({count})</span>
    </button>
  );
}

function ChallengeCard({ challenge }: { challenge: Challenge }) {
  const getStatusColor = () => {
    switch (challenge.status) {
      case 'active': return 'border-green-200 bg-green-50';
      case 'upcoming': return 'border-blue-200 bg-blue-50';
      case 'completed': return 'border-gray-200 bg-gray-50';
    }
  };

  const getStatusIcon = () => {
    switch (challenge.status) {
      case 'active': return <Play size={16} className="text-green-600" />;
      case 'upcoming': return <Clock size={16} className="text-blue-600" />;
      case 'completed': return <CheckCircle size={16} className="text-gray-600" />;
    }
  };

  const getDifficultyColor = () => {
    switch (challenge.difficulty) {
      case 'Beginner': return 'bg-green-100 text-green-800';
      case 'Intermediate': return 'bg-yellow-100 text-yellow-800';
      case 'Advanced': return 'bg-red-100 text-red-800';
    }
  };

  const getCategoryColor = () => {
    switch (challenge.category) {
      case 'fitness': return 'bg-orange-100 text-orange-800';
      case 'academic': return 'bg-blue-100 text-blue-800';
      case 'wellness': return 'bg-purple-100 text-purple-800';
      case 'social': return 'bg-pink-100 text-pink-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className={`bg-white rounded-2xl shadow-lg p-6 border-2 ${getStatusColor()} hover:shadow-xl transition-all duration-200`}>
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-2">
            <h3 className="text-xl font-bold text-gray-900">{challenge.title}</h3>
            <div className="flex items-center space-x-2">
              {getStatusIcon()}
              <span className={`px-2 py-1 rounded-full text-xs font-medium ${getCategoryColor()}`}>
                {challenge.category}
              </span>
              <span className={`px-2 py-1 rounded-full text-xs font-medium ${getDifficultyColor()}`}>
                {challenge.difficulty}
              </span>
            </div>
          </div>
          <p className="text-gray-600 mb-3">{challenge.description}</p>
          
          {/* Progress Bar (for joined challenges) */}
          {challenge.progress !== undefined && (
            <div className="mb-4">
              <div className="flex justify-between items-center mb-1">
                <span className="text-sm font-medium text-gray-700">Progress</span>
                <span className="text-sm text-gray-500">{challenge.progress}% complete</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-gradient-to-r from-blue-500 to-green-500 h-2 rounded-full transition-all duration-500"
                  style={{ width: `${challenge.progress}%` }}
                ></div>
              </div>
              {challenge.currentStreak && (
                <div className="flex justify-between mt-2 text-sm">
                  <span className="text-orange-600 font-medium">
                    🔥 Current Streak: {challenge.currentStreak} days
                  </span>
                  <span className="text-gray-500">
                    Best: {challenge.bestStreak} days
                  </span>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Challenge Details */}
      <div className="grid md:grid-cols-2 gap-4 mb-4">
        <div className="space-y-2">
          <div className="flex items-center text-sm text-gray-600">
            <Calendar size={16} className="mr-2" />
            {challenge.startDate} - {challenge.endDate}
          </div>
          <div className="flex items-center text-sm text-gray-600">
            <Clock size={16} className="mr-2" />
            Duration: {challenge.duration}
          </div>
          <div className="flex items-center text-sm text-gray-600">
            <Users size={16} className="mr-2" />
            {challenge.participants} participants
            {challenge.maxParticipants && ` / ${challenge.maxParticipants}`}
          </div>
        </div>
        
        <div>
          <div className="flex items-center text-sm text-gray-600 mb-2">
            <Trophy size={16} className="mr-2" />
            <span className="font-medium text-green-600">{challenge.reward}</span>
          </div>
        </div>
      </div>

      {/* Requirements */}
      <div className="mb-4">
        <h4 className="font-semibold text-gray-900 mb-2">Requirements:</h4>
        <ul className="space-y-1">
          {challenge.requirements.map((req, index) => (
            <li key={index} className="text-sm text-gray-600 flex items-start">
              <div className="w-1.5 h-1.5 bg-blue-400 rounded-full mr-2 mt-2"></div>
              {req}
            </li>
          ))}
        </ul>
      </div>

      {/* Action Button */}
      <div className="flex items-center justify-between">
        {challenge.maxParticipants && (
          <div className="w-full bg-gray-200 rounded-full h-1 mr-4">
            <div 
              className="bg-blue-500 h-1 rounded-full"
              style={{ width: `${(challenge.participants / challenge.maxParticipants) * 100}%` }}
            ></div>
          </div>
        )}
        
        <button
          className={`px-6 py-2 rounded-lg font-semibold transition-all duration-200 ${
            challenge.status === 'active' && challenge.progress === undefined
              ? 'bg-blue-600 text-white hover:bg-blue-700 transform hover:scale-105 shadow-lg'
              : challenge.status === 'upcoming'
              ? 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              : challenge.progress !== undefined
              ? 'bg-green-600 text-white hover:bg-green-700'
              : 'bg-gray-100 text-gray-500 cursor-not-allowed'
          }`}
          disabled={challenge.status === 'completed'}
        >
          {challenge.progress !== undefined
            ? 'Continue'
            : challenge.status === 'active'
            ? 'Join Challenge'
            : challenge.status === 'upcoming'
            ? 'Register Interest'
            : 'Completed'
          }
        </button>
      </div>
    </div>
  );
}

function ProgressItem({ label, value, color }: {
  label: string;
  value: string;
  color: string;
}) {
  return (
    <div className="flex justify-between items-center">
      <span className="text-gray-600">{label}</span>
      <span className={`font-semibold ${color}`}>{value}</span>
    </div>
  );
}

function BadgeItem({ name, icon, earned }: {
  name: string;
  icon: string;
  earned: boolean;
}) {
  return (
    <div className={`p-3 rounded-lg text-center ${earned ? 'bg-yellow-50 border border-yellow-200' : 'bg-gray-50 border border-gray-200'}`}>
      <div className="text-2xl mb-1">{icon}</div>
      <div className={`text-xs font-medium ${earned ? 'text-yellow-800' : 'text-gray-500'}`}>
        {name}
      </div>
    </div>
  );
}

function HighlightItem({ achievement, points, type }: {
  achievement: string;
  points: string;
  type: 'success' | 'info';
}) {
  return (
    <div className={`p-3 rounded-lg ${type === 'success' ? 'bg-green-50 border border-green-200' : 'bg-blue-50 border border-blue-200'}`}>
      <div className="font-medium text-gray-900 text-sm">{achievement}</div>
      <div className={`text-xs ${type === 'success' ? 'text-green-600' : 'text-blue-600'} font-semibold`}>
        {points}
      </div>
    </div>
  );
}