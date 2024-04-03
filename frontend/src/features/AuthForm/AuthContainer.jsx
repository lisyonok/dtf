import css from "./AuthForm.module.scss"
import cn from "classnames"
import TextConstants from "shared/constants/textConstants"
import picture from "shared/static/img/backgroundAuth.avif"

export default function AuthContainer({ isPasswordValidation, children }) {
  return (
    <>
      <div className={css.backgroundImg}>
        <div className={css.backgroundImg_wrap}>
          <div className={css.backgroundImg_img}>
            <img src={picture} alt={TextConstants.auth_AltBackground} />
          </div>
        </div>
      </div>
      <div className={cn(css.wrapper, isPasswordValidation && css.wrapper_big)}>
        <div className={cn(css.inner)}>{children}</div>
      </div>
    </>
  )
}
