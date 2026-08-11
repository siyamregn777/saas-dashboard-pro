'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { ThemeToggle } from '@/components/ThemeToggle'
import type { User as UserType, Profile as ProfileType } from '@/types'
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
  ChevronLeft,
  ChevronRight,
  User,
  Bell,
  Search,
  HelpCircle,
  Sparkles,
  Target,
  Zap,
  Settings,
  Award,
  Clock,
  Gift,
  Building2,
  ClipboardList,
  FileText,
  TrendingUp,
  Activity
} from 'lucide-react'
import { createClient } from '@/lib/supabase/client'

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [profileOpen, setProfileOpen] = useState(false)
  const [insightsOpen, setInsightsOpen] = useState(true)
  const [user, setUser] = useState<UserType | null>(null)
  const [profile, setProfile] = useState<ProfileType | null>(null)
  const pathname = usePathname()
  const router = useRouter()
  const supabase = createClient()
  const profileRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Fetch user data
    const getUserData = async () => {
      const { data: { user } } = await supabase.auth.getUser()
      setUser(user as UserType)
      if (user) {
        const { data: profile } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', user.id)
          .single()
        setProfile(profile as ProfileType)
      }
    }
    getUserData()
  }, [supabase])

  // Close profile dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (profileRef.current && !profileRef.current.contains(event.target as Node)) {
        setProfileOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  // Close profile dropdown when route changes - using a different approach
  const prevPathname = useRef(pathname)
  useEffect(() => {
    if (prevPathname.current !== pathname) {
      prevPathname.current = pathname
      // Close profile on route change
      setProfileOpen(false)
    }
  }, [pathname])

  const handleLogout = async () => {
    await supabase.auth.signOut()
    router.push('/login')
  }

  const displayName = profile?.full_name || user?.email?.split('@')[0] || 'User'

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="min-h-screen flex">
        {/* Mobile sidebar */}
        <div className={`lg:hidden ${mobileOpen ? 'block' : 'hidden'}`}>
          <div className="fixed inset-0 z-50 flex">
            <div className="fixed inset-0 bg-gray-600 bg-opacity-75" onClick={() => setMobileOpen(false)} />
            <div className="relative flex-1 flex flex-col max-w-xs w-full bg-white dark:bg-gray-800">
              <div className="absolute top-0 right-0 -mr-12 pt-2">
                <button
                  onClick={() => setMobileOpen(false)}
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
                sidebarOpen={true}
                isMobile={true}
                displayName={displayName}
              />
            </div>
          </div>
        </div>

        {/* Desktop sidebar */}
        <div className={`hidden lg:flex lg:flex-shrink-0 transition-all duration-300 ${sidebarOpen ? 'w-64' : 'w-20'}`}>
          <div className={`flex flex-col border-r border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 transition-all duration-300 ${sidebarOpen ? 'w-64' : 'w-20'}`}>
            <SidebarContent 
              handleLogout={handleLogout} 
              pathname={pathname}
              insightsOpen={insightsOpen}
              setInsightsOpen={setInsightsOpen}
              sidebarOpen={sidebarOpen}
              isMobile={false}
              displayName={displayName}
            />
          </div>
        </div>

        {/* Main content */}
        <div className="flex-1 min-w-0 flex flex-col">
          {/* Top header bar */}
          <div className="sticky top-0 z-10 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 px-4 py-3 flex items-center justify-between lg:px-6">
            <div className="flex items-center gap-3">
              <button
                onClick={() => setMobileOpen(true)}
                className="lg:hidden -ml-2 p-2 rounded-md text-gray-500 hover:text-gray-900 hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                <Menu className="h-6 w-6" />
              </button>
              <button
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="hidden lg:flex p-2 rounded-md text-gray-500 hover:text-gray-900 hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                {sidebarOpen ? <ChevronLeft className="h-5 w-5" /> : <ChevronRight className="h-5 w-5" />}
              </button>
              <h1 className="text-lg font-semibold text-gray-900 dark:text-white lg:hidden">SalesTracker</h1>
            </div>
            
            <div className="flex-1 flex items-center justify-end gap-4">
              {/* Search */}
              <div className="relative hidden sm:block">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search..."
                  className="pl-9 pr-4 py-1.5 border border-gray-300 dark:border-gray-600 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent w-48 md:w-64 bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
                />
              </div>
              
              {/* Theme Toggle */}
              <ThemeToggle />
              
              {/* Notifications */}
              <button className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg relative">
                <Bell className="h-5 w-5" />
                <span className="absolute top-1.5 right-1.5 h-2 w-2 bg-red-500 rounded-full"></span>
              </button>

              {/* User Profile Dropdown */}
              <div className="relative" ref={profileRef}>
                <button
                  onClick={() => setProfileOpen(!profileOpen)}
                  className="flex items-center gap-2 p-1.5 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg"
                >
                  <div className="w-8 h-8 rounded-full bg-yellow-400 flex items-center justify-center text-gray-900 font-semibold text-sm">
                    {displayName.charAt(0).toUpperCase()}
                  </div>
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300 hidden sm:block">{displayName}</span>
                  <ChevronDown className="h-4 w-4 text-gray-500 hidden sm:block" />
                </button>
                
                {profileOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 py-1 z-50">
                    <div className="px-4 py-2 border-b border-gray-200 dark:border-gray-700">
                      <p className="text-sm font-medium text-gray-900 dark:text-white">{displayName}</p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">{user?.email || 'user@example.com'}</p>
                    </div>
                    <Link
                      href="/dashboard/profile"
                      className="w-full px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 flex items-center gap-2 text-left"
                      onClick={() => setProfileOpen(false)}
                    >
                      <User className="h-4 w-4" />
                      Profile
                    </Link>
                    <Link
                      href="/dashboard/settings"
                      className="w-full px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 flex items-center gap-2 text-left"
                      onClick={() => setProfileOpen(false)}
                    >
                      <Settings className="h-4 w-4" />
                      Settings
                    </Link>
                    <hr className="my-1 border-gray-200 dark:border-gray-700" />
                    <button
                      onClick={() => {
                        setProfileOpen(false)
                        handleLogout()
                      }}
                      className="w-full px-4 py-2 text-sm text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 flex items-center gap-2 text-left"
                    >
                      <LogOut className="h-4 w-4" />
                      Sign Out
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
          
          <main className="flex-1 p-4 lg:p-6 bg-gray-50 dark:bg-gray-900">
            {children}
          </main>
        </div>
      </div>
    </div>
  )
}

