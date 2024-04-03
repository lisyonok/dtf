import { useEffect, useState } from "react"
import { validationMethods } from "./formValidation"
import { prepareError } from "../api/prepareError"

export default function useForm({ mutation, onSuccess, initialValues, requestParams = {} }) {
  const [formData, setFormData] = useState({})
  const [trigger, result] = mutation()
  const [validationError, setValidationError] = useState(null)

  const error = result.error ? prepareError(result.error) : validationError
  const isLoading = result.isLoading

  useEffect(() => {
    if (!initialValues) return
    setFormData((prevState) => {
      const entries = Object.entries(initialValues)
      entries.forEach(([name, value]) => {
        if (!prevState[name]) prevState[name] = {}
        if (typeof value === "object" && "value" in value) prevState[name] = value
        else prevState[name].val = value
        prevState[name].inited = false
      })
      return { ...prevState }
    })
  }, [initialValues])

  function getFormErrors() {
    const errors = Object.entries(formData)
      .filter(([_name, state]) => state.errs && !state.disabled)
      .map(([_name, state]) => `${state.label}: ${state.errs[0]}`)

    return errors
  }

  async function onSubmitHandler(event) {
    if (event && "preventDefault" in event) event.preventDefault()

    const errors = getFormErrors()

    if (errors.length) {
      setFormData((prev) => {
        for (const key in prev) prev[key].touched = true
        return prev
      })
      return setValidationError(errors.length ? errors.join("</br>") : null)
    } else setValidationError("")

    const data = {}
    const entries = Object.entries(formData)

    entries.forEach(([name, { val }]) => {
      data[name] = val
    })

    await trigger({ data: { FIELDS: data }, ...requestParams })
      .unwrap()
      .then((response) => typeof onSuccess === "function" && onSuccess({ response, data }))
      .catch((e) => {
        console.warn(e)
      })
  }

  const validateField = ({ validation, val, input, formData, oldVal }) => {
    const { errs, val: newVal } = validation.reduce(
      ({ val, errs }, methodString) => {
        const [name, ...args] = methodString.split(":")
        const method = validationMethods[name]
        if (!method) throw new Error("Unknown validation method: " + name)
        const { val: newVal, err } = method({
          val,
          args,
          input,
          formData,
          oldVal
        })
        return { val: newVal, errs: err ? [...errs, err] : errs }
      },
      { val, errs: [] }
    )

    return { errs: errs.length ? errs : null, val: newVal }
  }

  const initField = (prevState, config, { formData, raw }) => {
    const { name, validation = [], label, disabled, initialValue } = config
    const value = prevState[name]?.val ?? prevState[name]?.value ?? initialValue ?? ""
    const options = prevState[name]?.options

    if (raw)
      return {
        ...prevState,
        [name]: {
          valid: disabled || !config.validation.includes("required"),
          errs: null,
          val: value,
          label,
          touched: false,
          inited: true,
          disabled
        }
      }

    const { errs } = validateField({
      validation,
      val: value,
      oldVal: "",
      input: {},
      formData
    })

    return {
      ...prevState,
      [name]: {
        valid: disabled || !errs,
        errs: disabled ? null : errs,
        val: value,
        label,
        touched: false,
        inited: true,
        disabled,
        options
      }
    }
  }

  const syntheticlyUpdateField = (name, value, { valid = true, touched = true, errs = null } = {}) => {
    setFormData((prev) => ({
      ...prev,
      [name]: {
        ...prev[name],
        valid: valid,
        errs: errs?.length ? errs : null,
        val: value,
        touched: touched
      }
    }))
  }

  const fieldHandler = (config) => {
    const { name, validation = [], label, raw, disabled } = config

    if (!formData[name]?.inited || formData[name]?.disabled !== disabled)
      setFormData((prevState) => initField(prevState, config, { formData, raw }))

    const onInput = ({ target }) => {
      let val = target.value

      const { errs, val: newVal } = validateField({
        validation,
        val,
        oldVal: formData[name].val,
        input: formData[name],
        formData
      })

      setFormData((prev) => ({
        ...prev,
        [name]: {
          ...prev[name],
          valid: !errs,
          errs,
          val: newVal,
          touched: true
        }
      }))
    }

    const onRawValueChange = (arg) => {
      const mixStates = (prevState, arg) => {
        const { value, errs, valid, touched, val } = arg
        return {
          ...prevState,
          [name]: {
            ...prevState[name],
            valid: valid,
            errs,
            val: value || val,
            touched: touched ?? true
          }
        }
      }

      if (typeof arg === "object") setFormData((prev) => mixStates(prev, arg))
      if (typeof arg === "function" && formData[name]) setFormData((prev) => mixStates(prev, arg(prev[name])))
    }

    const isRequired = validation.includes("required")
    const error = disabled ? null : formData[name]?.errs?.[0]
    const value = formData[name]?.val
    const touched = formData[name]?.touched
    const options = formData[name]?.options

    return {
      onInput,
      onBlur: onInput,
      onRawValueChange,
      error,
      name,
      isRequired,
      value,
      label,
      touched,
      disabled,
      options
    }
  }

  const isAllValid = !Object.entries(formData).some(([_name, state]) => state.errs)

  return {
    state: formData,
    onSubmitHandler,
    fieldHandler,
    syntheticlyUpdateField,
    error,
    isAllValid,
    isLoading,
    result: result.data
  }
}
