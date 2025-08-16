const AlertMessage = ({ message, type, onClose }) => {
  const bgColor = type === "error" ? "bg-red-500" : "bg-green-500";
  const textColor = type === "error" ? "text-red-100" : "text-green-100";

  return (
    <div
      className={`${bgColor} ${textColor} p-4 rounded-lg shadow-md fixed top-5 left-1/2 transform -translate-x-1/2 w-96`}
      role="alert"
    >
      <div className="flex justify-between items-center">
        <span>{message}</span>
        <button onClick={onClose} className="text-white font-bold">
          X
        </button>
      </div>
    </div>
  );
};

export default AlertMessage;
