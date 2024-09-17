import React, { useState, useEffect } from 'react';
import TodoForm from '../components/TodoForm';
import { Link } from 'wouter';

interface Todo {
  id: number;
  title: string;
  content: string;
}

const Home: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [message, setMessage] = useState<string | null>(null);

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
      setMessage('Tarefa adicionada com sucesso!');
      setTimeout(() => setMessage(null), 3000); // Limpa a mensagem após 3 segundos
    } catch (error) {
      console.error('Erro ao adicionar tarefa:', error);
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
        {message && <p className="text-green-500 text-center mt-4">{message}</p>}
        <div className="text-center mt-4">
          <Link href="/list">
            <a className="w-full bg-cyan-500 hover:bg-cyan-600 text-white py-2 px-4 rounded block">
              Listar Tarefas
            </a>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;
