import Groq from 'groq-sdk'

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY })

const SYSTEM_PROMPT = `You are CrayfishAI, a friendly and knowledgeable assistant for the Crayfish Management System.

Your role:
- Answer questions about crayfish farming (habitats, lifecycle stages, breeding, harvesting, etc.)
- Explain features of the Crayfish Management System (habitat tracking, lifecycle management, sales inventory, AI reports)
- Provide helpful tips for crayfish farmers
- Be concise, practical, and conversational

Guidelines:
- Keep answers under 150 words unless asked for details
- If asked about something outside crayfish farming, gently steer back
- If you don't know something, say so honestly
- Never invent data or make claims you can't support
- Use simple language that new farmers can understand`

export const chatWithAI = async (req, res) => {
  const { message } = req.body
  try {
    const completion = await groq.chat.completions.create({
      messages: [
        { role: 'system', content: SYSTEM_PROMPT },
        { role: 'user', content: message }
      ],
      model: 'llama-3.3-70b-versatile',
      max_tokens: 300
    })
    const reply = completion.choices[0]?.message?.content || ''
    res.json({ reply })
  } catch (err) {
    console.error('AI chat error:', err)
    res.status(500).json({ message: 'Failed to get AI response. Please try again.' })
  }
}
