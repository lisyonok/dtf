import { useParams } from "react-router-dom"
import css from "./drawing.module.scss"
import { useGetDrawingQuery } from "features/api/services/site"
import Modal from "shared/ui/Modal/Modal"
import modalCss from "shared/ui/Modal/Modal.module.scss"
import Button from "shared/ui/Button/Button"
import { prepareError } from "features/api/prepareError"

function Drawing() {
  const { id } = useParams()
  const { data, isError, isLoading, error } = useGetDrawingQuery({ id })

  if (isError)
    return (
      <Modal opened={isError}>
        <div className={modalCss.modal_title}>Ошибка</div>
        <div className={modalCss.modal_text}>{error && prepareError(error)}</div>
      </Modal>
    )
  if (isLoading)
    return (
      <Modal opened={isLoading}>
        <div className={modalCss.modal_title}>Загрузка...</div>
      </Modal>
    )

  return (
    <div className={css.container}>
      <img src={process.env.REACT_APP_API_URL + data.path.replace("/", "")} alt="" />

      <div className={css.attribution}>
        <div className={css.name}>{data.username}</div>
        <div className={css.date}>at {new Date(data.createdAt).toLocaleString()}</div>
        <div className={css.date}>{data.isSignVerified ? "Ричунок проверен ЭЦП" : "Проверка ЭЦП не прошла"}</div>
        <Button to={"/"}>Рисовать</Button>
        <Button to={"/drawings"}>Смотреть другие</Button>
      </div>
    </div>
  )
}

export default Drawing
