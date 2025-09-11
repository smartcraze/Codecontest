import { Button } from '@/components/ui/button'

export function HeroSection() {
  return (
    <section className="relative overflow-hidden py-24 px-4 sm:px-6 lg:px-8">
      <div className="absolute inset-0 bg-gradient-to-br from-background via-background/80 to-primary/5" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(120,255,214,0.1),transparent_50%)]" />

      <div className="relative max-w-7xl mx-auto text-center">
        <div className="mb-8">
          <h1 className="text-5xl sm:text-6xl lg:text-8xl font-bold mb-6 text-balance">
            <span className="text-primary font-extrabold neon-glow">
              The Ultimate
            </span>
            <br />
            <span className="text-foreground neon-glow">
              Code Contest Platform
            </span>
          </h1>
        </div>

        <p className="text-xl sm:text-2xl lg:text-3xl mb-12 text-muted-foreground max-w-4xl mx-auto text-pretty leading-relaxed">
          Compete with the world's best developers. Learn cutting-edge
          algorithms.
          <span className="text-primary font-semibold">
            {' '}
            Elevate your coding skills.
          </span>
        </p>

        <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
          <Button
            size="lg"
            className="bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90 text-white text-lg px-8 py-4 h-auto font-semibold shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
          >
            🚀 Join Contest Now
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="border-2 border-primary text-primary hover:bg-primary hover:text-white text-lg px-8 py-4 h-auto font-semibold bg-transparent backdrop-blur-sm transition-all duration-300 hover:scale-105"
          >
            📊 View Leaderboard
          </Button>
        </div>

        <div className="mt-16 grid grid-cols-1 sm:grid-cols-3 gap-8 max-w-2xl mx-auto">
          <div className="text-center">
            <div className="text-3xl font-bold text-primary">50K+</div>
            <div className="text-muted-foreground">Active Coders</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-secondary">1M+</div>
            <div className="text-muted-foreground">Problems Solved</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-primary">24/7</div>
            <div className="text-muted-foreground">Live Contests</div>
          </div>
        </div>
      </div>
    </section>
  )
}
