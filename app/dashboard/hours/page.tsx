'use client'

import { Clock, Calendar, BarChart3 } from 'lucide-react'

export default function HoursPage() {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-800">Hours Worked</h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center gap-3 mb-2">
            <Clock className="w-5 h-5 text-indigo-500" />
            <span className="text-sm text-gray-600">This Week</span>
          </div>
          <p className="text-3xl font-bold text-gray-800">42.5 hrs</p>
          <p className="text-sm text-green-600 mt-1">↑ 3.2 hrs from last week</p>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center gap-3 mb-2">
            <Calendar className="w-5 h-5 text-blue-500" />
            <span className="text-sm text-gray-600">This Month</span>
          </div>
          <p className="text-3xl font-bold text-gray-800">168 hrs</p>
          <p className="text-sm text-gray-500 mt-1">Target: 160 hrs</p>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center gap-3 mb-2">
            <BarChart3 className="w-5 h-5 text-purple-500" />
            <span className="text-sm text-gray-600">Average/Day</span>
          </div>
          <p className="text-3xl font-bold text-gray-800">8.4 hrs</p>
          <p className="text-sm text-green-600 mt-1">↑ 0.5 hrs from last month</p>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Weekly Breakdown</h3>
        <div className="space-y-4">
          {['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'].map((day) => (
            <div key={day}>
              <div className="flex justify-between text-sm mb-1">
                <span className="text-gray-600">{day}</span>
                <span className="text-gray-800 font-medium">8 hrs</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-indigo-600 h-2 rounded-full" style={{ width: '80%' }}></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}