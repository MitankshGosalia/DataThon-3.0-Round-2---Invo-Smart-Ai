import { useState } from 'react'
import Layout from '../components/Layout'
import { motion } from 'framer-motion'
import {
  ChartBarIcon,
  CurrencyDollarIcon,
  DocumentTextIcon,
  ArrowTrendingUpIcon,
} from '@heroicons/react/24/outline'

// Mock data for charts
const monthlyData = [
  { month: 'Jan', invoices: 45, amount: 67890 },
  { month: 'Feb', invoices: 52, amount: 78901 },
  { month: 'Mar', invoices: 48, amount: 89012 },
  { month: 'Apr', invoices: 61, amount: 90123 },
  { month: 'May', invoices: 55, amount: 78234 },
  { month: 'Jun', invoices: 67, amount: 89345 },
]

const categories = [
  { name: 'Services', percentage: 45 },
  { name: 'Products', percentage: 30 },
  { name: 'Equipment', percentage: 15 },
  { name: 'Others', percentage: 10 },
]

export default function Analytics() {
  const [selectedPeriod, setSelectedPeriod] = useState('6m')
  const [insights] = useState([
    {
      title: 'Monthly Growth',
      value: '+12.5%',
      description: 'Increase in processed invoices',
      icon: ArrowTrendingUpIcon,
      color: 'text-green-400',
    },
    {
      title: 'Average Processing Time',
      value: '1.2s',
      description: 'Per invoice',
      icon: ChartBarIcon,
      color: 'text-blue-400',
    },
    {
      title: 'Success Rate',
      value: '99.8%',
      description: 'In data extraction',
      icon: DocumentTextIcon,
      color: 'text-purple-400',
    },
    {
      title: 'Cost Savings',
      value: '$12,345',
      description: 'Through automation',
      icon: CurrencyDollarIcon,
      color: 'text-yellow-400',
    },
  ])

  return (
    <Layout title="Analytics - InvoSmart AI">
      <div className="py-6">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 md:px-8">
          <h1 className="text-2xl font-semibold text-white">Analytics</h1>
        </div>

        <div className="mx-auto max-w-7xl px-4 sm:px-6 md:px-8">
          {/* Key Insights */}
          <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {insights.map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="glass-effect rounded-lg px-6 py-5"
              >
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <item.icon className={`h-6 w-6 ${item.color}`} />
                  </div>
                  <div className="ml-5">
                    <h3 className="text-sm font-medium text-gray-400">
                      {item.title}
                    </h3>
                    <div className="mt-1">
                      <p className="text-2xl font-semibold text-white">
                        {item.value}
                      </p>
                      <p className="text-sm text-gray-400">{item.description}</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Charts */}
          <div className="mt-8 grid grid-cols-1 gap-5 lg:grid-cols-2">
            {/* Monthly Trends */}
            <div className="glass-effect rounded-lg p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-medium text-white">Monthly Trends</h3>
                <select
                  value={selectedPeriod}
                  onChange={(e) => setSelectedPeriod(e.target.value)}
                  className="bg-gray-800 text-white border-gray-700 rounded-md text-sm"
                >
                  <option value="6m">Last 6 months</option>
                  <option value="1y">Last year</option>
                  <option value="all">All time</option>
                </select>
              </div>
              <div className="relative h-64">
                {/* Chart bars */}
                <div className="absolute inset-0 flex items-end justify-between">
                  {monthlyData.map((data, index) => (
                    <div
                      key={data.month}
                      className="flex flex-col items-center w-1/6"
                    >
                      <motion.div
                        className="w-12 bg-blue-500 rounded-t"
                        initial={{ height: 0 }}
                        animate={{ height: `${(data.invoices / 70) * 100}%` }}
                        transition={{ delay: index * 0.1 }}
                      />
                      <span className="mt-2 text-sm text-gray-400">
                        {data.month}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Category Distribution */}
            <div className="glass-effect rounded-lg p-6">
              <h3 className="text-lg font-medium text-white mb-6">
                Invoice Categories
              </h3>
              <div className="space-y-4">
                {categories.map((category, index) => (
                  <div key={category.name}>
                    <div className="flex justify-between text-sm text-gray-400 mb-1">
                      <span>{category.name}</span>
                      <span>{category.percentage}%</span>
                    </div>
                    <div className="relative h-2 bg-gray-700 rounded-full overflow-hidden">
                      <motion.div
                        className="absolute h-full bg-blue-500 rounded-full"
                        initial={{ width: 0 }}
                        animate={{ width: `${category.percentage}%` }}
                        transition={{ delay: index * 0.1 }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Detailed Stats */}
          <div className="mt-8">
            <div className="glass-effect rounded-lg overflow-hidden">
              <div className="px-6 py-5 border-b border-gray-700">
                <h3 className="text-lg font-medium text-white">
                  Processing Statistics
                </h3>
              </div>
              <div className="px-6 py-5">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  <div>
                    <h4 className="text-sm font-medium text-gray-400 mb-2">
                      Processing Time Distribution
                    </h4>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-400">&lt; 1 second</span>
                        <span className="text-white">65%</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-400">1-2 seconds</span>
                        <span className="text-white">25%</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-400">&gt; 2 seconds</span>
                        <span className="text-white">10%</span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h4 className="text-sm font-medium text-gray-400 mb-2">
                      Error Types
                    </h4>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-400">Format Issues</span>
                        <span className="text-white">0.1%</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-400">Missing Fields</span>
                        <span className="text-white">0.05%</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-400">Other Errors</span>
                        <span className="text-white">0.05%</span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h4 className="text-sm font-medium text-gray-400 mb-2">
                      AI Model Performance
                    </h4>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-400">Accuracy</span>
                        <span className="text-white">99.8%</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-400">Precision</span>
                        <span className="text-white">99.7%</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-400">Recall</span>
                        <span className="text-white">99.9%</span>
                      </div>
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
