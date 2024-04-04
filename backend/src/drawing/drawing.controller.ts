/* eslint-disable @typescript-eslint/no-unused-vars */
import { Body, Controller, Get, Param, Post, Req } from "@nestjs/common"
import { DrawingService, Drawing } from "./drawing.service"
import { Request } from "express"

@Controller("api/drawing")
export class DrawingController {
  constructor(private drawingService: DrawingService) {}

  @Post("/create")
  async create(@Body() createDto: { drawing: string }, @Req() req: Request) {
    return this.drawingService.createDrawing(createDto, req.cookies.token)
  }

  @Get("/list")
  async getDrawings() {
    return this.drawingService.getDrawings()
  }

  @Get("/:id")
  async getDrawing(@Param("id") id: string) {
    return this.drawingService.getDrawing(id)
  }
}
