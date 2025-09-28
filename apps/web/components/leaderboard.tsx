'use client'

import React, { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import {
  Trophy,
  Medal,
  Award,
  Crown,
  User,
  RefreshCw,
  Clock,
  Target,
  TrendingUp,
} from 'lucide-react'

interface LeaderboardEntry {
  rank: number
  userId: string
  userName: string
  email: string
  score: number
  timeTaken?: number // in seconds
  problemsSolved: number
  lastSubmission?: string
}

interface LeaderboardProps {
  contestId?: string
  title?: string
  showGlobalLeaderboard?: boolean
  maxEntries?: number
}

const Leaderboard: React.FC<LeaderboardProps> = ({
  contestId,
  title = 'Global Leaderboard',
  showGlobalLeaderboard = true,
  maxEntries = 10,
}) => {
  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>([])
  const [loading, setLoading] = useState(true)
  const [refreshing, setRefreshing] = useState(false)
  const [error, setError] = useState<string | null>(null)

  // Mock data - replace with actual API calls to your backend
  const mockLeaderboardData: LeaderboardEntry[] = [
    {
      rank: 1,
      userId: '1',
      userName: 'CodeMaster2024',
      email: 'codemaster@example.com',
      score: 2850,
      timeTaken: 3600, // 1 hour
      problemsSolved: 5,
      lastSubmission: '2025-09-28T16:45:00Z',
    },
    {
      rank: 2,
      userId: '2',
      userName: 'AlgorithmAce',
      email: 'algo@example.com',
      score: 2720,
      timeTaken: 4200, // 1 hour 10 minutes
      problemsSolved: 5,
      lastSubmission: '2025-09-28T17:10:00Z',
    },
    {
      rank: 3,
      userId: '3',
      userName: 'PyPerformance',
      email: 'python@example.com',
      score: 2680,
      timeTaken: 4800, // 1 hour 20 minutes
      problemsSolved: 4,
      lastSubmission: '2025-09-28T17:20:00Z',
    },
    {
      rank: 4,
      userId: '4',
      userName: 'JSNinja',
      email: 'js@example.com',
      score: 2520,
      timeTaken: 5400, // 1 hour 30 minutes
      problemsSolved: 4,
      lastSubmission: '2025-09-28T17:30:00Z',
    },
    {
      rank: 5,
      userId: '5',
      userName: 'CppChampion',
      email: 'cpp@example.com',
      score: 2450,
      timeTaken: 5700, // 1 hour 35 minutes
      problemsSolved: 4,
      lastSubmission: '2025-09-28T17:35:00Z',
    },
    {
      rank: 6,
      userId: '6',
      userName: 'JavaJedi',
      email: 'java@example.com',
      score: 2380,
      timeTaken: 6000, // 1 hour 40 minutes
      problemsSolved: 3,
      lastSubmission: '2025-09-28T17:40:00Z',
    },
    {
      rank: 7,
      userId: '7',
      userName: 'RustRacer',
      email: 'rust@example.com',
      score: 2290,
      timeTaken: 6300, // 1 hour 45 minutes
      problemsSolved: 3,
      lastSubmission: '2025-09-28T17:45:00Z',
    },
    {
      rank: 8,
      userId: '8',
      userName: 'GoGuru',
      email: 'go@example.com',
      score: 2180,
      timeTaken: 6600, // 1 hour 50 minutes
      problemsSolved: 3,
      lastSubmission: '2025-09-28T17:50:00Z',
    },
    {
      rank: 9,
      userId: '9',
      userName: 'SwiftSolver',
      email: 'swift@example.com',
      score: 2050,
      timeTaken: 7200, // 2 hours
      problemsSolved: 2,
      lastSubmission: '2025-09-28T18:00:00Z',
    },
    {
      rank: 10,
      userId: '10',
      userName: 'KotlinKing',
      email: 'kotlin@example.com',
      score: 1920,
      timeTaken: 7800, // 2 hour 10 minutes
      problemsSolved: 2,
      lastSubmission: '2025-09-28T18:10:00Z',
    },
  ]

  const fetchLeaderboard = async () => {
    try {
      setLoading(true)
      setError(null)

      // In production, replace with actual API call:
      // const endpoint = contestId
      //   ? `/api/contest/leaderboard/${contestId}`
      //   : '/api/leaderboard/global'
      // const response = await fetch(endpoint)
      // const data = await response.json()

      // Simulate API delay
      await new Promise((resolve) => setTimeout(resolve, 800))

      setLeaderboard(mockLeaderboardData.slice(0, maxEntries))
    } catch (err) {
      setError('Failed to load leaderboard. Please try again.')
      console.error('Error fetching leaderboard:', err)
    } finally {
      setLoading(false)
    }
  }

  const refreshLeaderboard = async () => {
    setRefreshing(true)
    await fetchLeaderboard()
    setRefreshing(false)
  }

  useEffect(() => {
    fetchLeaderboard()
  }, [contestId, maxEntries])

  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1:
        return <Crown className="w-5 h-5 text-yellow-500" />
      case 2:
        return <Medal className="w-5 h-5 text-gray-400" />
      case 3:
        return <Award className="w-5 h-5 text-amber-600" />
      default:
        return <Trophy className="w-4 h-4 text-gray-400" />
    }
  }

  const getRankBadgeColor = (rank: number) => {
    switch (rank) {
      case 1:
        return 'bg-gradient-to-r from-yellow-400 to-yellow-600 text-white'
      case 2:
        return 'bg-gradient-to-r from-gray-300 to-gray-500 text-white'
      case 3:
        return 'bg-gradient-to-r from-amber-400 to-amber-600 text-white'
      default:
        return 'bg-gray-100 text-gray-700'
    }
  }

  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600)
    const minutes = Math.floor((seconds % 3600) / 60)
    if (hours > 0) {
      return `${hours}h ${minutes}m`
    }
    return `${minutes}m`
  }

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map((word) => word[0])
      .join('')
      .toUpperCase()
      .slice(0, 2)
  }

  if (error) {
    return (
      <Card className="w-full">
        <CardContent className="flex flex-col items-center justify-center py-8">
          <div className="text-red-500 mb-4">
            <Trophy className="w-12 h-12" />
          </div>
          <p className="text-center text-gray-600 mb-4">{error}</p>
          <Button onClick={refreshLeaderboard} variant="outline" size="sm">
            Try Again
          </Button>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-gradient-to-br from-purple-500 to-blue-600 rounded-lg">
              <Trophy className="w-6 h-6 text-white" />
            </div>
            <div>
              <CardTitle className="text-xl font-bold">{title}</CardTitle>
              <p className="text-sm text-gray-600 mt-1">
                {showGlobalLeaderboard
                  ? 'Top performers across all contests'
                  : `Contest ${contestId} rankings`}
              </p>
            </div>
          </div>
          <Button
            onClick={refreshLeaderboard}
            variant="ghost"
            size="sm"
            disabled={refreshing}
          >
            <RefreshCw
              className={`w-4 h-4 ${refreshing ? 'animate-spin' : ''}`}
            />
          </Button>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        {loading ? (
          <div className="space-y-3">
            {[...Array(5)].map((_, i) => (
              <div
                key={i}
                className="flex items-center space-x-4 animate-pulse"
              >
                <div className="w-8 h-8 bg-gray-200 rounded-full"></div>
                <div className="flex-1 space-y-2">
                  <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                  <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                </div>
                <div className="w-16 h-6 bg-gray-200 rounded"></div>
              </div>
            ))}
          </div>
        ) : (
          <>
            {/* Top 3 Highlight */}
            {leaderboard.length >= 3 && (
              <div className="grid grid-cols-3 gap-4 mb-6 p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg">
                {leaderboard.slice(0, 3).map((entry, index) => (
                  <div key={entry.userId} className="text-center">
                    <div className="relative mb-2">
                      <Avatar className="w-12 h-12 mx-auto border-2 border-white shadow-lg">
                        <AvatarFallback
                          className={getRankBadgeColor(entry.rank)}
                        >
                          {getInitials(entry.userName)}
                        </AvatarFallback>
                      </Avatar>
                      <div className="absolute -top-1 -right-1">
                        {getRankIcon(entry.rank)}
                      </div>
                    </div>
                    <h4 className="font-semibold text-sm truncate">
                      {entry.userName}
                    </h4>
                    <div className="flex items-center justify-center gap-1 mt-1">
                      <TrendingUp className="w-3 h-3 text-green-600" />
                      <span className="text-sm font-bold text-green-600">
                        {entry.score}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Full Rankings */}
            <div className="space-y-2">
              {leaderboard.map((entry, index) => (
                <div
                  key={entry.userId}
                  className={`flex items-center space-x-4 p-3 rounded-lg border transition-all hover:shadow-md ${
                    entry.rank <= 3
                      ? 'bg-gradient-to-r from-yellow-50 to-orange-50 border-yellow-200'
                      : 'bg-white hover:bg-gray-50 border-gray-200'
                  }`}
                >
                  {/* Rank */}
                  <div className="flex items-center gap-2 min-w-[50px]">
                    <Badge
                      variant="outline"
                      className={`${getRankBadgeColor(entry.rank)} border-0 font-bold min-w-[32px] justify-center`}
                    >
                      #{entry.rank}
                    </Badge>
                    {entry.rank <= 3 && getRankIcon(entry.rank)}
                  </div>

                  {/* User Info */}
                  <div className="flex items-center gap-3 flex-1">
                    <Avatar className="w-10 h-10">
                      <AvatarFallback className="bg-gradient-to-br from-blue-500 to-purple-600 text-white">
                        {getInitials(entry.userName)}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-semibold text-gray-900 truncate">
                        {entry.userName}
                      </h4>
                      <p className="text-sm text-gray-500 truncate">
                        {entry.email}
                      </p>
                    </div>
                  </div>

                  {/* Stats */}
                  <div className="flex items-center gap-4 text-sm">
                    <div className="text-center">
                      <div className="flex items-center gap-1 text-green-600">
                        <Target className="w-4 h-4" />
                        <span className="font-bold">{entry.score}</span>
                      </div>
                      <p className="text-xs text-gray-500">Score</p>
                    </div>

                    <div className="text-center">
                      <div className="flex items-center gap-1 text-blue-600">
                        <User className="w-4 h-4" />
                        <span className="font-semibold">
                          {entry.problemsSolved}
                        </span>
                      </div>
                      <p className="text-xs text-gray-500">Solved</p>
                    </div>

                    {entry.timeTaken && (
                      <div className="text-center">
                        <div className="flex items-center gap-1 text-purple-600">
                          <Clock className="w-4 h-4" />
                          <span className="font-semibold">
                            {formatTime(entry.timeTaken)}
                          </span>
                        </div>
                        <p className="text-xs text-gray-500">Time</p>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Footer Stats */}
            <div className="pt-4 border-t border-gray-200">
              <div className="flex items-center justify-between text-sm text-gray-600">
                <span>
                  Showing top {Math.min(maxEntries, leaderboard.length)}{' '}
                  participants
                </span>
                <span>Last updated: {new Date().toLocaleTimeString()}</span>
              </div>
            </div>
          </>
        )}
      </CardContent>
    </Card>
  )
}

export default Leaderboard
