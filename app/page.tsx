"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Sparkles, ChefHat } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import CameraInput from "@/components/CameraInput"

export default function HomePage() {
  const [selectedImage, setSelectedImage] = useState<File | null>(null)
  const [imagePreview, setImagePreview] = useState<string | null>(null)
  const router = useRouter()

  const handleImageSelect = (file: File) => {
    setSelectedImage(file)
    const reader = new FileReader()
    reader.onload = (e) => {
      setImagePreview(e.target?.result as string)
    }
    reader.readAsDataURL(file)
  }

  const handleAnalyze = async () => {
    if (!selectedImage) return

    const reader = new FileReader()
    reader.onload = () => {
      sessionStorage.setItem("selectedImage", reader.result as string)
      router.push("/analyzing")
    }
    reader.readAsDataURL(selectedImage)
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-[85vh] space-y-8">
      {/* Header with Professional Styling */}
      <div className="text-center space-y-4">
        <div className="flex items-center justify-center space-x-3 mb-6">
          <div className="p-3 bg-gradient-primary rounded-2xl shadow-elegant">
            <ChefHat className="h-8 w-8 text-white" />
          </div>
          <div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
              SmartChef
            </h1>
            <div className="h-1 w-16 bg-gradient-primary rounded-full mx-auto mt-1"></div>
          </div>
        </div>
        <p className="text-slate-600 text-lg font-medium max-w-xs">
          Snap your ingredients, discover amazing recipes instantly
        </p>
      </div>

      {/* Main Card with Glass Effect */}
      <Card className="w-full max-w-sm glass-effect shadow-elegant border-white/20 backdrop-blur-xl">
        <CardContent className="p-8 space-y-6">
          {imagePreview ? (
            <div className="space-y-6">
              <div className="relative overflow-hidden rounded-2xl">
                <img
                  src={imagePreview || "/placeholder.svg"}
                  alt="Selected ingredients"
                  className="w-full h-52 object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
              </div>
              <div className="flex space-x-3">
                <Button
                  onClick={() => {
                    setSelectedImage(null)
                    setImagePreview(null)
                  }}
                  variant="outline"
                  className="flex-1 border-slate-200 text-slate-600 hover:bg-slate-50 font-medium touch-target"
                >
                  Retake Photo
                </Button>
                <Button
                  onClick={handleAnalyze}
                  className="flex-1 bg-gradient-primary hover:opacity-90 text-white font-semibold touch-target shadow-soft transition-all duration-200"
                >
                  <Sparkles className="h-4 w-4 mr-2" />
                  Analyze Magic
                </Button>
              </div>
            </div>
          ) : (
            <CameraInput onImageSelect={handleImageSelect} />
          )}
        </CardContent>
      </Card>

      {/* Professional Instructions */}
      <div className="text-center max-w-sm space-y-3">
        <div className="flex items-center justify-center space-x-2 text-slate-500">
          <div className="h-px w-8 bg-gradient-to-r from-transparent to-slate-300"></div>
          <Sparkles className="h-4 w-4" />
          <div className="h-px w-8 bg-gradient-to-l from-transparent to-slate-300"></div>
        </div>
        <p className="text-slate-600 text-sm leading-relaxed">
          Take a photo of your fridge or ingredients, and our AI will suggest personalized recipes just for you
        </p>
      </div>
    </div>
  )
}
