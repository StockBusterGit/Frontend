interface CheckboxInputProps {
    label: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    checked: boolean;
}

const CheckboxInput: React.FC<CheckboxInputProps> = ({ label, onChange, checked }) => {
    return (
        <div className="flex items-center">
            <input type="checkbox" className="mr-2 default:bg-tertiary bg-opacity-40 p-4 " onChange={onChange} checked={checked} />
            <label className={'text-primary font-semibold dark:text-white'}>{label}</label>
        </div>
    );
}

export default CheckboxInput;