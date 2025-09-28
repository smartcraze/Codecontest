'use client'

import React, { useState, useEffect } from 'react'
import ContestCard from './contest-card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Search, Filter, RefreshCw, AlertCircle } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'

interface Contest {
  id: string
  title: string
  startTime: string
  endTime: string
  challengeCount?: number
  participantCount?: number
  status: 'upcoming' | 'active' | 'finished'
  difficulty: 'Easy' | 'Medium' | 'Hard'
  totalPoints?: number
}

interface ContestsGridProps {
  apiBaseUrl?: string
}

function ContestsGrid({
  apiBaseUrl = 'http://localhost:8000/api',
}: ContestsGridProps) {
  const [contests, setContests] = useState<Contest[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [searchTerm, setSearchTerm] = useState('')
  const [activeTab, setActiveTab] = useState('all')
  const [refreshing, setRefreshing] = useState(false)

  // Mock data for demonstration - replace with actual API calls
  const mockContests: Contest[] = [
    {
      id: '1',
      title: 'Weekly Coding Challenge #47',
      startTime: '2025-09-29T10:00:00Z',
      endTime: '2025-09-29T12:00:00Z',
      status: 'upcoming',
      difficulty: 'Medium',
      challengeCount: 4,
      participantCount: 127,
      totalPoints: 40,
    },
    {
      id: '2',
      title: 'Algorithm Sprint Contest',
      startTime: '2025-09-28T14:00:00Z',
      endTime: '2025-09-28T17:00:00Z',
      status: 'active',
      difficulty: 'Hard',
      challengeCount: 5,
      participantCount: 89,
      totalPoints: 50,
    },
    {
      id: '3',
      title: 'Beginner Friendly Contest',
      startTime: '2025-09-27T09:00:00Z',
      endTime: '2025-09-27T11:00:00Z',
      status: 'finished',
      difficulty: 'Easy',
      challengeCount: 3,
      participantCount: 234,
      totalPoints: 30,
    },
    {
      id: '4',
      title: 'Data Structures Mastery',
      startTime: '2025-09-30T15:00:00Z',
      endTime: '2025-09-30T18:00:00Z',
      status: 'upcoming',
      difficulty: 'Hard',
      challengeCount: 6,
      participantCount: 45,
      totalPoints: 60,
    },
    {
      id: '5',
      title: 'Quick Solve Challenge',
      startTime: '2025-09-28T16:00:00Z',
      endTime: '2025-09-28T17:30:00Z',
      status: 'active',
      difficulty: 'Medium',
      challengeCount: 3,
      participantCount: 156,
      totalPoints: 30,
    },
  ]

  const fetchContests = async (
    endpoint: 'active' | 'finished' | 'all' = 'all'
  ) => {
    try {
      setLoading(true)
      setError(null)

      // In a real implementation, you would make actual API calls like:
      // const response = await fetch(`${apiBaseUrl}/contest/active`)
      // const data = await response.json()

      // For now, we'll use mock data with different filtering
      await new Promise((resolve) => setTimeout(resolve, 500)) // Simulate API delay

      let filteredContests = mockContests
      if (endpoint === 'active') {
        filteredContests = mockContests.filter((c) => c.status === 'active')
      } else if (endpoint === 'finished') {
        filteredContests = mockContests.filter((c) => c.status === 'finished')
      }

      setContests(filteredContests)
    } catch (err) {
      setError('Failed to fetch contests. Please try again.')
      console.error('Error fetching contests:', err)
    } finally {
      setLoading(false)
    }
  }

  const refreshContests = async () => {
    setRefreshing(true)
    await fetchContests(activeTab as 'active' | 'finished' | 'all')
    setRefreshing(false)
  }

  useEffect(() => {
    fetchContests(activeTab as 'active' | 'finished' | 'all')
  }, [activeTab])

  const filteredContests = contests.filter((contest) =>
    contest.title.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const getContestCounts = () => {
    return {
      all: contests.length,
      active: contests.filter((c) => c.status === 'active').length,
      upcoming: contests.filter((c) => c.status === 'upcoming').length,
      finished: contests.filter((c) => c.status === 'finished').length,
    }
  }

  const counts = getContestCounts()

  const handleJoinContest = (contestId: string) => {
    // Navigate to contest page or show registration modal
    console.log('Joining contest:', contestId)
    // You would implement navigation logic here
    // router.push(`/contest/${contestId}`)
  }

  const handleViewDetails = (contestId: string) => {
    console.log('Viewing contest details:', contestId)
    // router.push(`/contest/${contestId}/details`)
  }

  const handleViewLeaderboard = (contestId: string) => {
    console.log('Viewing leaderboard:', contestId)
    // router.push(`/contest/${contestId}/leaderboard`)
  }

  if (error) {
    return (
      <Card className="w-full max-w-md mx-auto">
        <CardContent className="flex flex-col items-center justify-center py-8">
          <AlertCircle className="w-12 h-12 text-red-500 mb-4" />
          <p className="text-center text-gray-600 mb-4">{error}</p>
          <Button onClick={refreshContests} variant="outline">
            Try Again
          </Button>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="w-full max-w-7xl mx-auto p-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Coding Contests</h1>
          <p className="text-gray-600 mt-1">
            Participate in competitive programming challenges
          </p>
        </div>
        <Button
          onClick={refreshContests}
          variant="outline"
          size="sm"
          disabled={refreshing}
        >
          <RefreshCw
            className={`w-4 h-4 mr-2 ${refreshing ? 'animate-spin' : ''}`}
          />
          Refresh
        </Button>
      </div>

      {/* Search and Filters */}
      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <Input
            placeholder="Search contests..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        <Button variant="outline" size="sm">
          <Filter className="w-4 h-4 mr-2" />
          Filters
        </Button>
      </div>

      {/* Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-4 lg:w-auto lg:grid-cols-4">
          <TabsTrigger value="all" className="flex items-center gap-2">
            All
            <Badge variant="secondary" className="ml-1 px-2 py-0.5 text-xs">
              {counts.all}
            </Badge>
          </TabsTrigger>
          <TabsTrigger value="active" className="flex items-center gap-2">
            Live
            <Badge
              variant="default"
              className="ml-1 px-2 py-0.5 text-xs bg-green-600"
            >
              {counts.active}
            </Badge>
          </TabsTrigger>
          <TabsTrigger value="upcoming" className="flex items-center gap-2">
            Upcoming
            <Badge
              variant="secondary"
              className="ml-1 px-2 py-0.5 text-xs bg-blue-100 text-blue-800"
            >
              {counts.upcoming}
            </Badge>
          </TabsTrigger>
          <TabsTrigger value="finished" className="flex items-center gap-2">
            Finished
            <Badge variant="outline" className="ml-1 px-2 py-0.5 text-xs">
              {counts.finished}
            </Badge>
          </TabsTrigger>
        </TabsList>

        <TabsContent value={activeTab} className="mt-6">
          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="animate-pulse">
                  <div className="bg-gray-200 rounded-xl h-80"></div>
                </div>
              ))}
            </div>
          ) : filteredContests.length === 0 ? (
            <Card className="w-full">
              <CardContent className="flex flex-col items-center justify-center py-12">
                <div className="text-gray-400 mb-4">
                  <Search className="w-16 h-16" />
                </div>
                <h3 className="text-lg font-semibold text-gray-600 mb-2">
                  No contests found
                </h3>
                <p className="text-center text-gray-500">
                  {searchTerm
                    ? `No contests match "${searchTerm}"`
                    : 'No contests available at the moment'}
                </p>
              </CardContent>
            </Card>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredContests.map((contest) => (
                <ContestCard
                  key={contest.id}
                  contest={contest}
                  onJoin={handleJoinContest}
                  onViewDetails={handleViewDetails}
                  onViewLeaderboard={handleViewLeaderboard}
                />
              ))}
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  )
}

export default ContestsGrid
