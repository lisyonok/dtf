import { prepareError } from "features/api/prepareError"
import { useSendCanvasMutation } from "features/api/services/site"

export default function useSend({ $canvas }) {
  const [trigger, result] = useSendCanvasMutation()

  const send = () => {
    const base64image = $canvas.current.toDataURL()
    trigger({ drawing: base64image })
  }

  const message = () => {
    if (result.isLoading) return "Загрузка..."
    if (result.error) return prepareError(result.error)
    return ""
  }

  return { send, message }
}
