"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Plus, X, ChefHat, Loader2, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"

export default function IngredientsPage() {
  const [ingredients, setIngredients] = useState<string[]>([])
  const [newIngredient, setNewIngredient] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  useEffect(() => {
    const detectedIngredients = sessionStorage.getItem("detectedIngredients")
    if (detectedIngredients) {
      setIngredients(JSON.parse(detectedIngredients))
    } else {
      router.push("/")
    }
  }, [router])

  const removeIngredient = (index: number) => {
    setIngredients(ingredients.filter((_, i) => i !== index))
  }

  const addIngredient = () => {
    if (newIngredient.trim() && !ingredients.includes(newIngredient.trim())) {
      setIngredients([...ingredients, newIngredient.trim()])
      setNewIngredient("")
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      addIngredient()
    }
  }

  const findRecipes = async () => {
    setIsLoading(true)
    sessionStorage.setItem("finalIngredients", JSON.stringify(ingredients))

    setTimeout(() => {
      router.push("/recipes")
    }, 1200)
  }

  return (
    <div className="space-y-8">
      {/* Professional Header */}
      <div className="text-center space-y-3">
        <div className="flex items-center justify-center space-x-2 mb-4">
          <div className="p-2 bg-gradient-accent rounded-xl">
            <Sparkles className="h-6 w-6 text-white" />
          </div>
        </div>
        <h1 className="text-3xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
          Perfect! We Found These
        </h1>
        <p className="text-slate-600 font-medium">Review and customize your ingredient list</p>
      </div>

      {/* Main Card */}
      <Card className="glass-effect shadow-elegant border-white/20 backdrop-blur-xl">
        <CardHeader className="pb-4">
          <CardTitle className="flex items-center text-slate-800 font-semibold">
            <ChefHat className="h-5 w-5 mr-3 text-indigo-600" />
            Your Ingredients
            <Badge variant="secondary" className="ml-auto bg-indigo-100 text-indigo-700 font-semibold">
              {ingredients.length} items
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Ingredient Tags with Professional Styling */}
          <div className="flex flex-wrap gap-3">
            {ingredients.map((ingredient, index) => (
              <Badge
                key={index}
                variant="secondary"
                className="bg-gradient-to-r from-slate-100 to-slate-50 text-slate-700 hover:from-red-50 hover:to-red-100 hover:text-red-700 px-4 py-2 text-sm font-medium border border-slate-200 touch-target transition-all duration-200 group"
              >
                {ingredient}
                <button
                  onClick={() => removeIngredient(index)}
                  className="ml-2 opacity-60 hover:opacity-100 group-hover:text-red-600 transition-all duration-200"
                >
                  <X className="h-3 w-3" />
                </button>
              </Badge>
            ))}
          </div>

          {/* Add New Ingredient with Professional Input */}
          <div className="flex space-x-3">
            <div className="flex-1 relative">
              <Input
                value={newIngredient}
                onChange={(e) => setNewIngredient(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Add another ingredient..."
                className="border-slate-200 focus:border-indigo-400 focus:ring-indigo-400 bg-white/80 backdrop-blur-sm font-medium"
              />
            </div>
            <Button
              onClick={addIngredient}
              variant="outline"
              size="icon"
              className="border-slate-200 text-indigo-600 hover:bg-indigo-50 hover:border-indigo-300 touch-target transition-all duration-200"
            >
              <Plus className="h-4 w-4" />
            </Button>
          </div>

          {/* Professional CTA Button */}
          <Button
            onClick={findRecipes}
            disabled={ingredients.length === 0 || isLoading}
            className="w-full h-14 bg-gradient-primary hover:opacity-90 text-white font-semibold text-lg touch-target shadow-soft transition-all duration-300 hover:scale-[1.02] disabled:hover:scale-100"
          >
            {isLoading ? (
              <div className="flex items-center space-x-3">
                <Loader2 className="h-5 w-5 animate-spin" />
                <span>Finding Perfect Recipes...</span>
              </div>
            ) : (
              <div className="flex items-center space-x-3">
                <ChefHat className="h-5 w-5" />
                <span>Discover Recipes ({ingredients.length} ingredients)</span>
                <Sparkles className="h-4 w-4" />
              </div>
            )}
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}
