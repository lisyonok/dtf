import { Injectable } from "@nestjs/common"
import prisma from "src/lib/db"
import { randomBytes } from "node:crypto"

@Injectable()
export class UserService {
  async getSession(token: string) {
    if (!token) return null

    const session = await prisma.session.findFirst({
      where: { token },
      include: { User: true }
    })

    return session
  }

  async login({ username }: LoginCredentals) {
    if (!username) return { ok: false, reason: "Введите Никнэйм" }

    const user = await prisma.user.upsert({
      where: {
        username
      },
      update: {},
      create: {
        username
      }
    })

    const token = randomBytes(32).toString("hex")

    await prisma.session.create({
      data: {
        token,
        userId: user.id
      }
    })

    return { ok: true, token }
  }

  async logout(token: string) {
    if (!token) return { ok: false, reason: "Too few arguments" }

    const session = await prisma.session.findFirst({
      where: { token }
    })

    if (!session) return { ok: false, reason: "Session not found" }

    await prisma.session.delete({
      where: { id: session.id }
    })

    return { ok: true }
  }
}

export type LoginCredentals = { username: string }
