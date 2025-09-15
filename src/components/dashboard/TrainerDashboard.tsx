import React from 'react';
import { useUser } from '../../context/UserContext';
import { 
  Users, 
  Calendar, 
  Star, 
  TrendingUp, 
  Clock,
  MessageSquare,
  Target,
  Award
} from 'lucide-react';

export function TrainerDashboard() {
  const { user } = useUser();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Welcome Header */}
      <div className="mb-8">
        <div className="bg-gradient-to-r from-orange-500 to-red-500 rounded-2xl p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold mb-2">Welcome, Coach {user?.name}! 💪</h1>
              <p className="text-orange-100">Inspiring students to reach their potential</p>
            </div>
            <div className="text-right">
              <div className="flex items-center justify-end mb-1">
                <Star size={20} className="text-yellow-300 mr-1" />
                <span className="text-2xl font-bold">{user?.rating?.toFixed(1) || '5.0'}</span>
              </div>
              <div className="text-sm text-orange-100">Rating</div>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatCard
          icon={<Users size={24} />}
          title="Active Students"
          value="24"
          color="bg-blue-500"
          bgColor="bg-blue-50"
          textColor="text-blue-600"
        />
        <StatCard
          icon={<Calendar size={24} />}
          title="Classes This Week"
          value="18"
          color="bg-green-500"
          bgColor="bg-green-50"
          textColor="text-green-600"
        />
        <StatCard
          icon={<MessageSquare size={24} />}
          title="Messages"
          value="7"
          color="bg-purple-500"
          bgColor="bg-purple-50"
          textColor="text-purple-600"
        />
        <StatCard
          icon={<TrendingUp size={24} />}
          title="Growth Rate"
          value="+12%"
          color="bg-orange-500"
          bgColor="bg-orange-50"
          textColor="text-orange-600"
        />
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Today's Classes */}
          <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold text-gray-900 flex items-center">
                <Calendar size={24} className="text-green-600 mr-2" />
                Today's Classes
              </h2>
              <button className="text-blue-600 hover:text-blue-700 font-medium">Manage Schedule</button>
            </div>

            <div className="space-y-4">
              <ClassItem
                time="9:00 AM"
                title="Morning HIIT Session"
                students={8}
                duration="45 min"
                status="upcoming"
              />
              <ClassItem
                time="11:00 AM"
                title="Strength Training Basics"
                students={12}
                duration="60 min"
                status="current"
              />
              <ClassItem
                time="3:00 PM"
                title="Yoga & Mindfulness"
                students={15}
                duration="50 min"
                status="upcoming"
              />
              <ClassItem
                time="6:00 PM"
                title="Personal Training - Sarah M."
                students={1}
                duration="45 min"
                status="upcoming"
              />
            </div>
          </div>

          {/* Student Progress */}
          <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
            <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
              <Target size={24} className="text-blue-600 mr-2" />
              Student Progress Highlights
            </h2>

            <div className="space-y-4">
              <ProgressItem
                name="Sarah M."
                achievement="Completed 30-Day Challenge"
                progress={100}
                improvement="+25% strength gain"
                avatar="SM"
              />
              <ProgressItem
                name="Mike K."
                achievement="Weight Loss Journey"
                progress={75}
                improvement="-15 lbs achieved"
                avatar="MK"
              />
              <ProgressItem
                name="Emma L."
                achievement="Flexibility Training"
                progress={60}
                improvement="+40% flexibility"
                avatar="EL"
              />
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Quick Actions */}
          <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
            <h3 className="text-lg font-bold text-gray-900 mb-4">Quick Actions</h3>

            <div className="space-y-3">
              <QuickActionButton
                icon={<Calendar size={18} />}
                title="Schedule Class"
                subtitle="Add new training session"
                color="bg-blue-500 hover:bg-blue-600"
              />
              <QuickActionButton
                icon={<Users size={18} />}
                title="Message Students"
                subtitle="Send group updates"
                color="bg-green-500 hover:bg-green-600"
              />
              <QuickActionButton
                icon={<Target size={18} />}
                title="Create Program"
                subtitle="Design workout plan"
                color="bg-purple-500 hover:bg-purple-600"
              />
            </div>
          </div>

          {/* Recent Reviews */}
          <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
            <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center">
              <Star size={20} className="text-yellow-600 mr-2" />
              Recent Reviews
            </h3>

            <div className="space-y-4">
              <ReviewItem
                name="Jessica R."
                rating={5}
                comment="Amazing trainer! Really helped me achieve my goals."
                time="2 days ago"
              />
              <ReviewItem
                name="David M."
                rating={5}
                comment="Great motivator and excellent technique guidance."
                time="1 week ago"
              />
            </div>
          </div>

          {/* Achievements */}
          <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
            <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center">
              <Award size={20} className="text-orange-600 mr-2" />
              Recent Achievements
            </h3>

            <div className="space-y-3">
              <AchievementBadge
                title="Top Rated Trainer"
                description="Maintained 5-star rating"
                color="bg-yellow-100 text-yellow-800"
              />
              <AchievementBadge
                title="100 Classes Milestone"
                description="Successfully completed"
                color="bg-blue-100 text-blue-800"
              />
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

