'use client'

import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Trophy, Users, Code, Clock, TrendingUp, Award } from 'lucide-react'

interface StatsCardProps {
  title: string
  value: string | number
  subtitle?: string
  icon: React.ReactNode
  trend?: {
    value: string
    positive: boolean
  }
  color?: 'blue' | 'green' | 'purple' | 'orange' | 'red'
}

const StatsCard: React.FC<StatsCardProps> = ({
  title,
  value,
  subtitle,
  icon,
  trend,
  color = 'blue',
}) => {
  const getColorClasses = () => {
    switch (color) {
      case 'green':
        return 'from-green-500 to-green-600'
      case 'purple':
        return 'from-purple-500 to-purple-600'
      case 'orange':
        return 'from-orange-500 to-orange-600'
      case 'red':
        return 'from-red-500 to-red-600'
      default:
        return 'from-blue-500 to-blue-600'
    }
  }

  return (
    <Card className="relative overflow-hidden">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div
            className={`p-2 bg-gradient-to-br ${getColorClasses()} rounded-lg`}
          >
            <div className="text-white">{icon}</div>
          </div>
          {trend && (
            <Badge
              variant="outline"
              className={`${
                trend.positive
                  ? 'text-green-600 border-green-200 bg-green-50'
                  : 'text-red-600 border-red-200 bg-red-50'
              }`}
            >
              <TrendingUp
                className={`w-3 h-3 mr-1 ${trend.positive ? '' : 'rotate-180'}`}
              />
              {trend.value}
            </Badge>
          )}
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-1">
          <h3 className="text-2xl font-bold text-gray-900">{value}</h3>
          <p className="text-sm font-medium text-gray-600">{title}</p>
          {subtitle && <p className="text-xs text-gray-500">{subtitle}</p>}
        </div>
      </CardContent>
    </Card>
  )
}

const PlatformStats: React.FC = () => {
  const stats = [
    {
      title: 'Active Contests',
      value: 5,
      subtitle: '2 ending today',
      icon: <Trophy className="w-5 h-5" />,
      trend: { value: '+2', positive: true },
      color: 'purple' as const,
    },
    {
      title: 'Total Participants',
      value: '1,247',
      subtitle: 'Across all contests',
      icon: <Users className="w-5 h-5" />,
      trend: { value: '+18%', positive: true },
      color: 'green' as const,
    },
    {
      title: 'Problems Solved',
      value: '8,429',
      subtitle: 'This month',
      icon: <Code className="w-5 h-5" />,
      trend: { value: '+12%', positive: true },
      color: 'blue' as const,
    },
    {
      title: 'Avg. Solve Time',
      value: '24m',
      subtitle: 'Per problem',
      icon: <Clock className="w-5 h-5" />,
      trend: { value: '-3m', positive: true },
      color: 'orange' as const,
    },
  ]

  return (
    <div className="w-full">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          Platform Statistics
        </h2>
        <p className="text-gray-600">
          Real-time insights from our competitive programming community
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, index) => (
          <StatsCard
            key={index}
            title={stat.title}
            value={stat.value}
            subtitle={stat.subtitle}
            icon={stat.icon}
            trend={stat.trend}
            color={stat.color}
          />
        ))}
      </div>
    </div>
  )
}

export { StatsCard, PlatformStats }
