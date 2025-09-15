import React from 'react';
import { useUser } from '../../context/UserContext';
import { 
  Building2, 
  Users, 
  Star, 
  Calendar,
  TrendingUp,
  MessageSquare,
  MapPin,
  Clock,
  Target,
  Award,
  Plus,
  BarChart3
} from 'lucide-react';

export function GymDashboard() {
  const { user } = useUser();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Welcome Header */}
      <div className="mb-8">
        <div className="bg-gradient-to-r from-purple-600 to-indigo-600 rounded-2xl p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold mb-2">Welcome to {user?.name}! 🏢</h1>
              <p className="text-purple-100">Managing your fitness community ecosystem</p>
            </div>
            <div className="text-right">
              <div className="flex items-center justify-end mb-1">
                <Star size={20} className="text-yellow-300 mr-1" />
                <span className="text-2xl font-bold">4.8</span>
              </div>
              <div className="text-sm text-purple-100">Facility Rating</div>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatCard
          icon={<Users size={24} />}
          title="Active Members"
          value="342"
          color="bg-blue-500"
          bgColor="bg-blue-50"
          textColor="text-blue-600"
          trend="+12%"
        />
        <StatCard
          icon={<Calendar size={24} />}
          title="Classes Today"
          value="28"
          color="bg-green-500"
          bgColor="bg-green-50"
          textColor="text-green-600"
          trend="+5%"
        />
        <StatCard
          icon={<Star size={24} />}
          title="Avg. Rating"
          value="4.8"
          color="bg-yellow-500"
          bgColor="bg-yellow-50"
          textColor="text-yellow-600"
          trend="+0.2"
        />
        <StatCard
          icon={<TrendingUp size={24} />}
          title="Revenue"
          value="$12.5k"
          color="bg-purple-500"
          bgColor="bg-purple-50"
          textColor="text-purple-600"
          trend="+18%"
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
                Today's Class Schedule
              </h2>
              <button className="text-blue-600 hover:text-blue-700 font-medium">Add Class</button>
            </div>

            <div className="space-y-4">
              <ClassScheduleItem
                time="6:00 AM"
                title="Morning HIIT"
                trainer="Sarah Johnson"
                capacity={20}
                enrolled={18}
                status="active"
              />
              <ClassScheduleItem
                time="8:00 AM"
                title="Yoga Flow"
                trainer="Mike Chen"
                capacity={15}
                enrolled={12}
                status="upcoming"
              />
              <ClassScheduleItem
                time="12:00 PM"
                title="Strength Training"
                trainer="Alex Rodriguez"
                capacity={25}
                enrolled={25}
                status="full"
              />
              <ClassScheduleItem
                time="6:00 PM"
                title="Spin Class"
                trainer="Emma Davis"
                capacity={30}
                enrolled={28}
                status="upcoming"
              />
            </div>
          </div>

          {/* Member Analytics */}
          <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
            <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
              <BarChart3 size={24} className="text-purple-600 mr-2" />
              Member Analytics
            </h2>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-semibold text-gray-700 mb-3">Peak Hours</h3>
                <div className="space-y-2">
                  <HourBar hour="6-8 AM" usage={85} />
                  <HourBar hour="12-1 PM" usage={70} />
                  <HourBar hour="6-8 PM" usage={95} />
                  <HourBar hour="8-10 PM" usage={60} />
                </div>
              </div>
              <div>
                <h3 className="font-semibold text-gray-700 mb-3">Popular Classes</h3>
                <div className="space-y-2">
                  <PopularityBar activity="HIIT Training" popularity={92} />
                  <PopularityBar activity="Yoga" popularity={78} />
                  <PopularityBar activity="Strength Training" popularity={88} />
                  <PopularityBar activity="Cardio Classes" popularity={65} />
                </div>
              </div>
            </div>
          </div>

          {/* Recent Reviews */}
          <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
            <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
              <MessageSquare size={24} className="text-blue-600 mr-2" />
              Recent Member Reviews
            </h2>

            <div className="space-y-4">
              <ReviewItem
                name="Jessica Chen"
                rating={5}
                comment="Amazing facilities and great trainers! The new equipment is fantastic."
                time="2 hours ago"
                verified={true}
              />
              <ReviewItem
                name="David Wilson"
                rating={5}
                comment="Clean, well-maintained gym with excellent class variety."
                time="1 day ago"
                verified={true}
              />
              <ReviewItem
                name="Maria Garcia"
                rating={4}
                comment="Love the morning yoga classes. Peaceful environment."
                time="3 days ago"
                verified={false}
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
                icon={<Plus size={18} />}
                title="Add Class"
                subtitle="Schedule new session"
                color="bg-green-500 hover:bg-green-600"
              />
              <QuickActionButton
                icon={<Users size={18} />}
                title="Member Check-in"
                subtitle="View active members"
                color="bg-blue-500 hover:bg-blue-600"
              />
              <QuickActionButton
                icon={<MessageSquare size={18} />}
                title="Send Notice"
                subtitle="Notify all members"
                color="bg-purple-500 hover:bg-purple-600"
              />
            </div>
          </div>

          {/* Facilities Overview */}
          <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
            <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center">
              <Building2 size={20} className="text-gray-600 mr-2" />
              Facilities Status
            </h3>

            <div className="space-y-3">
              <FacilityStatus
                name="Cardio Section"
                status="operational"
                usage="High"
                color="text-green-600"
              />
              <FacilityStatus
                name="Weight Training"
                status="operational"
                usage="Medium"
                color="text-green-600"
              />
              <FacilityStatus
                name="Pool Area"
                status="maintenance"
                usage="Closed"
                color="text-orange-600"
              />
              <FacilityStatus
                name="Group Studios"
                status="operational"
                usage="High"
                color="text-green-600"
              />
            </div>
          </div>

          {/* Top Trainers */}
          <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
            <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center">
              <Award size={20} className="text-yellow-600 mr-2" />
              Top Trainers
            </h3>

            <div className="space-y-3">
              <TrainerRanking
                name="Sarah Johnson"
                speciality="HIIT Training"
                rating={4.9}
                sessions={245}
                rank={1}
              />
              <TrainerRanking
                name="Mike Chen"
                speciality="Yoga & Wellness"
                rating={4.8}
                sessions={198}
                rank={2}
              />
              <TrainerRanking
                name="Alex Rodriguez"
                speciality="Strength Training"
                rating={4.7}
                sessions={176}
                rank={3}
              />
            </div>
          </div>

          {/* Membership Trends */}
          <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
            <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center">
              <TrendingUp size={20} className="text-blue-600 mr-2" />
              Membership Trends
            </h3>

            <div className="space-y-4">
              <TrendItem
                period="This Month"
                newMembers={28}
                renewals={156}
                cancellations={8}
              />
              <div className="pt-3 border-t border-gray-200">
                <div className="text-sm text-gray-600 mb-2">Growth Rate</div>
                <div className="text-2xl font-bold text-green-600">+12.5%</div>
                <div className="text-xs text-gray-500">vs last month</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Helper Components
