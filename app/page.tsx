import { SkipSlider } from "@/components/skip-slider"
import { ThemeToggle } from "@/components/theme-toggle"

export default function Page() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center gap-4">
            <h1 className="text-xl font-bold">We Want Waste</h1>
            {/* Progress Steps */}
            <div className="hidden md:flex items-center gap-2 text-sm text-muted-foreground">
              <span className="flex items-center gap-1">
                <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                Postcode
              </span>
              <span className="flex items-center gap-1">
                <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                Waste Type
              </span>
              <span className="flex items-center gap-1">
                <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                Select Skip
              </span>
              <span className="flex items-center gap-1">
                <div className="w-2 h-2 bg-muted-foreground/30 rounded-full"></div>
                Permit Check
              </span>
              <span className="flex items-center gap-1">
                <div className="w-2 h-2 bg-muted-foreground/30 rounded-full"></div>
                Choose Date
              </span>
              <span className="flex items-center gap-1">
                <div className="w-2 h-2 bg-muted-foreground/30 rounded-full"></div>
                Payment
              </span>
            </div>
          </div>
          <ThemeToggle />
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto py-8">
        <SkipSlider />
      </main>

      {/* Footer */}
      <footer className="border-t mt-16">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center text-sm text-muted-foreground">
            <p className="mb-2">
              Imagery and information shown throughout this website may not reflect the exact shape or size
              specification, colours may vary, options and/or accessories may be featured at additional cost.
            </p>
            <p>© 2024 We Want Waste. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
