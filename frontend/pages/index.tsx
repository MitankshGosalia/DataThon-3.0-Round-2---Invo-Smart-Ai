import { motion } from 'framer-motion'
import Head from 'next/head'
import Link from 'next/link'
import { useState } from 'react'

export default function Home() {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800">
      <Head>
        <title>InvoSmart AI - Transform Invoices into Insights</title>
        <meta name="description" content="AI-powered invoice management system" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="container mx-auto px-4 py-20">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <motion.h1
            className="text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-teal-400 mb-6"
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            InvoSmart AI
          </motion.h1>
          <motion.p
            className="text-2xl text-gray-300 mb-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            Transforming Invoices into Insights – Automate, Organize, Innovate!
          </motion.p>
          
          {/* CTA Buttons */}
          <div className="flex justify-center gap-6">
            <motion.button
              className="px-8 py-4 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors duration-300"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Get Started
            </motion.button>
            <motion.button
              className="px-8 py-4 bg-transparent border-2 border-blue-600 text-blue-400 rounded-lg font-semibold hover:bg-blue-900/20 transition-colors duration-300"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Watch Demo
            </motion.button>
          </div>
        </motion.div>

        {/* Features Grid */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-20"
        >
          {features.map((feature, index) => (
            <motion.div
              key={index}
              className="glass-effect p-6 rounded-xl"
              whileHover={{ y: -10 }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * index }}
            >
              <div className="text-blue-400 text-4xl mb-4">{feature.icon}</div>
              <h3 className="text-xl font-semibold text-white mb-2">{feature.title}</h3>
              <p className="text-gray-400">{feature.description}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* AI Animation */}
        <motion.div
          className="mt-20 text-center"
          animate={{
            scale: isHovered ? 1.05 : 1,
            rotate: isHovered ? 5 : 0
          }}
          onHoverStart={() => setIsHovered(true)}
          onHoverEnd={() => setIsHovered(false)}
        >
          <div className="w-32 h-32 mx-auto bg-blue-600 rounded-full flex items-center justify-center">
            <span className="text-4xl">🤖</span>
          </div>
          <p className="text-gray-400 mt-4">Powered by Advanced AI</p>
        </motion.div>
      </main>
    </div>
  )
}

const features = [
  {
    icon: "📄",
    title: "Smart Data Extraction",
    description: "Extract data from invoices automatically using advanced AI technology"
  },
  {
    icon: "🔍",
    title: "Intelligent Processing",
    description: "Process and validate invoice data with machine learning algorithms"
  },
  {
    icon: "📊",
    title: "Advanced Analytics",
    description: "Get detailed insights and analytics from your invoice data"
  },
  {
    icon: "🌐",
    title: "Multi-Language Support",
    description: "Process invoices in multiple languages with ease"
  },
  {
    icon: "🔄",
    title: "Real-time Sync",
    description: "Sync your data across devices in real-time"
  },
  {
    icon: "🔐",
    title: "Secure Storage",
    description: "Keep your invoice data safe with enterprise-grade security"
  }
]
