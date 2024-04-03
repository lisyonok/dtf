import textConstants from "shared/constants/textConstants"

export const emailRegexp =
  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3})|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

const allowedCharsRegexp = /[a-zA-Zа-яА-Я @!?;,.:\-0-9\n]+/m
const numsRegexp = /[0-9]+/m
const rusNameRegexp = /[-,А-Яа-яЁё ]+/m
const dateCharsRegexp = /[0-9.]+/m

const engCharsRegexp = /[A-z]+/
const rusCharsRegexp = /[А-Яа-яЁё]+/

const wholeStrMatch = (regExp, val) => {
  if (val === "") return true

  const match = val.match(regExp)
  return Boolean(match && match[0] === val)
}

export const validationMethods = {
  required({ val /*, args, input, formData, oldVal */ }) {
    if (typeof val === "string" && val.trim() === "") return { val, err: textConstants.validation_methods_required }
    return { val, err: val ? null : textConstants.validation_methods_required }
  },

  email({ val }) {
    if (!val) return { err: null, val }

    return {
      err: emailRegexp.test(val) ? null : textConstants.validation_methods_email,
      val
    }
  },

  allowedChars({ val, oldVal, args }) {
    if (!val) return { err: null, val }

    const valid = wholeStrMatch(allowedCharsRegexp, val)
    const interruptInput = args.includes("interrupt")
    const newVal = interruptInput && !valid ? oldVal : val
    return {
      err: valid ? null : textConstants.validation_methods_allowedChars,
      val: newVal
    }
  },

  onlyNums({ val, oldVal, args }) {
    if (!val) return { err: null, val }

    const valid = wholeStrMatch(numsRegexp, val)
    const interruptInput = args.includes("interrupt")
    const newVal = interruptInput && !valid ? oldVal : val
    return {
      err: valid ? null : textConstants.validation_methods_onlyNums,
      val: newVal
    }
  },

  rusName({ val, oldVal, args }) {
    if (!val) return { err: null, val }

    const valid = wholeStrMatch(rusNameRegexp, val)
    const interruptInput = args.includes("interrupt")
    const newVal = interruptInput && !valid ? oldVal : val
    return {
      err: valid ? null : textConstants.validation_methods_rusName,
      val: newVal
    }
  },

  engChars({ val, oldVal, args }) {
    if (!val) return { err: null, val }

    const valid = wholeStrMatch(engCharsRegexp, val)
    const interruptInput = args.includes("interrupt")
    const newVal = interruptInput && !valid ? oldVal : val
    return {
      err: valid ? null : textConstants.validation_methods_engChars,
      val: newVal
    }
  },

  rusChars({ val, oldVal, args }) {
    if (!val) return { err: null, val }

    const valid = wholeStrMatch(rusCharsRegexp, val)
    const interruptInput = args.includes("interrupt")
    const newVal = interruptInput && !valid ? oldVal : val
    return {
      err: valid ? null : textConstants.validation_methods_rusChars,
      val: newVal
    }
  },

  date({ val, oldVal, args }) {
    if (!val) return { err: null, val }

    const charsValid = wholeStrMatch(dateCharsRegexp, val)
    const interruptInput = args.includes("interrupt")
    const newVal = interruptInput && !charsValid ? oldVal : val
    if (!charsValid) return { err: textConstants.validation_methods_dateChars, val: newVal }

    const regexp = /[0-9]{2}.[0-9]{2}.[0-9]{4}/
    const formatValid = val.match(regexp)?.[0] === val
    if (!formatValid) return { err: "Введите дату в формате ДД.ММ.ГГГГ", val: newVal }

    const dateParts = val.split(".")
    const validDate = dateParts[0] < 32 && dateParts[1] < 13

    if (!validDate) return { err: "Проверьте число и месяц", val: newVal }
    return { err: null, val: newVal }
  },

  passportCode({ val }) {
    if (!val) return { err: null, val }

    const regexp = /[0-9]{3}-[0-9]{3}/

    const valid = val.match(regexp)?.[0] === val
    return { err: valid ? null : "Введите серию в формате ХХХ-ХХХ", val }
  },

  phone({ val }) {
    if (!val) return { err: null, val }

    let newVal = /\+7/.test(val) ? val.replace(/\+7/, "8") : val
    newVal = newVal.replace(/[^0-9-()+ ]/g, "")

    const regexp = /8 ?\(?[0-9]{3}\)? ?[0-9]{3}-? ?[0-9]{2}-? ?[0-9]{2}/
    const validFormat = newVal.match(regexp)?.[0] === newVal
    if (!validFormat)
      return {
        err: "Введите номер телефона в формате: 8 (ХХХ) ХХХ-ХХ-ХХ",
        val: newVal
      }

    return { err: null, val: newVal }
  },

  maxLenght({ val, oldVal, args: [length, interrupt] }) {
    if (!val) return { err: null, val }

    const valid = val.length <= length
    const newVal = interrupt && !valid ? oldVal : val

    return {
      err: valid ? null : textConstants.validation_methods_maxLength,
      val: newVal
    }
  },

  uppercase({ val }) {
    return { err: null, val: val.toLocaleUpperCase() }
  },

  eqToField({ val, args: [fieldName, silent], formData }) {
    if (!val) return { err: null, val }

    const valid = val === formData[fieldName].val
    return {
      err: valid ? null : silent ? " " : `Текст в поле не совпадает с текстом в поле ${formData[fieldName].label}`,
      val
    }
  },

  password({ val, args: [silent] }) {
    if (!val) return { err: null, val }

    const makeError = (message) => ({ err: silent ? " " : message, val })

    const isLongEnough = val.length >= 10
    const containsRegularChars = /^(?=.*[a-zа-яё])(?=.*[A-ZА-ЯЁ])(?=.*\d).*/.test(val)
    const containsSpecialChars = /^(?=.*[.?;:"[\]|~!@#$%^&*()_+=]).*/.test(val)

    if (!isLongEnough) return makeError("Пароль должен содержать не менее 10 символов")
    if (!containsRegularChars) return makeError("Пароль должен содержать цифры, заглавные и строчные буквы")
    if (!containsSpecialChars) return makeError("Пароль должен содержать спец. символы: /?;:'\"[]{}\\|`~!@#$%^&*()_+=-")

    return { err: null, val }
  }
}
