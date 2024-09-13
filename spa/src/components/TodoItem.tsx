interface TodoItemProps {
    id: number;
    title: string;
    content: string;
    deleteTodo: (id: number) => void;
}

const TodoItem: React.FC<TodoItemProps> = ({ id, title, content, deleteTodo }) => {
    return (
        <div className="border border-gray-300 rounded-lg p-4 mb-4 shadow-md bg-white">
            <h3 className=" text-x1 font-semibold tex-gray-800 mb-2">{title}</h3>
            <p className="text-gray-600">{content}</p>
            <button
                onClick={() => deleteTodo(id)}
                className='mt-2 bg-red-500 text-white py-1 px-3 rounded-md hover:bg-red-600'
            >
                Excluir
            </button>
        </div>
    )
}

export default TodoItem
