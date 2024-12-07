import React from 'react';

function TodoList({ todos, deleteTodo }) {
    return (
        <ul>
            {todos.map(todo => (
                <li key={todo._id}>
                    {todo.task}
                    <button onClick={() => deleteTodo(todo._id)}>Delete</button>
                </li>
            ))}
        </ul>
    );
}

export default TodoList;
