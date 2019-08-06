import React from "react";

export function TodoItem(props){
	const text = props.text || "";
	const onDeleteFunction = props.onDelete || (()=>{});
	const [isDeleting, setIsDeleting] = React.useState(false);

	React.useEffect(()=>{
		if(!isDeleting) return;
		onDeleteFunction();
	}, [isDeleting]);

	return (
		<div className="todo-item">
			<p>{text}</p>
			<button
				onClick={()=>setIsDeleting(true)}
				className={isDeleting? "disabled" : ""}
			>
				×
			</button>
		</div>
	);
}