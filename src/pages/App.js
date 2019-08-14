import React from 'react';

import { TodoItem } from "../components/todo-item";
import "../assets/styles/index.css";

const sleep = (time) => new Promise(resolve => setTimeout(resolve, time));

export function App() {
	const textareaRef = React.useRef();
	const submitButton = React.useRef();
	const [isLoading, setIsLoading] = React.useState(false);
	const [todos, setTodos] = React.useState([]);

	async function submit(event){
		setIsLoading(true);
		event.preventDefault();
		const value = textareaRef.current.value.trim();
		if(!value){
			textareaRef.current.classList.add("error");
			alert("Cannot create an empty todo!");
			return;
		}
		textareaRef.current.classList.remove("error");
		textareaRef.current.value = "";
		await sleep(500);
		setTodos([...todos, {key: Date.now(), text: value}]);
		setIsLoading(false);
	}

	async function deleteItem(item){
		await sleep(500);
		todos.splice(todos.indexOf(item), 1);
		setTodos([...todos]);
	}

	return (
		<main>
			<h1>Todo List</h1>
			<form onSubmit={submit}>
				<textarea ref={textareaRef}/>
				<button
					ref={submitButton}
					type="submit"
					className={isLoading? "disabled" : "enabled"}
				>
					add
				</button>
			</form>
			<ul>
				{
					todos.map(todo => (
						<TodoItem
							key={todo.key}
							text={todo.text}
							onDelete={()=>deleteItem(todo)}
						/>
					))
				}
			</ul>
		</main>
	);
}