import { useState } from 'react';
import TodoItem from './components/TodoItem';

interface Todo {
  id: number;
  title: string;
  content: string;
}

function App() {
  const [todos, setTodos] = useState<Todo[]>([]); // Gerenciar o estado do 'todos' e 'setTodos'
  const [newTitle, setNewTitle] = useState(''); // Estado para o título da nova tarefa
  const [newContent, setNewContent] = useState(''); // Estado para o conteúdo da nova tarefa

  // Função para listar tarefas
  const handleClick = async () => {
    try {
      const res = await fetch("http://localhost:3000/tasks");
      if (!res.ok) {
        throw new Error(`HTTP error! Status: ${res.status}`);
      }
      const data: Todo[] = await res.json();
      setTodos(data);
    } catch (error) {
      console.error("Failed to fetch tasks:", error);
    }
  };

  // Função para adicionar nova tarefa
  const addTodo = async () => {
    if (newTitle && newContent) {
      try {
        const response = await fetch('http://localhost:3000/tasks', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            title: newTitle,
            content: newContent,
          }),
        });

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const newTodo: Todo = await response.json();
        setTodos([...todos, newTodo]); // Adiciona a nova tarefa ao estado
        setNewTitle(''); // Limpa o campo de título
        setNewContent(''); // Limpa o campo de conteúdo
      } catch (error) {
        console.error('Failed to add task:', error);
      }
    } else {
      alert('Por favor, preencha ambos os campos.');
    }
  };

  return (
    <div className='flex items-center justify-center min-h-screen bg-gray-100 p-4'>
      <div className='w-full max-w-md bg-white rounded-lg shadow-lg p-4'>
        <button
          onClick={handleClick}
          className='w-full bg-blue-500 text-white py-2 rounded-md mb-4 hover:bg-blue-600'
        >
          Listar Tarefas
        </button>

        {/* Formulário para adicionar nova tarefa */}
        <form className='mb-4'>
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
            onClick={addTodo}
            className='w-full bg-green-500 text-white py-2 rounded-md hover:bg-green-600'
          >
            Adicionar Tarefa
          </button>
        </form>

        {/* Lista de tarefas */}
        {todos.map(todo => (
          <TodoItem
            key={todo.id}
            title={todo.title}
            content={todo.content}
          />
        ))}
      </div>
    </div>
  );
}

export default App;
