import { FORM_INPUT } from "shared/constants/inputConstant"
import { FORGOT_PASSWORD } from "shared/constants/routes"
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
      type: "checkbox",
      name: FORM_INPUT.REMEMBER_ME,
      label: textConstants.auth_remember,
      validation: [],
      defaultValue: true
    }
  ],
  link: {
    to: FORGOT_PASSWORD,
    text: textConstants.shared_forgotPassword,
    icon: textConstants.btn_briefcase
  }
}
export default data
