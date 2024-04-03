import cn from "classnames"
import css from "./Button.module.scss"
import { Link } from "react-router-dom"

export default function Button({ children, type, kind, isDisable, to, onClick, className }) {
  const btnClassnames = cn({
    [css.red]: kind === "red",
    [css.smallRed]: kind === "smallRed",
    [css.green]: kind === "green",
    [css.blue]: kind === "blue",
    [css.bluelight]: kind === "bluelight",
    [css.bordered]: kind === "bordered",

    [css.disable]: isDisable
  })

  const Tag = to ? Link : "button"

  return (
    <Tag to={to} onClick={onClick} className={cn(css.btn, className, btnClassnames)} type={type} disabled={isDisable}>
      {children}
    </Tag>
  )
}
