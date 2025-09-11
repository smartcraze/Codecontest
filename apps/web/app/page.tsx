import { HeroSection } from '@/components/hero-section'
import { FeaturesSection } from '@/components/features-section'
import { ContestsSection } from '@/components/contests-section'
import { LeaderboardSection } from '@/components/leaderboard-section'
import { Footer } from '@/components/footer'

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <HeroSection />
      <FeaturesSection />
      <ContestsSection />
      <LeaderboardSection />
      <Footer />
    </div>
  )
}
