import { useContext, useRef } from "react";
import { TodosContext } from "../store/todos-context";
import classes from './NewTodo.module.css'

const NewTodo: React.FC = () => {
  const todosContext = useContext(TodosContext);
  const todoTextInputRef = useRef<HTMLInputElement>(null);

  const submitHandler = (e: React.FormEvent): undefined => {
    e.preventDefault();

    const enteredText = todoTextInputRef.current!.value;

    if (enteredText.trim().length === 0) return;

    todosContext.addTodo(enteredText);
    todoTextInputRef.current!.value = '';
  };

  return <form onSubmit={submitHandler} className={classes.form}>
    <label htmlFor="text">Todo text</label>
    <input type="text" name="todo-text" id="text" ref={todoTextInputRef} />
    <button type="submit">Add Todo</button>
  </form>
}

export default NewTodo;
