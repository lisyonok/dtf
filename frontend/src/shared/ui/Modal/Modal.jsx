import { useEffect, useRef } from "react"
import css from "./Modal.module.scss"
import cn from "classnames"

export default function Modal({ children, opened, closeClick, className }) {
  const ref = useRef(null)
  const refCross = useRef(null)

  const toggleClass = (val) => document.body.classList.toggle("modalOpen", val)

  useEffect(() => {
    toggleClass(opened)
    return () => toggleClass(false)
  }, [opened])

  if (!opened) return null

  const closeModal = (e) => {
    if (e.target !== ref.current && e.target !== refCross.current) return
    typeof closeClick === "function" && closeClick(false)
  }

  return (
    <div ref={ref} className={cn(css.modal, className)} onClick={(e) => closeModal(e)}>
      <div className={css.inner}>
        {closeClick && <button ref={refCross} type="button" className={css.close} onClick={closeModal} />}
        <div className={css.content}>{children}</div>
      </div>
    </div>
  )
}
