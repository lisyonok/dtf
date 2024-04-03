import axios from "axios"

const instance = axios.create({
  baseURL: "/api/v1/"
})

export default function upload({ file, onProgress, onFinish, onError }) {
  const formData = new FormData()
  formData.append("FILES[]", file)
  instance.post("files", formData, { onUploadProgress: onProgress }).then(onFinish, onError)
}