function ClassItem({ time, title, students, duration, status }: {
  time: string;
  title: string;
  students: number;
  duration: string;
  status: 'current' | 'upcoming' | 'completed';
}) {
  const getStatusColor = () => {
    switch (status) {
      case 'current': return 'border-green-200 bg-green-50';
      case 'upcoming': return 'border-blue-200 bg-blue-50';
      case 'completed': return 'border-gray-200 bg-gray-50';
      default: return 'border-gray-200 bg-gray-50';
    }
  };

  return (
    <div className={`flex items-center p-4 rounded-lg border-2 ${getStatusColor()}`}>
      <div className="mr-4">
        <div className="text-sm font-semibold text-gray-900">{time}</div>
        <div className="text-xs text-gray-500">{duration}</div>
      </div>
      <div className="flex-1">
        <div className="font-medium text-gray-900">{title}</div>
        <div className="text-sm text-gray-500">{students} student{students !== 1 ? 's' : ''}</div>
      </div>
      <div className="ml-4">
        <Clock size={18} className={status === 'current' ? 'text-green-500' : 'text-gray-400'} />
      </div>
    </div>
  );
}

function ProgressItem({ name, achievement, progress, improvement, avatar }: {
  name: string;
  achievement: string;
  progress: number;
  improvement: string;
  avatar: string;
}) {
  return (
    <div className="p-4 bg-gray-50 rounded-lg">
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center">
          <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-green-500 rounded-full flex items-center justify-center text-white text-sm font-bold mr-3">
            {avatar}
          </div>
          <div>
            <div className="font-medium text-gray-900">{name}</div>
            <div className="text-sm text-gray-600">{achievement}</div>
          </div>
        </div>
        <div className="text-right">
          <div className="text-sm font-semibold text-green-600">{improvement}</div>
        </div>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-2">
        <div 
          className="bg-gradient-to-r from-blue-500 to-green-500 h-2 rounded-full"
          style={{ width: `${progress}%` }}
        ></div>
      </div>
      <div className="text-xs text-gray-500 mt-1">{progress}% complete</div>
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

function ReviewItem({ name, rating, comment, time }: {
  name: string;
  rating: number;
  comment: string;
  time: string;
}) {
  return (
    <div className="p-4 border border-gray-200 rounded-lg">
      <div className="flex items-center justify-between mb-2">
        <div className="font-medium text-gray-900">{name}</div>
        <div className="flex">
          {[...Array(5)].map((_, i) => (
            <Star 
              key={i} 
              size={14} 
              className={i < rating ? 'text-yellow-400 fill-current' : 'text-gray-300'} 
            />
          ))}
        </div>
      </div>
      <p className="text-sm text-gray-600 mb-2">{comment}</p>
      <p className="text-xs text-gray-400">{time}</p>
    </div>
  );
}

function AchievementBadge({ title, description, color }: {
  title: string;
  description: string;
  color: string;
}) {
  return (
    <div className={`p-3 rounded-lg ${color}`}>
      <div className="font-medium text-sm">{title}</div>
      <div className="text-xs opacity-80">{description}</div>
    </div>
  );
}