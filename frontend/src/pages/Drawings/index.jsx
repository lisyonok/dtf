import { prepareError } from "features/api/prepareError"
import css from "./drawings.module.scss"
import { useGetDrawingsQuery } from "features/api/services/site"
import Modal from "shared/ui/Modal/Modal"
import modalCss from "shared/ui/Modal/Modal.module.scss"
import { Link } from "react-router-dom"

function Drawings() {
  const { data, isLoading, isError, error } = useGetDrawingsQuery(null, { refetchOnMountOrArgChange: true })

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

  const formatDate = (date) => new Date(date).toLocaleString().replace(",", "")

  return (
    <div className={css.container}>
      <div className={css.cards}>
        {/* <h1>Последние рисунки</h1>
        <Button to={"/"}>Рисовать</Button> */}

        {data.cards.map((card) => (
          <Link to={"/drawing/" + card.id} className={css.card} key={card.id}>
            <img src={process.env.REACT_APP_API_URL + card.path.replace("/", "")} alt="" />
            <div className={css.attribution}>
              <div className={css.name}>{card.username}</div>
              <div className={css.time}>{formatDate(card.createdAt)}</div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}

export default Drawings
