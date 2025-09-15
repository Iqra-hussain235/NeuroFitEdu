import React, { useState } from 'react';
import { User, Dumbbell, Building2, ChevronRight, ChevronLeft, Check } from 'lucide-react';
import { useUser, UserRole } from '../../context/UserContext';

interface SignupFlowProps {
  onComplete: (role?: UserRole) => void; // Updated type to accept optional UserRole
  onSwitchToLogin: () => void;
}

type Step = 'role' | 'details' | 'preferences' | 'complete';

export function SignupFlow({ onComplete, onSwitchToLogin }: SignupFlowProps) {
  const [currentStep, setCurrentStep] = useState<Step>('role');
  const [selectedRole, setSelectedRole] = useState<UserRole | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    // Student fields
    academicLevel: '',
    subjects: [] as string[],
    studyGoals: [] as string[],
    // Trainer fields
    certifications: [] as string[],
    specialties: [] as string[],
    experience: '',
    // Gym fields
    gymName: '',
    location: '',
    facilities: [] as string[]
  });

  const { setUser } = useUser();

  const handleRoleSelect = (role: UserRole) => {
    setSelectedRole(role);
  };

  const handleNext = () => {
    if (currentStep === 'role' && selectedRole) {
      setCurrentStep('details');
    } else if (currentStep === 'details') {
      setCurrentStep('preferences');
    } else if (currentStep === 'preferences') {
      handleComplete();
    }
  };

  const handleComplete = () => {
    // Create user object
    const newUser = {
      id: Math.random().toString(36).substr(2, 9),
      name: selectedRole === 'gym' ? formData.gymName : formData.name,
      email: formData.email,
      role: selectedRole!,
      points: 0,
      level: 1,
      streak: 0,
      achievements: [],
      ...(selectedRole === 'student' && {
        academicLevel: formData.academicLevel,
        subjects: formData.subjects,
        studyGoals: formData.studyGoals
      }),
      ...(selectedRole === 'trainer' && {
        certifications: formData.certifications,
        specialties: formData.specialties,
        rating: 5.0
      }),
      ...(selectedRole === 'gym' && {
        location: formData.location,
        facilities: formData.facilities,
        classes: []
      })
    };

    setUser(newUser);
    setCurrentStep('complete');
    setTimeout(() => {
        onComplete(selectedRole || 'student'); // Pass the role to App, fallback to 'student'
    }, 2000);
  };

  const renderRoleSelection = () => (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-3xl font-bold text-gray-900 mb-2">Choose Your Role</h2>
        <p className="text-gray-600">Select how you'll be using NeuroFitEdu</p>
      </div>

      <div className="grid gap-4">
        <RoleCard
          icon={<User size={32} />}
          title="Student"
          description="Focus on academics and fitness with AI-powered guidance"
          features={["Personalized study plans", "Fitness tracking", "Academic challenges", "AI coaching"]}
          isSelected={selectedRole === 'student'}
          onClick={() => handleRoleSelect('student')}
        />
        <RoleCard
          icon={<Dumbbell size={32} />}
          title="Trainer"
          description="Guide students and create engaging workout programs"
          features={["Create workout plans", "Track client progress", "Live coaching", "Build reputation"]}
          isSelected={selectedRole === 'trainer'}
          onClick={() => handleRoleSelect('trainer')}
        />
        <RoleCard
          icon={<Building2 size={32} />}
          title="Gym/Institution"
          description="Manage facilities and connect with students and trainers"
          features={["Manage facilities", "List classes", "Connect with users", "Analytics dashboard"]}
          isSelected={selectedRole === 'gym'}
          onClick={() => handleRoleSelect('gym')}
        />
      </div>
    </div>
  );

  const renderDetailsForm = () => (
    <div className={`space-y-6 ${selectedRole === 'gym' ? 'max-w-2xl mx-auto w-full' : ''}`}>
      <div className="text-center w-full">
        <h2 className="text-3xl font-bold text-gray-900 mb-2">
          {selectedRole === 'student' ? 'Student Details' :
           selectedRole === 'trainer' ? 'Trainer Details' : 'Gym Details'}
        </h2>
        <p className="text-gray-600">Tell us more about yourself</p>
      </div>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            {selectedRole === 'gym' ? 'Gym Name' : 'Full Name'}
          </label>
          <input
            type="text"
            value={selectedRole === 'gym' ? formData.gymName : formData.name}
            onChange={(e) => setFormData({
              ...formData,
              [selectedRole === 'gym' ? 'gymName' : 'name']: e.target.value
            })}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder={selectedRole === 'gym' ? 'Enter gym name' : 'Enter your full name'}
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
          <input
            type="email"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Enter your email"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Password</label>
          <input
            type="password"
            value={formData.password}
            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Create a password"
            required
          />
        </div>

        {selectedRole === 'student' && (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Academic Level</label>
            <select
              value={formData.academicLevel}
              onChange={(e) => setFormData({ ...formData, academicLevel: e.target.value })}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="">Select level</option>
              <option value="high-school">High School</option>
              <option value="undergraduate">Undergraduate</option>
              <option value="graduate">Graduate</option>
              <option value="postgraduate">Postgraduate</option>
            </select>
          </div>
        )}

        {selectedRole === 'gym' && (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Location</label>
            <input
              type="text"
              value={formData.location}
              onChange={(e) => setFormData({ ...formData, location: e.target.value })}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="City, State"
            />
          </div>
        )}
      </div>
    </div>
  );

  const renderPreferences = () => (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-3xl font-bold text-gray-900 mb-2">Preferences</h2>
        <p className="text-gray-600">Help us personalize your experience</p>
      </div>

      {selectedRole === 'student' && (
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">Subjects of Interest</label>
            <div className="grid grid-cols-2 gap-2">
              {['Math', 'Science', 'English', 'History', 'Arts', 'Computer Science'].map((subject) => (
                <label key={subject} className="flex items-center">
                  <input
                    type="checkbox"
                    checked={formData.subjects.includes(subject)}
                    onChange={(e) => {
                      if (e.target.checked) {
                        setFormData({ ...formData, subjects: [...formData.subjects, subject] });
                      } else {
                        setFormData({ ...formData, subjects: formData.subjects.filter(s => s !== subject) });
                      }
                    }}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded mr-2"
                  />
                  <span className="text-sm text-gray-700">{subject}</span>
                </label>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">Study Goals</label>
            <div className="space-y-2">
              {['Improve Focus', 'Better Time Management', 'Reduce Stress', 'Increase Energy'].map((goal) => (
                <label key={goal} className="flex items-center">
                  <input
                    type="checkbox"
                    checked={formData.studyGoals.includes(goal)}
                    onChange={(e) => {
                      if (e.target.checked) {
                        setFormData({ ...formData, studyGoals: [...formData.studyGoals, goal] });
                      } else {
                        setFormData({ ...formData, studyGoals: formData.studyGoals.filter(g => g !== goal) });
                      }
                    }}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded mr-2"
                  />
                  <span className="text-sm text-gray-700">{goal}</span>
                </label>
              ))}
            </div>
          </div>
        </div>
      )}

      {selectedRole === 'trainer' && (
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">Specialties</label>
            <div className="grid grid-cols-2 gap-2">
              {['Strength Training', 'Yoga', 'Cardio', 'Nutrition', 'Mental Wellness', 'Sports'].map((specialty) => (
                <label key={specialty} className="flex items-center">
                  <input
                    type="checkbox"
                    checked={formData.specialties.includes(specialty)}
                    onChange={(e) => {
                      if (e.target.checked) {
                        setFormData({ ...formData, specialties: [...formData.specialties, specialty] });
                      } else {
                        setFormData({ ...formData, specialties: formData.specialties.filter(s => s !== specialty) });
                      }
                    }}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded mr-2"
                  />
                  <span className="text-sm text-gray-700">{specialty}</span>
                </label>
              ))}
            </div>
          </div>
        </div>
      )}

      {selectedRole === 'gym' && (
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-3">Facilities</label>
          <div className="grid grid-cols-2 gap-2">
            {['Cardio Equipment', 'Weight Training', 'Group Classes', 'Pool', 'Sauna', 'Personal Training'].map((facility) => (
              <label key={facility} className="flex items-center">
                <input
                  type="checkbox"
                  checked={formData.facilities.includes(facility)}
                  onChange={(e) => {
                    if (e.target.checked) {
                      setFormData({ ...formData, facilities: [...formData.facilities, facility] });
                    } else {
                      setFormData({ ...formData, facilities: formData.facilities.filter(f => f !== facility) });
                    }
                  }}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded mr-2"
                />
                <span className="text-sm text-gray-700">{facility}</span>
              </label>
            ))}
          </div>
        </div>
      )}
    </div>
  );

  const renderComplete = () => (
    <div className="text-center space-y-6">
      <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto">
        <Check size={40} className="text-green-600" />
      </div>
      <h2 className="text-3xl font-bold text-gray-900">Welcome to NeuroFitEdu!</h2>
      <p className="text-gray-600">Your account has been created successfully. Redirecting to your dashboard...</p>
      <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto"></div>
    </div>
  );

  const canProceed = () => {
    if (currentStep === 'role') return selectedRole !== null;
    if (currentStep === 'details') {
      if (selectedRole === 'gym') {
        return formData.gymName.trim() !== '' && formData.email.trim() !== '' && formData.password.trim() !== '';
      }
      return formData.name.trim() !== '' && formData.email.trim() !== '' && formData.password.trim() !== '';
    }
    return true;
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-2xl">
        <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
          {/* Progress Bar */}
          {currentStep !== 'complete' && (
            <div className="mb-8">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-gray-600">
                  Step {currentStep === 'role' ? '1' : currentStep === 'details' ? '2' : '3'} of 3
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-gradient-to-r from-blue-600 to-green-500 h-2 rounded-full transition-all duration-500"
                  style={{
                    width: `${currentStep === 'role' ? 33 : currentStep === 'details' ? 66 : 100}%`
                  }}
                ></div>
              </div>
            </div>
          )}

          {currentStep === 'role' && renderRoleSelection()}
          {currentStep === 'details' && renderDetailsForm()}
          {currentStep === 'preferences' && renderPreferences()}
          {currentStep === 'complete' && renderComplete()}

          {currentStep !== 'complete' && (
            <div className="flex items-center justify-between mt-8">
              <button
                onClick={() => {
                  if (currentStep === 'details') setCurrentStep('role');
                  else if (currentStep === 'preferences') setCurrentStep('details');
                }}
                className={`flex items-center px-6 py-3 text-gray-600 hover:text-gray-900 transition-colors ${
                  currentStep === 'role' ? 'invisible' : ''
                }`}
              >
                <ChevronLeft size={20} className="mr-1" />
                Back
              </button>

              <button
                onClick={handleNext}
                disabled={!canProceed()}
                className="flex items-center px-8 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-semibold rounded-lg hover:from-blue-700 hover:to-blue-800 transform hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {currentStep === 'preferences' ? 'Complete' : 'Next'}
                <ChevronRight size={20} className="ml-1" />
              </button>
            </div>
          )}

          <div className="mt-8 text-center text-sm text-gray-600">
            Already have an account?{' '}
            <button
              onClick={onSwitchToLogin}
              className="text-blue-600 hover:text-blue-700 font-medium"
            >
              Sign in here
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function RoleCard({ icon, title, description, features, isSelected, onClick }: {
  icon: React.ReactNode;
  title: string;
  description: string;
  features: string[];
  isSelected: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={`w-full p-6 rounded-xl border-2 text-left transition-all duration-200 transform hover:scale-[1.02] ${
        isSelected
          ? 'border-blue-500 bg-blue-50 shadow-lg'
          : 'border-gray-200 hover:border-gray-300 hover:shadow-md'
      }`}
    >
      <div className="flex items-start">
        <div className={`p-3 rounded-lg mr-4 ${
          isSelected ? 'bg-blue-100 text-blue-600' : 'bg-gray-100 text-gray-600'
        }`}>
          {icon}
        </div>
        <div className="flex-1">
          <h3 className="text-xl font-bold text-gray-900 mb-2">{title}</h3>
          <p className="text-gray-600 mb-3">{description}</p>
          <ul className="space-y-1">
            {features.map((feature, index) => (
              <li key={index} className="text-sm text-gray-500 flex items-center">
                <div className="w-1.5 h-1.5 bg-blue-400 rounded-full mr-2"></div>
                {feature}
              </li>
            ))}
          </ul>
        </div>
        {isSelected && (
          <div className="text-blue-600">
            <Check size={24} />
          </div>
        )}
      </div>
    </button>
  );
}