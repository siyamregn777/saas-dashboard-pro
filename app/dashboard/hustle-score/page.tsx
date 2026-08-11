'use client'

import { Zap, TrendingUp, Target, Flame, Award, Clock, Activity, BarChart3 } from 'lucide-react'

export default function HustleScorePage() {
  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900">Hustle Score</h1>
      <p className="text-gray-500 mt-2">Your performance and hustle metrics</p>
      
      <div className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-sm font-medium text-gray-500">Hustle Score</h3>
            <Zap className="h-5 w-5 text-yellow-500" />
          </div>
          <p className="text-3xl font-bold text-gray-900">0</p>
          <p className="text-xs text-gray-500 mt-1">Need more activity</p>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-sm font-medium text-gray-500">Streak</h3>
            <Flame className="h-5 w-5 text-orange-500" />
          </div>
          <p className="text-3xl font-bold text-gray-900">0</p>
          <p className="text-xs text-gray-500 mt-1">Days active</p>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-sm font-medium text-gray-500">Goals Hit</h3>
            <Target className="h-5 w-5 text-green-500" />
          </div>
          <p className="text-3xl font-bold text-gray-900">0</p>
          <p className="text-xs text-gray-500 mt-1">This month</p>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-sm font-medium text-gray-500">Rank</h3>
            <Award className="h-5 w-5 text-purple-500" />
          </div>
          <p className="text-3xl font-bold text-gray-900">-</p>
          <p className="text-xs text-gray-500 mt-1">Not ranked yet</p>
        </div>
      </div>

      {/* Activity Timeline */}
      <div className="mt-6 bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h3>
        <div className="space-y-4">
          <div className="flex items-center gap-3 text-sm text-gray-500">
            <Clock className="h-4 w-4 text-gray-400" />
            <span>No activity recorded yet. Start making calls to build your hustle score!</span>
          </div>
        </div>
      </div>

      {/* Weekly Progress */}
      <div className="mt-6 bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Weekly Progress</h3>
        <div className="grid grid-cols-7 gap-2">
          {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day) => (
            <div key={day} className="text-center">
              <div className="h-20 bg-gray-100 rounded-lg flex items-end justify-center">
                <div className="w-6 bg-blue-500 rounded-t-lg" style={{ height: '0%' }}></div>
              </div>
              <p className="text-xs text-gray-500 mt-1">{day}</p>
            </div>
          ))}
        </div>
        <div className="text-center text-sm text-gray-500 mt-4">No activity this week</div>
      </div>
    </div>
  )
}