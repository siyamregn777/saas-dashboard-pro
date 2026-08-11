'use client'

import { useState, useEffect } from 'react'
import { createClient } from '@/lib/supabase/client'
import type { User, Profile } from '@/types'
import {
  Search,
  Plus,
  Filter,
  Download,
  MoreVertical,
  Edit,
  Trash2,
  Eye,
  UserPlus,
  Users,
  DollarSign,
  Clock,
  CheckCircle,
  XCircle,
  AlertCircle,
  TrendingUp,
  TrendingDown,
  Calendar,
  ChevronDown,
  ChevronRight,
  FileText,
  Building2,
  Mail,
  Phone,
  MapPin,
  Star,
  Award,
  Gift,
  Settings,
  BarChart3,
  Activity,
  CreditCard,
  Wallet,
  Shield,
  Home,
  Briefcase,
  Zap,
  Sparkles,
  X
} from 'lucide-react'
import Link from 'next/link'

// Types
interface Client {
  id: string
  name: string
  email: string
  phone: string
  company: string
  status: 'active' | 'pending' | 'negative' | 'approved'
  household: string
  key: string
  paid: boolean
  approved: boolean
  pending: boolean
  negative: boolean
  totalSales: number
  totalDeposits: number
  pendingDeposits: number
  totalCoverage: number
  lastContact: string
  createdAt: string
}

interface Sale {
  id: string
  clientId: string
  amount: number
  status: 'pending' | 'unpaid' | 'paid' | 'cancelled'
  date: string
  company: string
  type: 'quick' | 'full'
}

