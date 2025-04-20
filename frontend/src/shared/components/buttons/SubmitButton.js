const SubmitButton = ({text}) => {
    return (
        <button
            type="submit"
            className="w-1/2 bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition"
        >
            {text}
        </button>
    );
};

export default SubmitButton;