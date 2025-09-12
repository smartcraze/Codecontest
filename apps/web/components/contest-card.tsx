import React from 'react'
import prisma from '@repo/db'

async function getUsers() {
  const user = await prisma.user.findMany()
  return user
}

async function ContestCard() {
  const users = await getUsers()
  return (
    <div>
      <h2>Users</h2>
      {users.map((user) => (
        <div key={user.id}>
          <p>
            {user.email} - {user.role}
          </p>
        </div>
      ))}
    </div>
  )
}

export default ContestCard
