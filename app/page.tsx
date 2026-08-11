import Link from 'next/link'

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 flex items-center justify-center">
      <div className="text-center max-w-3xl mx-auto px-4">
        <div className="mb-8">
          <div className="inline-block p-4 bg-indigo-100 rounded-2xl mb-6">
            <svg className="w-12 h-12 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4" />
            </svg>
          </div>
        </div>
        
        <h1 className="text-5xl md:text-6xl font-bold text-gray-800 mb-4">
          Welcome to{' '}
          <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
            SaaS Dashboard
          </span>
        </h1>
        
        <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
          Modern, responsive dashboard with sidebar navigation, analytics, user management, and more.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/dashboard"
            className="inline-flex items-center justify-center px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors shadow-lg hover:shadow-xl"
          >
            Go to Dashboard →
          </Link>
          <Link
            href="/dashboard/analytics"
            className="inline-flex items-center justify-center px-6 py-3 border border-gray-300 bg-white text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
          >
            View Analytics
          </Link>
        </div>

        <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto">
          <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
            <div className="text-indigo-600 font-semibold">7</div>
            <div className="text-sm text-gray-600">Pages</div>
          </div>
          <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
            <div className="text-indigo-600 font-semibold">100%</div>
            <div className="text-sm text-gray-600">Responsive</div>
          </div>
          <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
            <div className="text-indigo-600 font-semibold">Modern</div>
            <div className="text-sm text-gray-600">UI Design</div>
          </div>
          <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
            <div className="text-indigo-600 font-semibold">Next.js</div>
            <div className="text-sm text-gray-600">Framework</div>
          </div>
        </div>
      </div>
    </div>
  )
}