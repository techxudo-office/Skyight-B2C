import { FaRegCalendarAlt } from "react-icons/fa";

const InputCard = ({ icon, title, child1, child2 }) => {
    return (
        <div className="bg-gray-200 p-4 rounded-xl w-56 text-base flex flex-col items-start ">
            <div className="flex items-center text-gray-600 mb-2 gap-3">
                <div className="">
                    {icon}
                </div>
                <span className="font-medium">{title}</span>
            </div>
            <div className="text-black font-semibold">{child1}</div>
            <div className="text-gray-600">{child2}</div>
        </div>
    );
};

export default InputCard;
