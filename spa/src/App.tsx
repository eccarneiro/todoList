import React, { useState } from 'react';
import TodoItem from './components/TodoItem';
import TodoForm from './components/TodoForm';

interface Todo {
  id: number;
  title: string;
  content: string;
}

const App: React.FC = () => {

  const [todos, setTodos] = useState<Todo[]>([]); // Gerenciar o estado do 'todos' e 'setTodos'


  const handleClick = async () => {
    try {
      const res = await fetch("http://localhost:3000/tasks");
      if (!res.ok) {
        throw new Error(`HTTP error! Status: ${res.status}`);
      }
      const data: Todo[] = await res.json();
      setTodos(data);
    } catch (error) {
      console.error("Failed to fetch tasks:", error);
    }
  };


  const addTodo = async (title: string, content: string) => {
    if (title && content) {
      try {
        const response = await fetch('http://localhost:3000/tasks', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            title,
            content
          }),
        });

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const newTodo: Todo = await response.json();
        setTodos([...todos, newTodo]); // Adiciona a nova tarefa ao estado
      } catch (error) {
        console.error('Failed to add task:', error);
      }
    } else {
      alert('Por favor, preencha ambos os campos.');
    }
  };


  const deleteTodo = async (id: number) => {
    try {
      const response = await fetch(`http://localhost:3000/tasks/${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      setTodos(todos.filter(todo => todo.id !== id));
    } catch (error) {
      console.error('Failed to delete task:', error);
    }
  };

  return (
    <div className='flex items-center justify-center min-h-screen bg-gray-100 p-4'>
      <div className='w-full max-w-md bg-white rounded-lg shadow-lg p-4'>
        <button
          onClick={handleClick}
          className='w-full bg-blue-500 text-white py-2 rounded-md mb-4 hover:bg-blue-600'
        >
          Listar Tarefas
        </button>

        <TodoForm addTodo={addTodo} />

        {todos.map(todo => (
          <TodoItem
            key={todo.id}
            id={todo.id}
            title={todo.title}
            content={todo.content}
            deleteTodo={deleteTodo}
          />
        ))}
      </div>
    </div>
  );
}

export default App;
