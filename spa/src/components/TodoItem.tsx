interface TodoItemProps {
    title: string;
    content: string;
}

const TodoItem: React.FC<TodoItemProps> = ({title, content}) => {
    return (
        <div className="border border-gray-300 rounded-lg p-4 mb-4 shadow-md bg-white">
            <h3 className=" text-x1 font-semibold tex-gray-800 mb-2">{title}</h3>
            <p className="text-gray-600">{content}</p>
        </div>
    )
}
 
export default TodoItem
