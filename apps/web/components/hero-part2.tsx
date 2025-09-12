import React from 'react'

function Herosection2() {
  return (
    <section className="w-full flex flex-col justify-center items-center text-white px-4 md:px-16">
      <h3 className="text-3xl sm:text-4xl md:text-5xl font-bold text-center mb-4">
        Compete in Coding Contests and Climb the Leaderboard!
      </h3>

      <div className="flex flex-col sm:flex-row gap-3 sm:gap-6">
        <button className="bg-purple-600 hover:bg-purple-700 transition text-white px-6 py-3 rounded-lg font-medium">
          Join Contest
        </button>
        <button className="bg-gray-700 hover:bg-gray-600 transition text-white px-6 py-3 rounded-lg font-medium">
          Explore Leaderboard
        </button>
      </div>
    </section>
  )
}

export default Herosection2
