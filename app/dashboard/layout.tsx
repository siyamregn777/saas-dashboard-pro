'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { 
  Home,
  Phone,
  Trophy,
  Wallet, 
  Users,
  BarChart3,
  LogOut,
  Menu,
  X,
  ChevronDown,
  User,
  Bell,
  Search,
  HelpCircle,
  Sparkles,
  Target,
  Zap,
  Settings,
  TrendingUp,
  Lightbulb,
  UserPlus,
  Building2,
  Award,
  Clock,
  AlertCircle,
  Gift
} from 'lucide-react'
import { createClient } from '@/lib/supabase/client'
import { useRouter } from 'next/navigation'

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [profileOpen, setProfileOpen] = useState(false)
  const [insightsOpen, setInsightsOpen] = useState(true)
  const pathname = usePathname()
  const router = useRouter()
  const supabase = createClient()

  const handleLogout = async () => {
    await supabase.auth.signOut()
    router.push('/login')
  }

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Mobile sidebar */}
      <div className={`lg:hidden ${sidebarOpen ? 'block' : 'hidden'}`}>
        <div className="fixed inset-0 z-50 flex">
          <div className="fixed inset-0 bg-gray-600 bg-opacity-75" onClick={() => setSidebarOpen(false)} />
          <div className="relative flex-1 flex flex-col max-w-xs w-full bg-white">
            <div className="absolute top-0 right-0 -mr-12 pt-2">
              <button
                onClick={() => setSidebarOpen(false)}
                className="ml-1 flex items-center justify-center h-10 w-10 rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
              >
                <X className="h-6 w-6 text-white" />
              </button>
            </div>
            <SidebarContent 
              handleLogout={handleLogout} 
              pathname={pathname}
              insightsOpen={insightsOpen}
              setInsightsOpen={setInsightsOpen}
            />
          </div>
        </div>
      </div>

      {/* Desktop sidebar */}
      <div className="hidden lg:flex lg:flex-shrink-0">
        <div className="flex flex-col w-64 border-r border-gray-200 bg-white">
          <SidebarContent 
            handleLogout={handleLogout} 
            pathname={pathname}
            insightsOpen={insightsOpen}
            setInsightsOpen={setInsightsOpen}
          />
        </div>
      </div>

      {/* Main content */}
      <div className="flex-1 min-w-0 flex flex-col">
        {/* Top header bar */}
        <div className="sticky top-0 z-10 bg-white border-b border-gray-200 px-4 py-3 flex items-center justify-between lg:px-6">
          <button
            onClick={() => setSidebarOpen(true)}
            className="lg:hidden -ml-2 p-2 rounded-md text-gray-500 hover:text-gray-900 hover:bg-gray-100"
          >
            <Menu className="h-6 w-6" />
          </button>
          
          <div className="flex-1 flex items-center justify-end gap-4">
            {/* What's New Button */}
            <Link 
              href="/dashboard/whats-new" 
              className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg relative transition-colors"
            >
              <Gift className="h-5 w-5" />
              <span className="absolute -top-0.5 -right-0.5 h-2.5 w-2.5 bg-red-500 rounded-full animate-pulse"></span>
            </Link>

            {/* Search */}
            <div className="relative hidden sm:block">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search..."
                className="pl-9 pr-4 py-1.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent w-48 md:w-64"
              />
            </div>
            
            {/* Notifications */}
            <button className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg relative">
              <Bell className="h-5 w-5" />
              <span className="absolute top-1.5 right-1.5 h-2 w-2 bg-red-500 rounded-full"></span>
            </button>

            {/* User Profile Dropdown */}
            <div className="relative">
              <button
                onClick={() => setProfileOpen(!profileOpen)}
                className="flex items-center gap-2 p-1.5 hover:bg-gray-100 rounded-lg"
              >
                <div className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-500 to-blue-600 flex items-center justify-center text-white font-semibold text-sm">
                  AH
                </div>
                <span className="text-sm font-medium text-gray-700 hidden sm:block">ahmed</span>
                <ChevronDown className="h-4 w-4 text-gray-500 hidden sm:block" />
              </button>
              
              {profileOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-1 z-50">
                  <div className="px-4 py-2 border-b border-gray-100">
                    <p className="text-sm font-medium text-gray-900">ahmed</p>
                    <p className="text-xs text-gray-500">ahmed@example.com</p>
                  </div>
                  <button className="w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 flex items-center gap-2 text-left">
                    <User className="h-4 w-4" />
                    Profile
                  </button>
                  <button className="w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 flex items-center gap-2 text-left">
                    <Settings className="h-4 w-4" />
                    Settings
                  </button>
                  <hr className="my-1" />
                  <button
                    onClick={handleLogout}
                    className="w-full px-4 py-2 text-sm text-red-600 hover:bg-red-50 flex items-center gap-2 text-left"
                  >
                    <LogOut className="h-4 w-4" />
                    Sign Out
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
        
        <main className="flex-1 p-4 lg:p-6">
          {children}
        </main>
      </div>
    </div>
  )
}

