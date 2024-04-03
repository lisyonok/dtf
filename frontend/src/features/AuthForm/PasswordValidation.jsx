import cn from "classnames"
import css from "./Form.module.scss"

export default function PasswordValidation({ formState }) {
  const {
    PASSWORD: { val: password },
    PASSWORD_CONFIRM: { val: passwordConfirm }
  } = formState

  const isLongEnough = password.length >= 10
  const containsRegularChars = /^(?=.*[a-zа-яё])(?=.*[A-ZА-ЯЁ])(?=.*\d).*/.test(password)
  const containsSpecialChars = /^(?=.*[.?;:"[\]|~!@#$%^&*()_+=]).*/.test(password)

  const isEquals = password === passwordConfirm

  const getClass = (condition) => (condition ? css.notice_check : css.notice_error)

  return (
    <div className={cn(css.form_row, css.form_row_notice)}>
      <div className={css.notice}>
        <div className={cn(css.notice_row, css.notice_row_black)}>
          Ссылка для восстановление пароля отправлена на указанную электронную почту!
        </div>
        <div className={cn(css.notice_row)}>Проверка пароля:</div>
        <div className={cn(css.notice_row, getClass(isLongEnough))}>Пароль содержит не менее 10 символов;</div>
        <div className={cn(css.notice_row, getClass(containsRegularChars))}>
          Пароль содержит цифры, заглавные и строчные буквы;
        </div>
        <div className={cn(css.notice_row, getClass(containsSpecialChars))}>
          Пароль содержит спец. символы: /?;:'"[]{}\|`~!@#$%^&*()_+=-
        </div>
        <div className={cn(css.notice_row, getClass(isEquals))}>Новые пароли совпадают;</div>
      </div>
    </div>
  )
}
