import React, { useState } from 'react';
import { Trophy, Medal, Star, TrendingUp, Calendar, Users, BookOpen, Dumbbell } from 'lucide-react';

type LeaderboardType = 'overall' | 'fitness' | 'academic' | 'challenges';
type TimePeriod = 'weekly' | 'monthly' | 'all-time';

export function Leaderboards() {
  const [activeType, setActiveType] = useState<LeaderboardType>('overall');
  const [timePeriod, setTimePeriod] = useState<TimePeriod>('weekly');

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          <span className="text-yellow-600">🏆</span> Leaderboards
        </h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Compete with fellow students and see who's leading in the perfect balance of academics and fitness
        </p>
      </div>

      {/* Filter Controls */}
      <div className="flex flex-col sm:flex-row gap-4 mb-8">
        <div className="flex-1">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-2">
            <FilterButton
              active={activeType === 'overall'}
              onClick={() => setActiveType('overall')}
              icon={<Trophy size={18} />}
              label="Overall"
            />
            <FilterButton
              active={activeType === 'fitness'}
              onClick={() => setActiveType('fitness')}
              icon={<Dumbbell size={18} />}
              label="Fitness"
            />
            <FilterButton
              active={activeType === 'academic'}
              onClick={() => setActiveType('academic')}
              icon={<BookOpen size={18} />}
              label="Academic"
            />
            <FilterButton
              active={activeType === 'challenges'}
              onClick={() => setActiveType('challenges')}
              icon={<Star size={18} />}
              label="Challenges"
            />
          </div>
        </div>
        
        <div className="sm:w-48">
          <select
            value={timePeriod}
            onChange={(e) => setTimePeriod(e.target.value as TimePeriod)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="weekly">This Week</option>
            <option value="monthly">This Month</option>
            <option value="all-time">All Time</option>
          </select>
        </div>
      </div>

      <div className="grid lg:grid-cols-4 gap-8">
        {/* Main Leaderboard */}
        <div className="lg:col-span-3">
          <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-900 flex items-center">
                {getLeaderboardIcon(activeType)}
                <span className="ml-2">{getLeaderboardTitle(activeType)} Leaders</span>
              </h2>
              <div className="text-sm text-gray-500">
                {timePeriod === 'weekly' ? 'Week of Jan 15-21' : 
                 timePeriod === 'monthly' ? 'January 2024' : 'All Time'}
              </div>
            </div>

            {/* Top 3 Podium */}
            <div className="mb-8">
              <PodiumSection 
                leaders={getTopThreeLeaders(activeType)} 
                type={activeType}
              />
            </div>

            {/* Remaining Rankings */}
            <div className="space-y-2">
              {getRemainingLeaders(activeType).map((leader, index) => (
                <LeaderboardRow 
                  key={leader.id}
                  rank={index + 4}
                  leader={leader}
                  type={activeType}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Your Stats */}
          <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
            <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center">
              <Users size={20} className="text-blue-600 mr-2" />
              Your Stats
            </h3>
            
            <div className="space-y-4">
              <StatItem 
                label="Current Rank" 
                value="#12" 
                change="+3" 
                positive={true}
              />
              <StatItem 
                label="Total Points" 
                value="2,450" 
                change="+150" 
                positive={true}
              />
              <StatItem 
                label="This Week" 
                value="380 pts" 
                change="+25%" 
                positive={true}
              />
            </div>
          </div>

          {/* Quick Stats */}
          <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
            <h3 className="text-lg font-bold text-gray-900 mb-4">Community Stats</h3>
            
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Total Participants</span>
                <span className="font-semibold text-gray-900">1,247</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Active This Week</span>
                <span className="font-semibold text-gray-900">892</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Average Points</span>
                <span className="font-semibold text-gray-900">1,854</span>
              </div>
            </div>
          </div>

          {/* Recent Achievements */}
          <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
            <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center">
              <Medal size={20} className="text-yellow-600 mr-2" />
              Recent Achievements
            </h3>
            
            <div className="space-y-3">
              <AchievementItem 
                user="Sarah M."
                achievement="Study Streak Champion"
                time="2 hours ago"
                points={500}
              />
              <AchievementItem 
                user="Mike K."
                achievement="Fitness Goal Crusher"
                time="5 hours ago"
                points={350}
              />
              <AchievementItem 
                user="Emma L."
                achievement="Perfect Week"
                time="1 day ago"
                points={750}
              />
            </div>
          </div>

          {/* Upcoming Challenges */}
          <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
            <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center">
              <Calendar size={20} className="text-green-600 mr-2" />
              Upcoming Challenges
            </h3>
            
            <div className="space-y-3">
              <ChallengeItem 
                title="February Fitness Frenzy"
                startDate="Feb 1"
                reward="1,000 pts"
                participants={234}
              />
              <ChallengeItem 
                title="Academic Excellence Sprint"
                startDate="Feb 5"
                reward="750 pts"
                participants={189}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Helper Components
function FilterButton({ active, onClick, icon, label }: {
  active: boolean;
  onClick: () => void;
  icon: React.ReactNode;
  label: string;
}) {
  return (
    <button
      onClick={onClick}
      className={`flex items-center justify-center px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
        active 
          ? 'bg-blue-600 text-white shadow-lg transform scale-105' 
          : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
      }`}
    >
      {icon}
      <span className="ml-1 text-sm">{label}</span>
    </button>
  );
}

function PodiumSection({ leaders, type }: { 
  leaders: Array<{
    id: string;
    name: string;
    points: number;
    avatar: string;
    change: number;
    specialNote?: string;
  }>;
  type: LeaderboardType;
}) {
  return (
    <div className="flex items-end justify-center space-x-4 py-8 bg-gradient-to-br from-yellow-50 to-orange-50 rounded-xl">
      {/* 2nd Place */}
      {leaders[1] && (
        <PodiumPlace 
          leader={leaders[1]} 
          rank={2} 
          height="h-20"
          color="bg-gray-400"
        />
      )}
      
      {/* 1st Place */}
      {leaders[0] && (
        <PodiumPlace 
          leader={leaders[0]} 
          rank={1} 
          height="h-28"
          color="bg-yellow-400"
        />
      )}
      
      {/* 3rd Place */}
      {leaders[2] && (
        <PodiumPlace 
          leader={leaders[2]} 
          rank={3} 
          height="h-16"
          color="bg-orange-400"
        />
      )}
    </div>
  );
}

function PodiumPlace({ leader, rank, height, color }: {
  leader: any;
  rank: number;
  height: string;
  color: string;
}) {
  return (
    <div className="flex flex-col items-center">
      <div className="relative mb-4">
        <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-green-500 rounded-full flex items-center justify-center text-white font-bold text-lg">
          {leader.avatar}
        </div>
        <div className={`absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-8 h-8 ${color} rounded-full flex items-center justify-center text-white font-bold text-sm`}>
          {rank}
        </div>
      </div>
      <div className="text-center mb-2">
        <div className="font-bold text-gray-900">{leader.name}</div>
        <div className="text-lg font-bold text-blue-600">{leader.points.toLocaleString()}</div>
        <div className="text-xs text-gray-500">points</div>
      </div>
      <div className={`${height} w-20 ${color} rounded-t-lg opacity-20`}></div>
    </div>
  );
}

function LeaderboardRow({ rank, leader, type }: { 
  rank: number; 
  leader: any;
  type: LeaderboardType;
}) {
  return (
    <div className="flex items-center p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors duration-200">
      <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center font-bold text-gray-600 mr-4">
        {rank}
      </div>
      
      <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-green-500 rounded-full flex items-center justify-center text-white font-bold mr-4">
        {leader.avatar}
      </div>
      
      <div className="flex-1">
        <div className="flex items-center">
          <span className="font-medium text-gray-900">{leader.name}</span>
          {leader.specialNote && (
            <span className="ml-2 px-2 py-1 bg-yellow-100 text-yellow-800 text-xs rounded-full">
              {leader.specialNote}
            </span>
          )}
        </div>
        <div className="text-sm text-gray-500">
          {getSubtext(type, leader)}
        </div>
      </div>
      
      <div className="text-right">
        <div className="font-bold text-gray-900">{leader.points.toLocaleString()}</div>
        <div className={`text-sm ${leader.change >= 0 ? 'text-green-600' : 'text-red-600'} flex items-center justify-end`}>
          <TrendingUp size={12} className={leader.change >= 0 ? '' : 'rotate-180'} />
          <span className="ml-1">{Math.abs(leader.change)}</span>
        </div>
      </div>
    </div>
  );
}

function StatItem({ label, value, change, positive }: {
  label: string;
  value: string;
  change: string;
  positive: boolean;
}) {
  return (
    <div className="flex justify-between items-center">
      <span className="text-gray-600">{label}</span>
      <div className="text-right">
        <div className="font-semibold text-gray-900">{value}</div>
        <div className={`text-sm ${positive ? 'text-green-600' : 'text-red-600'}`}>
          {change}
        </div>
      </div>
    </div>
  );
}

function AchievementItem({ user, achievement, time, points }: {
  user: string;
  achievement: string;
  time: string;
  points: number;
}) {
  return (
    <div className="p-3 border border-gray-200 rounded-lg">
      <div className="flex justify-between items-start mb-1">
        <div className="font-medium text-gray-900 text-sm">{user}</div>
        <div className="text-xs text-gray-500">{time}</div>
      </div>
      <div className="text-sm text-gray-600 mb-1">{achievement}</div>
      <div className="text-xs font-semibold text-green-600">+{points} points</div>
    </div>
  );
}

function ChallengeItem({ title, startDate, reward, participants }: {
  title: string;
  startDate: string;
  reward: string;
  participants: number;
}) {
  return (
    <div className="p-3 border border-gray-200 rounded-lg hover:shadow-md transition-all duration-200">
      <div className="font-medium text-gray-900 text-sm mb-1">{title}</div>
      <div className="text-xs text-gray-500 mb-2">Starts {startDate}</div>
      <div className="flex justify-between items-center">
        <span className="text-xs text-green-600 font-semibold">{reward}</span>
        <span className="text-xs text-gray-500">{participants} joined</span>
      </div>
    </div>
  );
}

// Helper Functions
function getLeaderboardIcon(type: LeaderboardType) {
  switch (type) {
    case 'overall': return <Trophy size={24} className="text-yellow-600" />;
    case 'fitness': return <Dumbbell size={24} className="text-orange-600" />;
    case 'academic': return <BookOpen size={24} className="text-blue-600" />;
    case 'challenges': return <Star size={24} className="text-purple-600" />;
  }
}

function getLeaderboardTitle(type: LeaderboardType) {
  switch (type) {
    case 'overall': return 'Overall';
    case 'fitness': return 'Fitness';
    case 'academic': return 'Academic';
    case 'challenges': return 'Challenge';
  }
}

function getSubtext(type: LeaderboardType, leader: any) {
  switch (type) {
    case 'overall': return `${leader.fitnessPoints} fitness + ${leader.academicPoints} academic`;
    case 'fitness': return `${leader.workoutsCompleted} workouts this week`;
    case 'academic': return `${leader.studyHours}h studied, ${leader.testScore}% avg score`;
    case 'challenges': return `${leader.challengesWon} challenges won`;
  }
}

function getTopThreeLeaders(type: LeaderboardType) {
  // Mock data - in real app, this would come from API
  const mockLeaders = {
    overall: [
      { id: '1', name: 'Sarah Martinez', points: 4250, avatar: 'SM', change: 125, fitnessPoints: 2100, academicPoints: 2150 },
      { id: '2', name: 'Alex Chen', points: 4100, avatar: 'AC', change: 89, fitnessPoints: 2200, academicPoints: 1900 },
      { id: '3', name: 'Maya Patel', points: 3950, avatar: 'MP', change: 156, fitnessPoints: 1950, academicPoints: 2000 }
    ],
    fitness: [
      { id: '1', name: 'Jake Wilson', points: 2800, avatar: 'JW', change: 200, workoutsCompleted: 12, specialNote: 'Streak King' },
      { id: '2', name: 'Emma Davis', points: 2650, avatar: 'ED', change: 150, workoutsCompleted: 11 },
      { id: '3', name: 'Ryan Kim', points: 2500, avatar: 'RK', change: 125, workoutsCompleted: 10 }
    ],
    academic: [
      { id: '1', name: 'Sophia Liu', points: 3200, avatar: 'SL', change: 180, studyHours: 28, testScore: 96 },
      { id: '2', name: 'David Park', points: 3050, avatar: 'DP', change: 120, studyHours: 26, testScore: 94 },
      { id: '3', name: 'Zoe Adams', points: 2900, avatar: 'ZA', change: 95, studyHours: 25, testScore: 92 }
    ],
    challenges: [
      { id: '1', name: 'Marcus Johnson', points: 1800, avatar: 'MJ', change: 300, challengesWon: 8, specialNote: 'Champion' },
      { id: '2', name: 'Lily Thompson', points: 1650, avatar: 'LT', change: 200, challengesWon: 7 },
      { id: '3', name: 'Omar Hassan', points: 1500, avatar: 'OH', change: 175, challengesWon: 6 }
    ]
  };

  return mockLeaders[type];
}

function getRemainingLeaders(type: LeaderboardType) {
  // Mock data for ranks 4-10
  return [
    { id: '4', name: 'Jordan Lee', points: 3750, avatar: 'JL', change: 67, fitnessPoints: 1800, academicPoints: 1950, workoutsCompleted: 9, studyHours: 24, testScore: 89, challengesWon: 5 },
    { id: '5', name: 'Taylor Brown', points: 3600, avatar: 'TB', change: 45, fitnessPoints: 1700, academicPoints: 1900, workoutsCompleted: 8, studyHours: 23, testScore: 87, challengesWon: 4 },
    { id: '6', name: 'Casey Moore', points: 3450, avatar: 'CM', change: 78, fitnessPoints: 1650, academicPoints: 1800, workoutsCompleted: 8, studyHours: 22, testScore: 85, challengesWon: 4 },
    { id: '7', name: 'River Stone', points: 3300, avatar: 'RS', change: -12, fitnessPoints: 1600, academicPoints: 1700, workoutsCompleted: 7, studyHours: 21, testScore: 83, challengesWon: 3 },
    { id: '8', name: 'Phoenix Wright', points: 3150, avatar: 'PW', change: 34, fitnessPoints: 1550, academicPoints: 1600, workoutsCompleted: 7, studyHours: 20, testScore: 81, challengesWon: 3 },
    { id: '9', name: 'Sage Kumar', points: 3000, avatar: 'SK', change: 56, fitnessPoints: 1500, academicPoints: 1500, workoutsCompleted: 6, studyHours: 19, testScore: 79, challengesWon: 2 },
    { id: '10', name: 'Blake Foster', points: 2850, avatar: 'BF', change: 23, fitnessPoints: 1450, academicPoints: 1400, workoutsCompleted: 6, studyHours: 18, testScore: 77, challengesWon: 2 }
  ];
}