
interface ListSelectProps {
    label: string;
}

const CheckboxInput: React.FC<ListSelectProps> = ({ label }) => {
    return (
        <div className="flex items-center">
            <input type="checkbox" className="mr-2 default:bg-tertiary bg-opacity-40 p-4"/>
            <label className={'text-primary font-semibold'}>{label}</label>
        </div>
    )
}

export default CheckboxInput;