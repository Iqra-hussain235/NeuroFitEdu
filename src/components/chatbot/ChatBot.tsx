import { useState, useRef, useEffect } from 'react';
import { Send, Bot, Sparkles, MessageCircle, Dumbbell, Brain, Apple } from 'lucide-react';

interface Message {
  id: string;
  content: string;
  isBot: boolean;
  timestamp: Date;
  category?: 'fitness' | 'nutrition' | 'study' | 'general';
}

const quickActions = [
  { text: "Create a workout plan for exam week", icon: Brain, category: 'fitness' },
  { text: "What should I eat before studying?", icon: Apple, category: 'nutrition' },
  { text: "How to improve focus during workouts?", icon: Dumbbell, category: 'study' },
  { text: "Best exercises for stress relief", icon: Sparkles, category: 'fitness' }
];

// Wrapper component for floating chatbot with toggle button
export default function FloatingChatBot() {
  // Show the chatbot in a wider, centered box at the bottom
  return (
    <div
      className="fixed bottom-20 left-1/2 transform -translate-x-1/2 z-50 bg-white rounded-xl shadow-lg flex flex-col overflow-hidden"
      style={{ width: 600, height: 600 }}
    >
      <ChatBot />
    </div>
  );
}

function ChatBot() {
  const user = { name: 'User' };
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      content: `Hi ${user?.name || 'there'}! I'm your AI fitness and study coach. I can help you with personalized workout plans, nutrition advice, study schedules, and how to optimize your physical fitness for better academic performance. What would you like to explore today?`,
      isBot: true,
      timestamp: new Date(),
      category: 'general'
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const generateBotResponse = (userMessage: string): { content: string; category: string } => {
    const lowerMessage = userMessage.toLowerCase();
    if (lowerMessage.includes('workout') || lowerMessage.includes('exercise')) {
      return {
        content: `Based on your fitness goals, I recommend a balanced approach:\n\n🏃‍♂️ **Morning Routine (7:00 AM)**\n- 15-minute HIIT session to boost alertness\n- Focus on compound movements\n\n💪 **Evening Workout (6:00 PM)**\n- 30-minute strength training\n- Target major muscle groups\n\n🧘‍♂️ **Study Breaks**\n- 5-minute movement every hour\n- Neck and shoulder stretches\n\nThis schedule optimizes both your physical fitness and academic performance. Would you like me to create a detailed weekly plan?`,
        category: 'fitness'
      };
    }
    if (lowerMessage.includes('food') || lowerMessage.includes('nutrition') || lowerMessage.includes('eat')) {
      return {
        content: `Perfect nutrition fuels both body and brain! Here's what I recommend:\n\n🍳 **Pre-Study Fuel**\n- Complex carbs + protein (oatmeal with nuts)\n- Green tea for sustained energy\n\n🥗 **Post-Workout Recovery**\n- Protein within 30 minutes\n- Hydration is key!\n\n🧠 **Brain Foods**\n- Blueberries for memory\n- Omega-3 rich fish\n- Dark chocolate (70%+ cacao)\n\nAvoid heavy meals before studying - they reduce cognitive performance by up to 20%!`,
        category: 'nutrition'
      };
    }
    if (lowerMessage.includes('focus') || lowerMessage.includes('concentration') || lowerMessage.includes('study')) {
      return {
        content: `Great question! Physical activity is one of the best ways to enhance cognitive function:\n\n🧠 **Science-Backed Tips**\n- 20 minutes of cardio increases focus for 2+ hours\n- Regular exercise grows new brain cells\n- Movement breaks prevent mental fatigue\n\n⏰ **Optimal Timing**\n- Morning workout: All-day mental clarity\n- Pre-study exercise: 15% better information retention\n- Micro-breaks: Every 25-50 minutes\n\n🎯 **Focus-Enhancing Exercises**\n- Yoga for mindfulness\n- HIIT for immediate alertness\n- Strength training for long-term cognitive gains\n\nWant me to create a focus-optimized schedule for your study sessions?`,
        category: 'study'
      };
    }
    if (lowerMessage.includes('stress') || lowerMessage.includes('anxiety') || lowerMessage.includes('pressure')) {
      return {
        content: `I understand academic pressure can be overwhelming. Here's how to manage stress through fitness:\n\n😤 **Immediate Stress Relief**\n- 4-7-8 breathing technique\n- 10-minute walk outdoors\n- Progressive muscle relaxation\n\n🏃‍♂️ **Long-term Stress Management**\n- Regular cardio reduces cortisol by 30%\n- Strength training builds mental resilience\n- Yoga improves emotional regulation\n\n📚 **Study-Specific Tips**\n- Take movement breaks every hour\n- Exercise before big exams (not after!)\n- Use physical activity as a reward system\n\nRemember: A healthy body supports a healthy mind. You've got this! 💪`,
        category: 'general'
      };
    }
    return {
      content: `That's a great question! As your AI coach, I'm here to help you optimize the connection between physical fitness and academic success.\n\nI can assist you with:\n\n🏋️‍♂️ **Fitness Planning**\n- Personalized workout routines\n- Exercise timing for cognitive benefits\n- Progress tracking and adjustments\n\n🥗 **Nutrition Guidance**\n- Brain-boosting meal plans\n- Pre/post-workout nutrition\n- Study session fuel strategies\n\n📚 **Study Optimization**\n- Movement-based learning techniques\n- Focus enhancement through exercise\n- Stress management strategies\n\nWhat specific area would you like to dive deeper into?`,
      category: 'general'
    };
  };

  const handleSendMessage = async (content: string) => {
    if (!content.trim()) return;
    const userMessage: Message = {
      id: Date.now().toString(),
      content,
      isBot: false,
      timestamp: new Date()
    };
    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);
    setTimeout(() => {
      const { content: botContent, category } = generateBotResponse(content);
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: botContent,
        isBot: true,
        timestamp: new Date(),
        category: category as any
      };
      setMessages(prev => [...prev, botMessage]);
      setIsTyping(false);
    }, 1500);
  };

  // Extract the question texts from quickActions for suggestion display
  const suggestedQuestions = quickActions.map(q => q.text);

  const handleQuickPrompt = (prompt: string) => {
    handleSendMessage(prompt);
  };

  const getCategoryIcon = (category?: string) => {
    switch (category) {
      case 'fitness':
        return <Dumbbell className="w-4 h-4" />;
      case 'nutrition':
        return <Apple className="w-4 h-4" />;
      case 'study':
        return <Brain className="w-4 h-4" />;
      default:
        return <MessageCircle className="w-4 h-4" />;
    }
  };

  const getCategoryColor = (category?: string) => {
    switch (category) {
      case 'fitness':
        return 'bg-blue-100 text-blue-600';
      case 'nutrition':
        return 'bg-green-100 text-green-600';
      case 'study':
        return 'bg-purple-100 text-purple-600';
      default:
        return 'bg-gray-100 text-gray-600';
    }
  };

  // Component for rendering suggested question buttons
  function Suggestions({ suggestions, onSelect }: { suggestions: string[]; onSelect: (q: string) => void }) {
    return (
      <div className="p-2 flex space-x-2 overflow-x-auto border-b border-gray-200">
        {suggestions.map((q, idx) => (
          <button
            key={idx}
            onClick={() => onSelect(q)}
            className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm whitespace-nowrap hover:bg-blue-200 focus:outline-none focus:ring-1 focus:ring-blue-400"
          >
            {q}
          </button>
        ))}
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="border-b border-gray-200 p-4 flex items-center">
        <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-green-500 rounded-full flex items-center justify-center">
          <Bot size={20} className="text-white" />
        </div>
        <div className="ml-3">
          <h3 className="font-semibold text-gray-900">AI Fitness & Study Coach</h3>
          <p className="text-sm text-green-600">● Online</p>
        </div>
      </div>

      {/* Suggested Questions */}
      <Suggestions suggestions={suggestedQuestions} onSelect={handleQuickPrompt} />

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${message.isBot ? 'justify-start' : 'justify-end'}`}
          >
            <div className={`max-w-[80%] ${message.isBot ? 'order-2' : 'order-1'}`}>
              <div
                className={`p-4 rounded-2xl ${
                  message.isBot
                    ? 'bg-gray-100 text-gray-900'
                    : 'bg-blue-600 text-white'
                }`}
              >
                {message.isBot && message.category && (
                  <div className={`inline-flex items-center space-x-1 px-2 py-1 rounded-lg text-xs font-medium mb-2 ${getCategoryColor(message.category)}`}>
                    {getCategoryIcon(message.category)}
                    <span className="capitalize">{message.category}</span>
                  </div>
                )}
                <p className="whitespace-pre-line">{message.content}</p>
              </div>
              <p className="text-xs text-gray-500 mt-1 px-2">
                {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </p>
            </div>
            <div className={`w-10 h-10 rounded-full flex items-center justify-center ${message.isBot ? 'order-1 mr-3' : 'order-2 ml-3'}`}>
              {message.isBot ? (
                <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
                  <Bot className="w-5 h-5 text-white" />
                </div>
              ) : (
                <img
                  src={'https://images.pexels.com/photos/2379005/pexels-photo-2379005.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=1'}
                  alt={user.name}
                  className="w-10 h-10 rounded-full object-cover"
                />
              )}
            </div>
          </div>
        ))}
        {isTyping && (
          <div className="flex justify-start">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
                <Bot className="w-5 h-5 text-white" />
              </div>
              <div className="bg-gray-100 p-4 rounded-2xl">
                <div className="flex space-x-1">
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-75"></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-150"></div>
                </div>
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="p-4 border-t border-gray-200">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSendMessage(inputValue);
          }}
          className="flex space-x-3"
        >
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Ask about workouts, nutrition, study tips, or anything fitness-related..."
            className="flex-1 px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            disabled={isTyping}
          />
          <button
            type="submit"
            disabled={!inputValue.trim() || isTyping}
            className="bg-blue-600 text-white p-3 rounded-xl hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Send className="w-5 h-5" />
          </button>
        </form>
      </div>
    </div>
  );
}

