import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient()

async function main() {
  const game1 = await prisma.game.create({
    data: {
      date: '2022-11-24T19:00:00.000Z',
      firstTeamCountryCode: 'BR',
      secondTeamCountryCode: 'RS',
    }
  })

  const game2 = await prisma.game.create({
    data: {
      date: '2022-11-28T16:00:00.000Z',
      firstTeamCountryCode: 'BR',
      secondTeamCountryCode: 'CH',
    }
  })

  const game3 = await prisma.game.create({
    data: {
      date: '2022-12-02T19:00:00.000Z',
      firstTeamCountryCode: 'BR',
      secondTeamCountryCode: 'CM',
    }
  })
}

main()