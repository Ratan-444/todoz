import React, { useState, useEffect } from 'react';
import axios from 'axios';
import TodoForm from './components/TodoForm';
import TodoList from './components/TodoList';
import './App.css';

function App() {
    const [todos, setTodos] = useState([]);
    const API_URL = 'https://todoz-backend-dzzhr2ds8-ratans-projects-bda0b515.vercel.app/api/todos';

    // Add your API key or token here if authentication is required
    const token = 'YOUR_API_KEY_OR_TOKEN'; // Replace this with the actual token if needed

    const fetchTodos = async () => {
        try {
            const response = await axios.get(API_URL, {
                headers: {
                    'Authorization': `Bearer ${token}` // Include token if authentication is required
                }
            });
            setTodos(response.data);
        } catch (err) {
            console.error('Error fetching todos:', err);
        }
    };

    const addTodo = async (task) => {
        try {
            const response = await axios.post(API_URL, { task }, {
                headers: {
                    'Authorization': `Bearer ${token}` // Include token if authentication is required
                }
            });
            setTodos([...todos, response.data]);
        } catch (err) {
            console.error('Error adding todo:', err);
        }
    };

    const deleteTodo = async (id) => {
        try {
            await axios.delete(`${API_URL}/${id}`, {
                headers: {
                    'Authorization': `Bearer ${token}` // Include token if authentication is required
                }
            });
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
