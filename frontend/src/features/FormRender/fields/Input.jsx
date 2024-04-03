import css from "./Fields.module.scss"
import cn from "classnames"

export default function Input({
  controller: { label, onInput, onBlur, error, name, isRequired, value, touched, disabled },
  hidden
}) {
  const classnames = cn(css.input, {
    [css.invalid]: touched && error,
    [css.not_empty]: value
  })
  if (hidden) return null

  return (
    <div className={css.innerField}>
      <div className={classnames}>
        <input
          type="text"
          name={name}
          className={css.inputField}
          value={value || ""}
          onInput={onInput}
          onBlur={onBlur}
          disabled={disabled}
        />
        <div className={css.inputLabel}>
          <div>
            {label}
            {isRequired && <span>*</span>}
          </div>
        </div>
        {touched && error && <div className={css.error}>{error}</div>}
      </div>
    </div>
  )
}
