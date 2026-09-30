import mongoose from 'mongoose'
import { Activity } from '../models/Activity.js'
import { LeaderboardEntry } from '../models/LeaderboardEntry.js'
import { Team } from '../models/Team.js'
import { User } from '../models/User.js'
import { Workout } from '../models/Workout.js'

const connectionString = process.env.MONGODB_URI || 'mongodb://localhost:27017/octofit_db'

/**
 * Seed the octofit_db database with test data
 */
async function seedDatabase() {
  try {
    await mongoose.connect(connectionString)

    console.log('Connected to octofit_db')
    console.log('Seed the octofit_db database with test data')

    await Promise.all([
      Activity.deleteMany({}),
      LeaderboardEntry.deleteMany({}),
      Team.deleteMany({}),
      User.deleteMany({}),
      Workout.deleteMany({}),
    ])

    const [trailBlazers, coreCrushers] = await Team.create([
      {
        name: 'Trail Blazers',
        description: 'Outdoor runners and hikers building endurance together.',
      },
      {
        name: 'Core Crushers',
        description: 'Strength-focused teammates chasing consistent weekly gains.',
      },
    ])

    const [maya, leo, priya, noah] = await User.create([
      {
        username: 'maya_runner',
        email: 'maya@example.com',
        displayName: 'Maya Chen',
        team: trailBlazers._id,
      },
      {
        username: 'leo_lifts',
        email: 'leo@example.com',
        displayName: 'Leo Martinez',
        team: coreCrushers._id,
      },
      {
        username: 'priya_pace',
        email: 'priya@example.com',
        displayName: 'Priya Shah',
        team: trailBlazers._id,
      },
      {
        username: 'noah_core',
        email: 'noah@example.com',
        displayName: 'Noah Williams',
        team: coreCrushers._id,
      },
    ])

    await Promise.all([
      Team.findByIdAndUpdate(trailBlazers._id, { members: [maya._id, priya._id] }),
      Team.findByIdAndUpdate(coreCrushers._id, { members: [leo._id, noah._id] }),
    ])

    await Activity.create([
      {
        user: maya._id,
        type: 'Trail run',
        durationMinutes: 48,
        caloriesBurned: 430,
        completedAt: new Date('2026-09-27T13:30:00.000Z'),
      },
      {
        user: leo._id,
        type: 'Strength training',
        durationMinutes: 55,
        caloriesBurned: 390,
        completedAt: new Date('2026-09-28T18:15:00.000Z'),
      },
      {
        user: priya._id,
        type: 'Cycling',
        durationMinutes: 62,
        caloriesBurned: 510,
        completedAt: new Date('2026-09-29T12:00:00.000Z'),
      },
      {
        user: noah._id,
        type: 'Pilates',
        durationMinutes: 40,
        caloriesBurned: 240,
        completedAt: new Date('2026-09-30T09:45:00.000Z'),
      },
    ])

    await LeaderboardEntry.create([
      { user: priya._id, score: 1480, rank: 1 },
      { user: maya._id, score: 1375, rank: 2 },
      { user: leo._id, score: 1260, rank: 3 },
      { user: noah._id, score: 1125, rank: 4 },
    ])

    await Workout.create([
      {
        title: 'Morning Mobility Reset',
        description: 'A low-impact routine for flexibility, posture, and easy recovery days.',
        difficulty: 'beginner',
        durationMinutes: 25,
        activities: ['Dynamic stretching', 'Bodyweight squats', 'Breathing cooldown'],
      },
      {
        title: 'Endurance Builder',
        description: 'Steady cardio intervals designed to improve aerobic capacity.',
        difficulty: 'intermediate',
        durationMinutes: 45,
        activities: ['Warm-up jog', 'Tempo intervals', 'Cooldown walk'],
      },
      {
        title: 'Power Circuit',
        description: 'A demanding strength circuit for experienced athletes.',
        difficulty: 'advanced',
        durationMinutes: 50,
        activities: ['Deadlifts', 'Box jumps', 'Kettlebell swings', 'Plank holds'],
      },
    ])

    console.log('Database seeding complete')
    await mongoose.disconnect()
  } catch (error) {
    console.error('Error seeding database:', error)
    process.exit(1)
  }
}

seedDatabase()
