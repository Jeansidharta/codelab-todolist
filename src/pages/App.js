import React from 'react';

import { TodoItem } from "../components/todo-item";
import "../assets/styles/index.css";

const todoURL = "https://us-central1-codelab-todo-2d49f.cloudfunctions.net/todo";
// const todoURL = "http://localhost:5001/codelab-todo-2d49f/us-central1/todo";

async function getAllTodos(){
	let response;
	try{
		response = await fetch(todoURL);
	} catch(e) {
		alert("Connection failed");
		return false;
	}
	if(response.status !== 200){
		console.error(response);
		alert("Error: Bad request");
		return false;
	}
	let newTodos = (await response.json()).data;
	return Object.entries(newTodos).map(([id, todo]) => {
		todo.key = id;
		return todo;
	});
}

async function createTodo(newTodo){
	let response;
	try{
		response = await fetch(todoURL, {
			method: "POST",
			body: JSON.stringify(newTodo),
		});
	} catch(e) {
		alert("Connection failed");
		return false;
	}
	if(response.status !== 200){
		console.error(response);
		alert("Error: Bad request");
		return false;
	}
	newTodo.key = (await response.json()).data;
	return newTodo;
}

async function deleteTodo(newTodoID){
	let response;
	try{
		response = await fetch(`${todoURL}?id=${newTodoID}`, {
			method: "DELETE"
		});
	} catch(e) {
		alert("Connection failed");
		return false;
	}
	if(response.status !== 200){
		console.error(response);
		alert("Error: Bad request");
		return false;
	}
	return true;
}

export function App() {
	const textareaRef = React.useRef();
	const [todos, setTodos] = React.useState([]);
	const submitButton = React.useRef();
	const [isLoading, setIsLoading] = React.useState(true);

	React.useEffect(()=>{(async () => {
		const newTodos = await getAllTodos();
		if(newTodos)
			setTodos([...newTodos]);
		setIsLoading(false);
	})();}, []);

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
		const newTodo = await createTodo({text: value});
		if(newTodo)
			setTodos([...todos, newTodo]);
		setIsLoading(false);
	}

	async function deleteItem(item){
		if(await deleteTodo(item.key)){
			todos.splice(todos.indexOf(item), 1);
			setTodos([...todos]);
		}
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