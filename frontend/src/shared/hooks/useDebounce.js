import debounce from "lodash/debounce"
import { useEffect, useMemo, useRef } from "react"

export const useDebounce = (callback, wait = 300, options) => {
  const ref = useRef()

  useEffect(() => {
    ref.current = callback
  }, [callback])

  const debouncedCallback = useMemo(() => {
    const func = (...args) => ref.current(...args)

    return debounce(func, wait, options)
  }, [])

  return debouncedCallback
}
