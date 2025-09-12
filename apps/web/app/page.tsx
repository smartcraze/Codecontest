import HeroPage from '@/components/hero-section'
import { Navbar01 } from '@/components/nav-bar'

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar01 />
      <HeroPage />
    </div>
  )
}
