import React, { useState, useEffect } from 'react';
import axios from 'axios';
import TodoForm from './components/TodoForm';
import TodoList from './components/TodoList';
import './App.css';

function App() {
    const [todos, setTodos] = useState([]);

    const fetchTodos = async () => {
        try {
            const response = await axios.get('http://localhost:5000/api/todos');
            setTodos(response.data);
        } catch (err) {
            console.error('Error fetching todos:', err);
        }
    };

    const addTodo = async (task) => {
        try {
            const response = await axios.post('http://localhost:5000/api/todos', { task });
            setTodos([...todos, response.data]);
        } catch (err) {
            console.error('Error adding todo:', err);
        }
    };

    const deleteTodo = async (id) => {
        try {
            await axios.delete(`http://localhost:5000/api/todos/${id}`);
            setTodos(todos.filter(todo => todo._id !== id));
        } catch (err) {
            console.error('Error deleting todo:', err);
        }
    };

    useEffect(() => {
        fetchTodos();
    }, []);

    return (
        <div className="App">
            <h1>To-Do App</h1>
            <TodoForm addTodo={addTodo} />
            <TodoList todos={todos} deleteTodo={deleteTodo} />
        </div>
    );
}

export default App;
