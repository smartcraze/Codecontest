import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Trophy, Medal, Award, Crown } from 'lucide-react'

export function LeaderboardSection() {
  const topPerformers = [
    {
      rank: 1,
      name: 'AlexCoder',
      rating: 2847,
      country: '🇺🇸 USA',
      badge: 'Grandmaster',
    },
    {
      rank: 2,
      name: 'CodeNinja',
      rating: 2756,
      country: '🇯🇵 Japan',
      badge: 'Master',
    },
    {
      rank: 3,
      name: 'DevMaster',
      rating: 2698,
      country: '🇩🇪 Germany',
      badge: 'Master',
    },
    {
      rank: 4,
      name: 'ByteWizard',
      rating: 2634,
      country: '🇮🇳 India',
      badge: 'Expert',
    },
    {
      rank: 5,
      name: 'LogicQueen',
      rating: 2587,
      country: '🇨🇦 Canada',
      badge: 'Expert',
    },
  ]

  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1:
        return <Crown className="h-5 w-5 text-yellow-400 fill-yellow-400" />
      case 2:
        return <Medal className="h-5 w-5 text-gray-400 fill-gray-400" />
      case 3:
        return <Award className="h-5 w-5 text-amber-600 fill-amber-600" />
      default:
        return <Trophy className="h-4 w-4 text-primary" />
    }
  }

  const getBadgeColor = (badge: string) => {
    switch (badge) {
      case 'Grandmaster':
        return 'bg-red-500/20 text-red-400 border-red-500/50'
      case 'Master':
        return 'bg-orange-500/20 text-orange-400 border-orange-500/50'
      case 'Expert':
        return 'bg-blue-500/20 text-blue-400 border-blue-500/50'
      default:
        return 'bg-gray-500/20 text-gray-400 border-gray-500/50'
    }
  }

  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 text-balance">
            <span className="text-primary">Top</span> Performers
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto text-pretty">
            Meet the coding legends who dominate our global leaderboard
          </p>
        </div>

        <Card className="bg-card/50 border-border backdrop-blur-sm shadow-xl">
          <CardHeader className="text-center pb-6">
            <CardTitle className="text-card-foreground flex items-center justify-center gap-3 text-2xl">
              <Trophy className="h-6 w-6 text-primary" />
              Global Leaderboard
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow className="border-border hover:bg-transparent">
                  <TableHead className="text-muted-foreground font-semibold">
                    Rank
                  </TableHead>
                  <TableHead className="text-muted-foreground font-semibold">
                    Coder
                  </TableHead>
                  <TableHead className="text-muted-foreground font-semibold">
                    Rating
                  </TableHead>
                  <TableHead className="text-muted-foreground font-semibold">
                    Badge
                  </TableHead>
                  <TableHead className="text-muted-foreground font-semibold">
                    Country
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {topPerformers.map((performer) => (
                  <TableRow
                    key={performer.rank}
                    className="border-border hover:bg-primary/5 transition-colors"
                  >
                    <TableCell className="font-medium">
                      <div className="flex items-center gap-2">
                        {getRankIcon(performer.rank)}
                        <span className="text-lg font-bold">
                          {performer.rank}
                        </span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="font-semibold text-primary text-lg hover:text-secondary transition-colors cursor-pointer">
                        {performer.name}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="text-secondary font-bold text-lg">
                        {performer.rating.toLocaleString()}
                      </div>
                    </TableCell>
                    <TableCell>
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-semibold border ${getBadgeColor(performer.badge)}`}
                      >
                        {performer.badge}
                      </span>
                    </TableCell>
                    <TableCell className="text-lg">
                      {performer.country}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </section>
  )
}
