import { createContext, useReducer } from "react";

export const TodosContext = createContext()

// Function: to keep the local states in-sync with the database
// state: previous state (array of existing todos)
// action: object that we passed into the dispatch fx (new data / data to be removed)
export const todosReducer = (state, action) => {
    switch (action.type) {
        case 'DISPLAY_TODOS':
            return {
                todos: action.payload
            }
        case 'CREATE_TODO':
            return {
                todos: [action.payload, ...state.todos]
            } 
        case 'DELETE_TODO':
            return {
                // as browse thru the state array, if the id not same, then we want to keep display it
                todos: state.todos.filter( todo => todo._id !== action.payload._id )
            }
        case 'UPDATE_TODO':  
            return {
                todos: state.todos.map((todo) => (todo._id === action.payload._id ? action.payload : todo))
            }
        default:
            return state
    }
}

// provide context so that other components can use it, including its value
// children represents any component that being wrapped by TodosContextProvider component (children == <App />) 
export const TodosContextProvider = ( { children } ) => {

    // first arg: reducer fx nama. sec arg: initial/previous state
    const [state, dispatch] = useReducer(todosReducer, {
        todos: null
    })

    // use dispatch fx to update the state object
    // argument inside this dispatch fx is known as Action
    // first property: type, that describe the state. sec property: payload, represents any data that needed to make this change
    // dispatch({ type: 'DISPLAY_TODO', payload: [{}, {}] })

    return (
        <TodosContext.Provider value={ {...state, dispatch} }>
            { children }
        </TodosContext.Provider>
    )
}