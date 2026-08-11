import { ThemeToggle } from '@/components/ThemeToggle'
import Link from 'next/link'

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="flex flex-col min-h-screen">
        {/* Top bar with theme toggle and branding */}
        <header className="sticky top-0 z-50 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-b border-gray-200 dark:border-gray-700">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16">
              <Link href="/" className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-yellow-400 flex items-center justify-center text-gray-900 font-bold">
                  S
                </div>
                <span className="text-lg font-bold text-gray-900 dark:text-white">SalesTracker</span>
              </Link>
              <div className="flex items-center gap-4">
                <ThemeToggle />
              </div>
            </div>
          </div>
        </header>
        
        {/* Main content */}
        <main className="flex-1 flex items-center justify-center p-4">
          <div className="w-full max-w-md">
            {children}
          </div>
        </main>
        
        {/* Footer */}
        <footer className="border-t border-gray-200 dark:border-gray-700 py-4">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <p className="text-center text-sm text-gray-500 dark:text-gray-400">
              © {new Date().getFullYear()} SalesTracker. All rights reserved.
            </p>
          </div>
        </footer>
      </div>
    </div>
  )
}