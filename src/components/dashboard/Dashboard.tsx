
import { Dumbbell, Brain, Activity, Award, Zap, Target, BookOpen, TrendingUp, Calendar, Clock } from 'lucide-react';
import { Link } from 'react-router-dom';

const Dashboard = () => {
  // Replace with actual user context if available
  const user = { name: 'User' };

  const quickActions = [
    {
      title: 'Start Workout',
      description: 'Begin your personalized training session',
      icon: Dumbbell,
      href: '/workouts',
      color: 'bg-blue-600 hover:bg-blue-700',
      iconBg: 'bg-blue-100 text-blue-600'
    },
    {
      title: 'AI Coach Chat',
      description: 'Get personalized fitness and study advice',
      icon: Brain,
      href: '/ai-chat',
      color: 'bg-purple-600 hover:bg-purple-700',
      iconBg: 'bg-purple-100 text-purple-600'
    },
    {
      title: 'Posture Check',
      description: 'Analyze your posture and form',
      icon: Activity,
      href: '/posture',
      color: 'bg-green-600 hover:bg-green-700',
      iconBg: 'bg-green-100 text-green-600'
    },
    {
      title: 'View Leaderboards',
      description: 'Check your ranking and compete',
      icon: Award,
      href: '/leaderboards',
      color: 'bg-orange-600 hover:bg-orange-700',
      iconBg: 'bg-orange-100 text-orange-600'
    }
  ];

  const weeklyStats = [
    { label: 'Workouts Completed', value: '12', change: '+3 from last week', icon: Dumbbell, color: 'text-blue-600' },
    { label: 'Study Hours', value: '28', change: '+5 from last week', icon: BookOpen, color: 'text-purple-600' },
    { label: 'Calories Burned', value: '2,840', change: '+340 from last week', icon: Zap, color: 'text-green-600' },
    { label: 'Academic Score', value: '85%', change: '+2% from last week', icon: Target, color: 'text-orange-600' }
  ];

  const recentAchievements = [
    { title: 'Consistency Master', description: 'Completed 7 days in a row', date: '2 days ago', icon: '🔥' },
    { title: 'Perfect Posture', description: 'Maintained proper form for 30 minutes', date: '3 days ago', icon: '💪' },
    { title: 'Study Champion', description: 'Improved focus by 15%', date: '1 week ago', icon: '🧠' }
  ];

  const upcomingWorkouts = [
    { name: 'Morning HIIT', time: 'Tomorrow 7:00 AM', duration: '30 min', type: 'Cardio' },
    { name: 'Strength Training', time: 'Tomorrow 6:00 PM', duration: '45 min', type: 'Strength' },
    { name: 'Yoga & Meditation', time: 'Wed 8:00 AM', duration: '25 min', type: 'Flexibility' }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Welcome Section */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Welcome back, {user?.name}! 👋
        </h1>
        <p className="text-gray-600">
          Ready to boost your cognitive and physical performance today?
        </p>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {quickActions.map((action) => {
          const Icon = action.icon;
          return (
            <Link
              key={action.title}
              to={action.href}
              className="group bg-white p-6 rounded-2xl border border-gray-100 hover:border-blue-200 hover:shadow-xl transition-all duration-300"
            >
              <div className={`w-12 h-12 ${action.iconBg} rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                <Icon className="w-6 h-6" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">{action.title}</h3>
              <p className="text-sm text-gray-600">{action.description}</p>
            </Link>
          );
        })}
      </div>

      {/* Performance Overview */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        {/* Academic-Fitness Synergy */}
        <div className="lg:col-span-2 bg-white p-6 rounded-2xl border border-gray-100">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Academic-Fitness Synergy</h2>
          <div className="grid grid-cols-2 gap-6">
            <div className="text-center">
              <div className="w-24 h-24 mx-auto mb-4 relative">
                <svg className="w-24 h-24 transform -rotate-90">
                  <circle
                    cx="48"
                    cy="48"
                    r="40"
                    stroke="currentColor"
                    strokeWidth="8"
                    fill="none"
                    className="text-gray-200"
                  />
                  <circle
                    cx="48"
                    cy="48"
                    r="40"
                    stroke="currentColor"
                    strokeWidth="8"
                    fill="none"
                    strokeDasharray={`${2 * Math.PI * 40}`}
                    strokeDashoffset={`${2 * Math.PI * 40 * (1 - 0.85)}`}
                    className="text-blue-600"
                    strokeLinecap="round"
                  />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-2xl font-bold text-gray-900">85%</span>
                </div>
              </div>
              <p className="text-sm font-medium text-gray-900">Academic Score</p>
              <p className="text-xs text-gray-500">+2% this week</p>
            </div>
            <div className="text-center">
              <div className="w-24 h-24 mx-auto mb-4 relative">
                <svg className="w-24 h-24 transform -rotate-90">
                  <circle
                    cx="48"
                    cy="48"
                    r="40"
                    stroke="currentColor"
                    strokeWidth="8"
                    fill="none"
                    className="text-gray-200"
                  />
                  <circle
                    cx="48"
                    cy="48"
                    r="40"
                    stroke="currentColor"
                    strokeWidth="8"
                    fill="none"
                    strokeDasharray={`${2 * Math.PI * 40}`}
                    strokeDashoffset={`${2 * Math.PI * 40 * (1 - 0.72)}`}
                    className="text-green-600"
                    strokeLinecap="round"
                  />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-2xl font-bold text-gray-900">72%</span>
                </div>
              </div>
              <p className="text-sm font-medium text-gray-900">Fitness Score</p>
              <p className="text-xs text-gray-500">+8% this week</p>
            </div>
          </div>
          <div className="mt-6 p-4 bg-gradient-to-r from-blue-50 to-green-50 rounded-xl">
            <p className="text-sm text-gray-700">
              <strong>Synergy Insight:</strong> Your consistent morning workouts have improved focus during study sessions by 15%!
            </p>
          </div>
        </div>

        {/* Weekly Challenge */}
        <div className="bg-gradient-to-br from-purple-600 to-blue-600 p-6 rounded-2xl text-white">
          <h2 className="text-xl font-bold mb-4">Weekly Challenge</h2>
          <div className="mb-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm opacity-90">Study & Sweat Challenge</span>
              <span className="text-sm font-medium">6/7 days</span>
            </div>
            <div className="w-full bg-white/20 rounded-full h-2">
              <div className="bg-white h-2 rounded-full" style={{ width: '86%' }}></div>
            </div>
          </div>
          <p className="text-sm opacity-90 mb-4">
            Complete 30 minutes of exercise and 2 hours of focused study each day.
          </p>
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium">Reward: 500 XP + Badge</span>
            <Award className="w-5 h-5" />
          </div>
        </div>
      </div>

      {/* Weekly Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {weeklyStats.map((stat) => {
          const Icon = stat.icon;
          return (
            <div key={stat.label} className="bg-white p-6 rounded-2xl border border-gray-100">
              <div className="flex items-center justify-between mb-4">
                <div className={`w-10 h-10 ${stat.color === 'text-blue-600' ? 'bg-blue-100' : stat.color === 'text-purple-600' ? 'bg-purple-100' : stat.color === 'text-green-600' ? 'bg-green-100' : 'bg-orange-100'} rounded-lg flex items-center justify-center`}>
                  <Icon className={`w-5 h-5 ${stat.color}`} />
                </div>
                <TrendingUp className="w-4 h-4 text-green-500" />
              </div>
              <p className="text-2xl font-bold text-gray-900 mb-1">{stat.value}</p>
              <p className="text-sm text-gray-600 mb-1">{stat.label}</p>
              <p className="text-xs text-green-600">{stat.change}</p>
            </div>
          );
        })}
      </div>

      {/* Bottom Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Achievements */}
        <div className="bg-white p-6 rounded-2xl border border-gray-100">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Recent Achievements</h2>
          <div className="space-y-4">
            {recentAchievements.map((achievement, index) => (
              <div key={index} className="flex items-start space-x-3 p-3 bg-gray-50 rounded-xl">
                <span className="text-2xl">{achievement.icon}</span>
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-900">{achievement.title}</h3>
                  <p className="text-sm text-gray-600">{achievement.description}</p>
                  <p className="text-xs text-gray-500 mt-1">{achievement.date}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Upcoming Workouts */}
        <div className="bg-white p-6 rounded-2xl border border-gray-100">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-gray-900">Upcoming Workouts</h2>
            <Link
              to="/workouts"
              className="text-blue-600 hover:text-blue-700 text-sm font-medium"
            >
              View All
            </Link>
          </div>
          <div className="space-y-3">
            {upcomingWorkouts.map((workout, index) => (
              <div key={index} className="flex items-center space-x-3 p-3 border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors">
                <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg flex items-center justify-center">
                  <Dumbbell className="w-5 h-5 text-white" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-900">{workout.name}</h3>
                  <div className="flex items-center space-x-4 text-sm text-gray-600">
                    <span className="flex items-center space-x-1">
                      <Calendar className="w-4 h-4" />
                      <span>{workout.time}</span>
                    </span>
                    <span className="flex items-center space-x-1">
                      <Clock className="w-4 h-4" />
                      <span>{workout.duration}</span>
                    </span>
                  </div>
                </div>
                <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded-full">
                  {workout.type}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;