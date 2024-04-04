import * as path from "path"
import * as fs from "fs"

export const upload = path.resolve(path.join(__dirname, "../", "/upload/"))

export const pathToFullSize = path.resolve(path.join(upload, "drawings"))
export const pathToThumbnail = path.resolve(path.join(upload, "thumbs"))

export const checkFolders = () => {
  if (!fs.existsSync(pathToFullSize)) fs.mkdirSync(pathToFullSize, { recursive: true })
  if (!fs.existsSync(pathToThumbnail)) fs.mkdirSync(pathToThumbnail, { recursive: true })
}
