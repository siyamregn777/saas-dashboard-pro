'use client'

import { Users, Search, Filter, Plus, MoreVertical } from 'lucide-react'

export default function LeadsPage() {
  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Manage your leads</h1>
          <p className="text-gray-500 dark:text-gray-400 mt-1">Track and manage all your leads in one place</p>
        </div>
        <button className="px-4 py-2 bg-yellow-400 text-gray-900 rounded-lg hover:bg-yellow-500 transition-colors flex items-center gap-2">
          <Plus className="h-4 w-4" />
          Add Lead
        </button>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
        <div className="p-6 border-b border-gray-200 dark:border-gray-700">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search leads..."
                className="w-full pl-9 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              />
            </div>
            <div className="flex gap-2">
              <button className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                <Filter className="h-4 w-4 text-gray-500 dark:text-gray-400" />
              </button>
            </div>
          </div>
        </div>

        <div className="p-6 text-center py-12">
          <div className="w-16 h-16 rounded-full bg-gray-100 dark:bg-gray-700 mx-auto mb-4 flex items-center justify-center">
            <Users className="h-8 w-8 text-gray-400 dark:text-gray-500" />
          </div>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">No leads yet</h3>
          <p className="text-gray-500 dark:text-gray-400 mt-2">Start adding leads to track your sales pipeline</p>
          <button className="mt-4 px-4 py-2 bg-yellow-400 text-gray-900 rounded-lg hover:bg-yellow-500 transition-colors inline-flex items-center gap-2">
            <Plus className="h-4 w-4" />
            Add Your First Lead
          </button>
        </div>
      </div>
    </div>
  )
}