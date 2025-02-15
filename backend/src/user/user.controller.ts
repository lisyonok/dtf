import { Controller, Get, Post, Res, Req, Body } from "@nestjs/common"
import type { Response, Request } from "express"

import { UserService, LoginCredentials } from "./user.service"

@Controller("api/user")
export class UserController {
  constructor(private userService: UserService) {}

  @Get("/")
  async root(@Req() request: Request) {
    const { User } = (await this.userService.getSession(request.cookies.token)) || {}
    if (!User) return { ok: false, message: "Unauthorized" }
    return { ok: true, ...User, pass: undefined }
  }

  @Post("/login")
  async login(@Res({ passthrough: true }) response: Response, @Body() body: LoginCredentials) {
    const { ok, message, token } = await this.userService.login(body)
    if (token) response.cookie("token", token, { httpOnly: true, secure: true, maxAge: 3_600_000 * 24 * 7 })
    if (!ok) response.status(403)
    return { ok, message }
  }

  @Get("/logout")
  async logout(@Req() request: Request, @Res({ passthrough: true }) response: Response) {
    const { ok, message } = await this.userService.logout(request.cookies.token)
    if (ok) response.cookie("token", "", { httpOnly: true, secure: true })
    return { ok, message }
  }
}
