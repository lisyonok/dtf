import { useSendCanvasMutation } from "features/api/services/site"

export default function useSave({ $canvas }) {
  const [trigger, result] = useSendCanvasMutation()

  const save = () => {
    const base64image = $canvas.current.toDataURL()
    trigger({ drawing: base64image })
  }

  return { save, saveResult: result }
}
