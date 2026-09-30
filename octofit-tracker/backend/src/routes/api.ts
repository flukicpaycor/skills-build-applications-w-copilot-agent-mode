import { Router } from 'express'
import { apiBaseUrl } from '../config/apiUrl.js'
import { Activity } from '../models/Activity.js'
import { LeaderboardEntry } from '../models/LeaderboardEntry.js'
import { Team } from '../models/Team.js'
import { User } from '../models/User.js'
import { Workout } from '../models/Workout.js'

export const apiRouter = Router()

apiRouter.get('/health', (_request, response) => {
  response.json({ apiBaseUrl, status: 'ok' })
})

apiRouter.get('/users/', async (_request, response, next) => {
  try {
    response.json(await User.find().sort({ displayName: 1 }))
  } catch (error) {
    next(error)
  }
})

apiRouter.get('/teams/', async (_request, response, next) => {
  try {
    response.json(await Team.find().sort({ name: 1 }))
  } catch (error) {
    next(error)
  }
})

apiRouter.get('/activities/', async (_request, response, next) => {
  try {
    response.json(await Activity.find().sort({ completedAt: -1 }).populate('user'))
  } catch (error) {
    next(error)
  }
})

apiRouter.get('/leaderboard/', async (_request, response, next) => {
  try {
    response.json(await LeaderboardEntry.find().sort({ rank: 1 }).populate('user'))
  } catch (error) {
    next(error)
  }
})

apiRouter.get('/workouts/', async (_request, response, next) => {
  try {
    response.json(await Workout.find().sort({ difficulty: 1, title: 1 }))
  } catch (error) {
    next(error)
  }
})