import { useState } from 'react'
import TodoItem from './components/TodoItem';

interface Todo {
  id: number;
  title: string;
  content: string;
}

function App() {
  const [todos, setTodos] = useState<Todo[]>([]) // criando o usestate pra gerenciar o estado do 'todos' e 'setTodos'

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

  return (
    <div className='flex items-center justify-center miin-h-screen bg-gray-100 p-4'>
    <div className='w-full max-w-md bg-white rounded-lg shadow-lg p-4'>
      <button onClick={handleClick}
      className=' w-full bg-blue-500 text-white py-2 rounded-md mb-4 hover:bg-blue-600'
      > Listar Tarefas
      </button>
      {todos.map(todo => (
        <TodoItem
          key={todo.id}
          title={todo.title}
          content={todo.content}
        />
      ))}
    </div>
    </div>
  )
}

export default App
