import css from "./Fields.module.scss"
import cn from "classnames"
import { IMaskInput } from "react-imask"

export default function MaskedInput({
  controller: { label, onInput, onBlur, error, name, isRequired, value, touched, disabled },
  hidden,
  mask
}) {
  const classnames = cn(css.input, {
    [css.invalid]: touched && error,
    [css.not_empty]: value
  })
  if (hidden) return null

  return (
    <div className={css.innerField}>
      <div className={classnames}>
        <IMaskInput
          mask={mask}
          unmask={true}
          type="text"
          name={name}
          className={css.inputField}
          value={value}
          onAccept={(val, input, evt) => evt && onInput(evt)}
          onBlur={onBlur}
          prepare={(appended) => {
            return /\+7/.test(appended) ? appended.replace(/\+7/, "8") : appended
          }}
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
