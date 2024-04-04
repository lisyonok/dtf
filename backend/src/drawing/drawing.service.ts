/* eslint-disable @typescript-eslint/no-unused-vars */
import { Injectable, NotFoundException, UnauthorizedException, BadRequestException } from "@nestjs/common"
import prisma from "src/lib/db"
import * as fs from "fs/promises"
import { nanoid } from "nanoid"
import * as path from "path"
import { pathToFullSize } from "src/files"

@Injectable()
export class DrawingService {
  async createDrawing({ drawing }: { drawing: string }, token: string) {
    const session = await prisma.session.findFirst({
      where: { token },
      include: { User: true }
    })

    if (!session?.User) throw new UnauthorizedException({ ok: false, reason: "Пользователь не авторизован" })

    const filename = `${nanoid(32)}.png`
    const pathToFile = path.join(pathToFullSize, filename)
    const data = drawing.replace(/^data:image\/png;base64,/, "")
    await fs.writeFile(pathToFile, data, "base64")

    const drawingRecord = await prisma.drawing.create({
      data: {
        pathToFullSize: "/upload/drawings/" + filename,
        userId: session.User.id
      }
    })

    const permaLink = `/drawing/${drawingRecord.id}`

    return { ok: true, id: drawingRecord.id, url: permaLink }
  }

  async getDrawing(id: string) {
    if (!checkId(id)) throw new BadRequestException({ ok: false, reason: "Неверный id рисунка" })

    // const session = await prisma.session.findFirst({
    //   where: { token },
    //   include: { User: true }
    // })

    // if (!session?.User) throw new UnauthorizedException({ ok: false, reason: "Пользователь не авторизован" })

    const drawing = await prisma.drawing.findFirst({
      where: { id },
      include: {
        User: { select: { username: true } }
      }
    })

    if (!drawing) throw new NotFoundException({ ok: false, reason: "Рисунок не найден" })

    const {
      pathToFullSize,
      User: { username },
      createdAt
    } = drawing

    return { ok: true, path: pathToFullSize, createdAt, username }
  }
}

export type Drawing = {
  id: string
  createdAt: string
  pathToFullSize: string
  pathToThumbnail: string
}

export type DrawingResults = object

function checkId(ObjectId: string): boolean {
  if (ObjectId.length !== 36) return false
  if (!/^[0-9a-f-]{36}$/i.test(ObjectId)) return false

  return true
}
