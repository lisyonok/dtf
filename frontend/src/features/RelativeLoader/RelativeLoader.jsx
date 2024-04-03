import React from "react"
import Loader from "./Loader/Loader"
import css from "./RelativeLoader.module.scss"

export const RelativeLoader = () => {
  return (
    <div className={css.wrapper}>
      <Loader />
    </div>
  )
}
