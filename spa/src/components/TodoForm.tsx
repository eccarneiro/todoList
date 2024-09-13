import React, { useState } from 'react';

interface TodoFormProps {
    addTodo: (title: string, content: string) => void; // aponta pro void, pois é uma função que nao retorna nada, apenas realiza uma ação. Uma boa prática em TS.
}

const TodoForm: React.FC<TodoFormProps> = ({ addTodo }) => {
    const [newTitle, setNewTitle] = useState<string>('');
    const [newContent, setNewContent] = useState<string>('');

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault(); // Impede o comportamento padrão de envio do formulário

        if (newTitle && newContent) {
            addTodo(newTitle, newContent);
            setNewTitle('');
            setNewContent('');
        } else {
            alert('Por favor, preencha todos os campos.');
        }
    };

    return (
        <form onSubmit={handleSubmit} className='mb-4'>
            <input
                type="text"
                value={newTitle}
                onChange={(e) => setNewTitle(e.target.value)}
                placeholder="Título da Tarefa"
                className='border p-2 mb-2 w-full'
            />
            <textarea
                value={newContent}
                onChange={(e) => setNewContent(e.target.value)}
                placeholder="Conteúdo da Tarefa"
                className='border p-2 mb-2 w-full'
                rows={4} // Define uma altura mínima para o textarea
            />
            <button
                type='submit'
                className='w-full bg-green-500 text-white py-2 rounded-md hover:bg-green-600'
            >
                Adicionar Tarefa
            </button>
        </form>
    );
};

export default TodoForm;
