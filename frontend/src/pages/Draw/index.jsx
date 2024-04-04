import { useRef } from "react"
import css from "./draw.module.scss"
import useDraw from "./useDraw"
import Button from "shared/ui/Button/Button"
import useSave from "./useSend"
import LoginModal from "./modals/loginModal"
import SaveModal from "./modals/saveModal"

function Draw() {
  const $canvas = useRef(null)
  const { draw, color, onColor, size, onSize, mouseDown, clear } = useDraw({ $canvas })
  const { save, saveResult } = useSave({ $canvas })

  return (
    <div className={css.container}>
      <canvas ref={$canvas} onMouseMove={draw} onMouseDown={mouseDown}></canvas>

      <div className={css.controls}>
        <input type="range" value={size} min={1} max={40} onChange={onSize} />
        <input type="color" value={color} onChange={onColor} />
        <Button kind="red" onClick={clear}>
          Clear
        </Button>

        <Button kind="green" onClick={save}>
          Save
        </Button>
      </div>
      <LoginModal />
      <SaveModal saveResult={saveResult} />
    </div>
  )
}

export default Draw
