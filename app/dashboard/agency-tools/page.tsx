'use client'

import { Building2, Users, Settings, BarChart3, FileText, Calendar, Mail, Phone } from 'lucide-react'

export default function AgencyToolsPage() {
  const tools = [
    { name: 'Team Management', icon: Users, description: 'Manage your team members and roles' },
    { name: 'Analytics Dashboard', icon: BarChart3, description: 'Agency-wide performance metrics' },
    { name: 'Reports', icon: FileText, description: 'Generate and export reports' },
    { name: 'Calendar', icon: Calendar, description: 'Schedule and manage appointments' },
    { name: 'Email Campaigns', icon: Mail, description: 'Create and send email campaigns' },
    { name: 'Call Center', icon: Phone, description: 'Manage call center operations' },
  ]

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900">Agency Tools</h1>
      <p className="text-gray-500 mt-2">Tools for agency management</p>
      
      <div className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {tools.map((tool) => (
          <div key={tool.name} className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-shadow">
            <div className="w-12 h-12 rounded-lg bg-blue-50 flex items-center justify-center mb-4">
              <tool.icon className="h-6 w-6 text-blue-600" />
            </div>
            <h3 className="font-semibold text-gray-900">{tool.name}</h3>
            <p className="text-sm text-gray-500 mt-1">{tool.description}</p>
            <button className="mt-4 text-sm text-blue-600 hover:text-blue-700 font-medium">
              Learn More →
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}