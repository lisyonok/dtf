import css from "./Fields.module.scss"
import cn from "classnames"

export default function Checkbox({
  controller: { label, onInput, error, name, isRequired, value, touched, disabled },
  customLabel,
  bordered
}) {
  const classnames = cn(css.checkbox, {
    [css.invalid]: touched && error,
    [css.not_empty]: value
  })

  return (
    <>
      <div className={css.innerField}>
        <div className={classnames}>
          <label className={css.checkboxWrap}>
            <input
              type="checkbox"
              name={name}
              checked={value || false}
              onChange={(e) => onInput({ target: { value: e.target.checked } })}
              className={css.checkboxInput}
              disabled={disabled}
            />
            <span className={cn(css.checkboxIcon, { [css.bordered]: bordered })}></span>
            <span className={css.checkboxValue}>
              <span dangerouslySetInnerHTML={{ __html: customLabel || label }}></span>
              {isRequired && !customLabel && <span>*</span>}
            </span>
          </label>
          {touched && error && <div className={css.error}>{error}</div>}
        </div>
      </div>
    </>
  )
}
