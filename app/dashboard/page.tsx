'use client'

import { useEffect, useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import type { User, Profile } from '@/types'
import { 
  BarChart3, 
  Users, 
  TrendingUp, 
  DollarSign, 
  Clock,
  ArrowUpRight,
  ArrowDownRight,
  MoreHorizontal,
  Search,
  Filter,
  Download,
  Calendar,
  ChevronDown,
  Eye,
  Edit,
  Trash2,
  Plus,
  UserPlus,
  Settings,
  LogOut,
  Bell,
  Menu
} from 'lucide-react'
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  AreaChart,
  Area,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
} from 'recharts'

// Types for data
interface RevenueData {
  name: string
  revenue: number
  target: number
}

interface UserGrowthData {
  name: string
  users: number
}

interface ActivityData {
  name: string
  value: number
  color: string
}

interface RecentActivity {
  id: number
  user: string
  action: string
  time: string
  avatar: string
}

interface TopPerformer {
  name: string
  revenue: string
  growth: string
  rank: number
}

// Sample data - replace with real data from Supabase
const revenueData: RevenueData[] = [
  { name: 'Jan', revenue: 4000, target: 3000 },
  { name: 'Feb', revenue: 5000, target: 4500 },
  { name: 'Mar', revenue: 6500, target: 5500 },
  { name: 'Apr', revenue: 7800, target: 7000 },
  { name: 'May', revenue: 8900, target: 8000 },
  { name: 'Jun', revenue: 9500, target: 9000 },
  { name: 'Jul', revenue: 10200, target: 9500 },
  { name: 'Aug', revenue: 11000, target: 10500 },
  { name: 'Sep', revenue: 12500, target: 11500 },
  { name: 'Oct', revenue: 13800, target: 12500 },
  { name: 'Nov', revenue: 15200, target: 14000 },
  { name: 'Dec', revenue: 16800, target: 15500 },
]

const userGrowthData: UserGrowthData[] = [
  { name: 'Mon', users: 120 },
  { name: 'Tue', users: 180 },
  { name: 'Wed', users: 250 },
  { name: 'Thu', users: 320 },
  { name: 'Fri', users: 450 },
  { name: 'Sat', users: 380 },
  { name: 'Sun', users: 520 },
]

const activityData: ActivityData[] = [
  { name: 'Completed', value: 65, color: '#3B82F6' },
  { name: 'In Progress', value: 25, color: '#60A5FA' },
  { name: 'Pending', value: 10, color: '#93C5FD' },
]

const recentActivity: RecentActivity[] = [
  { id: 1, user: 'John Doe', action: 'Created a new project', time: '2 min ago', avatar: 'JD' },
  { id: 2, user: 'Jane Smith', action: 'Updated dashboard settings', time: '15 min ago', avatar: 'JS' },
  { id: 3, user: 'Mike Johnson', action: 'Added new team member', time: '1 hour ago', avatar: 'MJ' },
  { id: 4, user: 'Sarah Wilson', action: 'Completed quarterly report', time: '3 hours ago', avatar: 'SW' },
  { id: 5, user: 'David Brown', action: 'Started new sprint', time: '5 hours ago', avatar: 'DB' },
]

const topPerformers: TopPerformer[] = [
  { name: 'John Doe', revenue: '$12,450', growth: '+23%', rank: 1 },
  { name: 'Jane Smith', revenue: '$10,230', growth: '+18%', rank: 2 },
  { name: 'Mike Johnson', revenue: '$8,750', growth: '+15%', rank: 3 },
  { name: 'Sarah Wilson', revenue: '$7,890', growth: '+12%', rank: 4 },
]

