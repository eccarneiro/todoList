// services/todoService.ts
export const fetchTodos = async () => {
    const res = await fetch('http://localhost:3000/tasks');
    return await res.json();
  };
  
  export const fetchTodoById = async (id: number) => {
    const res = await fetch(`http://localhost:3000/tasks/${id}`);
    return await res.json();
  };
  
  export const editTodo = async (id: number, title: string, content: string) => {
    await fetch(`http://localhost:3000/tasks/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title, content }),
    });
  };
  
  export const deleteTodo = async (id: number) => {
    await fetch(`http://localhost:3000/tasks/${id}`, {
      method: 'DELETE',
    });
  };
  