'use client'
import ContestCard from '@/components/contest-card'
import Herosection2 from '@/components/hero-part2'
import HeroPage from '@/components/hero-section'
import Leaderboard from '@/components/leaderboard'
import { PlatformStats } from '@/components/platform-stats'

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
      <div className="space-y-12">
        <HeroPage />
        <Herosection2 />

        {/* Featured Contest */}
        <div className="flex justify-center px-4">
          <ContestCard
            contest={sampleContest}
            onJoin={handleJoinContest}
            onViewDetails={handleViewDetails}
            onViewLeaderboard={handleViewLeaderboard}
          />
        </div>

        {/* Platform Statistics */}
        <div className="max-w-6xl mx-auto px-4">
          <PlatformStats />
        </div>

        {/* Leaderboard Section */}
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Global Leaderboard */}
            <div>
              <Leaderboard
                title="Global Champions"
                showGlobalLeaderboard={true}
                maxEntries={8}
              />
            </div>

            {/* Weekly Contest Leaderboard */}
            <div>
              <Leaderboard
                title="Weekly Contest Leaders"
                contestId="weekly-47"
                showGlobalLeaderboard={false}
                maxEntries={8}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
