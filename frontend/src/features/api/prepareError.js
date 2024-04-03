import TextConstants from "shared/constants/textConstants"

export function prepareError({ status, data }) {
  if (data?.message) return data.message
  if (status === "FETCH_ERROR") return TextConstants.fetch_error_no_internet
  if (status === "TIMEOUT_ERROR") return TextConstants.fetch_error_no_internet
  if (status === "PARSING_ERROR") return TextConstants.fetch_error_unexpected_format
  return "Неизвестная ошибка"
}
