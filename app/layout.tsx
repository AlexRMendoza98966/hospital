import type { Metadata } from 'next'
import './globals.css'
import { Footer } from '../components/footer/footer'
import { FooterConditional } from '../components/footer/FooterConditional'

export const metadata: Metadata = {
  title: 'v0 App',
  description: 'Created with v0',
  generator: 'v0.dev',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body className="bg-gray-100 min-h-screen flex flex-col">
        {children}
        <FooterConditional />
      </body>
    </html>
  )
}

