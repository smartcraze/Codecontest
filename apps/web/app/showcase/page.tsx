'use client'
import ContestsGridSimple from '@/components/contests-grid-simple'
import ContestCard from '@/components/contest-card'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'

// Sample contest data for showcase
const sampleContests = [
  {
    id: '1',
    title: 'Weekly Coding Challenge #47',
    startTime: '2025-09-29T10:00:00Z',
    endTime: '2025-09-29T12:00:00Z',
    status: 'upcoming' as const,
    difficulty: 'Medium' as const,
    challengeCount: 4,
    participantCount: 127,
    totalPoints: 40,
  },
  {
    id: '2',
    title: 'Algorithm Sprint Contest',
    startTime: '2025-09-28T14:00:00Z',
    endTime: '2025-09-28T17:00:00Z',
    status: 'active' as const,
    difficulty: 'Hard' as const,
    challengeCount: 5,
    participantCount: 89,
    totalPoints: 50,
  },
  {
    id: '3',
    title: 'Beginner Friendly Contest',
    startTime: '2025-09-27T09:00:00Z',
    endTime: '2025-09-27T11:00:00Z',
    status: 'finished' as const,
    difficulty: 'Easy' as const,
    challengeCount: 3,
    participantCount: 234,
    totalPoints: 30,
  },
]

export default function ShowcasePage() {
  const handleJoinContest = (contestId: string) => {
    console.log('Joining contest:', contestId)
    alert(`Would join contest ${contestId}`)
  }

  const handleViewDetails = (contestId: string) => {
    console.log('Viewing contest details:', contestId)
    alert(`Would view details for contest ${contestId}`)
  }

  const handleViewLeaderboard = (contestId: string) => {
    console.log('Viewing leaderboard:', contestId)
    alert(`Would view leaderboard for contest ${contestId}`)
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto p-8 space-y-12">
        {/* Header */}
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold text-gray-900">
            Contest Management System
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            A comprehensive frontend solution for your competitive programming
            platform, built with modern React, TypeScript, and shadcn/ui
            components.
          </p>
        </div>

        {/* Features Overview */}
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl">🚀 Features Built</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="space-y-2">
                <h3 className="font-semibold text-lg">Contest Cards</h3>
                <p className="text-sm text-gray-600">
                  Beautiful, responsive contest cards with status indicators,
                  time tracking, and interactive buttons for different contest
                  states.
                </p>
                <div className="flex gap-2">
                  <Badge variant="outline">React</Badge>
                  <Badge variant="outline">TypeScript</Badge>
                  <Badge variant="outline">Shadcn/ui</Badge>
                </div>
              </div>

              <div className="space-y-2">
                <h3 className="font-semibold text-lg">Contest Grid</h3>
                <p className="text-sm text-gray-600">
                  Complete contest listing with search, filtering, and
                  pagination. Ready to integrate with your backend API
                  endpoints.
                </p>
                <div className="flex gap-2">
                  <Badge variant="outline">Search</Badge>
                  <Badge variant="outline">Filters</Badge>
                  <Badge variant="outline">Pagination</Badge>
                </div>
              </div>

              <div className="space-y-2">
                <h3 className="font-semibold text-lg">Navigation</h3>
                <p className="text-sm text-gray-600">
                  Responsive navigation with mobile menu, theme toggle, and
                  proper routing between different sections.
                </p>
                <div className="flex gap-2">
                  <Badge variant="outline">Mobile</Badge>
                  <Badge variant="outline">Dark Mode</Badge>
                  <Badge variant="outline">Responsive</Badge>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Backend Integration Ready */}
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl">🔌 Backend Integration</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-semibold mb-3">API Endpoints Ready</h3>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li>
                    • <code>GET /api/contest/active</code> - Active contests
                  </li>
                  <li>
                    • <code>GET /api/contest/finished</code> - Finished contests
                  </li>
                  <li>
                    • <code>GET /api/contest/:id</code> - Contest details
                  </li>
                  <li>
                    • <code>GET /api/contest/leaderboard/:id</code> -
                    Leaderboard
                  </li>
                  <li>
                    • <code>POST /api/submit/:challengeId</code> - Submit code
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold mb-3">Data Models Aligned</h3>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li>• Contest status tracking (upcoming/active/finished)</li>
                  <li>• Difficulty levels (Easy/Medium/Hard)</li>
                  <li>• Participant counts and statistics</li>
                  <li>• Time-based contest management</li>
                  <li>• Challenge points and scoring</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Sample Contest Cards */}
        <div>
          <h2 className="text-2xl font-bold mb-6">Contest Cards Preview</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {sampleContests.map((contest) => (
              <ContestCard
                key={contest.id}
                contest={contest}
                onJoin={handleJoinContest}
                onViewDetails={handleViewDetails}
                onViewLeaderboard={handleViewLeaderboard}
              />
            ))}
          </div>
        </div>

        {/* Complete Contest Grid */}
        <div>
          <h2 className="text-2xl font-bold mb-6">
            Complete Contest Management
          </h2>
          <ContestsGridSimple />
        </div>

        {/* Next Steps */}
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl">🎯 Next Steps</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <h3 className="font-semibold">1. API Integration</h3>
                <p className="text-sm text-gray-600">
                  Replace mock data with actual API calls to your backend
                  endpoints.
                </p>
              </div>
              <div>
                <h3 className="font-semibold">2. Authentication</h3>
                <p className="text-sm text-gray-600">
                  Integrate with your OTP-based authentication system for user
                  sessions.
                </p>
              </div>
              <div>
                <h3 className="font-semibold">3. Contest Details</h3>
                <p className="text-sm text-gray-600">
                  Build individual contest pages with challenge listings and
                  code submission.
                </p>
              </div>
              <div>
                <h3 className="font-semibold">4. Leaderboards</h3>
                <p className="text-sm text-gray-600">
                  Create leaderboard views using your Redis-based scoring
                  system.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