// SidebarContent component
function SidebarContent({ 
  handleLogout, 
  pathname,
  insightsOpen,
  setInsightsOpen,
  sidebarOpen,
  isMobile,
  displayName
}: { 
  handleLogout: () => void
  pathname: string
  insightsOpen: boolean
  setInsightsOpen: (open: boolean) => void
  sidebarOpen: boolean
  isMobile: boolean
  displayName: string
}) {
  // Navigation items - Daily Tools
  const dailyTools = [
    { name: 'What\'s New', href: '/dashboard/whats-new', icon: Gift },
    { name: 'Home', href: '/dashboard/home', icon: Home },
    { name: 'JW Call Coach', href: '/dashboard/call-coach', icon: Sparkles },
    { name: 'Dial Tracker', href: '/dashboard/dial-tracker', icon: Clock },
  ]

  // Navigation items - Clients & Sales (with Clients added)
  const clientsSales = [
    { name: 'Clients', href: '/dashboard/clients', icon: Building2 },
    { name: 'Phone Script', href: '/dashboard/phone-script', icon: Phone },
    { name: 'Leaderboard', href: '/dashboard/leaderboard', icon: Trophy },
    { name: 'Deposits', href: '/dashboard/deposits', icon: Wallet },
    { name: 'Leads', href: '/dashboard/leads', icon: Users },
  ]

  // Navigation items - Insights
  const insights = [
    { name: 'Analytics', href: '/dashboard/analytics', icon: BarChart3 },
    { name: 'Badges', href: '/dashboard/badges', icon: Award },
    { name: 'Goal Tracker', href: '/dashboard/goal-tracker', icon: Target },
  ]

  const isActive = (href: string): boolean => {
    if (href === '/dashboard/home') {
      return pathname === '/dashboard/home' || pathname === '/dashboard'
    }
    return pathname === href || pathname.startsWith(href + '/')
  }

  const showText = sidebarOpen || isMobile

  return (
    <>
      <div className="flex-1 flex flex-col pt-5 pb-4 overflow-y-auto">
        {/* User Info at top */}
        <div className={`flex items-center px-4 mb-6 ${!showText ? 'justify-center' : ''}`}>
          <div className="w-10 h-10 rounded-full bg-yellow-400 flex items-center justify-center text-gray-900 font-bold text-sm flex-shrink-0">
            {displayName.charAt(0).toUpperCase()}
          </div>
          {showText && (
            <>
              <span className="ml-2 text-sm font-semibold text-gray-900 dark:text-white">{displayName}</span>
              <div className="ml-auto flex items-center gap-1">
                <button className="p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded">
                  <HelpCircle className="h-4 w-4 text-gray-400" />
                </button>
                <button className="p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded">
                  <span className="text-gray-400 text-sm">?</span>
                </button>
                <button className="p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded">
                  <span className="text-gray-400 text-sm">🧑‍💼</span>
                </button>
              </div>
            </>
          )}
          {!showText && (
            <div className="flex flex-col items-center mt-2 gap-1">
              <button className="p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded">
                <HelpCircle className="h-4 w-4 text-gray-400" />
              </button>
              <button className="p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded">
                <span className="text-gray-400 text-sm">?</span>
              </button>
            </div>
          )}
        </div>

        {/* DAILY TOOLS Section */}
        {showText && (
          <div className="px-4 mb-2">
            <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Daily Tools</p>
          </div>
        )}
        
        <nav className="px-2 space-y-0.5 mb-6">
          {dailyTools.map((item) => {
            const active = isActive(item.href)
            return (
              <Link
                key={item.name}
                href={item.href}
                className={`group flex items-center px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
                  active
                    ? 'bg-yellow-400 text-gray-900 hover:bg-yellow-500'
                    : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-gray-900 dark:hover:text-white'
                } ${!showText ? 'justify-center' : ''}`}
                title={!showText ? item.name : ''}
              >
                <item.icon className={`flex-shrink-0 h-4 w-4 ${active ? 'text-gray-900' : 'text-gray-400 group-hover:text-gray-500 dark:group-hover:text-gray-300'} ${!showText ? '' : 'mr-3'}`} />
                {showText && <span>{item.name}</span>}
                {item.name === 'JW Call Coach' && showText && (
                  <span className="ml-auto text-[10px] font-bold text-gray-900 bg-yellow-200 px-1.5 py-0.5 rounded">NEW</span>
                )}
              </Link>
            )
          })}
        </nav>

        {/* CLIENTS & SALES Section */}
        {showText && (
          <div className="px-4 mb-2">
            <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Clients & Sales</p>
          </div>
        )}
        
        <nav className="px-2 space-y-0.5 mb-6">
          {clientsSales.map((item) => {
            const active = isActive(item.href)
            return (
              <Link
                key={item.name}
                href={item.href}
                className={`group flex items-center px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
                  active
                    ? 'bg-yellow-400 text-gray-900 hover:bg-yellow-500'
                    : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-gray-900 dark:hover:text-white'
                } ${!showText ? 'justify-center' : ''}`}
                title={!showText ? item.name : ''}
              >
                <item.icon className={`flex-shrink-0 h-4 w-4 ${active ? 'text-gray-900' : 'text-gray-400 group-hover:text-gray-500 dark:group-hover:text-gray-300'} ${!showText ? '' : 'mr-3'}`} />
                {showText && <span>{item.name}</span>}
              </Link>
            )
          })}
        </nav>

        {/* INSIGHTS Section */}
        {showText && (
          <div className="px-4 mb-2">
            <button
              onClick={() => setInsightsOpen(!insightsOpen)}
              className="flex items-center justify-between w-full"
            >
              <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Insights</p>
              <ChevronDown className={`h-3 w-3 text-gray-400 transition-transform ${insightsOpen ? 'rotate-180' : ''}`} />
            </button>
          </div>
        )}
        
        {insightsOpen && showText && (
          <nav className="px-2 space-y-0.5 mb-6">
            {insights.map((item) => {
              const active = isActive(item.href)
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`group flex items-center px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
                    active
                      ? 'bg-yellow-400 text-gray-900 hover:bg-yellow-500'
                      : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-gray-900 dark:hover:text-white'
                  }`}
                >
                  <item.icon className={`flex-shrink-0 h-4 w-4 mr-3 ${active ? 'text-gray-900' : 'text-gray-400 group-hover:text-gray-500 dark:group-hover:text-gray-300'}`} />
                  <span>{item.name}</span>
                </Link>
              )
            })}
          </nav>
        )}

        {/* Sign Out at bottom */}
        <div className="mt-auto px-2 pt-4 border-t border-gray-200 dark:border-gray-700">
          <button
            onClick={handleLogout}
            className={`flex items-center w-full px-3 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors ${!showText ? 'justify-center' : ''}`}
            title={!showText ? 'Sign Out' : ''}
          >
            <LogOut className={`h-4 w-4 text-gray-400 ${!showText ? '' : 'mr-3'}`} />
            {showText && <span>Sign Out</span>}
          </button>
        </div>
      </div>
    </>
  )
}