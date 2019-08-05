import React from "react";

export function TodoItem(props){
	const text = props.text || "";
	const onDeleteFunction = props.onDelete || (()=>{});

	return (
		<div className="todo-item">
			<p>{text}</p>
			<button onClick={onDeleteFunction}>×</button>
		</div>
	);
}