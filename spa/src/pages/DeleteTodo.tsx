import React from 'react';
import { useParams, useLocation } from 'wouter';

const Delete: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [location, setLocation] = useLocation();

  const deleteTodo = async () => {
    try {
      await fetch(`http://localhost:3000/tasks/${id}`, { method: 'DELETE' });
      setLocation('/');
    } catch (error) {
      console.error('Erro ao deletar tarefa:', error);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-black via-gray-800 to-black p-4">
      <div className="w-full max-w-md bg-black rounded-lg shadow-2xl p-6 border border-cyan-500">
        <h1 className="text-3xl text-cyan-400 font-mono mb-6 text-center">Delete Todo</h1>
        <p className="text-white mb-4">Are you sure you want to delete this todo?</p>
        <button onClick={deleteTodo} className="w-full bg-red-500 text-white p-2 rounded">
          Yes, Delete
        </button>
      </div>
    </div>
  );
};

export default Delete;
