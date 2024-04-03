import { Module, NestModule } from "@nestjs/common"

import { DrawingController } from "./drawing/drawing.controller"
import { DrawingService } from "./drawing/drawing.service"
import { UserController } from "./user/user.controller"
import { UserService } from "./user/user.service"

@Module({
  imports: [],
  controllers: [DrawingController, UserController],
  providers: [DrawingService, UserService]
})
export class AppModule implements NestModule {
  configure() {}
}
