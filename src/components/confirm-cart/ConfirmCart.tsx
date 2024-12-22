
const Confirm = ({ title, content, functional, nameDelete, nameCancel }) => {
  return (
    <div className="fixed top-0 left-0 w-full h-full bg-gray-900 bg-opacity-50 flex justify-center items-center">
      <div className="bg-white w-[500px] p-4 rounded">
        <h2 className="text-[16px] font-bold mb-2">{title}</h2>
        <p className="mb-4 text-[14px]">{content}</p>
        <div className="flex justify-between">
          <button
            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
            onClick={nameDelete}
          >
            {functional}
          </button>
          <button
            className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded"
            onClick={nameCancel}
          >
            Hủy
          </button>
        </div>
      </div>
    </div>
  );
};

export default Confirm;
