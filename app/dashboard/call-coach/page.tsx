'use client'

import { Sparkles, Mic, Headphones, BarChart3, Target, Clock } from 'lucide-react'

export default function CallCoachPage() {
  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">JW Call Coach</h1>
          <p className="text-gray-500 mt-1">AI-powered call coaching and analysis</p>
        </div>
        <span className="px-3 py-1 bg-blue-100 text-blue-700 text-xs font-semibold rounded-full">NEW</span>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center gap-3 mb-3">
            <div className="p-2 bg-blue-50 rounded-lg">
              <Mic className="h-5 w-5 text-blue-600" />
            </div>
            <h3 className="font-semibold text-gray-900">Live Coaching</h3>
          </div>
          <p className="text-sm text-gray-500">Get real-time feedback on your calls</p>
          <button className="mt-4 text-sm text-blue-600 hover:text-blue-700 font-medium">
            Start Session →
          </button>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center gap-3 mb-3">
            <div className="p-2 bg-purple-50 rounded-lg">
              <Target className="h-5 w-5 text-purple-600" />
            </div>
            <h3 className="font-semibold text-gray-900">Script Analysis</h3>
          </div>
          <p className="text-sm text-gray-500">Analyze and improve your scripts</p>
          <button className="mt-4 text-sm text-blue-600 hover:text-blue-700 font-medium">
            View Scripts →
          </button>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center gap-3 mb-3">
            <div className="p-2 bg-green-50 rounded-lg">
              <BarChart3 className="h-5 w-5 text-green-600" />
            </div>
            <h3 className="font-semibold text-gray-900">Performance</h3>
          </div>
          <p className="text-sm text-gray-500">Track your coaching progress</p>
          <button className="mt-4 text-sm text-blue-600 hover:text-blue-700 font-medium">
            View Stats →
          </button>
        </div>
      </div>

      {/* Recent Sessions */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Sessions</h3>
        <div className="space-y-3">
          <div className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg">
            <div className="flex items-center gap-3">
              <Clock className="h-4 w-4 text-gray-400" />
              <div>
                <p className="text-sm font-medium text-gray-900">No sessions yet</p>
                <p className="text-xs text-gray-500">Start your first coaching session</p>
              </div>
            </div>
            <button className="text-sm text-blue-600 hover:text-blue-700">Start Now</button>
          </div>
        </div>
      </div>
    </div>
  )
}