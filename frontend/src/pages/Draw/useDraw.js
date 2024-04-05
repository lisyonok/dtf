import { useEffect, useRef, useState } from "react"

export default function useDraw({ $canvas }) {
  const canvasCTX = useRef(null)
  const $mouse = useRef({ x: 0, y: 0 })
  const [color, setColor] = useState("#000000")
  const [size, setSize] = useState(10)

  useEffect(() => {
    const canvas = $canvas.current
    const ctx = canvas.getContext("2d")
    canvasCTX.current = ctx

    function resize() {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    resize()

    window.addEventListener("resize", resize)
    return () => window.removeEventListener("resize", resize)
  }, [$canvas])

  const onColor = (e) => setColor(e.target.value)
  const onSize = (e) => setSize(e.target.valueAsNumber)

  const updateMouse = (e) => {
    let { clientX, clientY } = e
    $mouse.current = { x: clientX, y: clientY }
  }

  const mouseDown = (e) => {
    const ctx = canvasCTX.current
    updateMouse(e)

    ctx.strokeStyle = color
    ctx.fillStyle = color

    ctx.lineWidth = size
    ctx.lineJoin = "round"
    ctx.lineCap = "round"

    ctx.beginPath()
    draw(e)
  }

  const clear = () => {
    const ctx = canvasCTX.current
    ctx.clearRect(0, 0, $canvas.current.width, $canvas.current.height)
  }

  const draw = (e) => {
    if (e.buttons !== 1 && e.type !== "touchmove") return
    const ctx = canvasCTX.current

    ctx.moveTo($mouse.current.x, $mouse.current.y)
    updateMouse(e)

    ctx.lineTo(e.clientX, e.clientY)
    ctx.stroke()
  }

  return { draw, color, onColor, size, onSize, mouseDown, clear }
}