function StatCard({ icon, title, value, color, bgColor, textColor, trend }: {
  icon: React.ReactNode;
  title: string;
  value: string | number;
  color: string;
  bgColor: string;
  textColor: string;
  trend?: string;
}) {
  return (
    <div className={`${bgColor} rounded-xl p-6 border border-gray-100 hover:shadow-lg transition-all duration-200`}>
      <div className="flex items-center justify-between">
        <div>
          <p className="text-gray-600 text-sm font-medium">{title}</p>
          <p className={`text-2xl font-bold ${textColor} mt-1`}>{value}</p>
          {trend && (
            <p className="text-xs text-green-600 font-semibold mt-1">
              {trend} this month
            </p>
          )}
        </div>
        <div className={`${color} text-white p-3 rounded-lg`}>
          {icon}
        </div>
      </div>
    </div>
  );
}

function ClassScheduleItem({ time, title, trainer, capacity, enrolled, status }: {
  time: string;
  title: string;
  trainer: string;
  capacity: number;
  enrolled: number;
  status: 'active' | 'upcoming' | 'full';
}) {
  const getStatusColor = () => {
    switch (status) {
      case 'active': return 'border-green-200 bg-green-50';
      case 'upcoming': return 'border-blue-200 bg-blue-50';
      case 'full': return 'border-red-200 bg-red-50';
      default: return 'border-gray-200 bg-gray-50';
    }
  };

  const getStatusText = () => {
    switch (status) {
      case 'active': return 'In Progress';
      case 'upcoming': return 'Upcoming';
      case 'full': return 'Full';
      default: return 'Scheduled';
    }
  };

  return (
    <div className={`flex items-center p-4 rounded-lg border-2 ${getStatusColor()}`}>
      <div className="mr-4">
        <div className="text-sm font-semibold text-gray-900">{time}</div>
        <div className={`text-xs px-2 py-1 rounded-full mt-1 ${
          status === 'active' ? 'bg-green-100 text-green-800' :
          status === 'full' ? 'bg-red-100 text-red-800' :
          'bg-blue-100 text-blue-800'
        }`}>
          {getStatusText()}
        </div>
      </div>
      <div className="flex-1">
        <div className="font-medium text-gray-900">{title}</div>
        <div className="text-sm text-gray-600">with {trainer}</div>
      </div>
      <div className="text-right">
        <div className="text-sm font-semibold text-gray-900">{enrolled}/{capacity}</div>
        <div className="text-xs text-gray-500">enrolled</div>
      </div>
    </div>
  );
}

