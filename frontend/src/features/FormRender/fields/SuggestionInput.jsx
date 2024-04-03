import { useCallback, useEffect, useRef, useState } from "react"
import css from "./Fields.module.scss"
import cn from "classnames"
import debounce from "lodash/debounce"

export default function SuggestionInput({
  controller: { label, error, name, isRequired, touched, onRawValueChange, disabled, value: outterValue },
  initialValue,
  suggestMutation,
  onSuggestionSelect,
  onSuggestionCancel,
  onSuggestionHover,
  hidden
}) {
  const [state, setState] = useState({
    value: "",
    isValueSuggested: false,
    showSuggests: false,
    isValueInitial: true
  })
  const container = useRef()

  const [_trigger, { data, isSuccess }] = suggestMutation()

  const trigger = useCallback(
    debounce((value) => _trigger({ q: value }), 500),
    []
  )

  useEffect(() => {
    if (outterValue === null) setState((p) => ({ ...p, value: null, isValueSuggested: false, isValueInitial: false }))
  }, [outterValue])

  useEffect(() => {
    onRawValueChange((prev) => ({
      ...prev,
      valid: disabled ? true : state.isValueSuggested || state.isValueInitial,
      errs: !disabled && isRequired && !state.isValueSuggested && !initialValue ? ["Поле должно быть заполнено"] : null
    }))
  }, [initialValue, disabled])

  const onOutsideClick = () => setState((prev) => ({ ...prev, showSuggests: false }))
  const onFocus = () => setState((prev) => ({ ...prev, showSuggests: !prev.isValueSuggested }))
  const showError = error && touched && !state.isValueSuggested && !state.showSuggests

  const value = state.isValueInitial
    ? initialValue
    : state.isValueSuggested
    ? data.find((d) => d.id === state.value).name
    : state.value

  const classnames = cn(css.input, {
    [css.invalid]: showError,
    [css.not_empty]: value
  })

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

  const onInput = ({ target }) => {
    const { value } = target

    const longEnough = value.length >= 2

    onRawValueChange({
      valid: false,
      value: null,
      errs: [longEnough ? "Выберите значение из списка" : "Минимальная длинна ввода 2 символа"]
    })

    if (typeof onSuggestionCancel === "function" && state.isValueSuggested) onSuggestionCancel()

    setState({
      value,
      isValueSuggested: false,
      showSuggests: longEnough,
      isValueInitial: false
    })
    if (longEnough) trigger(value)
  }

  const onSuggestClick = (suggest) => () => {
    setState({
      value: suggest.id,
      isValueSuggested: true,
      showSuggests: false
    })
    onRawValueChange({ value: suggest.id, valid: true, errs: null })
    if (typeof onSuggestionSelect === "function") onSuggestionSelect(suggest)
  }

  const onHover = (suggest) => () => {
    if (typeof onSuggestionHover === "function") onSuggestionHover(suggest)
  }

  const onLeave = () => {
    if (typeof onSuggestionCancel === "function") onSuggestionCancel()
  }

  if (hidden) return null

  return (
    <div className={css.innerField}>
      <div className={classnames} ref={container}>
        <input
          type="text"
          name={name}
          className={cn(css.inputField, css.suggestionInput, state.showSuggests && isSuccess && css.withOpenMenu)}
          value={value || ""}
          onInput={onInput}
          onFocus={onFocus}
          disabled={disabled}
        />
        <div className={css.inputLabel}>
          <div>
            {label}
            {isRequired && <span>*</span>}
          </div>
        </div>
        {showError && <div className={css.error}>{error}</div>}
        {state.showSuggests && isSuccess && (
          <div className={css.suggestions} onMouseLeave={onLeave}>
            {data?.length ? (
              <ul>
                {data.map((suggest, key) => (
                  <li key={key} onClick={onSuggestClick(suggest)} onMouseOver={onHover(suggest)}>
                    {suggest.label}
                  </li>
                ))}
              </ul>
            ) : (
              <p>Ничего не нашлось</p>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
