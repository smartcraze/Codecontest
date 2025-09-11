import { ContestCard } from './contest-card'

export function ContestsSection() {
  const contests = [
    {
      title: 'Weekly Algorithm Challenge',
      difficulty: 'Medium' as const,
      date: 'Dec 15, 2024',
      duration: '2 hours',
      participants: 2847,
      prize: '$5,000',
    },
    {
      title: 'Data Structures Sprint',
      difficulty: 'Hard' as const,
      date: 'Dec 18, 2024',
      duration: '3 hours',
      participants: 1923,
      prize: '$10,000',
    },
    {
      title: 'Beginner Friendly Contest',
      difficulty: 'Easy' as const,
      date: 'Dec 20, 2024',
      duration: '1.5 hours',
      participants: 4521,
    },
    {
      title: 'Dynamic Programming Marathon',
      difficulty: 'Hard' as const,
      date: 'Dec 22, 2024',
      duration: '4 hours',
      participants: 1456,
      prize: '$15,000',
    },
    {
      title: 'Graph Theory Challenge',
      difficulty: 'Medium' as const,
      date: 'Dec 25, 2024',
      duration: '2.5 hours',
      participants: 3102,
      prize: '$7,500',
    },
    {
      title: 'Speed Coding Blitz',
      difficulty: 'Easy' as const,
      date: 'Dec 28, 2024',
      duration: '1 hour',
      participants: 5834,
    },
  ]

  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-card/20 to-background">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 text-balance">
            <span className="text-secondary">Upcoming</span> Contests
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto text-pretty">
            Join exciting competitions and challenge yourself against the best
            programmers worldwide
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {contests.map((contest, index) => (
            <ContestCard
              key={index}
              title={contest.title}
              difficulty={contest.difficulty}
              date={contest.date}
              duration={contest.duration}
              participants={contest.participants}
              prize={contest.prize}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
