import React from 'react';
import { useUser } from '../../context/UserContext';
import { 
  BookOpen, 
  Dumbbell, 
  Target, 
  Trophy, 
  Calendar,
  TrendingUp,
  Flame,       // Changed from 'Fire' to 'Flame'
  Clock,
  CheckCircle,
  Star
} from 'lucide-react';

export function StudentDashboard() {
  const { user } = useUser();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Welcome Header */}
      <div className="mb-8">
        <div className="bg-gradient-to-r from-blue-600 to-green-500 rounded-2xl p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold mb-2">Welcome back, {user?.name}! 👋</h1>
              <p className="text-blue-100">Ready to crush your goals today?</p>
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold">Level {user?.level}</div>
              <div className="text-sm text-blue-100">
                {user?.points} points
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatCard
          icon={<Flame size={24} />}  
          title="Current Streak"
          value={`${user?.streak || 0} days`}
          color="bg-orange-500"
          bgColor="bg-orange-50"
          textColor="text-orange-600"
        />
        <StatCard
          icon={<Trophy size={24} />}
          title="Achievements"
          value={user?.achievements?.length || 0}
          color="bg-yellow-500"
          bgColor="bg-yellow-50"
          textColor="text-yellow-600"
        />
        <StatCard
          icon={<Target size={24} />}
          title="Goals Complete"
          value="12/20"
          color="bg-green-500"
          bgColor="bg-green-50"
          textColor="text-green-600"
        />
        <StatCard
          icon={<TrendingUp size={24} />}
          title="Weekly Progress"
          value="+15%"
          color="bg-blue-500"
          bgColor="bg-blue-50"
          textColor="text-blue-600"
        />
      </div>


      <div className="grid lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Today's Schedule */}
          <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold text-gray-900 flex items-center">
                <Calendar size={24} className="text-blue-600 mr-2" />
                Today's Schedule
              </h2>
              <button className="text-blue-600 hover:text-blue-700 font-medium">View All</button>
            </div>

            <div className="space-y-4">
              <ScheduleItem
                time="9:00 AM"
                title="Math Study Session"
                type="academic"
                duration="60 min"
                status="completed"
              />
              <ScheduleItem
                time="11:00 AM"
                title="Core Strength Workout"
                type="fitness"
                duration="45 min"
                status="current"
              />
              <ScheduleItem
                time="2:00 PM"
                title="Physics Lab Review"
                type="academic"
                duration="90 min"
                status="upcoming"
              />
              <ScheduleItem
                time="4:30 PM"
                title="Yoga & Meditation"
                type="wellness"
                duration="30 min"
                status="upcoming"
              />
            </div>
          </div>

          {/* Recent Activities */}
          <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
            <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
              <Clock size={24} className="text-green-600 mr-2" />
              Recent Activities
            </h2>

            <div className="space-y-4">
              <ActivityItem
                title="Completed Morning Workout"
                subtitle="Strength Training • 45 minutes"
                time="2 hours ago"
                points="+50 points"
                color="text-orange-600"
              />
              <ActivityItem
                title="Aced Chemistry Quiz"
                subtitle="Organic Chemistry • Score: 95%"
                time="Yesterday"
                points="+100 points"
                color="text-blue-600"
              />
              <ActivityItem
                title="Meditation Streak: 7 Days!"
                subtitle="Mindfulness Challenge"
                time="Yesterday"
                points="+25 points"
                color="text-purple-600"
              />
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Active Challenges */}
          <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
            <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center">
              <Target size={20} className="text-green-600 mr-2" />
              Active Challenges
            </h3>

            <div className="space-y-4">
              <ChallengeItem
                title="30-Day Fitness Journey"
                progress={65}
                daysLeft={10}
                reward="500 points"
              />
              <ChallengeItem
                title="Study Streak Master"
                progress={85}
                daysLeft={3}
                reward="250 points"
              />
            </div>
          </div>

          {/* Quick Actions */}
          <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
            <h3 className="text-lg font-bold text-gray-900 mb-4">Quick Actions</h3>

            <div className="space-y-3">
              <QuickActionButton
                icon={<Dumbbell size={18} />}
                title="Start Workout"
                subtitle="Begin your fitness session"
                color="bg-orange-500 hover:bg-orange-600"
              />
              <QuickActionButton
                icon={<BookOpen size={18} />}
                title="Study Session"
                subtitle="Focus mode with timer"
                color="bg-blue-500 hover:bg-blue-600"
              />
              <QuickActionButton
                icon={<Target size={18} />}
                title="Set New Goal"
                subtitle="Create achievement target"
                color="bg-green-500 hover:bg-green-600"
              />
            </div>
          </div>

          {/* Leaderboard Preview */}
          <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold text-gray-900 flex items-center">
                <Trophy size={20} className="text-yellow-600 mr-2" />
                Weekly Leaderboard
              </h3>
              <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">View Full</button>
            </div>

            <div className="space-y-3">
              <LeaderboardItem rank={1} name="Sarah M." points={1250} isCurrentUser={false} />
              <LeaderboardItem rank={2} name="You" points={1180} isCurrentUser={true} />
              <LeaderboardItem rank={3} name="Mike K." points={1150} isCurrentUser={false} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Helper Components
