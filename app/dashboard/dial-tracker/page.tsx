'use client'

import { Clock, Phone, TrendingUp, Users, Calendar, BarChart3 } from 'lucide-react'

export default function DialTrackerPage() {
  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900">Dial Tracker</h1>
      <p className="text-gray-500 mt-2">Track your calls and dials</p>
      
      <div className="mt-6 grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-sm font-medium text-gray-500">Total Dials</h3>
            <Phone className="h-4 w-4 text-blue-500" />
          </div>
          <p className="text-2xl font-bold text-gray-900">0</p>
          <p className="text-xs text-gray-500 mt-1">This week</p>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-sm font-medium text-gray-500">Connected</h3>
            <Users className="h-4 w-4 text-green-500" />
          </div>
          <p className="text-2xl font-bold text-gray-900">0</p>
          <p className="text-xs text-gray-500 mt-1">Success rate: 0%</p>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-sm font-medium text-gray-500">Avg Duration</h3>
            <Clock className="h-4 w-4 text-purple-500" />
          </div>
          <p className="text-2xl font-bold text-gray-900">0:00</p>
          <p className="text-xs text-gray-500 mt-1">Per call</p>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-sm font-medium text-gray-500">Today</h3>
            <Calendar className="h-4 w-4 text-orange-500" />
          </div>
          <p className="text-2xl font-bold text-gray-900">0</p>
          <p className="text-xs text-gray-500 mt-1">Dials today</p>
        </div>
      </div>

      {/* Call History */}
      <div className="mt-6 bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Calls</h3>
        <div className="space-y-3">
          <div className="text-center py-8 text-gray-500">
            <BarChart3 className="h-12 w-12 mx-auto text-gray-300 mb-3" />
            <p>No calls recorded yet</p>
            <p className="text-sm mt-1">Start making calls to track your progress</p>
          </div>
        </div>
      </div>
    </div>
  )
}