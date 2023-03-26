import { ACTIONS } from "../App"

export default function Button({style, children, dispatch}) {
  let action = ACTIONS.ADD_DIGIT
  if (children === ".") {
    action = ACTIONS.ADD_DIGIT
  } else if (children === 'AC') {
    action = ACTIONS.CLEAR
  } else if (children === '=') {
    action = ACTIONS.EVALUATE
  } else if (children === 'DEL') {
    action = ACTIONS.DELETE_DIGIT
  } else if (isNaN(children)) {
    action = ACTIONS.CHOOSE_OPERATION
  }
  return(
    <button onClick={() => dispatch({ type: action, payload: { children } })} className={style}>
      {children}
    </button>
  )
}