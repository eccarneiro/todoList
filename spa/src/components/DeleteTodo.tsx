interface DeleteTodoProps {
  id: number;
  onDelete: (id: number) => void;
  onCancel: () => void;
}

const DeleteTodo: React.FC<DeleteTodoProps> = ({ id, onDelete, onCancel }) => (
  <div className='border p-4 mb-2 rounded-md bg-red-100'>
      <button
          onClick={() => {
              onDelete(id);
              onCancel();
          }}
          className='bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600 mr-2'
      >
          Excluir
      </button>
      <button
          onClick={onCancel}
          className='bg-gray-500 text-white py-2 px-4 rounded-md hover:bg-gray-600'
      >
          Cancelar
      </button>
  </div>
);

export default DeleteTodo;
