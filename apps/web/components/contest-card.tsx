import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Calendar, Clock, Users } from 'lucide-react'

interface ContestCardProps {
  title: string
  difficulty: 'Easy' | 'Medium' | 'Hard'
  date: string
  duration: string
  participants: number
  prize?: string
}

export function ContestCard({
  title,
  difficulty,
  date,
  duration,
  participants,
  prize,
}: ContestCardProps) {
  const difficultyColors = {
    Easy: 'bg-green-500/20 text-green-400 border-green-500/50',
    Medium: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/50',
    Hard: 'bg-red-500/20 text-red-400 border-red-500/50',
  }

  return (
    <Card className="group bg-card/50 border-border hover:border-primary/50 transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-primary/20 backdrop-blur-sm">
      <CardHeader>
        <div className="flex justify-between items-start mb-2">
          <CardTitle className="text-card-foreground text-xl font-bold group-hover:text-primary transition-colors">
            {title}
          </CardTitle>
          <Badge className={`${difficultyColors[difficulty]} font-semibold`}>
            {difficulty}
          </Badge>
        </div>

        <div className="space-y-2">
          <CardDescription className="flex items-center gap-2 text-muted-foreground">
            <Calendar className="h-4 w-4 text-primary" />
            {date}
          </CardDescription>
          <CardDescription className="flex items-center gap-2 text-muted-foreground">
            <Clock className="h-4 w-4 text-secondary" />
            {duration}
          </CardDescription>
          <CardDescription className="flex items-center gap-2 text-muted-foreground">
            <Users className="h-4 w-4 text-primary" />
            {participants.toLocaleString()} registered
          </CardDescription>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        {prize && (
          <div className="p-3 bg-gradient-to-r from-primary/10 to-secondary/10 rounded-lg border border-primary/20">
            <div className="text-sm font-semibold text-primary">
              🏆 Prize Pool
            </div>
            <div className="text-lg font-bold text-foreground">{prize}</div>
          </div>
        )}

        <Button className="w-full bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90 text-primary-foreground font-semibold transition-all duration-300 hover:scale-105">
          Register Now
        </Button>
      </CardContent>
    </Card>
  )
}
