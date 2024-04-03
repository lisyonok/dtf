import css from "./Form.module.scss"
import useForm from "features/FormRender/useForm"
import Input from "./Input/Index"
import PasswordValidation from "./PasswordValidation"
import { ReactComponent as WarningLogo } from "shared/static/img/svg/warning.svg"
export default function FormRenderer({ useMutation, successFunc, fields, children, setDisable, isPasswordValidation }) {
  const { onSubmitHandler, fieldHandler, error, isAllValid, isLoading, state } = useForm({
    mutation: useMutation,
    onSuccess: successFunc
  })
  setDisable(!isAllValid || isLoading)

  return (
    <>
      <form onSubmit={onSubmitHandler}>
        <div className={css.form_content}>
          <div className={css.form_row}>
            {fields.map((field) => (
              <Input key={field.name} error={error} {...field} {...fieldHandler(field)} />
            ))}
          </div>

          {isPasswordValidation && <PasswordValidation formState={state} />}
        </div>
        {Boolean(error) && (
          <div className={css.error_row}>
            <WarningLogo />
            {error}
          </div>
        )}
        <div>{children}</div>
      </form>
    </>
  )
}
