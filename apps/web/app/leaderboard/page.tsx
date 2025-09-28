import Leaderboard from '@/components/leaderboard'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Trophy, Medal, Award, TrendingUp } from 'lucide-react'

export default function LeaderboardPage() {
  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto p-8 space-y-8">
        {/* Header */}
        <div className="text-center space-y-4">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="p-3 bg-gradient-to-br from-yellow-500 to-orange-600 rounded-xl">
              <Trophy className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-4xl font-bold text-gray-900">Leaderboards</h1>
          </div>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Compete with the best programmers worldwide. Track your progress and
            climb the rankings!
          </p>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardContent className="p-4 text-center">
              <div className="flex items-center justify-center mb-2">
                <Trophy className="w-6 h-6 text-yellow-500" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900">1,247</h3>
              <p className="text-sm text-gray-600">Total Competitors</p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4 text-center">
              <div className="flex items-center justify-center mb-2">
                <Medal className="w-6 h-6 text-gray-400" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900">156</h3>
              <p className="text-sm text-gray-600">Active This Week</p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4 text-center">
              <div className="flex items-center justify-center mb-2">
                <Award className="w-6 h-6 text-amber-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900">42</h3>
              <p className="text-sm text-gray-600">Countries</p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4 text-center">
              <div className="flex items-center justify-center mb-2">
                <TrendingUp className="w-6 h-6 text-green-500" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900">18%</h3>
              <p className="text-sm text-gray-600">Growth This Month</p>
            </CardContent>
          </Card>
        </div>

        {/* Main Leaderboards */}
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
          {/* Global Leaderboard */}
          <div>
            <Leaderboard
              title="🌍 Global Leaderboard"
              showGlobalLeaderboard={true}
              maxEntries={15}
            />
          </div>

          {/* Current Contest Leaderboard */}
          <div>
            <Leaderboard
              title="🔥 Weekly Challenge #47"
              contestId="weekly-47"
              showGlobalLeaderboard={false}
              maxEntries={15}
            />
          </div>
        </div>

        {/* Additional Leaderboards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Monthly Leaders */}
          <div>
            <Leaderboard
              title="📅 September Leaders"
              contestId="monthly-sep"
              showGlobalLeaderboard={false}
              maxEntries={10}
            />
          </div>

          {/* Beginner Leaderboard */}
          <div>
            <Leaderboard
              title="🌱 Rising Stars"
              contestId="beginners"
              showGlobalLeaderboard={false}
              maxEntries={10}
            />
          </div>

          {/* Speed Coding */}
          <div>
            <Leaderboard
              title="⚡ Speed Demons"
              contestId="speed-coding"
              showGlobalLeaderboard={false}
              maxEntries={10}
            />
          </div>
        </div>

        {/* Achievement Badges Info */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Award className="w-5 h-5 text-purple-600" />
              Achievement System
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center">
                <Badge className="bg-yellow-100 text-yellow-800 border-yellow-200 mb-2">
                  🏆 Champion
                </Badge>
                <p className="text-xs text-gray-600">Top 10 Global</p>
              </div>
              <div className="text-center">
                <Badge className="bg-purple-100 text-purple-800 border-purple-200 mb-2">
                  🎯 Expert
                </Badge>
                <p className="text-xs text-gray-600">500+ Problems</p>
              </div>
              <div className="text-center">
                <Badge className="bg-blue-100 text-blue-800 border-blue-200 mb-2">
                  🚀 Speedster
                </Badge>
                <p className="text-xs text-gray-600">Fast Solver</p>
              </div>
              <div className="text-center">
                <Badge className="bg-green-100 text-green-800 border-green-200 mb-2">
                  📈 Consistent
                </Badge>
                <p className="text-xs text-gray-600">30-day Streak</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
