import Herosection2 from '@/components/hero-part2'
import HeroPage from '@/components/hero-section'
import { Navbar01 } from '@/components/nav-bar'

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background space-y-8 p-2">
      <HeroPage />
      <Herosection2 />
    </div>
  )
}
