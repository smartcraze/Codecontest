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
      <div className="space-y-16 md:space-y-20">
        <HeroPage />
        <Herosection2 />

        {/* Featured Contest Section */}
        <section className="py-16 px-4 bg-gradient-to-b from-transparent via-blue-50/20 to-transparent dark:via-blue-950/10">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-foreground mb-4">
                Featured Contest
              </h2>
              <p className="text-muted-foreground text-lg">
                Don't miss out on our latest coding challenge
              </p>
            </div>
            <div className="flex justify-center">
              <div className="animate-float">
                <ContestCard
                  contest={sampleContest}
                  onJoin={handleJoinContest}
                  onViewDetails={handleViewDetails}
                  onViewLeaderboard={handleViewLeaderboard}
                />
              </div>
            </div>
          </div>
        </section>

        {/* Platform Statistics */}
        <section className="py-16 px-4">
          <div className="max-w-6xl mx-auto">
            <PlatformStats />
          </div>
        </section>

        {/* Leaderboard Section */}
        <section className="py-16 px-4 bg-gradient-to-b from-transparent via-purple-50/20 to-transparent dark:via-purple-950/10">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-foreground mb-4">
                Leaderboards
              </h2>
              <p className="text-muted-foreground text-lg">
                See where you stand among the best developers
              </p>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Global Leaderboard */}
              <div className="animate-float" style={{ animationDelay: '0.5s' }}>
                <Leaderboard
                  title="Global Champions"
                  showGlobalLeaderboard={true}
                  maxEntries={8}
                />
              </div>

              {/* Weekly Contest Leaderboard */}
              <div className="animate-float" style={{ animationDelay: '1s' }}>
                <Leaderboard
                  title="Weekly Contest Leaders"
                  contestId="weekly-47"
                  showGlobalLeaderboard={false}
                  maxEntries={8}
                />
              </div>
            </div>
          </div>
        </section>

        {/* Bottom Spacer */}
        <div className="pb-16"></div>
      </div>
    </div>
  )
}
