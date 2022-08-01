import { TodosContext } from '../context/TodosContext'
import { useContext } from "react";

export const useTodosContext = () => {

    // TodosContext will return the value we passed into the provider component (state, dispatch)
    const context = useContext(TodosContext)

    // check if the context have values
    if (!context) {
        throw Error('useTodosContext must be used inside a useTodosContextProvider.')
    }

    return context
}