function StatCard({ icon, title, value, color, bgColor, textColor }: {
  icon: React.ReactNode;
  title: string;
  value: string | number;
  color: string;
  bgColor: string;
  textColor: string;
}) {
  return (
    <div className={`${bgColor} rounded-xl p-6 border border-gray-100`}>
      <div className="flex items-center justify-between">
        <div>
          <p className="text-gray-600 text-sm font-medium">{title}</p>
          <p className={`text-2xl font-bold ${textColor} mt-1`}>{value}</p>
        </div>
        <div className={`${color} text-white p-3 rounded-lg`}>
          {icon}
        </div>
      </div>
    </div>
  );
}

function ScheduleItem({ time, title, type, duration, status }: {
  time: string;
  title: string;
  type: 'academic' | 'fitness' | 'wellness';
  duration: string;
  status: 'completed' | 'current' | 'upcoming';
}) {
  const getTypeColor = () => {
    switch (type) {
      case 'academic': return 'text-blue-600 bg-blue-50';
      case 'fitness': return 'text-orange-600 bg-orange-50';
      case 'wellness': return 'text-purple-600 bg-purple-50';
      default: return 'text-gray-600 bg-gray-50';
    }
  };

  const getStatusIcon = () => {
    switch (status) {
      case 'completed': return <CheckCircle size={18} className="text-green-500" />;
      case 'current': return <Clock size={18} className="text-orange-500" />;
      case 'upcoming': return <Clock size={18} className="text-gray-400" />;
    }
  };

  return (
    <div className={`flex items-center p-4 rounded-lg border-2 ${
      status === 'current' ? 'border-orange-200 bg-orange-50' : 'border-gray-100 bg-gray-50'
    }`}>
      <div className="mr-4">
        <div className="text-sm font-semibold text-gray-900">{time}</div>
        <div className="text-xs text-gray-500">{duration}</div>
      </div>
      <div className="flex-1">
        <div className="font-medium text-gray-900">{title}</div>
        <div className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getTypeColor()}`}>
          {type}
        </div>
      </div>
      <div className="ml-4">
        {getStatusIcon()}
      </div>
    </div>
  );
}

function ActivityItem({ title, subtitle, time, points, color }: {
  title: string;
  subtitle: string;
  time: string;
  points: string;
  color: string;
}) {
  return (
    <div className="flex items-start p-4 bg-gray-50 rounded-lg">
      <div className={`w-2 h-2 rounded-full ${color} mt-2 mr-3 flex-shrink-0`}></div>
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium text-gray-900">{title}</p>
        <p className="text-sm text-gray-500">{subtitle}</p>
        <p className="text-xs text-gray-400 mt-1">{time}</p>
      </div>
      <div className="text-sm font-semibold text-green-600">{points}</div>
    </div>
  );
}

function ChallengeItem({ title, progress, daysLeft, reward }: {
  title: string;
  progress: number;
  daysLeft: number;
  reward: string;
}) {
  return (
    <div className="p-4 border border-gray-200 rounded-lg">
      <div className="flex justify-between items-start mb-2">
        <h4 className="font-medium text-gray-900 text-sm">{title}</h4>
        <span className="text-xs text-gray-500">{daysLeft} days left</span>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-2 mb-2">
        <div 
          className="bg-gradient-to-r from-blue-500 to-green-500 h-2 rounded-full"
          style={{ width: `${progress}%` }}
        ></div>
      </div>
      <div className="flex justify-between items-center text-xs">
        <span className="text-gray-600">{progress}% complete</span>
        <span className="text-green-600 font-semibold">{reward}</span>
      </div>
    </div>
  );
}

function QuickActionButton({ icon, title, subtitle, color }: {
  icon: React.ReactNode;
  title: string;
  subtitle: string;
  color: string;
}) {
  return (
    <button className={`w-full ${color} text-white p-4 rounded-lg text-left hover:transform hover:scale-105 transition-all duration-200 shadow-md hover:shadow-lg`}>
      <div className="flex items-center">
        <div className="mr-3">{icon}</div>
        <div>
          <div className="font-medium text-sm">{title}</div>
          <div className="text-xs opacity-90">{subtitle}</div>
        </div>
      </div>
    </button>
  );
}

function LeaderboardItem({ rank, name, points, isCurrentUser }: {
  rank: number;
  name: string;
  points: number;
  isCurrentUser: boolean;
}) {
  const getRankColor = () => {
    switch (rank) {
      case 1: return 'text-yellow-600 bg-yellow-100';
      case 2: return 'text-gray-600 bg-gray-100';
      case 3: return 'text-orange-600 bg-orange-100';
      default: return 'text-blue-600 bg-blue-100';
    }
  };

  return (
    <div className={`flex items-center p-3 rounded-lg ${isCurrentUser ? 'bg-blue-50 border-2 border-blue-200' : 'bg-gray-50'}`}>
      <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold mr-3 ${getRankColor()}`}>
        {rank}
      </div>
      <div className="flex-1">
        <div className="font-medium text-gray-900">{name}</div>
        <div className="text-sm text-gray-500">{points} points</div>
      </div>
      {rank <= 3 && (
        <Star size={16} className="text-yellow-500 fill-current" />
      )}
    </div>
  );
}