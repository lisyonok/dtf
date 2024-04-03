import FormRenderer from "./FormRender"
import css from "./AuthForm.module.scss"
import { NavLink } from "react-router-dom"
import { SIGN_IN, SIGN_UP } from "shared/constants/routes"
import cn from "classnames"
import LinkCustom from "shared/ui/CustomLink/CustomLink"
import textConstants from "shared/constants/textConstants"
import Button from "shared/ui/Button/Button"

import { useState } from "react"
import AuthContainer from "./AuthContainer"

const AuthForm = ({
  link,
  headerForm,
  currentPage,
  useMutation,
  textBtn,
  fields,
  successFunc,
  showGosUslugiBtn = false,
  subtitle,
  isPasswordValidation
}) => {
  const [isDisable, setDisable] = useState(false)
  const classBottomForm = cn(css.form_bottom, {
    [css.form_bottom_singUp]: currentPage === SIGN_UP,
    [css.bottom_singleItem]: !link
  })

  return (
    <AuthContainer isPasswordValidation={isPasswordValidation}>
      {subtitle && <div className={css.subtitle}>{subtitle}</div>}
      <ToggleAuthMenu headerForm={headerForm} currentPage={currentPage} />
      <FormRenderer
        useMutation={useMutation}
        fields={fields}
        successFunc={successFunc}
        setDisable={setDisable}
        isPasswordValidation={isPasswordValidation}
      >
        <ButtonsBottom
          classNames={classBottomForm}
          isDisable={isDisable}
          link={link}
          showGosUslugiBtn={showGosUslugiBtn}
          textBtn={textBtn}
        />
      </FormRenderer>
    </AuthContainer>
  )
}
const ToggleAuthMenu = ({ headerForm, currentPage }) => {
  return (
    <>
      {headerForm ? (
        <div className={css.title}>{headerForm}</div>
      ) : (
        <div className={css.header}>
          <NavLink to={SIGN_IN}>
            <div className={cn(css.toggle, currentPage === SIGN_IN && css.active)}>{textConstants.auth_switchAuth}</div>
          </NavLink>
          <NavLink to={SIGN_UP}>
            <div className={cn(css.toggle, currentPage === SIGN_UP && css.active)}>
              {textConstants.auth_switchRegistration}
            </div>
          </NavLink>
        </div>
      )}
    </>
  )
}
const ButtonsBottom = ({ classNames, isDisable, textBtn, link, showGosUslugiBtn }) => {
  return (
    <div className={classNames}>
      <div className={css.btn}>
        <Button kind={"red"} type={"submit"} isDisable={isDisable}>
          {textBtn}
        </Button>
      </div>
      <div className={css.link}>
        <LinkCustom to={link?.to} icon={link?.icon} noUnderLine>
          {link?.text}
        </LinkCustom>
      </div>
      {showGosUslugiBtn && (
        <div className={css.btn_gos}>
          <Button kind={"gosuslugi"} to={"/"}>
            {textConstants.gosuslugi_enter}
          </Button>
        </div>
      )}
    </div>
  )
}
export default AuthForm
