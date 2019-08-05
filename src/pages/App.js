import React from 'react';

import { TodoItem } from "../components/todo-item";
import "../assets/styles/index.css";

export function App() {
	const textareaRef = React.useRef();
	const [todos, setTodos] = React.useState([]);

	function submit(event){
		event.preventDefault();
		const value = textareaRef.current.value.trim();
		if(!value){
			textareaRef.current.classList.add("error");
			alert("Cannot create an empty todo!");
			return;
		} else {
			textareaRef.current.classList.remove("error");
		}

		const newTodo = {id: Date.now(), text: value};

		textareaRef.current.value = "";

		setTodos([...todos, newTodo]);
	}

	function deleteItem(item){
		todos.splice(todos.indexOf(item), 1);
		setTodos([...todos]);
	}

	return (
		<main>
			<h1>Todo List</h1>
			<form onSubmit={submit}>
				<textarea ref={textareaRef}/>
				<button type="submit">add</button>
			</form>
			<ul>
				{
					todos.map(todo => (
						<TodoItem
							key={todo.id}
							text={todo.text}
							onDelete={()=>deleteItem(todo)}
						/>
					))
				}
			</ul>
		</main>
	);
}