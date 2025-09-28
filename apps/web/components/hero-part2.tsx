import React from 'react'
import { Button } from './ui/button'
import { ArrowRight, Users, Code2, Trophy, Star } from 'lucide-react'

function Herosection2() {
  return (
    <section className="w-full py-16 md:py-20 px-4 md:px-16 bg-background relative overflow-hidden">
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-blue-50/30 to-transparent dark:via-blue-950/20"></div>

      <div className="relative z-10 max-w-6xl mx-auto">
        <div className="flex flex-col justify-center items-center text-center">
          {/* Heading */}
          <div className="mb-8">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-center mb-6 leading-tight">
              <span className="text-foreground">Compete in </span>
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Coding Contests
              </span>
              <br />
              <span className="text-foreground">and </span>
              <span className="bg-gradient-to-r from-purple-600 to-green-600 bg-clip-text text-transparent">
                Climb the Leaderboard!
              </span>
            </h2>

            {/* Feature Highlights */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8 max-w-4xl mx-auto">
              <div className="flex flex-col items-center p-6 bg-card/50 backdrop-blur-sm rounded-xl border border-border/50 hover:border-primary/20 transition-all duration-300 hover:scale-105">
                <div className="p-3 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg mb-4">
                  <Code2 className="w-6 h-6 text-white" />
                </div>
                <h3 className="font-semibold text-lg mb-2">
                  Live Competitions
                </h3>
                <p className="text-muted-foreground text-sm text-center">
                  Participate in real-time coding challenges with developers
                  worldwide
                </p>
              </div>

              <div className="flex flex-col items-center p-6 bg-card/50 backdrop-blur-sm rounded-xl border border-border/50 hover:border-primary/20 transition-all duration-300 hover:scale-105">
                <div className="p-3 bg-gradient-to-br from-purple-500 to-purple-600 rounded-lg mb-4">
                  <Trophy className="w-6 h-6 text-white" />
                </div>
                <h3 className="font-semibold text-lg mb-2">Global Rankings</h3>
                <p className="text-muted-foreground text-sm text-center">
                  Track your progress and compete for the top spots on our
                  leaderboards
                </p>
              </div>

              <div className="flex flex-col items-center p-6 bg-card/50 backdrop-blur-sm rounded-xl border border-border/50 hover:border-primary/20 transition-all duration-300 hover:scale-105">
                <div className="p-3 bg-gradient-to-br from-green-500 to-green-600 rounded-lg mb-4">
                  <Star className="w-6 h-6 text-white" />
                </div>
                <h3 className="font-semibold text-lg mb-2">Skill Growth</h3>
                <p className="text-muted-foreground text-sm text-center">
                  Improve your coding skills through challenging problems and
                  feedback
                </p>
              </div>
            </div>
          </div>

          {/* Subheading / Description */}
          <p className="text-base sm:text-lg md:text-xl text-center text-muted-foreground max-w-3xl mb-10 leading-relaxed">
            Join our vibrant community of developers, challenge yourself with
            engaging problems, and showcase your skills in competitive
            programming. Whether you're a beginner or an expert, there's always
            room to grow and compete.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 mb-8">
            <Button
              size="lg"
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold px-8 py-4 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 group"
            >
              Join Contest Now
              <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="border-2 border-primary/20 hover:border-primary/40 hover:bg-primary/5 px-8 py-4 rounded-xl font-semibold transition-all duration-300 group"
            >
              <Users className="w-5 h-5 mr-2" />
              Explore Leaderboard
            </Button>
          </div>

          {/* Stats Preview */}
          <div className="flex flex-wrap justify-center gap-8 text-center">
            <div className="flex flex-col items-center">
              <div className="text-2xl font-bold text-primary">1,247</div>
              <div className="text-sm text-muted-foreground">Active Users</div>
            </div>
            <div className="flex flex-col items-center">
              <div className="text-2xl font-bold text-primary">5</div>
              <div className="text-sm text-muted-foreground">Live Contests</div>
            </div>
            <div className="flex flex-col items-center">
              <div className="text-2xl font-bold text-primary">8,429</div>
              <div className="text-sm text-muted-foreground">
                Problems Solved
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Herosection2
