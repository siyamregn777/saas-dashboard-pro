'use client'

import { DollarSign, TrendingUp, Calendar, Download } from 'lucide-react'

export default function SalesPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-800">Sales</h2>
        <button className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700">
          <Download size={18} />
          Export Report
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center gap-3 mb-2">
            <DollarSign className="w-5 h-5 text-green-500" />
            <span className="text-sm text-gray-600">Total Revenue</span>
          </div>
          <p className="text-3xl font-bold text-gray-800">$54,239</p>
          <p className="text-sm text-green-600 mt-1">↑ 12.5% from last month</p>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center gap-3 mb-2">
            <TrendingUp className="w-5 h-5 text-blue-500" />
            <span className="text-sm text-gray-600">Conversions</span>
          </div>
          <p className="text-3xl font-bold text-gray-800">847</p>
          <p className="text-sm text-green-600 mt-1">↑ 8.2% from last month</p>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center gap-3 mb-2">
            <Calendar className="w-5 h-5 text-purple-500" />
            <span className="text-sm text-gray-600">This Month</span>
          </div>
          <p className="text-3xl font-bold text-gray-800">$13,194</p>
          <p className="text-sm text-gray-500 mt-1">Pending: $2,340</p>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Sales Breakdown</h3>
        <div className="h-64 flex items-center justify-center bg-gray-50 rounded-lg">
          <p className="text-gray-500">Sales chart will be displayed here</p>
        </div>
      </div>
    </div>
  )
}