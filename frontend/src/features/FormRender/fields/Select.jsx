import { useEffect, useRef, useState } from "react"
import css from "./Select.module.scss"
import cn from "classnames"
import SimpleBar from "simplebar-react"

export default function SelectStatus({
  controller: { label, onInput, error, name, value, disabled, options: controllerOptions },
  options: customOptions
}) {
  const [state, setState] = useState({ showOptions: false })
  const container = useRef()
  const onOutsideClick = () => setState((prev) => ({ ...prev, showOptions: false }))

  const options = customOptions || controllerOptions

  const displayValue =
    options?.find((d) => {
      return d.value === value
    })?.label || ""

  useEffect(() => {
    function trackClick(e) {
      let el = e.target
      while (el !== document.body) {
        if (!el.parentElement) break
        if (el === container.current) return
        el = el.parentElement
      }
      onOutsideClick()
    }

    window.addEventListener("click", trackClick)
    return () => window.removeEventListener("click", trackClick)
  }, [])

  const onSuggestClick =
    ({ value }) =>
    (e) => {
      e?.stopPropagation()
      onInput({ target: { value } })
      setState({ isValueSuggested: true, showOptions: false })
    }

  return (
    <div
      className={cn(
        css.select,
        "select",
        displayValue && css.not_empty,
        state.showOptions && css.active,
        disabled && css.disable
      )}
    >
      <div
        ref={container}
        className={css.input}
        onClick={() => setState((p) => ({ ...p, showOptions: !p.showOptions }))}
      >
        <div className={css.inputWrapper}>
          <input type="text" name={name} className={css.inputField} value={displayValue} readOnly disabled={disabled} />
          <div className={css.inputLabel}>
            <div>{label}</div>
          </div>
          <span className={css.inputIcon}>
            <svg width="14" height="9" viewBox="0 0 14 9" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M1 1L7 7L13 1" stroke="#1550E7" strokeWidth="2" strokeLinecap="round" />
            </svg>
          </span>
        </div>

        {state.showOptions && (
          <div className={css.suggestions}>
            <ul>
              <SimpleBar className={css.simplebar}>
                {options?.map((suggest, key) => (
                  <li
                    className={cn(css.option, suggest.value === value && css.active)}
                    key={key}
                    onClick={onSuggestClick(suggest)}
                  >
                    {suggest.label}
                  </li>
                ))}
              </SimpleBar>
            </ul>
          </div>
        )}
      </div>
    </div>
  )
}
