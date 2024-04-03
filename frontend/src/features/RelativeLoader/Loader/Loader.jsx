import css from "../RelativeLoader.module.scss"
import cn from "classnames"

export default function Loader() {
  return (
    <div id="loader" className={cn(css.loader)}>
      <div className={css.loader_block}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          // eslint-disable-next-line
          xmlnsXlink="http://www.w3.org/1999/xlink"
          className={css.loader_svg}
          width="128px"
          height="128px"
          viewBox="0 0 100 100"
          preserveAspectRatio="xMidYMid"
        >
          <circle cx="50" cy="50" r="25" fill="#e30016"></circle>
          <g>
            <path d="M43 23L57 23L50 10Z" transform="rotate(30 50 50)" fill="#e30016"></path>
            <path d="M43 23L57 23L50 10Z" transform="rotate(60 50 50)" fill="#e30016"></path>
            <path d="M43 23L57 23L50 10Z" transform="rotate(90 50 50)" fill="#e30016"></path>
            <path d="M43 23L57 23L50 10Z" transform="rotate(120 50 50)" fill="#e30016"></path>
            <path d="M43 23L57 23L50 10Z" transform="rotate(150 50 50)" fill="#e30016"></path>
            <path d="M43 23L57 23L50 10Z" transform="rotate(180 50 50)" fill="#e30016"></path>
            <path d="M43 23L57 23L50 10Z" transform="rotate(210 50 50)" fill="#e30016"></path>
            <path d="M43 23L57 23L50 10Z" transform="rotate(240 50 50)" fill="#e30016"></path>
            <path d="M43 23L57 23L50 10Z" transform="rotate(270 50 50)" fill="#e30016"></path>
            <path d="M43 23L57 23L50 10Z" transform="rotate(300 50 50)" fill="#e30016"></path>
            <path d="M43 23L57 23L50 10Z" transform="rotate(330 50 50)" fill="#e30016"></path>
            <path d="M43 23L57 23L50 10Z" transform="rotate(360 50 50)" fill="#e30016"></path>
            <animateTransform
              attributeName="transform"
              type="rotate"
              repeatCount="indefinite"
              dur="1.7857142857142856s"
              values="0 50 50;180 50 50"
              keyTimes="0;1"
            />
          </g>
        </svg>
      </div>
    </div>
  )
}
