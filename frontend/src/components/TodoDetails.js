import { useTodosContext } from '../hooks/useTodosContext'
import formatDistanceToNow from 'date-fns/formatDistanceToNow'
import { useState } from 'react'

const TodoDetails = ({todo}) => {

  const { dispatch } = useTodosContext()
  const [done, setDone] = useState(todo.done)

  const handleDone = async () => {

    const complete = { done: !done }

    const response = await fetch('https://todoapp-tracker.herokuapp.com/api/todoList/' + todo._id, {
      method: 'PATCH',
      body: JSON.stringify(complete),
      headers: {
          'Content-Type': 'application/json'
      }
    })
    const json = await response.json()

    if (response.ok) {
      setDone(!done)
      dispatch( { type: 'UPDATE_TODO', payload: json })
    }
  }

  const handleClick = async () => {

    const response = await fetch('https://todoapp-tracker.herokuapp.com/api/todoList/' + todo._id, {
      method: 'DELETE'
    })
    const json = await response.json()

    if (response.ok) {
      dispatch( { type: 'DELETE_TODO', payload: json})
    }

  }

  return (

    <div className="todo-details">
      <div className="custom-control custom-checkbox iconSelect mr-2">

        <input 
          type="checkbox" 
          id={todo._id} 
          className="custom-control-input" 
          checked={done}
          onChange={handleDone}
        />

        <label className="custom-control-label" htmlFor={todo._id} >
          <h4>{todo.title}</h4>
          <p><strong>Note: </strong>{todo.note}</p>
          <p><strong>Duedate: </strong>{formatDistanceToNow(new Date(todo.duedate), { addSuffix: true})}</p>
        </label>

        <span 
          className="material-symbols-outlined" 
          onClick={handleClick}>
            Delete
        </span>

      </div>
    </div>
  )
}

export default TodoDetails