export default function ClientsPage() {
  const [user, setUser] = useState<User | null>(null)
  const [profile, setProfile] = useState<Profile | null>(null)
  const [searchTerm, setSearchTerm] = useState('')
  const [filterStatus, setFilterStatus] = useState('All')
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  const [showQuickSale, setShowQuickSale] = useState(false)
  const [showFullSale, setShowFullSale] = useState(false)
  const [selectedStatus, setSelectedStatus] = useState<string>('All')
  const [selectedRange, setSelectedRange] = useState<string>('All')
  const supabase = createClient()

  // Sample clients data
  const [clients, setClients] = useState<Client[]>([
    {
      id: '1',
      name: 'John Doe',
      email: 'john@example.com',
      phone: '(555) 123-4567',
      company: 'ABC Corp',
      status: 'active',
      household: '1',
      key: 'Quick Sale',
      paid: true,
      approved: true,
      pending: false,
      negative: false,
      totalSales: 1120.00,
      totalDeposits: 500.00,
      pendingDeposits: 0,
      totalCoverage: 7500.00,
      lastContact: '2 days ago',
      createdAt: '2026-08-11'
    },
    {
      id: '2',
      name: 'Jane Smith',
      email: 'jane@example.com',
      phone: '(555) 234-5678',
      company: 'XYZ Inc',
      status: 'pending',
      household: '2',
      key: 'Quick Sale',
      paid: true,
      approved: true,
      pending: true,
      negative: false,
      totalSales: 0,
      totalDeposits: 0,
      pendingDeposits: 250.00,
      totalCoverage: 0,
      lastContact: '1 week ago',
      createdAt: '2026-08-05'
    },
  ])

  // Sample sales data
  const [sales, setSales] = useState<Sale[]>([
    { id: '1', clientId: '1', amount: 1120.00, status: 'unpaid', date: '8/11/26', company: 'American Amicable', type: 'quick' },
    { id: '2', clientId: '2', amount: 250.00, status: 'pending', date: '8/5/26', company: 'Corebridge', type: 'quick' },
  ])

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

  const displayName = profile?.full_name || user?.email?.split('@')[0] || 'User'

  const filteredClients = clients.filter(client => {
    const matchesSearch = client.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         client.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         client.company.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = filterStatus === 'All' || client.status === filterStatus.toLowerCase()
    return matchesSearch && matchesStatus
  })

  const getStatusColor = (status: string) => {
    switch(status) {
      case 'active': return 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400'
      case 'pending': return 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400'
      case 'negative': return 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400'
      case 'approved': return 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400'
      default: return 'bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300'
    }
  }

  // Calculate totals
  const totalSales = sales.reduce((sum, sale) => sum + sale.amount, 0)
  const pendingSales = sales.filter(s => s.status === 'pending').length
  const unpaidSales = sales.filter(s => s.status === 'unpaid').length
  const paidSales = sales.filter(s => s.status === 'paid').length
  const cancelledSales = sales.filter(s => s.status === 'cancelled').length

  const statusCounts = {
    all: sales.length,
    pending: pendingSales,
    unpaid: unpaidSales,
    paid: paidSales,
    cancelled: cancelledSales
  }

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-12">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <div className="flex items-center gap-2">
            <Users className="h-6 w-6 text-yellow-500" />
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">CLIENT DATABASE</h1>
          </div>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">MANAGE YOUR CLIENT RECORDS</p>
        </div>
        <div className="flex items-center gap-2">
          <Link
            href="/dashboard/clients/post-sale"
            className="px-4 py-2 bg-yellow-400 text-gray-900 rounded-lg text-sm font-semibold hover:bg-yellow-500 transition-colors flex items-center gap-2"
          >
            <Plus className="h-4 w-4" />
            Post Sale
          </Link>
          <button className="px-4 py-2 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg text-sm font-medium hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors flex items-center gap-2">
            <UserPlus className="h-4 w-4" />
            Add Client
          </button>
        </div>
      </div>

      

      {/* Post Sale Section */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <FileText className="h-5 w-5 text-yellow-500" />
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Post Sale</h3>
          </div>
          <span className="text-sm text-gray-500 dark:text-gray-400">Post a Sale</span>
        </div>
        <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
          Choose quick sale or full client sale before posting.
        </p>
        <div className="flex flex-wrap gap-3">
          <Link
            href="/dashboard/clients/post-sale"
            className="px-4 py-2 bg-blue-500 text-white rounded-lg text-sm font-medium hover:bg-blue-600 transition-colors flex items-center gap-2"
          >
            <Plus className="h-4 w-4" />
            Quick Sale
          </Link>
          <Link
            href="/dashboard/clients/post-sale?type=full"
            className="px-4 py-2 bg-purple-500 text-white rounded-lg text-sm font-medium hover:bg-purple-600 transition-colors flex items-center gap-2"
          >
            <Plus className="h-4 w-4" />
            Full Client Sale
          </Link>
        </div>
      </div>

      {/* Sales Stats */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex flex-wrap items-center gap-4">
            <span className="text-sm font-semibold text-gray-700 dark:text-gray-300">All Sales ({sales.length})</span>
            <span className="text-sm text-yellow-600 dark:text-yellow-400">Pending ({statusCounts.pending})</span>
            <span className="text-sm text-red-600 dark:text-red-400">Unpaid ({statusCounts.unpaid})</span>
            <span className="text-sm text-green-600 dark:text-green-400">Paid ({statusCounts.paid})</span>
            <span className="text-sm text-gray-500 dark:text-gray-400">Cancelled ({statusCounts.cancelled})</span>
          </div>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search clients..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            />
          </div>
          <div className="flex gap-2">
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            >
              <option value="All">All Status</option>
              <option value="Active">Active</option>
              <option value="Pending">Pending</option>
              <option value="Approved">Approved</option>
              <option value="Negative">Negative</option>
            </select>
            <button className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
              <Filter className="h-4 w-4 text-gray-500 dark:text-gray-400" />
            </button>
            <button className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
              <Download className="h-4 w-4 text-gray-500 dark:text-gray-400" />
            </button>
          </div>
        </div>

        {/* Table Headers with Key */}
        <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
          <div className="grid grid-cols-6 gap-2 text-xs font-medium text-gray-500 dark:text-gray-400">
            <div>Key</div>
            <div>Paid</div>
            <div>Approved</div>
            <div>Pending</div>
            <div>Negative</div>
            <div>Household</div>
          </div>
          <div className="mt-2 grid grid-cols-6 gap-2 text-sm">
            <div className="flex items-center gap-1">
              <span className="font-medium text-gray-700 dark:text-gray-300">Quick Sale</span>
            </div>
            <div><CheckCircle className="h-4 w-4 text-green-500" /></div>
            <div><CheckCircle className="h-4 w-4 text-green-500" /></div>
            <div><CheckCircle className="h-4 w-4 text-green-500" /></div>
            <div><CheckCircle className="h-4 w-4 text-green-500" /></div>
            <div><CheckCircle className="h-4 w-4 text-green-500" /></div>
          </div>
        </div>

        {/* Stats Row */}
        <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
            <div>
              <span className="text-gray-500 dark:text-gray-400">Total Sales:</span>
              <span className="font-semibold text-gray-900 dark:text-white ml-2">${totalSales.toFixed(2)}</span>
            </div>
            <div>
              <span className="text-gray-500 dark:text-gray-400">Total AP:</span>
              <span className="font-semibold text-gray-900 dark:text-white ml-2">Total Deposits</span>
            </div>
            <div>
              <span className="text-gray-500 dark:text-gray-400">Pending Deposits:</span>
              <span className="font-semibold text-gray-900 dark:text-white ml-2">$250.00</span>
            </div>
            <div>
              <span className="text-gray-500 dark:text-gray-400">Total Coverage:</span>
              <span className="font-semibold text-gray-900 dark:text-white ml-2">Total Coverage</span>
            </div>
          </div>
        </div>
      </div>

      {/* Clients Table */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 dark:bg-gray-700">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Client</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Contact</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Company</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Total Sales</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
              {filteredClients.map((client) => (
                <tr key={client.id} className="hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="w-8 h-8 rounded-full bg-yellow-100 dark:bg-yellow-900/30 flex items-center justify-center font-semibold text-yellow-700 dark:text-yellow-400 text-sm">
                        {client.name.charAt(0).toUpperCase()}
                      </div>
                      <span className="ml-3 text-sm font-medium text-gray-900 dark:text-white">{client.name}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900 dark:text-white">{client.email}</div>
                    <div className="text-xs text-gray-500 dark:text-gray-400">{client.phone}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">{client.company}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(client.status)}`}>
                      {client.status.charAt(0).toUpperCase() + client.status.slice(1)}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">
                    ${client.totalSales.toFixed(2)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <div className="flex items-center justify-end gap-2">
                      <button className="p-1 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 rounded">
                        <Eye className="h-4 w-4" />
                      </button>
                      <button className="p-1 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 rounded">
                        <Edit className="h-4 w-4" />
                      </button>
                      <button className="p-1 text-gray-400 hover:text-red-600 dark:hover:text-red-400 rounded">
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Bottom Filters */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Status</label>
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            >
              <option value="All">All</option>
              <option value="Active">Active</option>
              <option value="Pending">Pending</option>
              <option value="Approved">Approved</option>
              <option value="Negative">Negative</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Range</label>
            <select
              value={selectedRange}
              onChange={(e) => setSelectedRange(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            >
              <option value="All">All</option>
              <option value="Today">Today</option>
              <option value="This Week">This Week</option>
              <option value="This Month">This Month</option>
              <option value="Last 30 Days">Last 30 Days</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Payment Options</label>
            <div className="flex flex-wrap gap-2 mt-1">
              <button className="px-3 py-1.5 text-xs bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors">
                Pending Deposits
              </button>
              <button className="px-3 py-1.5 text-xs bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors">
                Total Coverage
              </button>
              <button className="px-3 py-1.5 text-xs bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors">
                Total Deposit
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="text-center text-xs text-gray-400 dark:text-gray-500 pt-4">
        tracker.johnwetmore.com © 2026 John Wetmore
      </div>
    </div>
  )
}