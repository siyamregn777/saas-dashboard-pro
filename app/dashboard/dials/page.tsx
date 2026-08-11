'use client'

import { Phone, Plus, MoreVertical } from 'lucide-react'

const dials = [
  { id: 1, contact: 'Sarah Johnson', company: 'Tech Corp', status: 'Completed', duration: '5:23', time: '10:30 AM' },
  { id: 2, contact: 'Mike Chen', company: 'Startup Inc', status: 'Scheduled', duration: '-', time: '2:00 PM' },
  { id: 3, contact: 'Emma Wilson', company: 'Enterprise Ltd', status: 'Missed', duration: '-', time: 'Yesterday' },
]

export default function DialsPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-800">Dials</h2>
        <button className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700">
          <Phone size={18} />
          New Dial
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Contact</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Company</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Duration</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Time</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {dials.map((dial) => (
                <tr key={dial.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 text-sm font-medium text-gray-900">{dial.contact}</td>
                  <td className="px-6 py-4 text-sm text-gray-600">{dial.company}</td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 text-xs rounded-full ${
                      dial.status === 'Completed' ? 'bg-green-100 text-green-800' :
                      dial.status === 'Scheduled' ? 'bg-blue-100 text-blue-800' :
                      'bg-red-100 text-red-800'
                    }`}>
                      {dial.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600">{dial.duration}</td>
                  <td className="px-6 py-4 text-sm text-gray-600">{dial.time}</td>
                  <td className="px-6 py-4 text-right">
                    <button className="p-1 hover:bg-gray-100 rounded-lg">
                      <MoreVertical size={18} className="text-gray-500" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}