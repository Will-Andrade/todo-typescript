import React, { useCallback, useState } from "react";
import Todo from "../models/todo";

type TodosContextObj = {
  items: Todo[];
  addTodo: (enteredText: string) => void;
  removeTodo: (id: string) => void;
};

export const TodosContext = React.createContext<TodosContextObj>({
  items: [],
  addTodo: () => {},
  removeTodo: (id: string) => {}
});

const TodosContextProvider: React.FC = (props) => {
  const [todos, setTodos] = useState<Todo[]>([]);

  const addTodoHandler = useCallback((enteredText: string): void => {
    const newTodo = new Todo(enteredText);

    setTodos(prevState => prevState.concat(newTodo));
  }, []);

  const removeTodoHandler = useCallback((todoId: string): void => {
    setTodos(() => todos.filter(todo => todo.id !== todoId));
  }, [todos]);

  const contextValue: TodosContextObj = {
    items: todos,
    addTodo: addTodoHandler,
    removeTodo: removeTodoHandler
  }

  return <TodosContext.Provider value={contextValue}>
    {props.children}
  </TodosContext.Provider>
};

export default TodosContextProvider;
