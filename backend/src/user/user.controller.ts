import { Controller, Get, Post, Res, Req, Body } from "@nestjs/common"
import type { Response, Request } from "express"

import { UserService, LoginCredentals } from "./user.service"

@Controller("user")
export class UserController {
  constructor(private userService: UserService) {}

  @Get("/")
  async root(@Req() request: Request) {
    const { User } = (await this.userService.getSession(request.cookies.token)) || {}
    if (!User) return { ok: false, reason: "Unauthorized" }
    return { ...User, pass: undefined }
  }

  @Post("/login")
  async login(@Res({ passthrough: true }) response: Response, @Body() body: LoginCredentals) {
    const { ok, reason, token } = await this.userService.login(body)
    if (token) response.cookie("token", token, { httpOnly: true, secure: true })
    return { ok, reason }
  }

  @Get("/logout")
  async logout(@Req() request: Request, @Res({ passthrough: true }) response: Response) {
    const { ok, reason } = await this.userService.logout(request.cookies.token)
    if (ok) response.cookie("token", "", { httpOnly: true, secure: true })
    return { ok, reason }
  }
}
