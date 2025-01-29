import { ReactNode } from 'react'
import Navbar from './Navbar'
import Head from 'next/head'

interface LayoutProps {
  children: ReactNode
  title?: string
}

export default function Layout({ children, title = 'InvoSmart AI' }: LayoutProps) {
  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content="AI-powered invoice management system" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="min-h-screen bg-gray-900">
        <Navbar />
        <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-6">
          {children}
        </main>
      </div>
    </>
  )
}
