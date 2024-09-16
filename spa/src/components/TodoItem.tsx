import React, { useState } from 'react';

interface TodoItemProps {
  todo: {
    id: number;
    title: string;
    content: string;
  };
  deleteTodo: (id: number) => void;
  editTodo: (id: number, title: string, content: string) => void;
}

const TodoItem: React.FC<TodoItemProps> = ({ todo, deleteTodo, editTodo }) => {
  const [isEditing, setIsEditing] = useState(false); // Controle de estado para exibir formulário de edição
  const [newTitle, setNewTitle] = useState(todo.title);
  const [newContent, setNewContent] = useState(todo.content);

  const handleSave = () => {
    editTodo(todo.id, newTitle, newContent);
    setIsEditing(false); // Fecha o formulário após salvar
  };

  return (
    <div className="bg-gray-900 border border-purple-600 rounded-lg p-4 text-white shadow-lg">
      {isEditing ? (
        // Formulário de edição
        <div>
          <input
            type="text"
            value={newTitle}
            onChange={(e) => setNewTitle(e.target.value)}
            className="w-full bg-gray-800 text-white border border-gray-600 rounded-md p-2 mb-2"
            placeholder="Editar título"
          />
          <textarea
            value={newContent}
            onChange={(e) => setNewContent(e.target.value)}
            className="w-full bg-gray-800 text-white border border-gray-600 rounded-md p-2 mb-2"
            placeholder="Editar conteúdo"
          ></textarea>
          <button
            onClick={handleSave}
            className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded-md shadow-md transition duration-300"
          >
            Salvar
          </button>
          <button
            onClick={() => setIsEditing(false)}
            className="ml-2 bg-gray-500 hover:bg-gray-600 text-white px-3 py-1 rounded-md shadow-md transition duration-300"
          >
            Cancelar
          </button>
        </div>
      ) : (
        // Exibição padrão
        <div>
          <h3 className="text-lg font-semibold text-purple-400 mb-2">{todo.title}</h3>
          <p className="text-sm text-gray-300 mb-4">{todo.content}</p>
          <button
            onClick={() => deleteTodo(todo.id)}
            className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-md shadow-md transition duration-300"
          >
            Excluir
          </button>
          <button
            onClick={() => setIsEditing(true)}
            className="ml-2 bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded-md shadow-md transition duration-300"
          >
            Editar
          </button>
        </div>
      )}
    </div>
  );
};

export default TodoItem;
