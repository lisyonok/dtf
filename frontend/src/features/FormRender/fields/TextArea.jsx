import css from "./Fields.module.scss"
import cn from "classnames"

export default function TextArea({
  controller: { label, onInput, onBlur, error, name, isRequired, value, touched, disabled }
}) {
  const classnames = cn(css.input, {
    [css.invalid]: touched && error,
    [css.not_empty]: value
  })

  return (
    <div className={css.innerField}>
      <div className={classnames}>
        <textarea
          name={name}
          className={cn(css.inputField, css.inputField_textarea)}
          value={value}
          onChange={onInput}
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
