import React, { useState, useEffect } from 'react';
import TodoItem from './components/TodoItem';
import TodoForm from './components/TodoForm';

interface Todo {
  id: number;
  title: string;
  content: string;
}

const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);

  const fetchTodos = async () => {
    try {
      const res = await fetch('http://localhost:3000/tasks');
      const data: Todo[] = await res.json();
      setTodos(data);
    } catch (error) {
      console.error('Erro ao buscar tarefas:', error);
    }
  };

  const addTodo = async (title: string, content: string) => {
    try {
      const response = await fetch('http://localhost:3000/tasks', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title, content }),
      });

      const newTodo: Todo = await response.json();
      setTodos([...todos, newTodo]);
    } catch (error) {
      console.error('Erro ao adicionar tarefa:', error);
    }
  };

  const deleteTodo = async (id: number) => {
    try {
      await fetch(`http://localhost:3000/tasks/${id}`, { method: 'DELETE' });
      setTodos(todos.filter(todo => todo.id !== id));
    } catch (error) {
      console.error('Erro ao deletar tarefa:', error);
    }
  };

  const editTodo = async (id: number, updatedTitle: string, updatedContent: string) => {
    try {
      const response = await fetch(`http://localhost:3000/tasks/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title: updatedTitle, content: updatedContent }),
      });
  
      if (!response.ok) {
        throw new Error('Erro ao editar tarefa');
      }
  
      const updatedTodo: Todo = await response.json();
      
      // Atualiza o estado para refletir a tarefa editada
      setTodos(todos.map(todo => (todo.id === id ? updatedTodo : todo)));
    } catch (error) {
      console.error('Erro ao editar tarefa:', error);
    }
  };
  
  useEffect(() => {
    fetchTodos();
  }, []);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-black via-gray-800 to-black p-4">
      <div className="w-full max-w-md bg-black rounded-lg shadow-2xl p-6 border border-cyan-500">
        <h1 className="text-3xl text-cyan-400 font-mono mb-6 text-center">Todo List</h1>

        <TodoForm addTodo={addTodo} />

        <div className="mt-4 space-y-4">
          {todos.map(todo => (
            <TodoItem
              key={todo.id}
              todo={todo}
              deleteTodo={deleteTodo}
              editTodo={editTodo}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default App;
