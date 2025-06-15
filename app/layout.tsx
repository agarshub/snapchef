import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"

const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
  variable: "--font-inter",
})

export const metadata: Metadata = {
  title: "SmartChef - AI Recipe Assistant",
  description: "Transform your smartphone camera into an intelligent kitchen assistant",
  manifest: "/manifest.json",
  themeColor: "#6366f1",
  viewport: "width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${inter.variable} min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50`}>
        <div className="min-h-screen bg-gradient-to-br from-white/20 via-transparent to-purple-50/30">
          <main className="container mx-auto px-4 py-6 max-w-md relative">{children}</main>
        </div>
      </body>
    </html>
  )
}
