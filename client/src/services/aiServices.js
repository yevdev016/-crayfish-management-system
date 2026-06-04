import axios from 'axios'
const API_URL = import.meta.env.VITE_API_URL

export const askAI = async (message) => {
  const res = await axios.post(`${API_URL}/ai/chat`, { message })
  return res.data.reply
}
