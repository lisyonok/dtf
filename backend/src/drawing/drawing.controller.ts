/* eslint-disable @typescript-eslint/no-unused-vars */
import { Body, Controller, Get, Param, Post, Req } from "@nestjs/common"
import { DrawingService, Drawing } from "./drawing.service"
import { Request } from "express"

@Controller("drawing")
export class DrawingController {
  constructor(private drawingService: DrawingService) {}

  @Post("/create")
  async create(@Body() createDto: { drawing: string }, @Req() req: Request) {
    return this.drawingService.createDrawing(createDto, req.cookies.token)
  }

  // @Get("/:id")
  // async getDrawing(@Param("id") id: string, @Req() req: Request) {
  //   return this.drawingService.getDrawing(id, req.cookies.token)
  // }
}
