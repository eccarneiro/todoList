import React, { useState } from 'react';

interface TodoFormProps {
  addTodo: (title: string, content: string) => void;
}

const TodoForm: React.FC<TodoFormProps> = ({ addTodo }) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (title && content) {
      addTodo(title, content);
      setTitle('');
      setContent('');
    } else {
      alert('Por favor, preencha ambos os campos.');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mb-4">
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Título"
        className="w-full mb-2 p-2 border rounded"
      />
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="Conteúdo"
        className="w-full mb-2 p-2 border rounded"
      />
      <button type="submit" className="w-full bg-green-500 text-white py-2 rounded-md">
        Adicionar Tarefa
      </button>
    </form>
  );
};

export default TodoForm;
