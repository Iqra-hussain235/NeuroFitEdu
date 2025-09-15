import React, { useState } from 'react';
import { 
  MapPin, 
  Star, 
  Clock, 
  Users, 
  Dumbbell,
  Heart,
  Phone,
  Globe,
  Filter,
  Search,
  ChevronRight,
  Award
} from 'lucide-react';

type GymCategory = 'all' | 'traditional' | 'boutique' | 'university' | 'chain';

interface Gym {
  id: string;
  name: string;
  category: GymCategory;
  location: string;
  distance: number;
  rating: number;
  reviewCount: number;
  image: string;
  facilities: string[];
  classes: string[];
  trainers: number;
  members: number;
  hours: string;
  phone: string;
  website?: string;
  priceRange: '$' | '$$' | '$$$';
  specialties: string[];
  verified: boolean;
  promoted?: boolean;
}

export function GymsDirectory() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<GymCategory>('all');
  const [sortBy, setSortBy] = useState<'rating' | 'distance' | 'members'>('rating');
  const [showFilters, setShowFilters] = useState(false);

  const gyms: Gym[] = [
    {
      id: '1',
      name: 'FitLife Premium Gym',
      category: 'traditional',
      location: 'Downtown Campus Area',
      distance: 0.3,
      rating: 4.8,
      reviewCount: 234,
      image: 'https://images.pexels.com/photos/1552252/pexels-photo-1552252.jpeg?auto=compress&cs=tinysrgb&w=400',
      facilities: ['Cardio Equipment', 'Weight Training', 'Group Studios', 'Pool', 'Sauna', 'Locker Rooms'],
      classes: ['HIIT', 'Yoga', 'Spin', 'Strength Training', 'Pilates', 'Zumba'],
      trainers: 12,
      members: 450,
      hours: '5:00 AM - 11:00 PM',
      phone: '(555) 123-4567',
      website: 'fitlifepremium.com',
      priceRange: '$$',
      specialties: ['Student Discounts', 'Academic Wellness Programs', 'Study Break Classes'],
      verified: true,
      promoted: true
    },
    {
      id: '2',
      name: 'University Wellness Center',
      category: 'university',
      location: 'Main Campus',
      distance: 0.1,
      rating: 4.6,
      reviewCount: 189,
      image: 'https://images.pexels.com/photos/1229356/pexels-photo-1229356.jpeg?auto=compress&cs=tinysrgb&w=400',
      facilities: ['Modern Cardio', 'Free Weights', 'Group Exercise', 'Rock Climbing', 'Basketball Courts'],
      classes: ['Academic Athlete Training', 'Stress Relief Yoga', 'Study Break HIIT'],
      trainers: 8,
      members: 1200,
      hours: '6:00 AM - 10:00 PM',
      phone: '(555) 234-5678',
      priceRange: '$',
      specialties: ['Student Focused', 'Academic Support', 'Mental Health Programs'],
      verified: true
    },
    {
      id: '3',
      name: 'Zen Studio & Wellness',
      category: 'boutique',
      location: 'Arts District',
      distance: 0.7,
      rating: 4.9,
      reviewCount: 156,
      image: 'https://images.pexels.com/photos/3822647/pexels-photo-3822647.jpeg?auto=compress&cs=tinysrgb&w=400',
      facilities: ['Yoga Studios', 'Meditation Rooms', 'Massage Therapy', 'Juice Bar'],
      classes: ['Mindful Yoga', 'Meditation', 'Tai Chi', 'Breathwork', 'Sound Healing'],
      trainers: 6,
      members: 120,
      hours: '7:00 AM - 9:00 PM',
      phone: '(555) 345-6789',
      website: 'zenstudiowellness.com',
      priceRange: '$$$',
      specialties: ['Mental Wellness', 'Academic Stress Relief', 'Mindfulness Training'],
      verified: true
    },
    {
      id: '4',
      name: 'IronCore Fitness',
      category: 'traditional',
      location: 'Student Housing District',
      distance: 0.5,
      rating: 4.5,
      reviewCount: 287,
      image: 'https://images.pexels.com/photos/2247179/pexels-photo-2247179.jpeg?auto=compress&cs=tinysrgb&w=400',
      facilities: ['Heavy Lifting Area', 'Cardio Zone', 'Functional Training', 'Boxing Ring'],
      classes: ['Strength Training', 'Boxing', 'CrossFit', 'Powerlifting'],
      trainers: 10,
      members: 380,
      hours: '24/7 Access',
      phone: '(555) 456-7890',
      priceRange: '$$',
      specialties: ['Strength Training', '24/7 Access', 'Competition Prep'],
      verified: true
    },
    {
      id: '5',
      name: 'FlexFit Chain - Campus Location',
      category: 'chain',
      location: 'University Village',
      distance: 0.4,
      rating: 4.3,
      reviewCount: 445,
      image: 'https://images.pexels.com/photos/1552242/pexels-photo-1552242.jpeg?auto=compress&cs=tinysrgb&w=400',
      facilities: ['Modern Equipment', 'Group Studios', 'Childcare', 'Juice Bar', 'Physical Therapy'],
      classes: ['Group Fitness', 'Personal Training', 'Nutrition Coaching'],
      trainers: 15,
      members: 650,
      hours: '5:00 AM - 12:00 AM',
      phone: '(555) 567-8901',
      website: 'flexfitchain.com',
      priceRange: '$',
      specialties: ['Student Rates', 'Flexible Memberships', 'Nationwide Access'],
      verified: true
    }
  ];

  const filteredGyms = gyms
    .filter(gym => {
      const matchesSearch = gym.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           gym.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           gym.specialties.some(s => s.toLowerCase().includes(searchTerm.toLowerCase()));
      const matchesCategory = selectedCategory === 'all' || gym.category === selectedCategory;
      return matchesSearch && matchesCategory;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'rating': return b.rating - a.rating;
        case 'distance': return a.distance - b.distance;
        case 'members': return b.members - a.members;
        default: return 0;
      }
    });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          <span className="text-blue-600">🏢</span> Gyms & Fitness Centers
        </h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Discover verified fitness facilities near campus with student-friendly programs and academic wellness integration
        </p>
      </div>

      {/* Search and Filters */}
      <div className="bg-white rounded-2xl shadow-lg p-6 mb-8 border border-gray-100">
        <div className="flex flex-col lg:flex-row gap-4">
          {/* Search Bar */}
          <div className="flex-1 relative">
            <Search size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search gyms, locations, or specialties..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          {/* Category Filter */}
          <div className="grid grid-cols-5 gap-2 lg:w-auto">
            <CategoryButton
              active={selectedCategory === 'all'}
              onClick={() => setSelectedCategory('all')}
              label="All"
              count={gyms.length}
            />
            <CategoryButton
              active={selectedCategory === 'university'}
              onClick={() => setSelectedCategory('university')}
              label="University"
              count={gyms.filter(g => g.category === 'university').length}
            />
            <CategoryButton
              active={selectedCategory === 'traditional'}
              onClick={() => setSelectedCategory('traditional')}
              label="Traditional"
              count={gyms.filter(g => g.category === 'traditional').length}
            />
            <CategoryButton
              active={selectedCategory === 'boutique'}
              onClick={() => setSelectedCategory('boutique')}
              label="Boutique"
              count={gyms.filter(g => g.category === 'boutique').length}
            />
            <CategoryButton
              active={selectedCategory === 'chain'}
              onClick={() => setSelectedCategory('chain')}
              label="Chain"
              count={gyms.filter(g => g.category === 'chain').length}
            />
          </div>

          {/* Sort Dropdown */}
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as any)}
            className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="rating">Sort by Rating</option>
            <option value="distance">Sort by Distance</option>
            <option value="members">Sort by Popularity</option>
          </select>
        </div>
      </div>

      <div className="grid lg:grid-cols-4 gap-8">
        {/* Gym Listings */}
        <div className="lg:col-span-3">
          <div className="space-y-6">
            {filteredGyms.map((gym) => (
              <GymCard key={gym.id} gym={gym} />
            ))}
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Map Placeholder */}
          <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
            <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center">
              <MapPin size={20} className="text-red-600 mr-2" />
              Nearby Locations
            </h3>
            <div className="bg-gray-100 rounded-lg h-48 flex items-center justify-center">
              <div className="text-center text-gray-500">
                <MapPin size={48} className="mx-auto mb-2" />
                <p className="text-sm">Interactive map coming soon</p>
              </div>
            </div>
          </div>

          {/* Popular Facilities */}
          <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
            <h3 className="text-lg font-bold text-gray-900 mb-4">Popular Facilities</h3>
            
            <div className="space-y-3">
              <FacilityItem name="Cardio Equipment" count={5} />
              <FacilityItem name="Group Classes" count={4} />
              <FacilityItem name="Weight Training" count={4} />
              <FacilityItem name="Pool" count={2} />
              <FacilityItem name="Sauna" count={2} />
            </div>
          </div>

          {/* Student Benefits */}
          <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
            <h3 className="text-lg font-bold text-gray-900 mb-4">Student Benefits</h3>
            
            <div className="space-y-3">
              <BenefitItem 
                icon="🎓"
                title="Student Discounts"
                description="Up to 50% off memberships"
              />
              <BenefitItem 
                icon="📚"
                title="Study-Friendly Hours"
                description="Extended hours during exams"
              />
              <BenefitItem 
                icon="🧠"
                title="Academic Wellness"
                description="Specialized programs for students"
              />
            </div>
          </div>

          {/* Quick Stats */}
          <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
            <h3 className="text-lg font-bold text-gray-900 mb-4">Directory Stats</h3>
            
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Total Gyms</span>
                <span className="font-semibold text-gray-900">{gyms.length}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Verified Facilities</span>
                <span className="font-semibold text-gray-900">{gyms.filter(g => g.verified).length}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Avg. Rating</span>
                <span className="font-semibold text-gray-900">4.6★</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Helper Components
