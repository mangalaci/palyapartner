import { PrismaClient } from '@prisma/client'
import { hash } from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  // Clean up
  await prisma.message.deleteMany()
  await prisma.gameRequest.deleteMany()
  await prisma.userSport.deleteMany()
  await prisma.user.deleteMany()

  const passwordHash = await hash('jelszo123', 12)

  const users = [
    {
      email: 'kis.daniel@example.com',
      nickname: 'KisDániel',
      city: 'Győr',
      ageGroup: '20-30',
      bio: 'Teniszezni és tollaslabdázni szeretek a legjobban!',
      sports: [
        { sport: 'Tenisz', level: 'Kezdő' },
        { sport: 'Tollaslabda', level: 'Kezdő' },
      ],
    },
    {
      email: 'toth.maria@example.com',
      nickname: 'TóthMária',
      city: 'Budapest',
      ageGroup: '30-40',
      bio: 'Rendszeresen futok és kerékpározom.',
      sports: [
        { sport: 'Futás', level: 'Középhaladó' },
        { sport: 'Kerékpározás', level: 'Középhaladó' },
      ],
    },
    {
      email: 'szabo.gabor@example.com',
      nickname: 'SzabóGábor',
      city: 'Pécs',
      ageGroup: '40-50',
      bio: 'Padel rajongó, squash-ban is kipróbálnám magam.',
      sports: [
        { sport: 'Padel', level: 'Haladó' },
        { sport: 'Squash', level: 'Haladó' },
      ],
    },
    {
      email: 'nagy.anna@example.com',
      nickname: 'NagyAnna',
      city: 'Debrecen',
      ageGroup: '20-30',
      bio: 'Kosárlabda és röplabda az életem!',
      sports: [
        { sport: 'Kosárlabda', level: 'Kezdő' },
        { sport: 'Röplabda', level: 'Kezdő' },
      ],
    },
    {
      email: 'kovacs.peter@example.com',
      nickname: 'KovácsPéter',
      city: 'Budapest',
      ageGroup: '30-40',
      bio: 'Foci hétvégén, tenisz hétközben.',
      sports: [
        { sport: 'Foci', level: 'Középhaladó' },
        { sport: 'Tenisz', level: 'Haladó' },
      ],
    },
  ]

  for (const userData of users) {
    const { sports, ...userFields } = userData
    await prisma.user.create({
      data: {
        ...userFields,
        passwordHash,
        sports: {
          create: sports,
        },
      },
    })
  }

  // Create a sample game request
  const peter = await prisma.user.findFirst({ where: { nickname: 'KovácsPéter' } })
  if (peter) {
    await prisma.gameRequest.create({
      data: {
        userId: peter.id,
        sport: 'Tenisz',
        level: 'Haladó',
        date: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000), // 3 days from now
        city: 'Budapest',
        description: 'Szombat délután tenisz a Margitszigeten? Haladó szinten játszom.',
      },
    })
  }

  console.log('Seed data created successfully!')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
