import { useState } from 'react'
import TodoItem from './components/TodoItem';

function App() {
  const [todos, setTodos] = useState([])
  
  const handleClick = async () => {
    const res = await fetch("http://localhost:3000/tasks")
      const data = await res.json();
      setTodos(data)
  }
  return (
    <div>
      <button onClick={handleClick}> Clica no cu</button>
      {todos.map(todo => {
        return <TodoItem title={todo.title}/>
      })}
    </div>
  )
}


export default App
