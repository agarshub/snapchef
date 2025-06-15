"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Sparkles, Brain, Eye, Zap } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"

export default function AnalyzingPage() {
  const [progress, setProgress] = useState(0)
  const [statusText, setStatusText] = useState("Initializing AI analysis...")
  const [currentIcon, setCurrentIcon] = useState(0)
  const router = useRouter()

  const icons = [Brain, Eye, Zap, Sparkles]

  useEffect(() => {
    const imageData = sessionStorage.getItem("selectedImage")
    if (!imageData) {
      router.push("/")
      return
    }

    const progressSteps = [
      { progress: 15, text: "Processing image with AI vision..." },
      { progress: 35, text: "Identifying ingredients and textures..." },
      { progress: 55, text: "Analyzing nutritional properties..." },
      { progress: 75, text: "Matching with recipe database..." },
      { progress: 90, text: "Personalizing recommendations..." },
      { progress: 100, text: "Finalizing your perfect recipes!" },
    ]

    let currentStep = 0
    const interval = setInterval(() => {
      if (currentStep < progressSteps.length) {
        setProgress(progressSteps[currentStep].progress)
        setStatusText(progressSteps[currentStep].text)
        setCurrentIcon((prev) => (prev + 1) % icons.length)
        currentStep++
      } else {
        clearInterval(interval)
        setTimeout(() => {
          const mockIngredients = ["Tomatoes", "Fresh Basil", "Mozzarella", "Olive Oil", "Garlic", "Red Onion"]
          sessionStorage.setItem("detectedIngredients", JSON.stringify(mockIngredients))
          router.push("/ingredients")
        }, 800)
      }
    }, 1000)

    return () => clearInterval(interval)
  }, [router])

  const CurrentIcon = icons[currentIcon]

  return (
    <div className="flex flex-col items-center justify-center min-h-[85vh] space-y-8">
      <Card className="w-full max-w-sm glass-effect shadow-elegant border-white/20 backdrop-blur-xl">
        <CardContent className="p-10 text-center space-y-8">
          {/* Animated Icon Stack */}
          <div className="relative flex justify-center">
            <div className="relative">
              {/* Outer rotating ring */}
              <div className="absolute inset-0 w-20 h-20 border-4 border-indigo-200 rounded-full animate-spin"></div>
              <div
                className="absolute inset-2 w-16 h-16 border-4 border-purple-200 rounded-full animate-spin"
                style={{ animationDirection: "reverse", animationDuration: "3s" }}
              ></div>

              {/* Center icon */}
              <div className="relative w-20 h-20 bg-gradient-primary rounded-full flex items-center justify-center shadow-elegant">
                <CurrentIcon className="h-8 w-8 text-white animate-pulse" />
              </div>

              {/* Floating sparkles */}
              <Sparkles className="absolute -top-2 -right-2 h-5 w-5 text-pink-400 animate-bounce" />
              <Sparkles
                className="absolute -bottom-1 -left-2 h-4 w-4 text-blue-400 animate-bounce"
                style={{ animationDelay: "0.5s" }}
              />
            </div>
          </div>

          {/* Status Text */}
          <div className="space-y-4">
            <h2 className="text-xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
              AI Magic in Progress
            </h2>
            <p className="text-slate-600 font-medium leading-relaxed">{statusText}</p>
          </div>

          {/* Professional Progress Bar */}
          <div className="space-y-3">
            <div className="w-full bg-slate-100 rounded-full h-3 overflow-hidden">
              <div
                className="h-full bg-gradient-primary rounded-full transition-all duration-700 ease-out relative overflow-hidden"
                style={{ width: `${progress}%` }}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-pulse"></div>
              </div>
            </div>
            <div className="flex justify-between text-xs font-medium text-slate-500">
              <span>Processing</span>
              <span>{progress}%</span>
            </div>
          </div>

          <p className="text-sm text-slate-500 font-medium">Our AI is analyzing your ingredients with precision</p>
        </CardContent>
      </Card>
    </div>
  )
}
