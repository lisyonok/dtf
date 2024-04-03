import React from "react"
import css from "./ErrorBoundary.module.scss"
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false, info: "" }
  }

  static getDerivedStateFromError() {
    return { hasError: true }
  }

  componentDidCatch(error, info) {
    console.error("Caught by error boundary:", error, info)
    let componentName = ""
    try {
      componentName = /at (\w*)/.exec(info.componentStack)[1]
    } catch (err) {
      /* empty */
    }
    this.setState({ info: componentName })
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className={css.errorBoundary}>
          {this.props.msg || `Ошибка при обработке компонента ${this.state.info}`}
        </div>
      )
    }

    return this.props.children || null
  }
}
export default ErrorBoundary
