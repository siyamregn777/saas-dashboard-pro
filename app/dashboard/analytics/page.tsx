'use client'

import { BarChart3, TrendingUp, Users, Eye } from 'lucide-react'

export default function AnalyticsPage() {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-800">Analytics</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center gap-3 mb-3">
            <Eye className="w-5 h-5 text-blue-500" />
            <span className="text-sm text-gray-600">Page Views</span>
          </div>
          <p className="text-2xl font-bold text-gray-800">45,231</p>
          <p className="text-sm text-green-600 mt-1">↑ 12.5% from last month</p>
        </div>
        
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center gap-3 mb-3">
            <Users className="w-5 h-5 text-purple-500" />
            <span className="text-sm text-gray-600">Unique Visitors</span>
          </div>
          <p className="text-2xl font-bold text-gray-800">12,847</p>
          <p className="text-sm text-green-600 mt-1">↑ 8.2% from last month</p>
        </div>
        
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center gap-3 mb-3">
            <TrendingUp className="w-5 h-5 text-orange-500" />
            <span className="text-sm text-gray-600">Bounce Rate</span>
          </div>
          <p className="text-2xl font-bold text-gray-800">24.8%</p>
          <p className="text-sm text-green-600 mt-1">↓ 3.1% from last month</p>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Traffic Overview</h3>
        <div className="h-64 flex items-center justify-center bg-gray-50 rounded-lg">
          <p className="text-gray-500">Chart will be displayed here</p>
        </div>
      </div>
    </div>
  )
}