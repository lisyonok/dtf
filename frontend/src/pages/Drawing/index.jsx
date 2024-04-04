import { Navigate, useParams } from "react-router-dom"
import css from "./drawing.module.scss"
import { useGetDrawingQuery } from "features/api/services/site"
import Modal from "shared/ui/Modal/Modal"
import modalCss from "shared/ui/Modal/Modal.module.scss"
import Button from "shared/ui/Button/Button"

function Drawing() {
  const { id } = useParams()
  const { data, isError, isLoading } = useGetDrawingQuery({ id })

  if (isError) return <Navigate to={"/"} />
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
        <Button to={"/"}>Я тоже хочу рисовать</Button>
      </div>
    </div>
  )
}

export default Drawing
