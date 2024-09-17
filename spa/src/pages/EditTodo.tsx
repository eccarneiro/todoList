import React, { useState, useEffect } from 'react';
import { useParams, useLocation } from 'wouter';

interface Todo {
  id: number;
  title: string;
  content: string;
}

const Edit: React.FC = () => {
  const [id, setId] = useState<number | null>(null);
  const [todo, setTodo] = useState<Todo | null>(null);
  const [title, setTitle] = useState<string>('');
  const [content, setContent] = useState<string>('');
  const [location, setLocation] = useLocation(); // useLocation para navegação

  const params = useParams<{ id: string }>();

  useEffect(() => {
    const fetchTodo = async () => {
      try {
        const res = await fetch(`http://localhost:3000/tasks/${params.id}`);
        const data: Todo = await res.json();
        setTodo(data);
        setTitle(data.title);
        setContent(data.content);
        setId(data.id);
      } catch (error) {
        console.error('Erro ao buscar tarefa:', error);
      }
    };

    fetchTodo();
  }, [params.id]);

  const handleSave = async () => {
    if (id === null) return;
    try {
      const response = await fetch(`http://localhost:3000/tasks/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title, content }),
      });

      if (!response.ok) {
        throw new Error('Erro ao editar tarefa');
      }

      await response.json();
      setLocation('/list'); // Redireciona para a página de listagem
    } catch (error) {
      console.error('Erro ao salvar tarefa:', error);
    }
  };

  const handleCancel = () => {
    setLocation('/list'); // Redireciona para a página de listagem
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-black via-gray-800 to-black p-4">
      <div className="w-full max-w-md bg-black rounded-lg shadow-2xl p-6 border border-cyan-500">
        <h1 className="text-3xl text-cyan-400 font-mono mb-6 text-center">Editar Tarefa</h1>
        {todo ? (
          <div>
            <div className="mb-4">
              <label htmlFor="title" className="block text-white mb-1">Título</label>
              <input
                id="title"
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full bg-gray-800 text-white border border-gray-700 rounded p-2"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="content" className="block text-white mb-1">Conteúdo</label>
              <textarea
                id="content"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                className="w-full bg-gray-800 text-white border border-gray-700 rounded p-2"
                rows={4}
              />
            </div>
            <div className="flex justify-between">
              <button
                onClick={handleSave}
                className="bg-cyan-500 hover:bg-cyan-600 text-white py-2 px-4 rounded"
              >
                Salvar Alterações
              </button>
              <button
                onClick={handleCancel}
                className="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded"
              >
                Cancelar
              </button>
            </div>
          </div>
        ) : (
          <p className="text-white text-center">Carregando...</p>
        )}
      </div>
    </div>
  );
};

export default Edit;
