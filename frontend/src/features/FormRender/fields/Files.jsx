import { useId, useRef, useState } from "react"
import css from "./Fields.module.scss"
import cn from "classnames"
import upload from "../../api/upload/index"
import { useEffect } from "react"

const BYTES_TO_MB = 1024 * 1024
const DEFAULT_VALUE = []

export default function Files({
  controller: { value, onRawValueChange, error, name, touched, disabled, isRequired },
  accept,
  children,
  maxSizeMB = 5,
  singleFile,
  hidden
}) {
  const maxFiles = singleFile ? 1 : 5

  const classnames = cn(css.dropzone, {
    [css.dropzoneError]: touched && error,
    [css.dropzoneDisabled]: disabled
  })

  const id = useId()
  const filesInput = useRef()

  const isUploading = useRef(0)
  const [fileList, setFileList] = useState({})

  const files = Object.values(fileList)
  const hasFiles = files.length

  useEffect(() => {
    onRawValueChange((p) => {
      const valid = !isUploading.current && !disabled && isRequired ? Boolean(p.val?.length) : true
      const value = Array.isArray(p.val) ? p.val : DEFAULT_VALUE
      return {
        valid,
        errs: valid ? null : ["Прикрепите файл"],
        value,
        touched: p.touched
      }
    })

    if (value.length && !isUploading.current)
      setFileList((innerFiles) => {
        const innerFileEntries = Object.entries(innerFiles)
        const innerFilesWithError = innerFileEntries.filter(([, { err }]) => err)

        const fileIntersectionEntries = value.map((outterFile) => {
          const innerFileWithSameName = innerFileEntries.find(
            ([, innerFile]) => innerFile.name === outterFile.name
          )?.[1]

          if (innerFileWithSameName) {
            innerFileWithSameName.src = outterFile.src
            innerFileWithSameName.id = outterFile.id
            return [outterFile.id, innerFileWithSameName]
          }

          return [outterFile.id, { ...outterFile, progress: 100, finished: true, old: true }]
        })

        return Object.fromEntries([...fileIntersectionEntries, ...innerFilesWithError])
      })
  }, [isRequired, disabled, value])

  const clearErrors = () => {
    setFileList((p) => {
      const entries = Object.entries(p)
      const filtered = entries.filter(([, { err }]) => !err)
      return Object.fromEntries(filtered)
    })
  }

  const onProgress = (id) => (upload) =>
    setFileList((p) => ({
      ...p,
      [id]: {
        ...p[id],
        progress: Math.round((100 * upload.loaded) / upload.total)
      }
    }))

  const onFinish = (id) => {
    return ({ data: [data] }) => {
      isUploading.current -= 1

      setFileList((p) => {
        delete p[id]
        p[data.id] = { ...data, progress: 100, finished: true }

        const value = Object.values(p)
          .filter(({ err }) => !err)
          .map((file, key) => ({ key, ...file }))

        onRawValueChange(() => ({
          value,
          valid: true,
          errs: null
        }))

        return { ...p }
      })
    }
  }

  const onError = (id) => (error) => {
    isUploading.current -= 1
    let err = "Произошла неизвестная ошибка. Попробуйте снова."
    if (error?.code === "ERR_NETWORK") err = "Кажется, пропал интернет"
    if (error?.data?.msg) err = error.data.msg
    setFileList((p) => ({
      ...p,
      [id]: { ...p[id], progress: 100, finished: true, err }
    }))
  }

  function createFile(file) {
    const { name } = file
    const id = Math.random().toString(16)

    const fileWithSameNameExists = files.filter(({ err }) => !err).some((file) => file.name === name)
    if (fileWithSameNameExists)
      return setFileList((p) => ({
        ...p,
        [id]: {
          id,
          name,
          finished: true,
          err: `Файл с таким именем уже прикреплён`
        }
      }))

    const isOverWeight = file.size > maxSizeMB * BYTES_TO_MB
    if (isOverWeight)
      return setFileList((p) => ({
        ...p,
        [id]: {
          id,
          name,
          finished: true,
          err: `Максимальный размер файла ${maxSizeMB}МБ`
        }
      }))

    const maxFileCountExeded = files.filter(({ err }) => !err).length + isUploading.current >= maxFiles
    if (maxFileCountExeded)
      return setFileList((p) => ({
        ...p,
        [id]: {
          id,
          name,
          finished: true,
          err: `Превышено максимальное кол-во файлов`
        }
      }))

    setFileList((p) => ({
      ...p,
      [id]: { id, name, progress: 0, finished: false, err: null }
    }))

    isUploading.current += 1
    upload({
      file,
      onProgress: onProgress(id),
      onFinish: onFinish(id),
      onError: onError(id)
    })
  }

  const delFile = (id) => (e) => {
    e.stopPropagation()
    e.preventDefault()

    setFileList((p) => {
      delete p[id]
      return { ...p }
    })

    onRawValueChange((p) => ({
      value: p.val.filter((p) => p.id !== id),
      ...p
    }))
  }

  const onChange = (e) => {
    e.preventDefault()
    clearErrors()

    const files = e.target?.files || e.dataTransfer?.files
    if (!files) return

    const inputFiles = Array.from(files)
    inputFiles.forEach((file) => createFile(file))
    filesInput.current.value = null
  }

  const preventDefault = (e) => e.preventDefault()

  if (hidden) return null

  return (
    <div className={css.innerField}>
      <div className={classnames} data-dropzone>
        <label
          className={css.dropzoneLabel}
          htmlFor={id}
          onDrop={onChange}
          onDragOver={preventDefault}
          onDragEnter={preventDefault}
        >
          <input
            type="file"
            className={css.dropzoneInput}
            accept={accept}
            disabled={disabled}
            multiple={!singleFile}
            name={name}
            id={id}
            ref={filesInput}
            onChange={onChange}
          />
          <div className={css.dropzoneText}>
            {touched && error && <div className={css.error}>{error}</div>}

            {children}
            <br />
            <br />
            {!hasFiles && (
              <>
                Размер файла до&nbsp;{maxSizeMB}МБ.
                <br />
                Форматы: .jpg, .jpeg, .png, .pdf
              </>
            )}
            {Boolean(hasFiles) && (
              <ul>
                {files.map((file) => {
                  const { name, progress, finished, err, src, id, old } = file
                  const msg = (() => {
                    if (err) return err
                    if (!finished) return `Загрузка: ${progress}/100`
                    return old ? "Файл был загружен ранее" : "Файл загружен"
                  })()
                  return (
                    <li key={id} className={cn(css.fileItem, err && css.fileItem_error)}>
                      <div className={css.wrapInside}>
                        <span className={css.fileItem_name}>{name || "Без имени"}</span>
                        {src && (
                          <a href={src} target="_blank" rel="noreferrer">
                            Скачать
                          </a>
                        )}
                        {finished && <button className={css.deleteFile} onClick={delFile(id)}></button>}
                      </div>
                      <span>{msg}</span>
                    </li>
                  )
                })}
              </ul>
            )}
          </div>
        </label>
      </div>
    </div>
  )
}
