import { useEffect, useRef, useState } from "react"

export default function useDraw({ $canvas }) {
  const canvasCTX = useRef(null)
  const $points = useRef([])
  const [color, setColor] = useState("#000000")
  const [size, setSize] = useState(10)

  useEffect(() => {
    const canvas = $canvas.current
    const ctx = canvas.getContext("2d")
    canvas.width = window.innerWidth
    canvas.height = window.innerHeight

    canvasCTX.current = ctx
  }, [$canvas])

  const onColor = (e) => setColor(e.target.value)
  const onSize = (e) => setSize(e.target.valueAsNumber)
  const updateMouse = (e) => {
    $points.current.push({ x: e.clientX, y: e.clientY })
    if ($points.current.length > 20) $points.current.shift()
  }

  const mouseDown = (e) => {
    $points.current = []
    const ctx = canvasCTX.current
    updateMouse(e)

    ctx.strokeStyle = color
    ctx.fillStyle = color

    ctx.lineWidth = size
    ctx.lineJoin = "round"
    ctx.lineCap = "round"

    draw(e)
  }

  const clear = () => {
    const ctx = canvasCTX.current
    ctx.clearRect(0, 0, $canvas.current.width, $canvas.current.height)
  }

  const draw = (e) => {
    if (e.buttons !== 1) return
    const ctx = canvasCTX.current
    const points = $points.current

    updateMouse(e)

    ctx.moveTo(e.clientX, e.clientY)

    if (points.length < 6) {
      var b = points[0]
      ctx.beginPath()
      ctx.arc(b.x, b.y, ctx.lineWidth / 2, 0, Math.PI * 2, !0)
      ctx.closePath()
      ctx.fill()
      return
    }
    ctx.beginPath()

    let i = 1
    // draw a bunch of quadratics, using the average of two points as the control point
    for (i; i < points.length - 2; i++) {
      var c = (points[i].x + points[i + 1].x) / 2,
        d = (points[i].y + points[i + 1].y) / 2
      ctx.quadraticCurveTo(points[i].x, points[i].y, c, d)
    }
    ctx.quadraticCurveTo(points[i].x, points[i].y, points[i + 1].x, points[i + 1].y)
    ctx.stroke()
    ctx.closePath()
  }

  return { draw, color, onColor, size, onSize, mouseDown, clear }
}