function SidebarContent({ 
  handleLogout, 
  pathname,
  insightsOpen,
  setInsightsOpen
}: { 
  handleLogout: () => void
  pathname: string
  insightsOpen: boolean
  setInsightsOpen: (open: boolean) => void
}) {
  // Main navigation items
  const mainNav = [
    { name: 'What\'s New', href: '/dashboard/whats-new', icon: Gift, badge: 'NEW' },
    { name: 'Home', href: '/dashboard', icon: Home },
    { name: 'JW Call Coach', href: '/dashboard/call-coach', icon: Sparkles, badge: 'NEW' },
    { name: 'Dial Tracker', href: '/dashboard/dial-tracker', icon: Clock },
  ]

  // Clients & Sales dropdown items
  const clientsSalesNav = [
    { name: 'Phone Script', href: '/dashboard/phone-script', icon: Phone },
    { name: 'Leaderboard', href: '/dashboard/leaderboard', icon: Trophy },
    { name: 'Deposits', href: '/dashboard/deposits', icon: Wallet },
    { name: 'Leads', href: '/dashboard/leads', icon: Users },
  ]

  // Insights items
  const insightsNav = [
    { name: 'Analytics', href: '/dashboard/analytics', icon: BarChart3 },
    { name: 'Hustle Score', href: '/dashboard/hustle-score', icon: Zap },
    { name: 'UNLOCK MORE', href: '/dashboard/unlock-more', icon: Target, badge: 'PRO' },
    { name: 'Agency Tools', href: '/dashboard/agency-tools', icon: Building2 },
  ]

  const isActive = (href: string) => {
    return pathname === href || pathname.startsWith(href + '/')
  }

  return (
    <>
      <div className="flex-1 flex flex-col pt-5 pb-4 overflow-y-auto">
        {/* User Info at top */}
        <div className="flex items-center px-4 mb-6">
          <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-500 to-blue-600 flex items-center justify-center text-white font-bold text-sm">
            AH
          </div>
          <span className="ml-2 text-sm font-semibold text-gray-900">ahmed</span>
          <div className="ml-auto flex items-center gap-1">
            <button className="p-1 hover:bg-gray-100 rounded transition-colors">
              <HelpCircle className="h-4 w-4 text-gray-400" />
            </button>
            <button className="p-1 hover:bg-gray-100 rounded transition-colors">
              <span className="text-gray-400 text-sm">?</span>
            </button>
            <button className="p-1 hover:bg-gray-100 rounded transition-colors">
              <span className="text-gray-400 text-sm">🧑‍💼</span>
            </button>
          </div>
        </div>

        {/* DAILY TOOLS Section */}
        <div className="px-4 mb-2">
          <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Daily Tools</p>
        </div>
        
        <nav className="px-2 space-y-0.5 mb-6">
          {mainNav.map((item) => {
            const active = isActive(item.href)
            return (
              <Link
                key={item.name}
                href={item.href}
                className={`group flex items-center px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
                  active
                    ? 'bg-blue-50 text-blue-700'
                    : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900'
                }`}
              >
                <item.icon
                  className={`mr-3 flex-shrink-0 h-4 w-4 ${
                    active ? 'text-blue-600' : 'text-gray-400 group-hover:text-gray-500'
                  }`}
                />
                {item.name}
                {item.badge && (
                  <span className={`ml-auto text-[10px] font-bold px-1.5 py-0.5 rounded ${
                    item.badge === 'NEW' 
                      ? 'text-blue-600 bg-blue-50' 
                      : 'text-purple-600 bg-purple-50'
                  }`}>
                    {item.badge}
                  </span>
                )}
              </Link>
            )
          })}
        </nav>

        {/* CLIENTS & SALES Section */}
        <div className="px-4 mb-2">
          <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Clients & Sales</p>
        </div>
        
        <nav className="px-2 space-y-0.5 mb-6">
          {clientsSalesNav.map((item) => {
            const active = isActive(item.href)
            return (
              <Link
                key={item.name}
                href={item.href}
                className={`group flex items-center px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
                  active
                    ? 'bg-blue-50 text-blue-700'
                    : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900'
                }`}
              >
                <item.icon
                  className={`mr-3 flex-shrink-0 h-4 w-4 ${
                    active ? 'text-blue-600' : 'text-gray-400 group-hover:text-gray-500'
                  }`}
                />
                {item.name}
              </Link>
            )
          })}
        </nav>

        {/* INSIGHTS Section with dropdown */}
        <div className="px-4 mb-2">
          <button
            onClick={() => setInsightsOpen(!insightsOpen)}
            className="flex items-center justify-between w-full"
          >
            <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Insights</p>
            <ChevronDown className={`h-3 w-3 text-gray-400 transition-transform ${insightsOpen ? 'rotate-180' : ''}`} />
          </button>
        </div>
        
        {insightsOpen && (
          <nav className="px-2 space-y-0.5 mb-6">
            {insightsNav.map((item) => {
              const active = isActive(item.href)
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`group flex items-center px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
                    active
                      ? 'bg-blue-50 text-blue-700'
                      : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900'
                  }`}
                >
                  <item.icon
                    className={`mr-3 flex-shrink-0 h-4 w-4 ${
                      active ? 'text-blue-600' : 'text-gray-400 group-hover:text-gray-500'
                    }`}
                  />
                  {item.name}
                  {item.badge && (
                    <span className="ml-auto text-[10px] font-bold text-purple-600 bg-purple-50 px-1.5 py-0.5 rounded">
                      {item.badge}
                    </span>
                  )}
                </Link>
              )
            })}
          </nav>
        )}

        {/* Sign Out at bottom */}
        <div className="mt-auto px-2 pt-4 border-t border-gray-200">
          <button
            onClick={handleLogout}
            className="flex items-center w-full px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 rounded-lg transition-colors"
          >
            <LogOut className="mr-3 h-4 w-4 text-gray-400" />
            Sign Out
          </button>
        </div>
      </div>
    </>
  )
}