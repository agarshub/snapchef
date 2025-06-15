"use client"

import type React from "react"

import { useRef } from "react"
import { Camera, ImageIcon } from "lucide-react"
import { Button } from "@/components/ui/button"

interface CameraInputProps {
  onImageSelect: (file: File) => void
}

export default function CameraInput({ onImageSelect }: CameraInputProps) {
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      onImageSelect(file)
    }
  }

  const triggerCamera = () => {
    fileInputRef.current?.click()
  }

  return (
    <div className="space-y-4">
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        capture="environment"
        onChange={handleFileChange}
        className="hidden"
      />

      {/* Primary Camera Button */}
      <Button
        onClick={triggerCamera}
        className="w-full h-36 bg-gradient-primary hover:opacity-90 text-white border-2 border-dashed border-white/30 touch-target transition-all duration-300 hover:scale-[1.02]"
        variant="outline"
      >
        <div className="flex flex-col items-center space-y-3">
          <div className="p-3 bg-white/20 rounded-full">
            <Camera className="h-8 w-8" />
          </div>
          <div className="text-center">
            <div className="text-lg font-semibold">Take Photo</div>
            <div className="text-sm opacity-90">Tap to open camera</div>
          </div>
        </div>
      </Button>

      {/* Divider */}
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-slate-200"></div>
        </div>
        <div className="relative flex justify-center text-sm">
          <span className="px-4 bg-white text-slate-500 font-medium">or</span>
        </div>
      </div>

      {/* Gallery Button */}
      <Button
        onClick={() => {
          if (fileInputRef.current) {
            fileInputRef.current.removeAttribute("capture")
            fileInputRef.current.click()
          }
        }}
        variant="outline"
        className="w-full border-slate-200 text-slate-600 hover:bg-slate-50 font-medium touch-target transition-all duration-200 hover:border-indigo-300 hover:text-indigo-600"
      >
        <div className="flex items-center space-x-2">
          <ImageIcon className="h-5 w-5" />
          <span>Choose from Gallery</span>
        </div>
      </Button>
    </div>
  )
}
