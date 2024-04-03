import { FORM_INPUT } from "shared/constants/inputConstant"
import { SIGN_IN } from "shared/constants/routes"
import textConstants from "shared/constants/textConstants"

const data = {
  items: [
    {
      type: "text",
      name: FORM_INPUT.EMAIL,
      label: textConstants.shared_mailFull,
      validation: ["required", "email"]
    },
    {
      type: "password",
      name: FORM_INPUT.PASSWORD,
      label: textConstants.shared_password,
      validation: ["required"]
    },
    {
      type: "password",
      name: FORM_INPUT.PASSWORD_CONFIRM,
      label: textConstants.shared_confirmPassword,
      validation: ["required", "eqToField:PASSWORD"]
    }
  ],
  link: {
    to: SIGN_IN,
    text: textConstants.auth_haveAccount,
    icon: textConstants.btn_arrow
  }
}
export default data
