import { useState } from 'react'
import { useTodosContext } from '../hooks/useTodosContext'
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const TodoForm = () => {

    const { dispatch } = useTodosContext()

    const [title, setTitle] = useState('');
    const [note, setNote] = useState('');
    const [duedate, setDuedate] = useState(null);
    const [error, setError] = useState(null)
    const [emptyFields, setEmptyFields] = useState([])

    const handleSubmit = async (e) => {
        e.preventDefault()

        const todo = { title, note, duedate }

        const response = await fetch('/api/todoList', {
            method: 'POST',
            body: JSON.stringify(todo),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        const json = await response.json()

        if (!response.ok) {
            setError(json.error)
            setEmptyFields(json.emptyFields)
        }

        if (response.ok) {
            // Auto clear the fields once the form is submitted
            setTitle('')
            setNote('')
            setDuedate(null)
            setError(null)
            setEmptyFields([])
            console.log('new todo added: ', json);
            dispatch( { type: 'CREATE_TODO', payload: json })
        }

    }

    return (
        <form className="create" onSubmit={handleSubmit}>
            <h3 className="create-title">Add a New Todo</h3>

            <label>Todo:</label>
            <input
                type="text"
                onChange={ (e) => setTitle(e.target.value)}
                value={title}
                className={emptyFields.includes('title') ? 'error' : ''}
            />

            <label>Note:</label>
            <input
                type="text"
                onChange={ (e) => setNote(e.target.value)}
                value={note}
            />

            <label>Duedate:</label>
            <DatePicker 
                selected={duedate} 
                onChange={(duedate) => setDuedate(duedate)} 
                className={emptyFields.includes('duedate') ? 'error' : ''}
            />

            <div className="center-button">
                <button>Add Todo</button>
                { error && <div className='error'>{error}</div>}
            </div>
            
        </form>
    )
}

export default TodoForm