function CategoryButton({ active, onClick, label, count }: {
  active: boolean;
  onClick: () => void;
  label: string;
  count: number;
}) {
  return (
    <button
      onClick={onClick}
      className={`px-3 py-2 rounded-lg font-medium transition-all duration-200 text-sm ${
        active 
          ? 'bg-blue-600 text-white shadow-lg transform scale-105' 
          : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
      }`}
    >
      <div className="text-center">
        <div>{label}</div>
        <div className="text-xs opacity-75">({count})</div>
      </div>
    </button>
  );
}

function GymCard({ gym }: { gym: Gym }) {
  return (
    <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden hover:shadow-xl transition-all duration-200">
      {/* Header with Image and Basic Info */}
      <div className="relative">
        <img 
          src={gym.image} 
          alt={gym.name}
          className="w-full h-48 object-cover"
        />
        {gym.promoted && (
          <div className="absolute top-4 left-4 bg-orange-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
            Promoted
          </div>
        )}
        {gym.verified && (
          <div className="absolute top-4 right-4 bg-blue-500 text-white p-2 rounded-full">
            <Award size={16} />
          </div>
        )}
        <div className="absolute bottom-4 left-4 bg-black bg-opacity-70 text-white px-3 py-1 rounded-full text-sm">
          {gym.distance} miles away
        </div>
      </div>

      <div className="p-6">
        {/* Name and Rating */}
        <div className="flex items-start justify-between mb-3">
          <div>
            <h3 className="text-xl font-bold text-gray-900 mb-1">{gym.name}</h3>
            <div className="flex items-center text-sm text-gray-500">
              <MapPin size={16} className="mr-1" />
              {gym.location}
            </div>
          </div>
          <div className="text-right">
            <div className="flex items-center">
              <Star size={16} className="text-yellow-400 fill-current mr-1" />
              <span className="font-bold text-gray-900">{gym.rating}</span>
              <span className="text-gray-500 ml-1">({gym.reviewCount})</span>
            </div>
            <div className="text-sm text-gray-500">{gym.priceRange} price range</div>
          </div>
        </div>

        {/* Specialties */}
        <div className="flex flex-wrap gap-2 mb-4">
          {gym.specialties.slice(0, 3).map((specialty, index) => (
            <span key={index} className="px-3 py-1 bg-green-100 text-green-800 text-xs rounded-full font-medium">
              {specialty}
            </span>
          ))}
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4 mb-4">
          <div className="text-center">
            <div className="flex items-center justify-center text-blue-600 mb-1">
              <Users size={16} className="mr-1" />
            </div>
            <div className="text-sm font-semibold text-gray-900">{gym.members}</div>
            <div className="text-xs text-gray-500">Members</div>
          </div>
          <div className="text-center">
            <div className="flex items-center justify-center text-orange-600 mb-1">
              <Dumbbell size={16} className="mr-1" />
            </div>
            <div className="text-sm font-semibold text-gray-900">{gym.trainers}</div>
            <div className="text-xs text-gray-500">Trainers</div>
          </div>
          <div className="text-center">
            <div className="flex items-center justify-center text-purple-600 mb-1">
              <Clock size={16} className="mr-1" />
            </div>
            <div className="text-xs text-gray-900 font-semibold">{gym.hours}</div>
          </div>
        </div>

        {/* Facilities */}
        <div className="mb-4">
          <h4 className="font-semibold text-gray-900 mb-2">Top Facilities</h4>
          <div className="flex flex-wrap gap-1">
            {gym.facilities.slice(0, 4).map((facility, index) => (
              <span key={index} className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded">
                {facility}
              </span>
            ))}
            {gym.facilities.length > 4 && (
              <span className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded">
                +{gym.facilities.length - 4} more
              </span>
            )}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3 text-sm">
            <button className="flex items-center text-gray-600 hover:text-gray-900">
              <Phone size={16} className="mr-1" />
              Call
            </button>
            {gym.website && (
              <button className="flex items-center text-gray-600 hover:text-gray-900">
                <Globe size={16} className="mr-1" />
                Website
              </button>
            )}
            <button className="flex items-center text-red-600 hover:text-red-700">
              <Heart size={16} className="mr-1" />
              Save
            </button>
          </div>
          
          <button className="px-6 py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transform hover:scale-105 transition-all duration-200 shadow-md hover:shadow-lg flex items-center">
            View Details
            <ChevronRight size={16} className="ml-1" />
          </button>
        </div>
      </div>
    </div>
  );
}

function FacilityItem({ name, count }: { name: string; count: number }) {
  return (
    <div className="flex justify-between items-center py-2">
      <span className="text-gray-600">{name}</span>
      <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs font-semibold">
        {count} gyms
      </span>
    </div>
  );
}

function BenefitItem({ icon, title, description }: {
  icon: string;
  title: string;
  description: string;
}) {
  return (
    <div className="flex items-start p-3 bg-green-50 rounded-lg">
      <span className="text-2xl mr-3">{icon}</span>
      <div>
        <div className="font-medium text-gray-900 text-sm">{title}</div>
        <div className="text-xs text-gray-600">{description}</div>
      </div>
    </div>
  );
}