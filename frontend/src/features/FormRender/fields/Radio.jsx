import css from "./Fields.module.scss"
import cn from "classnames"

export default function Radio({
  controller: { label, onInput, error, name, isRequired, value, touched, disabled },
  options
}) {
  const classnames = cn(css.innerCol, css.innerCol_radio, {
    [css.invalid]: touched && error,
    [css.not_empty]: value
  })

  const mockInput = (value) => () => onInput({ target: { value } })

  return (
    <div className={classnames}>
      <p>
        {label}
        {isRequired && <sup>*</sup>}
      </p>
      <div className={css.innerCol_radio_flex}>
        {options.map(({ label, value: optValue }, key) => (
          <div className={css.innerField} key={key}>
            <div className={css.radio}>
              <label className={css.radioWrap}>
                <input
                  type="radio"
                  name={name}
                  className={css.radioInput}
                  value={optValue}
                  checked={optValue === value}
                  disabled={disabled}
                  onChange={mockInput(optValue)}
                />
                <span className={css.radioIcon}></span>
                <span className={css.radioValue}>{label}</span>
              </label>
            </div>
          </div>
        ))}
      </div>
      {touched && error && <div className={css.error}>{error}</div>}
    </div>
  )
}
