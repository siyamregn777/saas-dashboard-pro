'use client'

import { 
  TrendingUp, 
  Users, 
  DollarSign, 
  Activity,
  ArrowUp,
  ArrowDown
} from 'lucide-react'

const stats = [
  { 
    title: 'Total Revenue', 
    value: '$54,239', 
    change: '+12.5%', 
    trend: 'up',
    icon: DollarSign,
    color: 'bg-green-500'
  },
  { 
    title: 'Total Users', 
    value: '2,847', 
    change: '+8.2%', 
    trend: 'up',
    icon: Users,
    color: 'bg-blue-500'
  },
  { 
    title: 'Active Sessions', 
    value: '1,234', 
    change: '-3.1%', 
    trend: 'down',
    icon: Activity,
    color: 'bg-purple-500'
  },
  { 
    title: 'Conversion Rate', 
    value: '24.8%', 
    change: '+4.3%', 
    trend: 'up',
    icon: TrendingUp,
    color: 'bg-orange-500'
  },
]

const recentActivity = [
  { id: 1, user: 'Sarah Johnson', action: 'Created new project', time: '2 min ago', avatar: 'SJ' },
  { id: 2, user: 'Mike Chen', action: 'Updated settings', time: '15 min ago', avatar: 'MC' },
  { id: 3, user: 'Emma Wilson', action: 'Added new team member', time: '1 hour ago', avatar: 'EW' },
  { id: 4, user: 'Alex Rivera', action: 'Completed task', time: '2 hours ago', avatar: 'AR' },
]

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <div key={stat.title} className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between mb-4">
              <div className={`p-3 rounded-lg ${stat.color} bg-opacity-10`}>
                <stat.icon className={`w-5 h-5 ${stat.color.replace('bg-', 'text-')}`} />
              </div>
              <span className={`text-sm font-medium ${
                stat.trend === 'up' ? 'text-green-600' : 'text-red-600'
              }`}>
                {stat.change}
                {stat.trend === 'up' ? <ArrowUp className="inline w-3 h-3 ml-1" /> : <ArrowDown className="inline w-3 h-3 ml-1" />}
              </span>
            </div>
            <h3 className="text-2xl font-bold text-gray-800">{stat.value}</h3>
            <p className="text-sm text-gray-600 mt-1">{stat.title}</p>
          </div>
        ))}
      </div>

      {/* Recent Activity */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-semibold text-gray-800">Recent Activity</h2>
          <button className="text-sm text-indigo-600 hover:text-indigo-700 font-medium">
            View All
          </button>
        </div>
        <div className="space-y-4">
          {recentActivity.map((activity) => (
            <div key={activity.id} className="flex items-center gap-4 p-3 hover:bg-gray-50 rounded-lg transition-colors">
              <div className="w-10 h-10 bg-indigo-100 rounded-full flex items-center justify-center text-indigo-600 font-semibold text-sm">
                {activity.avatar}
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-800">{activity.user}</p>
                <p className="text-sm text-gray-600">{activity.action}</p>
              </div>
              <span className="text-xs text-gray-500">{activity.time}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}