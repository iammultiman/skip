"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { ChevronLeft, ChevronRight, ShoppingBag, CheckCircle, AlertTriangle, Truck, Weight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { skipData, calculateTotalPrice, type Skip } from "@/lib/skip-data"
import { cn } from "@/lib/utils"
import Image from "next/image"

export function SkipSlider() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [selectedSkipId, setSelectedSkipId] = useState<number | null>(null)
  const [touchStart, setTouchStart] = useState<number | null>(null)
  const [touchEnd, setTouchEnd] = useState<number | null>(null)

  const currentSkip = skipData[currentIndex]
  const totalSkips = skipData.length

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % totalSkips)
  }

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + totalSkips) % totalSkips)
  }

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null)
    setTouchStart(e.targetTouches[0].clientX)
  }

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX)
  }

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return

    const distance = touchStart - touchEnd
    const isLeftSwipe = distance > 50
    const isRightSwipe = distance < -50

    if (isLeftSwipe) {
      nextSlide()
    } else if (isRightSwipe) {
      prevSlide()
    }
  }

  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.key === "ArrowLeft") {
      prevSlide()
    } else if (e.key === "ArrowRight") {
      nextSlide()
    }
  }

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [])

  const selectSkip = (skip: Skip) => {
    setSelectedSkipId(skip.id)
  }

  // Function to get the appropriate skip image - now using the empty blue skip
  const getSkipImagePath = () => {
    return "/images/skip-blue-empty.png"
  }

  return (
    <div className="w-full max-w-4xl mx-auto p-4">
      {/* Progress Header */}
      <div className="text-center mb-6">
        <div className="text-sm text-muted-foreground mb-2">Step 3 of 6: Choose Skip Size</div>
        <h1 className="text-3xl font-bold mb-2">Choose Your Skip Size</h1>
        <p className="text-muted-foreground">Select the skip size that best suits your needs</p>
      </div>

      {/* Progress Indicator */}
      <div className="flex justify-center items-center gap-2 mb-8">
        <span className="text-sm text-muted-foreground">
          Skip {currentIndex + 1} of {totalSkips}
        </span>
        <div className="flex gap-1 mx-4">
          {skipData.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={cn(
                "w-2 h-2 rounded-full transition-all duration-200",
                index === currentIndex ? "bg-blue-600 w-6" : "bg-muted-foreground/30 hover:bg-muted-foreground/50",
              )}
              aria-label={`Go to skip ${index + 1}`}
            />
          ))}
        </div>
      </div>

      {/* Main Slider */}
      <div className="relative">
        <Card
          className="overflow-hidden transition-all duration-300 hover:shadow-lg"
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          <CardContent className="p-0">
            <div className="relative">
              {/* Skip Image Section */}
              <div className="relative bg-gradient-to-br from-yellow-400 via-yellow-500 to-orange-500 p-8 text-center">
                {/* Skip Container Visual with Floating Border */}
                <div className="relative mx-auto mb-4" style={{ width: "280px", height: "160px" }}>
                  {/* Decorative Border */}
                  <div className="absolute inset-0 bg-yellow-600 transform perspective-1000 rotate-x-12 rotate-y-12 rounded-lg shadow-2xl">
                    <div className="absolute inset-2 bg-yellow-500 rounded border-2 border-yellow-700">
                      {/* Skip Image - now using the empty blue skip with optimized fit */}
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="relative w-full h-full p-2">
                          <Image
                            src={getSkipImagePath() || "/placeholder.svg"}
                            alt={`${currentSkip.size} yard skip container`}
                            fill
                            className="object-contain"
                            priority
                          />
                        </div>
                      </div>
                      <div className="absolute top-2 left-2 text-xs font-bold text-yellow-900">WE WANT WASTE</div>
                    </div>
                  </div>
                </div>

                {/* Skip Size Badge - moved outside container and with higher z-index */}
                <div className="absolute top-4 right-4 z-10">
                  <Badge variant="secondary" className="text-lg font-bold px-3 py-1 shadow-lg">
                    {currentSkip.size} Yards
                  </Badge>
                </div>

                {/* Bag Capacity */}
                <div className="flex items-center justify-center gap-2 text-white">
                  <ShoppingBag className="w-5 h-5" />
                  <span className="text-lg font-semibold">{currentSkip.bag_capacity}+ bags</span>
                </div>
              </div>

              {/* Details Section */}
              <div className="p-6">
                <div className="grid md:grid-cols-2 gap-6">
                  {/* Left Column - Main Info */}
                  <div>
                    <div className="mb-4">
                      <div className="text-3xl font-bold text-blue-600 mb-1">£{calculateTotalPrice(currentSkip)}</div>
                      <div className="text-sm text-muted-foreground">
                        {currentSkip.hire_period_days} day hire • Includes 20% VAT
                      </div>
                    </div>

                    <p className="text-muted-foreground mb-4">{currentSkip.description}</p>

                    {/* Ideal For */}
                    <div className="mb-4">
                      <h3 className="font-semibold mb-2">Perfect for:</h3>
                      <ul className="space-y-1">
                        {currentSkip.ideal_for.slice(0, 3).map((use, index) => (
                          <li key={index} className="flex items-center gap-2 text-sm">
                            <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0" />
                            {use}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* Right Column - Badges & Restrictions */}
                  <div>
                    <div className="space-y-3">
                      {/* Road Legal Badge */}
                      <div className="flex items-center gap-2">
                        {currentSkip.allowed_on_road ? (
                          <>
                            <CheckCircle className="w-5 h-5 text-green-600" />
                            <Badge variant="outline" className="text-green-700 border-green-300">
                              Road Legal
                            </Badge>
                          </>
                        ) : (
                          <>
                            <AlertTriangle className="w-5 h-5 text-amber-600" />
                            <Badge variant="outline" className="text-amber-700 border-amber-300">
                              Permit Required
                            </Badge>
                          </>
                        )}
                      </div>

                      {/* Heavy Waste Badge */}
                      <div className="flex items-center gap-2">
                        {currentSkip.allows_heavy_waste ? (
                          <>
                            <Weight className="w-5 h-5 text-green-600" />
                            <Badge variant="outline" className="text-green-700 border-green-300">
                              Heavy Waste OK
                            </Badge>
                          </>
                        ) : (
                          <>
                            <AlertTriangle className="w-5 h-5 text-amber-600" />
                            <Badge variant="outline" className="text-amber-700 border-amber-300">
                              No Heavy Waste
                            </Badge>
                          </>
                        )}
                      </div>

                      {/* Transport Cost */}
                      {currentSkip.transport_cost && (
                        <div className="flex items-center gap-2">
                          <Truck className="w-5 h-5 text-blue-600" />
                          <span className="text-sm text-muted-foreground">
                            Transport: £{currentSkip.transport_cost}
                          </span>
                        </div>
                      )}
                    </div>

                    {/* Action Buttons */}
                    <div className="mt-6 space-y-3">
                      <Button
                        className="w-full"
                        size="lg"
                        onClick={() => selectSkip(currentSkip)}
                        variant={selectedSkipId === currentSkip.id ? "default" : "default"}
                      >
                        {selectedSkipId === currentSkip.id ? "Selected" : "Select This Skip"}
                      </Button>

                      <Button variant="outline" className="w-full" size="sm">
                        Learn More About Skip Sizes
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Navigation Arrows */}
        <Button
          variant="outline"
          size="icon"
          className="absolute left-4 top-1/2 -translate-y-1/2 opacity-70 hover:opacity-100 transition-opacity"
          onClick={prevSlide}
          disabled={currentIndex === 0}
        >
          <ChevronLeft className="w-4 h-4" />
        </Button>

        <Button
          variant="outline"
          size="icon"
          className="absolute right-4 top-1/2 -translate-y-1/2 opacity-70 hover:opacity-100 transition-opacity"
          onClick={nextSlide}
          disabled={currentIndex === totalSkips - 1}
        >
          <ChevronRight className="w-4 h-4" />
        </Button>
      </div>

      {/* Bottom Actions */}
      <div className="flex justify-between items-center mt-8">
        <Button variant="outline">Back</Button>

        <Button size="lg" disabled={!selectedSkipId} className="px-8">
          Continue
          <ChevronRight className="w-4 h-4 ml-2" />
        </Button>
      </div>
    </div>
  )
}
