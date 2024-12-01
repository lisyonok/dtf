import { Injectable } from "@nestjs/common"
import prisma from "src/lib/db"
import { randomBytes } from "node:crypto"
import { latticeHash } from "src/lib/passhash"
import { generateKeys } from "src/lib/signs"

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

  async login({ username, password }: LoginCredentals) {
    if (!username) return { ok: false, message: "Введите Никнэйм" }
    if (!password) return { ok: false, message: "Введите password" }

    const passHash = latticeHash(password)

    let user = await prisma.user.findUnique({ where: { username } })
    if (user && user.password !== passHash) return { ok: false, message: "Неправильный пароль" }
    if (!user) {
      const { publicKey, privateKey } = generateKeys()
      user = await prisma.user.create({
        data: { username, password: passHash, publicKey: JSON.stringify(publicKey), privateKey: String(privateKey) }
      })
    }

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
    if (!token) return { ok: false, message: "Too few arguments" }

    const session = await prisma.session.findFirst({
      where: { token }
    })

    if (!session) return { ok: false, message: "Session not found" }

    await prisma.session.delete({
      where: { id: session.id }
    })

    return { ok: true }
  }
}

export type LoginCredentals = { username: string; password: string }
