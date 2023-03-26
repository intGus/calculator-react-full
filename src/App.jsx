import { useReducer } from 'react'
import './App.css'
import Button from './components/Button'

export const ACTIONS = {
  ADD_DIGIT: 'add-digit',
  CHOOSE_OPERATION: 'choose-operation',
  CLEAR: 'clear',
  DELETE_DIGIT: 'delete-digit',
  EVALUATE: 'evaluate'
}

function reducer(state, { type, payload }) {
  switch(type) {
    case ACTIONS.ADD_DIGIT:
      if (state.overwrite) {
        return {
          ...state,
          currentOperand: payload.children,
          overwrite: false,
        }
      }
      if (payload.children === '0' && state.currentOperand === '0') return state
      if (payload.children === '.' && state.currentOperand.includes('.')) return state
      return {
        ...state,
        currentOperand: `${state.currentOperand || ''}${payload.children}`,
      }
    
    case ACTIONS.CLEAR:
      return {}

    case ACTIONS.CHOOSE_OPERATION:
      if (state.currentOperand == null && state.previousOperand == null) {
        return state
      }

      if (state.currentOperand == null) {
        return {
          ...state,
          operation: payload.children,
        }
      }

      if (state.previousOperand == null) {
        return {
          ...state,
          operation: payload.children,
          previousOperand: state.currentOperand,
          currentOperand: null,
        }
      }

      return {
        ...state,
        previousOperand: evaluate(state),
        operation: payload.children,
        currentOperand: null,
      }

    case ACTIONS.EVALUATE:
      if (
        state.operation == null ||
        state.currentOperand == null ||
        state.previousOperand == null
        ) {
          return state
        }
      
      return {
        ...state,
        overwrite: true,
        previousOperand: null,
        operation: null,
        currentOperand: evaluate(state),
      }

    case ACTIONS.DELETE_DIGIT:
      if (state.overwrite) {
        return {
          ...state,
          overwrite: false,
          currentOperand: null
        }
      }
      if (state.currentOperand == null) return state
      if (state.currentOperand.length === 1) {
        return {...state, currentOperand: null}
      }

      return {
        ...state,
        currentOperand: state.currentOperand.slice(0, -1)
      }
  }
}

function evaluate( {currentOperand, previousOperand, operation}) {
  const prev = parseFloat(previousOperand)
  const current = parseFloat(currentOperand)
  if (isNaN(prev) || isNaN(current)) return ''
  let computation = ''
  switch (operation) {
    case "+":
      computation = prev + current
      break
    case "-":
      computation = prev - current
      break
    case "*":
      computation = prev * current
      break
    case "/":
      computation = prev / current
      break
  }

  return computation.toString()
}

function App() {
  const [{ currentOperand, previousOperand, operation }, dispatch] = useReducer(
    reducer,
    {}
  )

  return (
    <div className='calculator-grid'>
      <div className='output'>
        <div className='previous-operand'>{previousOperand} {operation}</div>
        <div className='current-operand'>{currentOperand}</div>
      </div>
      <Button dispatch={dispatch} style='span-two' >AC</Button>
      <Button dispatch={dispatch}>DEL</Button>
      <Button dispatch={dispatch}>/</Button>
      <Button dispatch={dispatch}>1</Button>
      <Button dispatch={dispatch}>2</Button>
      <Button dispatch={dispatch}>3</Button>
      <Button dispatch={dispatch}>*</Button>
      <Button dispatch={dispatch}>4</Button>
      <Button dispatch={dispatch}>5</Button>
      <Button dispatch={dispatch}>6</Button>
      <Button dispatch={dispatch}>+</Button>
      <Button dispatch={dispatch}>7</Button>
      <Button dispatch={dispatch}>8</Button>
      <Button dispatch={dispatch}>9</Button>
      <Button dispatch={dispatch}>-</Button>
      <Button dispatch={dispatch}>.</Button>
      <Button dispatch={dispatch}>0</Button>
      <Button dispatch={dispatch} style='span-two'>=</Button>
    </div>
  )
}

export default App
