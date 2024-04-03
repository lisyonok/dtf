import { useRef } from "react"
import css from "./draw.module.scss"
import useDraw from "./useDraw"
import Button from "shared/ui/Button/Button"
import useSend from "./useSend"

function Draw() {
  const $canvas = useRef(null)
  const { draw, color, onColor, size, onSize, mouseDown, clear } = useDraw({ $canvas })
  const { send } = useSend({ $canvas })

  return (
    <div className={css.container}>
      <canvas ref={$canvas} onMouseMove={draw} onMouseDown={mouseDown}></canvas>

      <div className={css.controls}>
        <input type="range" value={size} min={1} max={40} onChange={onSize} />
        <input type="color" value={color} onChange={onColor} />
        <Button kind="red" onClick={clear}>
          Clear
        </Button>

        <Button kind="green" onClick={send}>
          Save
        </Button>
      </div>
    </div>
  )
}

export default Draw
