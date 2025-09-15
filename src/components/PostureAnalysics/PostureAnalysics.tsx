import React, { useState } from 'react';
import { 
  Camera, 
  Upload, 
  CheckCircle, 
  AlertTriangle, 
  Info,
  Target,
  Activity,
  RotateCw,
  Download
} from 'lucide-react';

export const PostureAnalysis = () => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisComplete, setAnalysisComplete] = useState(false);

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setSelectedImage(e.target?.result as string);
        setAnalysisComplete(false);
      };
      reader.readAsDataURL(file);
    }
  };

  const analyzePosture = () => {
    if (!selectedImage) return;
    
    setIsAnalyzing(true);
    // Simulate analysis time
    setTimeout(() => {
      setIsAnalyzing(false);
      setAnalysisComplete(true);
    }, 3000);
  };

  const analysisResults = {
    overallScore: 78,
    issues: [
      {
        area: 'Shoulder Alignment',
        severity: 'moderate',
        description: 'Right shoulder is slightly elevated',
        recommendation: 'Perform shoulder blade squeezes daily'
      },
      {
        area: 'Neck Position',
        severity: 'minor',
        description: 'Forward head posture detected',
        recommendation: 'Take breaks from screen time every 30 minutes'
      },
      {
        area: 'Spine Curvature',
        severity: 'good',
        description: 'Natural spine alignment maintained',
        recommendation: 'Continue current posture habits'
      }
    ],
    recommendations: [
      'Perform neck stretches 3x daily',
      'Strengthen upper back muscles',
      'Use ergonomic workspace setup',
      'Take movement breaks every hour'
    ]
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'good':
        return 'text-green-600 bg-green-100';
      case 'minor':
        return 'text-yellow-600 bg-yellow-100';
      case 'moderate':
        return 'text-orange-600 bg-orange-100';
      case 'severe':
        return 'text-red-600 bg-red-100';
      default:
        return 'text-gray-600 bg-gray-100';
    }
  };

  const getSeverityIcon = (severity: string) => {
    switch (severity) {
      case 'good':
        return <CheckCircle className="w-5 h-5" />;
      case 'minor':
      case 'moderate':
        return <AlertTriangle className="w-5 h-5" />;
      case 'severe':
        return <AlertTriangle className="w-5 h-5" />;
      default:
        return <Info className="w-5 h-5" />;
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Posture Analysis</h1>
        <p className="text-gray-600">
          Use AI-powered image processing to analyze your posture and get personalized correction recommendations
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Image Upload Section */}
        <div className="bg-white rounded-2xl border border-gray-100 p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Upload or Capture Image</h2>
          
          {!selectedImage ? (
            <div className="border-2 border-dashed border-gray-300 rounded-xl p-12 text-center hover:border-blue-400 transition-colors">
              <Camera className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">Capture Your Posture</h3>
              <p className="text-gray-600 mb-6">
                Take a side-view photo or upload an existing image for analysis
              </p>
              <div className="space-y-3">
                <label className="block">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                  />
                  <div className="bg-blue-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-blue-700 transition-colors cursor-pointer inline-flex items-center space-x-2">
                    <Upload className="w-5 h-5" />
                    <span>Upload Image</span>
                  </div>
                </label>
                <p className="text-sm text-gray-500">
                  Supported formats: JPG, PNG, WebP (max 10MB)
                </p>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="relative">
                <img
                  src={selectedImage}
                  alt="Posture analysis"
                  className="w-full h-64 object-cover rounded-xl"
                />
                {analysisComplete && (
                  <div className="absolute inset-0 bg-black/20 rounded-xl flex items-center justify-center">
                    <div className="bg-white rounded-lg p-4 text-center">
                      <CheckCircle className="w-8 h-8 text-green-500 mx-auto mb-2" />
                      <p className="font-medium text-gray-900">Analysis Complete!</p>
                    </div>
                  </div>
                )}
              </div>
              
              <div className="flex space-x-3">
                <button
                  onClick={analyzePosture}
                  disabled={isAnalyzing || analysisComplete}
                  className="flex-1 bg-blue-600 text-white py-3 rounded-xl font-semibold hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
                >
                  {isAnalyzing ? (
                    <>
                      <RotateCw className="w-5 h-5 animate-spin" />
                      <span>Analyzing...</span>
                    </>
                  ) : (
                    <>
                      <Activity className="w-5 h-5" />
                      <span>Analyze Posture</span>
                    </>
                  )}
                </button>
                
                <label className="block">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                  />
                  <div className="px-4 py-3 border border-gray-300 rounded-xl text-gray-700 hover:bg-gray-50 transition-colors cursor-pointer flex items-center">
                    <Upload className="w-5 h-5" />
                  </div>
                </label>
              </div>
            </div>
          )}

          {/* Instructions */}
          <div className="mt-6 p-4 bg-blue-50 rounded-xl">
            <h4 className="font-medium text-blue-900 mb-2">For Best Results:</h4>
            <ul className="text-sm text-blue-800 space-y-1">
              <li>• Stand naturally against a plain background</li>
              <li>• Ensure good lighting on your full body</li>
              <li>• Take the photo from your side profile</li>
              <li>• Wear form-fitting clothes</li>
            </ul>
          </div>
        </div>

        {/* Analysis Results */}
        <div className="bg-white rounded-2xl border border-gray-100 p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Analysis Results</h2>
          
          {!analysisComplete ? (
            <div className="text-center py-12">
              <Target className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">Ready to Analyze</h3>
              <p className="text-gray-600">Upload an image to get started with your posture analysis</p>
            </div>
          ) : (
            <div className="space-y-6">
              {/* Overall Score */}
              <div className="text-center p-6 bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl">
                <h3 className="text-lg font-medium text-gray-900 mb-2">Overall Posture Score</h3>
                <div className="text-4xl font-bold text-blue-600 mb-2">{analysisResults.overallScore}%</div>
                <p className="text-gray-600">Good posture with room for improvement</p>
              </div>

              {/* Detailed Analysis */}
              <div>
                <h4 className="font-medium text-gray-900 mb-3">Detailed Analysis</h4>
                <div className="space-y-3">
                  {analysisResults.issues.map((issue, index) => (
                    <div key={index} className="border border-gray-200 rounded-lg p-4">
                      <div className="flex items-center justify-between mb-2">
                        <h5 className="font-medium text-gray-900">{issue.area}</h5>
                        <span className={`px-2 py-1 rounded-lg text-xs font-medium flex items-center space-x-1 ${getSeverityColor(issue.severity)}`}>
                          {getSeverityIcon(issue.severity)}
                          <span className="capitalize">{issue.severity}</span>
                        </span>
                      </div>
                      <p className="text-sm text-gray-600 mb-2">{issue.description}</p>
                      <p className="text-sm text-blue-600">
                        <strong>Recommendation:</strong> {issue.recommendation}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Recommendations */}
              <div>
                <h4 className="font-medium text-gray-900 mb-3">Action Plan</h4>
                <div className="space-y-2">
                  {analysisResults.recommendations.map((rec, index) => (
                    <div key={index} className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                      <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                      <span className="text-sm text-gray-700">{rec}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex space-x-3">
                <button className="flex-1 bg-green-600 text-white py-3 rounded-xl font-semibold hover:bg-green-700 transition-colors flex items-center justify-center space-x-2">
                  <Download className="w-5 h-5" />
                  <span>Download Report</span>
                </button>
                <button className="px-4 py-3 border border-gray-300 rounded-xl text-gray-700 hover:bg-gray-50 transition-colors">
                  <Target className="w-5 h-5" />
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Tips Section */}
      <div className="mt-8 bg-gradient-to-r from-purple-600 to-blue-600 rounded-2xl p-6 text-white">
        <h2 className="text-xl font-bold mb-4">Posture Tips for Students</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <h3 className="font-semibold mb-2">📚 While Studying</h3>
            <ul className="text-sm text-purple-100 space-y-1">
              <li>• Keep feet flat on floor</li>
              <li>• Monitor at eye level</li>
              <li>• Shoulders back and relaxed</li>
              <li>• Take breaks every 30 minutes</li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold mb-2">💪 During Workouts</h3>
            <ul className="text-sm text-purple-100 space-y-1">
              <li>• Engage core muscles</li>
              <li>• Maintain neutral spine</li>
              <li>• Focus on form over speed</li>
              <li>• Breathe consistently</li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold mb-2">🚶‍♂️ Daily Habits</h3>
            <ul className="text-sm text-purple-100 space-y-1">
              <li>• Walk with head up</li>
              <li>• Strengthen back muscles</li>
              <li>• Stretch regularly</li>
              <li>• Sleep in proper position</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};