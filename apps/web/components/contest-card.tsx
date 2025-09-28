import React from 'react'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
  Clock,
  Users,
  Trophy,
  Calendar,
  ChevronRight,
  Code,
  Award,
} from 'lucide-react'

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

interface ContestCardProps {
  contest: Contest
  onJoin?: (contestId: string) => void
  onViewDetails?: (contestId: string) => void
  onViewLeaderboard?: (contestId: string) => void
}

function ContestCard({
  contest,
  onJoin,
  onViewDetails,
  onViewLeaderboard,
}: ContestCardProps) {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    })
  }

  const getTimeRemaining = () => {
    const now = new Date()
    const start = new Date(contest.startTime)
    const end = new Date(contest.endTime)

    if (now < start) {
      const diff = start.getTime() - now.getTime()
      const days = Math.floor(diff / (1000 * 60 * 60 * 24))
      const hours = Math.floor(
        (diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      )
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60))

      if (days > 0) return `Starts in ${days}d ${hours}h`
      if (hours > 0) return `Starts in ${hours}h ${minutes}m`
      return `Starts in ${minutes}m`
    } else if (now < end) {
      const diff = end.getTime() - now.getTime()
      const hours = Math.floor(diff / (1000 * 60 * 60))
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60))

      if (hours > 0) return `Ends in ${hours}h ${minutes}m`
      return `Ends in ${minutes}m`
    }
    return 'Finished'
  }

  const getStatusBadge = () => {
    const timeRemaining = getTimeRemaining()

    switch (contest.status) {
      case 'upcoming':
        return (
          <Badge
            variant="secondary"
            className="bg-blue-100 text-blue-800 border-blue-200"
          >
            <Clock className="w-3 h-3 mr-1" />
            {timeRemaining}
          </Badge>
        )
      case 'active':
        return (
          <Badge
            variant="default"
            className="bg-green-100 text-green-800 border-green-200"
          >
            <Trophy className="w-3 h-3 mr-1" />
            Live - {timeRemaining}
          </Badge>
        )
      case 'finished':
        return (
          <Badge variant="outline" className="bg-gray-100 text-gray-600">
            <Award className="w-3 h-3 mr-1" />
            Finished
          </Badge>
        )
      default:
        return null
    }
  }

  const getDifficultyColor = () => {
    switch (contest.difficulty) {
      case 'Easy':
        return 'bg-green-100 text-green-800 border-green-200'
      case 'Medium':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200'
      case 'Hard':
        return 'bg-red-100 text-red-800 border-red-200'
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200'
    }
  }

  return (
    <Card className="w-full max-w-md hover:shadow-lg transition-all duration-200 border-l-4 border-l-primary group">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <CardTitle className="text-lg font-bold text-gray-900 group-hover:text-primary transition-colors">
              {contest.title}
            </CardTitle>
            <CardDescription className="mt-1 text-sm text-gray-600">
              Contest #{contest.id.slice(-8)}
            </CardDescription>
          </div>
          <div className="flex flex-col gap-2">
            {getStatusBadge()}
            <Badge variant="outline" className={getDifficultyColor()}>
              {contest.difficulty}
            </Badge>
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Time Information */}
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div className="flex items-center text-gray-600">
            <Calendar className="w-4 h-4 mr-2 text-blue-500" />
            <div>
              <p className="font-medium">Start</p>
              <p className="text-xs">{formatDate(contest.startTime)}</p>
            </div>
          </div>
          <div className="flex items-center text-gray-600">
            <Clock className="w-4 h-4 mr-2 text-orange-500" />
            <div>
              <p className="font-medium">End</p>
              <p className="text-xs">{formatDate(contest.endTime)}</p>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4 py-3 px-4 bg-gray-50 rounded-lg">
          <div className="text-center">
            <div className="flex items-center justify-center mb-1">
              <Code className="w-4 h-4 text-purple-500" />
            </div>
            <p className="text-xs text-gray-600">Problems</p>
            <p className="font-semibold text-sm">
              {contest.challengeCount || 3}
            </p>
          </div>
          <div className="text-center">
            <div className="flex items-center justify-center mb-1">
              <Users className="w-4 h-4 text-green-500" />
            </div>
            <p className="text-xs text-gray-600">Participants</p>
            <p className="font-semibold text-sm">
              {contest.participantCount || 0}
            </p>
          </div>
          <div className="text-center">
            <div className="flex items-center justify-center mb-1">
              <Trophy className="w-4 h-4 text-yellow-500" />
            </div>
            <p className="text-xs text-gray-600">Max Points</p>
            <p className="font-semibold text-sm">{contest.totalPoints || 30}</p>
          </div>
        </div>
      </CardContent>

      <CardFooter className="pt-2">
        <div className="flex gap-2 w-full">
          {contest.status === 'upcoming' && (
            <Button
              onClick={() => onJoin?.(contest.id)}
              className="flex-1 bg-primary hover:bg-primary/90"
            >
              Register
              <ChevronRight className="w-4 h-4 ml-1" />
            </Button>
          )}

          {contest.status === 'active' && (
            <Button
              onClick={() => onJoin?.(contest.id)}
              className="flex-1 bg-green-600 hover:bg-green-700"
            >
              Join Contest
              <ChevronRight className="w-4 h-4 ml-1" />
            </Button>
          )}

          {contest.status === 'finished' && (
            <Button
              onClick={() => onViewLeaderboard?.(contest.id)}
              variant="outline"
              className="flex-1"
            >
              View Results
              <Trophy className="w-4 h-4 ml-1" />
            </Button>
          )}

          <Button
            onClick={() => onViewDetails?.(contest.id)}
            variant="ghost"
            size="sm"
            className="px-3"
          >
            Details
          </Button>
        </div>
      </CardFooter>
    </Card>
  )
}

export default ContestCard
