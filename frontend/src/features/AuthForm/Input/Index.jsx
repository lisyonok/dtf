import cn from "classnames"
import css from "./Input.module.scss"
import Checkbox from "shared/ui/Checkbox/Checkbox"
import { useState } from "react"
import { ReactComponent as ShowPassword } from "shared/static/img/svg/show-password.svg"

export default function Input({ type = "text", label, error, name, touched, ...rest }) {
  const [hiddenText, setHiddenText] = useState(type === "password")
  const inputType = hiddenText ? "password" : type === "password" ? "text" : type
  const isShowError = error && touched
  const classInput = cn({
    [css.input]: !error || !touched,
    [css.disable]: rest.isDisable,
    [css.input_error]: isShowError,
    [css.input_pass]: type === "password",
    [css.input_pass_active]: type === "password" && !hiddenText,
    [css.not_empty]: rest.value
  })

  const classPlaceholder = cn(css.placeholder, isShowError && css.placeholder_error)
  if (type === "checkbox") return <Checkbox {...rest} label={label} />
  if (type === "hidden") return <input type="hidden" name={name} />

  return (
    <>
      <div className={classInput}>
        <div>
          <InputRender name={name} type={inputType} {...rest} />
          <p className={classPlaceholder}>{label}</p>
          {Boolean(type === "password") && (
            <button type="button" className={css.inputButton} onClick={() => setHiddenText((prev) => !prev)}>
              <ShowPassword />
            </button>
          )}
        </div>
        {isShowError && <div className={css.error_row}>{error}</div>}
      </div>
    </>
  )
}
const InputRender = ({ name, label, type, onInput, onBlur, disabled, value }) => {
  return (
    <input
      name={name}
      type={type}
      placeholder={label}
      onInput={onInput}
      onBlur={onBlur}
      disabled={disabled}
      value={value}
    />
  )
}
