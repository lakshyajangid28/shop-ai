// components/Features.tsx
import {
  Brain,
  Search,
  ShoppingCart,
  Headphones,
  BarChart3,
  Globe,
  Zap,
  Shield,
  Camera,
  CreditCard,
  Users,
  TrendingUp,
} from 'lucide-react';


const features = [
  {
    icon: <Brain className="h-8 w-8" />,
    title: 'AI-Powered Recommendations',
    description:
      'Get personalized product suggestions based on your browsing history, preferences, and purchase patterns.',
    color: 'from-purple-500 to-purple-600',
  },
  {
    icon: <Search className="h-8 w-8" />,
    title: 'Visual & Voice Search',
    description:
      'Find products by uploading images or simply describing what you\'re looking for with voice commands.',
    color: 'from-blue-500 to-blue-600',
  },
  {
    icon: <Camera className="h-8 w-8" />,
    title: 'AR Try-On Experience',
    description:
      'Virtually try on clothing, accessories, and makeup before purchasing with augmented reality technology.',
    color: 'from-green-500 to-green-600',
  },
  {
    icon: <CreditCard className="h-8 w-8" />,
    title: 'Smart Price Tracking',
    description:
      'Monitor price changes, get notifications for deals, and compare prices across multiple retailers instantly.',
    color: 'from-orange-500 to-orange-600',
  },
  {
    icon: <Headphones className="h-8 w-8" />,
    title: 'Voice Commerce',
    description:
      'Complete purchases, track orders, and get customer support through natural voice conversations.',
    color: 'from-pink-500 to-pink-600',
  },
  {
    icon: <Users className="h-8 w-8" />,
    title: 'Social Shopping',
    description:
      'Share favorites with friends, get group recommendations, and discover trending products in your network.',
    color: 'from-indigo-500 to-indigo-600',
  },
  {
    icon: <BarChart3 className="h-8 w-8" />,
    title: 'Analytics Dashboard',
    description:
      'Merchants can track AI interactions, customer journeys, and optimize the shopping experience with insights.',
    color: 'from-teal-500 to-teal-600',
  },
  {
    icon: <Shield className="h-8 w-8" />,
    title: 'Fraud Protection',
    description:
      'Advanced AI security measures protect against fraudulent activities and ensure safe transactions.',
    color: 'from-red-500 to-red-600',
  },
  {
    icon: <Globe className="h-8 w-8" />,
    title: 'Multilingual Support',
    description:
      'Serve customers globally with support for 30+ languages and cultural shopping preferences.',
    color: 'from-cyan-500 to-cyan-600',
  },
  {
    icon: <Zap className="h-8 w-8" />,
    title: 'Instant Customer Support',
    description:
      'Get immediate assistance with orders, returns, and product questions through AI-powered chat.',
    color: 'from-yellow-500 to-yellow-600',
  },
  {
    icon: <TrendingUp className="h-8 w-8" />,
    title: 'Predictive Analytics',
    description:
      'Anticipate customer needs and stock levels with machine learning-powered demand forecasting.',
    color: 'from-violet-500 to-violet-600',
  },
  {
    icon: <ShoppingCart className="h-8 w-8" />,
    title: 'Smart Cart Management',
    description:
      'AI optimizes your cart with bundle suggestions, shipping options, and checkout assistance.',
    color: 'from-emerald-500 to-emerald-600',
  },
];

export default features;