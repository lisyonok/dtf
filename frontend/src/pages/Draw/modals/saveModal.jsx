import { prepareError } from "features/api/prepareError"
import { Link } from "react-router-dom"
import Button from "shared/ui/Button/Button"
import Modal from "shared/ui/Modal/Modal"
import modalCss from "shared/ui/Modal/Modal.module.scss"

export default function SaveModal({ saveResult }) {
  return (
    <>
      <Modal opened={saveResult.isSuccess}>
        <div className={modalCss.modal_title}>Ваш рисунок сохранен</div>
        <div className={modalCss.modal_text}>
          и доступен по этому адресу: <br />
          {saveResult?.data && <Link to={saveResult.data.url}>{saveResult.data.url}</Link>}
        </div>
        <div className={modalCss.modal_btns}>
          <Button onClick={() => saveResult.reset()}>Закрыть</Button>
        </div>
      </Modal>

      <Modal opened={saveResult.isLoading}>
        <div className={modalCss.modal_title}>Загрузка...</div>
      </Modal>

      <Modal opened={saveResult.isError}>
        <div className={modalCss.modal_title}>Ошибка</div>
        <div className={modalCss.modal_text}>{saveResult.isError && prepareError(saveResult.error)}</div>
      </Modal>
    </>
  )
}
