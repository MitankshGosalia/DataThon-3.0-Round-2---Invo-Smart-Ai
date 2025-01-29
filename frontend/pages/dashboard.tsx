import { useState } from 'react'
import Layout from '../components/Layout'
import { motion } from 'framer-motion'
import {
  ChartBarIcon,
  DocumentTextIcon,
  CurrencyDollarIcon,
  ClockIcon,
} from '@heroicons/react/24/outline'

export default function Dashboard() {
  const [stats] = useState([
    { name: 'Total Invoices', value: '156', icon: DocumentTextIcon },
    { name: 'Processed Today', value: '12', icon: ClockIcon },
    { name: 'Total Amount', value: '$45,678', icon: CurrencyDollarIcon },
    { name: 'Success Rate', value: '99.8%', icon: ChartBarIcon },
  ])

  return (
    <Layout title="Dashboard - InvoSmart AI">
      <div className="py-6">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 md:px-8">
          <h1 className="text-2xl font-semibold text-white">Dashboard</h1>
        </div>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 md:px-8">
          {/* Stats */}
          <div className="mt-8">
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {stats.map((stat, index) => (
                <motion.div
                  key={stat.name}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="glass-effect overflow-hidden rounded-lg px-4 py-5 sm:p-6"
                >
                  <div className="flex items-center">
                    <div className="flex-shrink-0">
                      <stat.icon className="h-6 w-6 text-blue-400" aria-hidden="true" />
                    </div>
                    <div className="ml-5 w-0 flex-1">
                      <dl>
                        <dt className="text-sm font-medium text-gray-400 truncate">
                          {stat.name}
                        </dt>
                        <dd>
                          <div className="text-lg font-medium text-white">
                            {stat.value}
                          </div>
                        </dd>
                      </dl>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Recent Activity */}
          <div className="mt-8">
            <div className="glass-effect overflow-hidden rounded-lg">
              <div className="px-4 py-5 sm:p-6">
                <h3 className="text-lg font-medium text-white">Recent Activity</h3>
                <div className="mt-4 flow-root">
                  <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                    <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
                      <table className="min-w-full divide-y divide-gray-700">
                        <thead>
                          <tr>
                            <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-300">
                              Invoice
                            </th>
                            <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-300">
                              Status
                            </th>
                            <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-300">
                              Amount
                            </th>
                            <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-300">
                              Date
                            </th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-700">
                          {recentActivity.map((activity) => (
                            <tr key={activity.id}>
                              <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-300">
                                {activity.invoice}
                              </td>
                              <td className="whitespace-nowrap px-3 py-4 text-sm">
                                <span
                                  className={`inline-flex rounded-full px-2 text-xs font-semibold leading-5 ${
                                    activity.status === 'Completed'
                                      ? 'bg-green-100 text-green-800'
                                      : 'bg-yellow-100 text-yellow-800'
                                  }`}
                                >
                                  {activity.status}
                                </span>
                              </td>
                              <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-300">
                                {activity.amount}
                              </td>
                              <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-300">
                                {activity.date}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}

const recentActivity = [
  {
    id: 1,
    invoice: 'INV-2023-001',
    status: 'Completed',
    amount: '$1,234.56',
    date: 'Jan 29, 2025',
  },
  {
    id: 2,
    invoice: 'INV-2023-002',
    status: 'Processing',
    amount: '$2,345.67',
    date: 'Jan 29, 2025',
  },
  {
    id: 3,
    invoice: 'INV-2023-003',
    status: 'Completed',
    amount: '$3,456.78',
    date: 'Jan 28, 2025',
  },
  {
    id: 4,
    invoice: 'INV-2023-004',
    status: 'Completed',
    amount: '$4,567.89',
    date: 'Jan 28, 2025',
  },
]