function HourBar({ hour, usage }: { hour: string; usage: number }) {
  return (
    <div className="flex items-center justify-between">
      <span className="text-sm text-gray-600 w-16">{hour}</span>
      <div className="flex-1 mx-3">
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div 
            className="bg-gradient-to-r from-purple-500 to-blue-500 h-2 rounded-full"
            style={{ width: `${usage}%` }}
          ></div>
        </div>
      </div>
      <span className="text-sm font-semibold text-gray-700 w-8">{usage}%</span>
    </div>
  );
}

function PopularityBar({ activity, popularity }: { activity: string; popularity: number }) {
  return (
    <div className="flex items-center justify-between">
      <span className="text-sm text-gray-600 w-24">{activity}</span>
      <div className="flex-1 mx-3">
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div 
            className="bg-gradient-to-r from-green-500 to-blue-500 h-2 rounded-full"
            style={{ width: `${popularity}%` }}
          ></div>
        </div>
      </div>
      <span className="text-sm font-semibold text-gray-700 w-8">{popularity}%</span>
    </div>
  );
}

function ReviewItem({ name, rating, comment, time, verified }: {
  name: string;
  rating: number;
  comment: string;
  time: string;
  verified: boolean;
}) {
  return (
    <div className="p-4 border border-gray-200 rounded-lg hover:shadow-md transition-all duration-200">
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center">
          <div className="font-medium text-gray-900">{name}</div>
          {verified && (
            <div className="ml-2 w-4 h-4 bg-blue-500 rounded-full flex items-center justify-center">
              <div className="w-2 h-2 bg-white rounded-full"></div>
            </div>
          )}
        </div>
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

function FacilityStatus({ name, status, usage, color }: {
  name: string;
  status: 'operational' | 'maintenance';
  usage: string;
  color: string;
}) {
  return (
    <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
      <div>
        <div className="font-medium text-gray-900 text-sm">{name}</div>
        <div className={`text-xs ${color} font-semibold`}>
          {status === 'operational' ? '● Operational' : '● Maintenance'}
        </div>
      </div>
      <div className="text-sm text-gray-600">{usage}</div>
    </div>
  );
}

function TrainerRanking({ name, speciality, rating, sessions, rank }: {
  name: string;
  speciality: string;
  rating: number;
  sessions: number;
  rank: number;
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
    <div className="flex items-center p-3 bg-gray-50 rounded-lg">
      <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold mr-3 ${getRankColor()}`}>
        {rank}
      </div>
      <div className="flex-1">
        <div className="font-medium text-gray-900 text-sm">{name}</div>
        <div className="text-xs text-gray-600">{speciality}</div>
      </div>
      <div className="text-right">
        <div className="flex items-center text-sm">
          <Star size={12} className="text-yellow-400 fill-current mr-1" />
          {rating}
        </div>
        <div className="text-xs text-gray-500">{sessions} sessions</div>
      </div>
    </div>
  );
}

function TrendItem({ period, newMembers, renewals, cancellations }: {
  period: string;
  newMembers: number;
  renewals: number;
  cancellations: number;
}) {
  return (
    <div>
      <div className="text-sm font-semibold text-gray-700 mb-2">{period}</div>
      <div className="grid grid-cols-3 gap-2 text-xs">
        <div className="text-center p-2 bg-green-50 rounded">
          <div className="text-green-600 font-bold">{newMembers}</div>
          <div className="text-gray-600">New</div>
        </div>
        <div className="text-center p-2 bg-blue-50 rounded">
          <div className="text-blue-600 font-bold">{renewals}</div>
          <div className="text-gray-600">Renewed</div>
        </div>
        <div className="text-center p-2 bg-red-50 rounded">
          <div className="text-red-600 font-bold">{cancellations}</div>
          <div className="text-gray-600">Left</div>
        </div>
      </div>
    </div>
  );
}