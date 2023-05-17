import { PrismaClient } from '@prisma/client'
import fastify from 'fastify'

const app = fastify()
const prisma = new PrismaClient()

app.get('/users', async () => {
  const users = await prisma.user.findMany()
  return users
})

app.post('/users', async (request, reply) => {
  try {
    const { nome } = request.body

    const user = await prisma.user.create({
      data: {
        nome,
      },
    })

    reply.code(201).send(user)
  } catch (error) {
    reply.code(500).send({ error: 'Internal server error' })
  }
})

app
  .listen({
    port: 3333,
  })
  .then(() => {
    console.log('🔥 Server running on http://localhost:3333')
  })
