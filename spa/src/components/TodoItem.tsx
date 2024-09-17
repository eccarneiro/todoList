// src/components/TodoItem.tsx

import React, { useState } from 'react';

interface Todo {
  id: number;
  title: string;
  content: string;
}

interface TodoItemProps {
  todo: Todo;
  deleteTodo: (id: number) => void;
  editTodo: (id: number, title: string, content: string) => void;
}

const TodoItem: React.FC<TodoItemProps> = ({ todo, deleteTodo, editTodo }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState(todo.title);
  const [editedContent, setEditedContent] = useState(todo.content);

  const handleEdit = () => {
    if (isEditing) {
      editTodo(todo.id, editedTitle, editedContent);
    }
    setIsEditing(!isEditing);
  };

  const handleCancel = () => {
    setEditedTitle(todo.title);
    setEditedContent(todo.content);
    setIsEditing(false);
  };

  return (
    <div className="bg-gray-800 p-4 rounded-lg border border-gray-600">
      {isEditing ? (
        <div className="space-y-4">
          <input
            type="text"
            value={editedTitle}
            onChange={(e) => setEditedTitle(e.target.value)}
            className="w-full px-4 py-2 rounded border border-gray-600 bg-gray-700 text-white"
          />
          <textarea
            value={editedContent}
            onChange={(e) => setEditedContent(e.target.value)}
            className="w-full px-4 py-2 rounded border border-gray-600 bg-gray-700 text-white"
          />
          <div className="flex space-x-2">
            <button
              onClick={handleEdit}
              className="bg-cyan-500 hover:bg-cyan-600 text-white py-2 px-4 rounded"
            >
              {isEditing ? 'Salvar' : 'Editar'}
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
        <div>
          <h2 className="text-xl text-cyan-400 mb-2">{todo.title}</h2>
          <p className="text-white">{todo.content}</p>
          <div className="flex space-x-2 mt-4">
            <button
              onClick={() => deleteTodo(todo.id)}
              className="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded"
            >
              Apagar
            </button>
            <button
              onClick={() => setIsEditing(true)}
              className="bg-cyan-500 hover:bg-cyan-600 text-white py-2 px-4 rounded"
            >
              Editar
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default TodoItem;
