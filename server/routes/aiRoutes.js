import { Router } from 'express'
import { z } from 'zod'
import { validate } from '../middleware/validate.js'
import { chatWithAI } from '../controllers/aiController.js'
import rateLimit from 'express-rate-limit'

const router = Router()

const chatLimiter = rateLimit({
  windowMs: 60 * 1000,
  max: 10,
  message: { message: 'Too many requests. Please wait a moment before sending another message.' }
})

const chatSchema = z.object({
  message: z.string().min(1, 'Message is required').max(500, 'Message is too long')
})

router.post('/chat', chatLimiter, validate(chatSchema), chatWithAI)

export default router
