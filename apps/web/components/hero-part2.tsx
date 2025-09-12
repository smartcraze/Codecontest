import React from 'react'
import { Button } from './ui/button'

function Herosection2() {
  return (
    <section className="w-full flex flex-col justify-center items-center text-foreground px-4 md:px-16 bg-background">
      {/* Heading */}
      <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-center mb-4">
        Compete in Coding Contests and Climb the Leaderboard!
      </h1>

      {/* Subheading / Description */}
      <p className="text-sm sm:text-base md:text-lg text-center text-muted-foreground max-w-2xl mb-8">
        Join live coding competitions, challenge yourself, and showcase your
        skills. Track your progress on the leaderboard and compete with coders
        worldwide.
      </p>

      {/* CTA Buttons */}
      <div className="flex flex-col sm:flex-row gap-3 sm:gap-6">
        <Button className="bg-primary text-primary-foreground hover:bg-primary/90 px-6 py-3 rounded-lg font-medium transition">
          Join Contest
        </Button>
        <Button className="bg-secondary text-secondary-foreground hover:bg-secondary/90 px-6 py-3 rounded-lg font-medium transition">
          Explore Leaderboard
        </Button>
      </div>
    </section>
  )
}

export default Herosection2
