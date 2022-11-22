import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient()

async function main() {
  const user = await prisma.user.create({
    data: {
      name: 'John Doe',
      email: 'john.doe@gmail.com',
      avatarUrl: 'github.com/edsonboldrini.png',
    }
  })

  const pool = await prisma.pool.create({
    data: {
      title: 'Bolão 123',
      code: 'BOL123',
      ownerId: user.id,

      participants: {
        create: {
          userId: user.id
        }
      }
    }
  })

  const game1 = await prisma.game.create({
    data: {
      date: '2022-11-24T16:00:00.000Z',
      firstTeamCountryCode: 'BR',
      secondTeamCountryCode: 'CH',

      guesses: {
        create: {
          firstTeamPoints: 2,
          secondTeamPoints: 0,
          participant: {
            connect: {
              userId_poolId: {
                userId: user.id,
                poolId: pool.id,
              }
            }
          }
        }
      }
    }
  })

  const game2 = await prisma.game.create({
    data: {
      date: '2022-11-28T16:00:00.000Z',
      firstTeamCountryCode: 'BR',
      secondTeamCountryCode: 'RS',
    }
  })
}

main()