import { useEffect } from 'react'
import { useTodosContext } from '../hooks/useTodosContext'
import TodoDetails from '../components/TodoDetails'
import TodoForm from '../components/TodoForm'

const Home = () => {

  const {todos, dispatch} = useTodosContext()

  useEffect( () => {
    // fetch all the todos 
    const fetchTodos = async () => { 
      const response = await fetch('/api/todoList')
      const json = await response.json() // array of todos
  
      if (response.ok) {
        dispatch({ type: 'DISPLAY_TODOS', payload: json })
      }
    }

    fetchTodos()
  }, [dispatch])

  return (
    <div className="home">
        <div className="todos">
          {/* Will only execute the right side if the left side is correct. If the todos is not empty */}
          { todos && todos.map( todo => (
            <TodoDetails key={todo._id} todo={todo} />
          ))}
        </div>
        
        <TodoForm />
    </div>
  )
}

export default Home