import { NestFactory } from "@nestjs/core"
import { AppModule } from "./app.module"
import * as cookieParser from "cookie-parser"
import { checkFolders, upload } from "./files"
import { NestExpressApplication } from "@nestjs/platform-express"

async function bootstrap() {
  checkFolders()
  const app = await NestFactory.create<NestExpressApplication>(AppModule)

  app.use(cookieParser())
  app.enableCors({
    origin: true,
    credentials: true,
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    preflightContinue: false,
    optionsSuccessStatus: 204
  })

  app.useStaticAssets(upload)

  await app.listen(3001)
}

bootstrap()
