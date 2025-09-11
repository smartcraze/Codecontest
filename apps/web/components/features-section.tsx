import {
  Code,
  Trophy,
  Users,
  BarChart3,
  Zap,
  Shield,
  Globe,
  Award,
} from 'lucide-react'
import { FeatureCard } from './feature-card'

export function FeaturesSection() {
  const features = [
    {
      icon: Code,
      title: 'Real-time Code Evaluation',
      description:
        'Get instant feedback on your code with our lightning-fast evaluation system powered by advanced algorithms',
    },
    {
      icon: Trophy,
      title: 'Global Leaderboards',
      description:
        'Compete with developers worldwide and track your progress through comprehensive ranking systems',
    },
    {
      icon: Users,
      title: 'Team & Solo Contests',
      description:
        'Participate in individual challenges or collaborate with teams in exciting multiplayer competitions',
    },
    {
      icon: BarChart3,
      title: 'Detailed Analytics',
      description:
        'Comprehensive performance insights and personalized feedback to accelerate your skill development',
    },
    {
      icon: Zap,
      title: 'Lightning Fast Platform',
      description:
        'Experience blazing-fast code execution and real-time updates with our optimized infrastructure',
    },
    {
      icon: Shield,
      title: 'Secure Environment',
      description:
        'Code in a safe, sandboxed environment with enterprise-grade security and privacy protection',
    },
    {
      icon: Globe,
      title: 'Multi-Language Support',
      description:
        'Code in 20+ programming languages with full IDE features and intelligent auto-completion',
    },
    {
      icon: Award,
      title: 'Certification & Badges',
      description:
        'Earn verified certificates and showcase your achievements with our comprehensive badge system',
    },
  ]

  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-background to-card/20">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 text-balance">
            <span className="text-primary">Why Choose</span> Our Platform?
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto text-pretty">
            Discover the features that make us the preferred choice for
            competitive programmers worldwide
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <FeatureCard
              key={index}
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
