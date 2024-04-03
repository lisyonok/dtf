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

    // if (!session?.User) throw new UnauthorizedException({ ok: false, reason: "Пользователь не авторизован" })

    console.log(__dirname)
    const filename = `${nanoid(32)}.png`
    const data = drawing.replace(/^data:image\/png;base64,/, "")
    await fs.writeFile(path.join(pathToFullSize, filename), data, "base64")

    // const drawing = await prisma.drawing.create({
    //   data: {}
    // })

    return { ok: true, id: 0 }
  }

  // async getDrawing(id: string, token: string) {
  //   if (!checkId(id)) throw new BadRequestException({ ok: false, reason: "Неверный id опроса" })

  //   const session = await prisma.session.findFirst({
  //     where: { token },
  //     include: { User: true }
  //   })

  //   if (!session?.User) throw new UnauthorizedException({ ok: false, reason: "Пользователь не авторизован" })

  //   const drawing: Drawing = await prisma.drawing.updateIgnoreOnNotFound({
  //     data: { views: { increment: 1 } },
  //     where: { id },
  //     include: {
  //       persons: {
  //         include: {
  //           questions: {
  //             include: { questionAnswers: { select: { id: true, title: true }, orderBy: { order: "asc" } } }
  //           }
  //         }
  //       }
  //     }
  //   })

  //   if (!drawing) throw new NotFoundException({ ok: false, reason: "Опрос не найден" })

  //   const drawingTry = await prisma.poolTry.create({
  //     data: {
  //       userId: session.User.id,
  //       drawingId: drawing.id
  //     }
  //   })

  //   return { ...drawing, tryId: drawingTry.id }
  // }
}

export type Drawing = {
  id: string
  createdAt: string
  pathToFullSize: string
  pathToThumbnail: string
}

export type DrawingResults = object

// function checkId(ObjectId: string): boolean {
//   if (ObjectId.length !== 36) return false
//   if (!/^[0-9a-f-]{36}$/i.test(ObjectId)) return false

//   return true
// }
