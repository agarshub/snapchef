"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Clock, Users, Star, RotateCcw, Heart, BookOpen } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Image from "next/image"

interface Recipe {
  id: number
  title: string
  image: string
  cookTime: string
  servings: number
  rating: number
  difficulty: string
  matchedIngredients: number
  totalIngredients: number
  category: string
}

export default function RecipesPage() {
  const [recipes, setRecipes] = useState<Recipe[]>([])
  const [ingredients, setIngredients] = useState<string[]>([])
  const router = useRouter()

  useEffect(() => {
    const finalIngredients = sessionStorage.getItem("finalIngredients")
    if (finalIngredients) {
      const ingredientsList = JSON.parse(finalIngredients)
      setIngredients(ingredientsList)

      const mockRecipes: Recipe[] = [
        {
          id: 1,
          title: "Artisan Margherita Pizza",
          image: "/placeholder.svg?height=200&width=300",
          cookTime: "25 min",
          servings: 4,
          rating: 4.8,
          difficulty: "Easy",
          matchedIngredients: 5,
          totalIngredients: 6,
          category: "Italian",
        },
        {
          id: 2,
          title: "Fresh Caprese Salad",
          image: "/placeholder.svg?height=200&width=300",
          cookTime: "10 min",
          servings: 2,
          rating: 4.9,
          difficulty: "Easy",
          matchedIngredients: 4,
          totalIngredients: 5,
          category: "Salad",
        },
        {
          id: 3,
          title: "Gourmet Pasta Pomodoro",
          image: "/placeholder.svg?height=200&width=300",
          cookTime: "20 min",
          servings: 3,
          rating: 4.7,
          difficulty: "Medium",
          matchedIngredients: 4,
          totalIngredients: 7,
          category: "Pasta",
        },
      ]
      setRecipes(mockRecipes)
    } else {
      router.push("/")
    }
  }, [router])

  const startOver = () => {
    sessionStorage.clear()
    router.push("/")
  }

  return (
    <div className="space-y-8">
      {/* Professional Header */}
      <div className="text-center space-y-4">
        <h1 className="text-3xl font-bold bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
          Your Perfect Recipes
        </h1>
        <p className="text-slate-600 font-medium">Crafted with your {ingredients.length} ingredients</p>
        <div className="h-1 w-20 bg-gradient-primary rounded-full mx-auto"></div>
      </div>

      {/* Professional Recipe Cards */}
      <div className="space-y-6">
        {recipes.map((recipe, index) => (
          <Card
            key={recipe.id}
            className="glass-effect shadow-elegant border-white/20 backdrop-blur-xl overflow-hidden hover:shadow-soft transition-all duration-300 hover:scale-[1.02]"
          >
            <div className="relative">
              <Image
                src={recipe.image || "/placeholder.svg"}
                alt={recipe.title}
                width={300}
                height={200}
                className="w-full h-48 object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>

              {/* Match Badge */}
              <Badge className="absolute top-3 right-3 bg-gradient-primary text-white font-semibold shadow-soft">
                {recipe.matchedIngredients}/{recipe.totalIngredients} match
              </Badge>

              {/* Category Badge */}
              <Badge className="absolute top-3 left-3 bg-white/90 text-slate-700 font-medium">{recipe.category}</Badge>

              {/* Heart Icon */}
              <button className="absolute bottom-3 right-3 p-2 bg-white/20 backdrop-blur-sm rounded-full hover:bg-white/30 transition-all duration-200">
                <Heart className="h-4 w-4 text-white" />
              </button>
            </div>

            <CardHeader className="pb-3">
              <CardTitle className="text-slate-800 text-xl font-bold leading-tight">{recipe.title}</CardTitle>
            </CardHeader>

            <CardContent className="space-y-4">
              {/* Recipe Stats */}
              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center space-x-1 text-slate-600">
                  <Clock className="h-4 w-4 text-indigo-500" />
                  <span className="font-medium">{recipe.cookTime}</span>
                </div>
                <div className="flex items-center space-x-1 text-slate-600">
                  <Users className="h-4 w-4 text-purple-500" />
                  <span className="font-medium">{recipe.servings} servings</span>
                </div>
                <div className="flex items-center space-x-1 text-slate-600">
                  <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  <span className="font-medium">{recipe.rating}</span>
                </div>
              </div>

              {/* Action Row */}
              <div className="flex items-center justify-between pt-2">
                <Badge
                  variant="outline"
                  className={`font-medium ${
                    recipe.difficulty === "Easy"
                      ? "border-green-300 text-green-700 bg-green-50"
                      : "border-orange-300 text-orange-700 bg-orange-50"
                  }`}
                >
                  {recipe.difficulty}
                </Badge>
                <Button
                  size="sm"
                  className="bg-gradient-primary hover:opacity-90 text-white font-semibold touch-target shadow-soft transition-all duration-200 hover:scale-105"
                >
                  <BookOpen className="h-4 w-4 mr-2" />
                  View Recipe
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Professional Start Over Button */}
      <Card className="glass-effect border-white/20">
        <CardContent className="p-6 text-center">
          <Button
            onClick={startOver}
            variant="outline"
            className="w-full border-slate-200 text-slate-600 hover:bg-slate-50 font-medium touch-target transition-all duration-200 hover:border-indigo-300 hover:text-indigo-600"
          >
            <RotateCcw className="h-4 w-4 mr-2" />
            Start New Recipe Discovery
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}
