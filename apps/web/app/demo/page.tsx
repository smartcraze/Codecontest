'use client'

import React from 'react'
import ContestCard from '@/components/contest-card'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

const mockContests = [
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

export default function ContestDemo() {
  const handleJoinContest = (contestId: string) => {
    console.log('Joining contest:', contestId)
    alert(`Joining contest ${contestId}`)
  }

  const handleViewDetails = (contestId: string) => {
    console.log('Viewing contest details:', contestId)
    alert(`Viewing details for contest ${contestId}`)
  }

  const handleViewLeaderboard = (contestId: string) => {
    console.log('Viewing leaderboard:', contestId)
    alert(`Viewing leaderboard for contest ${contestId}`)
  }

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-7xl mx-auto">
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-center">
              Contest Cards Demo
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-center text-gray-600">
              Here are some example contest cards showing different states:
              upcoming, active, and finished contests.
            </p>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {mockContests.map((contest) => (
            <ContestCard
              key={contest.id}
              contest={contest}
              onJoin={handleJoinContest}
              onViewDetails={handleViewDetails}
              onViewLeaderboard={handleViewLeaderboard}
            />
          ))}
        </div>

        <div className="mt-12">
          <Card>
            <CardHeader>
              <CardTitle>Contest Card Features</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-semibold mb-2">Visual Indicators</h3>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• Status badges (Upcoming, Live, Finished)</li>
                    <li>• Difficulty levels with color coding</li>
                    <li>• Time remaining display</li>
                    <li>• Contest statistics</li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-semibold mb-2">Interactive Elements</h3>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• Join/Register buttons</li>
                    <li>• View details action</li>
                    <li>• Leaderboard access</li>
                    <li>• Hover effects and animations</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
