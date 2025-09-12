import ContestCard from '@/components/contest-card'
import Herosection2 from '@/components/hero-part2'
import HeroPage from '@/components/hero-section'

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background space-y-8 p-2">
      <HeroPage />
      <Herosection2 />
      <ContestCard />
    </div>
  )
}
