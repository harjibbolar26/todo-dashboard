import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

const sampleTasks = [
  {
    title: 'Complete project proposal',
    category: 'Work',
    progress: 75,
    date: new Date('2025-06-20'),
    status: 'PROGRESS'
  },
  {
    title: 'Review quarterly reports',
    category: 'Work',
    progress: 0,
    date: new Date('2025-06-18'),
    status: 'TODO'
  },
  {
    title: 'Team meeting preparation',
    category: 'Work',
    progress: 100,
    date: new Date('2025-06-15'),
    status: 'DONE'
  },
  {
    title: 'Call mom for birthday',
    category: 'Personal',
    progress: 0,
    date: new Date('2025-06-22'),
    status: 'TODO'
  },
  {
    title: 'Plan weekend trip',
    category: 'Personal',
    progress: 60,
    date: new Date('2025-06-30'),
    status: 'PROGRESS'
  },
  {
    title: 'Morning workout routine',
    category: 'Health',
    progress: 80,
    date: new Date('2025-06-17'),
    status: 'PROGRESS'
  },
  {
    title: 'Schedule dental checkup',
    category: 'Health',
    progress: 0,
    date: new Date('2025-06-24'),
    status: 'TODO'
  },
  {
    title: 'Complete React course',
    category: 'Learning',
    progress: 65,
    date: new Date('2025-07-15'),
    status: 'PROGRESS'
  },
  {
    title: 'Read "Atomic Habits" book',
    category: 'Learning',
    progress: 30,
    date: new Date('2025-07-01'),
    status: 'TODO'
  },
  {
    title: 'Buy groceries',
    category: 'Shopping',
    progress: 0,
    date: new Date('2025-06-17'),
    status: 'TODO'
  },
  {
    title: 'Get new running shoes',
    category: 'Shopping',
    progress: 50,
    date: new Date('2025-06-21'),
    status: 'PROGRESS'
  },
  {
    title: 'Clean the garage',
    category: 'Home',
    progress: 20,
    date: new Date('2025-06-23'),
    status: 'TODO'
  },
  {
    title: 'Fix leaky faucet',
    category: 'Home',
    progress: 100,
    date: new Date('2025-06-11'),
    status: 'DONE'
  },
  {
    title: 'Pay credit card bill',
    category: 'Finance',
    progress: 100,
    date: new Date('2025-06-15'),
    status: 'DONE'
  },
  {
    title: 'Review investment portfolio',
    category: 'Finance',
    progress: 0,
    date: new Date('2025-06-29'),
    status: 'TODO'
  },
  {
    title: 'Book summer vacation',
    category: 'Travel',
    progress: 30,
    date: new Date('2025-07-05'),
    status: 'TODO'
  },
  {
    title: 'Renew passport',
    category: 'Travel',
    progress: 80,
    date: new Date('2025-06-27'),
    status: 'PROGRESS'
  }
]

async function main() {
  console.log('🌱 Starting database seed...')

  // Clear existing data
  await prisma.task.deleteMany()
  console.log('🗑️  Cleared existing tasks')

  // Insert sample tasks
  for (const task of sampleTasks) {
    await prisma.task.create({
      data: task
    })
  }

  console.log(`✅ Created ${sampleTasks.length} sample tasks`)
  console.log('🎉 Database seeded successfully!')
}

main()
  .catch((e) => {
    console.error('❌ Error seeding database:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })