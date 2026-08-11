'use client'

import { Target, Sparkles, Crown, Star, Zap, CheckCircle } from 'lucide-react'

export default function UnlockMorePage() {
  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900">UNLOCK MORE</h1>
      <p className="text-gray-500 mt-2">Premium features and upgrades</p>
      
      <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Premium Features Card */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 text-center">
          <div className="w-16 h-16 rounded-full bg-purple-100 mx-auto mb-4 flex items-center justify-center">
            <Crown className="h-8 w-8 text-purple-600" />
          </div>
          <h3 className="text-lg font-semibold text-gray-900">Premium Features</h3>
          <p className="text-gray-500 text-sm mt-2">
            Unlock advanced analytics, AI coaching, and more with our premium plan.
          </p>
          <button className="mt-4 px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors w-full">
            Upgrade Now
          </button>
        </div>

        {/* Pro Features Card */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 text-center">
          <div className="w-16 h-16 rounded-full bg-blue-100 mx-auto mb-4 flex items-center justify-center">
            <Star className="h-8 w-8 text-blue-600" />
          </div>
          <h3 className="text-lg font-semibold text-gray-900">Pro Tools</h3>
          <p className="text-gray-500 text-sm mt-2">
            Get access to exclusive pro tools and features for power users.
          </p>
          <button className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors w-full">
            Learn More
          </button>
        </div>

        {/* Enterprise Card */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 text-center">
          <div className="w-16 h-16 rounded-full bg-orange-100 mx-auto mb-4 flex items-center justify-center">
            <Zap className="h-8 w-8 text-orange-600" />
          </div>
          <h3 className="text-lg font-semibold text-gray-900">Enterprise</h3>
          <p className="text-gray-500 text-sm mt-2">
            Custom solutions for large teams and agencies with dedicated support.
          </p>
          <button className="mt-4 px-6 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors w-full">
            Contact Sales
          </button>
        </div>
      </div>

      {/* Feature List */}
      <div className="mt-8 bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">What You&apos;ll Get</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex items-start gap-3">
            <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-sm font-medium text-gray-900">Advanced Analytics</p>
              <p className="text-xs text-gray-500">Detailed insights and reports</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-sm font-medium text-gray-900">AI Call Coaching</p>
              <p className="text-xs text-gray-500">Real-time feedback and analysis</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-sm font-medium text-gray-900">Unlimited Leads</p>
              <p className="text-xs text-gray-500">Access to unlimited leads database</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-sm font-medium text-gray-900">Priority Support</p>
              <p className="text-xs text-gray-500">24/7 dedicated support team</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}