export default function DashboardHome() {
  const [user, setUser] = useState<User | null>(null)
  const [profile, setProfile] = useState<Profile | null>(null)
  const [dateRange, setDateRange] = useState<string>('Last 30 days')
  const supabase = createClient()

  useEffect(() => {
    const getUserData = async () => {
      const { data: { user } } = await supabase.auth.getUser()
      setUser(user as User)
      if (user) {
        const { data: profile } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', user.id)
          .single()
        setProfile(profile as Profile)
      }
    }
    getUserData()
  }, [supabase])

  // Calculate summary stats
  const totalRevenue = revenueData.reduce((sum: number, item: RevenueData) => sum + item.revenue, 0)
  const totalTarget = revenueData.reduce((sum: number, item: RevenueData) => sum + item.target, 0)
  const averageGrowth = 23.5
  const totalUsers = 1247

  // Get display name
  const displayName = profile?.full_name || user?.email?.split('@')[0] || 'User'

  return (
    <div className="space-y-6">
      {/* Header with Search and User Menu */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-sm text-gray-500">
            Welcome back, {displayName}! Here&apos;s what&apos;s happening with your business.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search..."
              className="pl-9 pr-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent w-48 sm:w-64"
            />
          </div>
          <button className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors relative">
            <Bell className="h-5 w-5" />
            <span className="absolute top-1 right-1 h-2 w-2 bg-red-500 rounded-full"></span>
          </button>
          <button className="flex items-center gap-2 px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
            <Plus className="h-4 w-4" />
            <span className="hidden sm:inline">New Project</span>
          </button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
          <div className="flex items-center justify-between mb-4">
            <div className="p-2 bg-blue-50 rounded-lg">
              <DollarSign className="h-6 w-6 text-blue-600" />
            </div>
            <span className="text-xs font-medium text-green-600 bg-green-50 px-2 py-1 rounded-full">
              +12.5%
            </span>
          </div>
          <h3 className="text-sm font-medium text-gray-500">Total Revenue</h3>
          <p className="text-2xl font-bold text-gray-900 mt-1">
            ${totalRevenue.toLocaleString()}
          </p>
          <p className="text-xs text-gray-500 mt-2">vs ${totalTarget.toLocaleString()} target</p>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
          <div className="flex items-center justify-between mb-4">
            <div className="p-2 bg-purple-50 rounded-lg">
              <Users className="h-6 w-6 text-purple-600" />
            </div>
            <span className="text-xs font-medium text-green-600 bg-green-50 px-2 py-1 rounded-full">
              +8.2%
            </span>
          </div>
          <h3 className="text-sm font-medium text-gray-500">Total Users</h3>
          <p className="text-2xl font-bold text-gray-900 mt-1">
            {totalUsers.toLocaleString()}
          </p>
          <p className="text-xs text-gray-500 mt-2">+124 this month</p>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
          <div className="flex items-center justify-between mb-4">
            <div className="p-2 bg-green-50 rounded-lg">
              <TrendingUp className="h-6 w-6 text-green-600" />
            </div>
            <span className="text-xs font-medium text-green-600 bg-green-50 px-2 py-1 rounded-full">
              +23.5%
            </span>
          </div>
          <h3 className="text-sm font-medium text-gray-500">Growth Rate</h3>
          <p className="text-2xl font-bold text-gray-900 mt-1">
            {averageGrowth}%
          </p>
          <p className="text-xs text-gray-500 mt-2">Above industry average</p>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
          <div className="flex items-center justify-between mb-4">
            <div className="p-2 bg-orange-50 rounded-lg">
              <Clock className="h-6 w-6 text-orange-600" />
            </div>
            <span className="text-xs font-medium text-yellow-600 bg-yellow-50 px-2 py-1 rounded-full">
              Pending
            </span>
          </div>
          <h3 className="text-sm font-medium text-gray-500">Active Sessions</h3>
          <p className="text-2xl font-bold text-gray-900 mt-1">
            856
          </p>
          <p className="text-xs text-gray-500 mt-2">24 online now</p>
        </div>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Revenue Chart - Takes 2/3 of space */}
        <div className="lg:col-span-2 bg-white rounded-xl shadow-sm p-6 border border-gray-100">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-900">Revenue Overview</h3>
              <p className="text-sm text-gray-500">Monthly revenue vs target</p>
            </div>
            <div className="flex items-center gap-2">
              <button className="text-sm text-gray-600 hover:bg-gray-100 px-3 py-1 rounded-lg transition-colors">
                <Calendar className="h-4 w-4 inline mr-1" />
                {dateRange}
                <ChevronDown className="h-4 w-4 inline ml-1" />
              </button>
              <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                <Download className="h-4 w-4 text-gray-500" />
              </button>
            </div>
          </div>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={revenueData}>
                <defs>
                  <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.2}/>
                    <stop offset="95%" stopColor="#3B82F6" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="colorTarget" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#60A5FA" stopOpacity={0.1}/>
                    <stop offset="95%" stopColor="#60A5FA" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" />
                <XAxis dataKey="name" tick={{ fontSize: 12, fill: '#6B7280' }} />
                <YAxis tick={{ fontSize: 12, fill: '#6B7280' }} />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'white', 
                    border: '1px solid #E5E7EB',
                    borderRadius: '8px',
                    boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)'
                  }}
                />
                <Area 
                  type="monotone" 
                  dataKey="revenue" 
                  stroke="#3B82F6" 
                  strokeWidth={2}
                  fillOpacity={1}
                  fill="url(#colorRevenue)"
                />
                <Area 
                  type="monotone" 
                  dataKey="target" 
                  stroke="#60A5FA" 
                  strokeWidth={2}
                  strokeDasharray="5 5"
                  fillOpacity={1}
                  fill="url(#colorTarget)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Activity Distribution - Takes 1/3 of space */}
        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
          <h3 className="text-lg font-semibold text-gray-900 mb-6">Activity Distribution</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={activityData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {activityData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="flex justify-center gap-6 mt-4">
            {activityData.map((item) => (
              <div key={item.name} className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }} />
                <span className="text-sm text-gray-600">{item.name}</span>
                <span className="text-sm font-semibold text-gray-900">{item.value}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* User Growth Chart */}
      <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-lg font-semibold text-gray-900">User Growth</h3>
            <p className="text-sm text-gray-500">Daily active users this week</p>
          </div>
          <div className="flex items-center gap-2">
            <button className="text-sm text-blue-600 hover:bg-blue-50 px-3 py-1 rounded-lg transition-colors">
              View All
            </button>
          </div>
        </div>
        <div className="h-72">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={userGrowthData}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" />
              <XAxis dataKey="name" tick={{ fontSize: 12, fill: '#6B7280' }} />
              <YAxis tick={{ fontSize: 12, fill: '#6B7280' }} />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'white', 
                  border: '1px solid #E5E7EB',
                  borderRadius: '8px'
                }}
              />
              <Bar dataKey="users" fill="#3B82F6" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Recent Activity and Top Performers */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Activity */}
        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-900">Recent Activity</h3>
              <p className="text-sm text-gray-500">Latest actions from your team</p>
            </div>
            <button className="text-sm text-blue-600 hover:bg-blue-50 px-3 py-1 rounded-lg transition-colors">
              View All
            </button>
          </div>
          <div className="space-y-4">
            {recentActivity.map((item) => (
              <div key={item.id} className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg transition-colors">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center font-semibold text-blue-600 text-sm">
                    {item.avatar}
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900">{item.user}</p>
                    <p className="text-xs text-gray-500">{item.action}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-xs text-gray-400">{item.time}</span>
                  <button className="text-gray-400 hover:text-gray-600">
                    <MoreHorizontal className="h-4 w-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Top Performers */}
        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-900">Top Performers</h3>
              <p className="text-sm text-gray-500">Best performing team members</p>
            </div>
            <button className="text-sm text-blue-600 hover:bg-blue-50 px-3 py-1 rounded-lg transition-colors">
              View All
            </button>
          </div>
          <div className="space-y-4">
            {topPerformers.map((performer) => (
              <div key={performer.rank} className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg transition-colors">
                <div className="flex items-center gap-3">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                    performer.rank === 1 ? 'bg-yellow-100 text-yellow-600' :
                    performer.rank === 2 ? 'bg-gray-100 text-gray-600' :
                    performer.rank === 3 ? 'bg-orange-100 text-orange-600' :
                    'bg-blue-50 text-blue-600'
                  }`}>
                    #{performer.rank}
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900">{performer.name}</p>
                    <p className="text-xs text-gray-500">{performer.revenue}</p>
                  </div>
                </div>
                <span className="text-sm font-medium text-green-600 flex items-center gap-1">
                  <ArrowUpRight className="h-4 w-4" />
                  {performer.growth}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}