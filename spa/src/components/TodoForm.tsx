// src/components/TodoForm.tsx

import React, { useState } from 'react';

interface TodoFormProps {
  addTodo: (title: string, content: string) => void;
}

const TodoForm: React.FC<TodoFormProps> = ({ addTodo }) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Validação simples
    if (title.trim() === '' || content.trim() === '') {
      setError('O título e o conteúdo não podem estar vazios.');
      return;
    }

    addTodo(title, content);
    setTitle('');
    setContent('');
    setError('');
  };

  return (
    <div className="mb-6">
      <h2 className="text-xl text-cyan-400 mb-4">Adicionar Tarefa</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        {error && <p className="text-red-500">{error}</p>}
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Título"
          className="w-full px-4 py-2 rounded border border-gray-600 bg-gray-700 text-white"
        />
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Conteúdo"
          className="w-full px-4 py-2 rounded border border-gray-600 bg-gray-700 text-white"
        />
        <button
          type="submit"
          className="w-full bg-cyan-500 hover:bg-cyan-600 text-white py-2 px-4 rounded"
        >
          Criar Tarefa
        </button>
      </form>
    </div>
  );
};

export default TodoForm;
