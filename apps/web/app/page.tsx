'use client'
import ContestCard from '@/components/contest-card'
import Herosection2 from '@/components/hero-part2'
import HeroPage from '@/components/hero-section'
import { Navbar01 } from '@/components/nav-bar'

const sampleContest = {
  id: '1',
  title: 'Weekly Coding Challenge #47',
  startTime: '2025-09-29T10:00:00Z',
  endTime: '2025-09-29T12:00:00Z',
  status: 'upcoming' as const,
  difficulty: 'Medium' as const,
  challengeCount: 4,
  participantCount: 127,
  totalPoints: 40,
}

export default function HomePage() {
  const handleJoinContest = (contestId: string) => {
    console.log('Joining contest:', contestId)
  }

  const handleViewDetails = (contestId: string) => {
    console.log('Viewing contest details:', contestId)
  }

  const handleViewLeaderboard = (contestId: string) => {
    console.log('Viewing leaderboard:', contestId)
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="space-y-8">
        <HeroPage />
        <Herosection2 />
        <div className="flex justify-center px-4">
          <ContestCard
            contest={sampleContest}
            onJoin={handleJoinContest}
            onViewDetails={handleViewDetails}
            onViewLeaderboard={handleViewLeaderboard}
          />
        </div>
      </div>
    </div>
  )
}
