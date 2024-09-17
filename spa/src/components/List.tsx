// src/pages/List.tsx

import React, { useState, useEffect } from 'react';
import { Link } from 'wouter';

interface Todo {
  id: number;
  title: string;
  content: string;
}

const List: React.FC = () => {
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

  useEffect(() => {
    fetchTodos();
  }, []);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-black via-gray-800 to-black p-4">
      <div className="w-full max-w-md bg-black rounded-lg shadow-2xl p-6 border border-cyan-500">
        <h1 className="text-3xl text-cyan-400 font-mono mb-6 text-center">Listar Tarefas</h1>
        <div className="text-center mb-6">
          <Link href="/">
            <a className="w-full bg-cyan-500 hover:bg-cyan-600 text-white py-2 px-4 rounded block">
              Voltar para Home
            </a>
          </Link>
        </div>
        <div className="space-y-4">
          {todos.length > 0 ? (
            todos.map(todo => (
              <div key={todo.id} className="bg-gray-800 p-4 rounded border border-gray-700">
                <h2 className="text-xl text-cyan-400 mb-2">{todo.title}</h2>
                <p className="text-white">{todo.content}</p>
                <div className="mt-4 flex justify-between">
                  <Link href={`/edit/${todo.id}`}>
                    <a className="bg-cyan-500 hover:bg-cyan-600 text-white py-1 px-3 rounded">Editar</a>
                  </Link>
                  <button
                    onClick={() => handleDelete(todo.id)}
                    className="bg-red-500 hover:bg-red-600 text-white py-1 px-3 rounded"
                  >
                    Apagar
                  </button>
                </div>
              </div>
            ))
          ) : (
            <p className="text-white text-center">Nenhuma tarefa encontrada.</p>
          )}
        </div>
      </div>
    </div>
  );
};

const handleDelete = async (id: number) => {
  try {
    await fetch(`http://localhost:3000/tasks/${id}`, { method: 'DELETE' });
    window.location.reload(); // Atualiza a página após exclusão
  } catch (error) {
    console.error('Erro ao deletar tarefa:', error);
  }
};

export default List;
