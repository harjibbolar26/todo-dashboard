import { Status } from '@/lib/generated/prisma'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()
const sampleTasks = [
  {
    title: 'Complete project proposal',
    category: 'Work',
    progress: 75,
    date: new Date('2025-06-20'),
    status: Status.PROGRESS
  },
  {
    title: 'Review quarterly reports',
    category: 'Work',
    progress: 0,
    date: new Date('2025-06-18'),
    status: Status.TODO
  },
  {
    title: 'Team meeting preparation',
    category: 'Work',
    progress: 100,
    date: new Date('2025-06-15'),
    status: Status.DONE
  },
  {
    title: 'Update LinkedIn profile',
    category: 'Work',
    progress: 25,
    date: new Date('2025-06-25'),
    status: Status.TODO
  },
  {
    title: 'Call mom for birthday',
    category: 'Personal',
    progress: 0,
    date: new Date('2025-06-22'),
    status: Status.TODO
  },
  {
    title: 'Plan weekend trip',
    category: 'Personal',
    progress: 60,
    date: new Date('2025-06-30'),
    status: Status.PROGRESS
  },
  {
    title: 'Organize photo albums',
    category: 'Personal',
    progress: 100,
    date: new Date('2025-06-10'),
    status: Status.DONE
  },
  {
    title: 'Write journal entries',
    category: 'Personal',
    progress: 40,
    date: new Date('2025-06-28'),
    status: Status.PROGRESS
  },
  {
    title: 'Morning workout routine',
    category: 'Health',
    progress: 80,
    date: new Date('2025-06-17'),
    status: Status.PROGRESS
  },
  {
    title: 'Schedule dental checkup',
    category: 'Health',
    progress: 0,
    date: new Date('2025-06-24'),
    status: Status.TODO
  },
  {
    title: 'Buy vitamins',
    category: 'Health',
    progress: 100,
    date: new Date('2025-06-12'),
    status: Status.DONE
  },
  {
    title: 'Meal prep for the week',
    category: 'Health',
    progress: 90,
    date: new Date('2025-06-16'),
    status: Status.PROGRESS
  },
  {
    title: 'Complete React course',
    category: 'Learning',
    progress: 65,
    date: new Date('2025-07-15'),
    status: Status.PROGRESS
  },
  {
    title: 'Read "Atomic Habits" book',
    category: 'Learning',
    progress: 30,
    date: new Date('2025-07-01'),
    status: Status.TODO
  },
  {
    title: 'Practice TypeScript exercises',
    category: 'Learning',
    progress: 100,
    date: new Date('2025-06-14'),
    status: Status.DONE
  },
  {
    title: 'Learn Prisma documentation',
    category: 'Learning',
    progress: 85,
    date: new Date('2025-06-19'),
    status: Status.PROGRESS
  },
  {
    title: 'Buy groceries',
    category: 'Shopping',
    progress: 0,
    date: new Date('2025-06-17'),
    status: Status.TODO
  },
  {
    title: 'Get new running shoes',
    category: 'Shopping',
    progress: 50,
    date: new Date('2025-06-21'),
    status: Status.PROGRESS
  },
  {
    title: 'Order birthday gift',
    category: 'Shopping',
    progress: 100,
    date: new Date('2025-06-13'),
    status: Status.DONE
  },
  {
    title: 'Clean the garage',
    category: 'Home',
    progress: 20,
    date: new Date('2025-06-23'),
    status: Status.TODO
  },
  {
    title: 'Fix leaky faucet',
    category: 'Home',
    progress: 100,
    date: new Date('2025-06-11'),
    status: Status.DONE
  },
  {
    title: 'Plant new flowers',
    category: 'Home',
    progress: 70,
    date: new Date('2025-06-26'),
    status: Status.PROGRESS
  },
  {
    title: 'Pay credit card bill',
    category: 'Finance',
    progress: 100,
    date: new Date('2025-06-15'),
    status: Status.DONE
  },
  {
    title: 'Review investment portfolio',
    category: 'Finance',
    progress: 0,
    date: new Date('2025-06-29'),
    status: Status.TODO
  },
  {
    title: 'Set up emergency fund',
    category: 'Finance',
    progress: 45,
    date: new Date('2025-07-10'),
    status: Status.PROGRESS
  },
  {
    title: 'Book summer vacation',
    category: 'Travel',
    progress: 30,
    date: new Date('2025-07-05'),
    status: Status.TODO
  },
  {
    title: 'Renew passport',
    category: 'Travel',
    progress: 80,
    date: new Date('2025-06-27'),
    status: Status.PROGRESS
  },
  {
    title: 'Research travel insurance',
    category: 'Travel',
    progress: 100,
    date: new Date('2025-06-09'),
    status: Status.DONE
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
  console.log('📊 Task distribution:')
  
  // Show distribution by category
  const categoryCounts = sampleTasks.reduce((acc, task) => {
    acc[task.category] = (acc[task.category] || 0) + 1
    return acc
  }, {} as Record<string, number>)

  Object.entries(categoryCounts).forEach(([category, count]) => {
    console.log(`   ${category}: ${count} tasks`)
  })

  // Show distribution by status
  const statusCounts = sampleTasks.reduce((acc, task) => {
    acc[task.status] = (acc[task.status] || 0) + 1
    return acc
  }, {} as Record<string, number>)

  console.log('📈 Status distribution:')
  Object.entries(statusCounts).forEach(([status, count]) => {
    console.log(`   ${status}: ${count} tasks`)
  })

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