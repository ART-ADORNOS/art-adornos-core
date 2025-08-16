
const ButtonCancel = ({route}) => {
    return (
        <a href={route}
           className="w-1/2 text-center bg-red-500 text-white py-2 rounded-lg hover:bg-red-600 transition">
            Cancelar
        </a>
    );
};

export default ButtonCancel;