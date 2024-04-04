import { prepareError } from "features/api/prepareError"
import { useGetUserQuery, useLoginMutation } from "features/api/services/user"
import { useState } from "react"
import Button from "shared/ui/Button/Button"
import Modal from "shared/ui/Modal/Modal"
import modalCss from "shared/ui/Modal/Modal.module.scss"

export default function LoginModal() {
  const { data: user } = useGetUserQuery()
  const [username, setUsername] = useState("")
  const [login, loginResult] = useLoginMutation()

  return (
    <>
      <Modal opened={!user?.ok && loginResult.isUninitialized}>
        <div className={modalCss.modal_title}>Вы не авторизованны</div>
        <div className={modalCss.modal_text}>Выберите себе никнейм. Под ним мы сохраним ваши рисунки</div>
        <div className={modalCss.modal_btns}>
          <input value={username} onInput={(e) => setUsername(e.target.value)} />
          <Button onClick={() => login({ username })}>Авторизоваться</Button>
        </div>
      </Modal>

      <Modal opened={loginResult.isLoading}>
        <div className={modalCss.modal_title}>Загрузка...</div>
      </Modal>

      <Modal opened={loginResult.isError}>
        <div className={modalCss.modal_title}>Ошибка</div>
        <div className={modalCss.modal_text}>{loginResult.isError && prepareError(loginResult.error)}</div>
      </Modal>
    </>
  )
}
