import React from "react";

interface TextInputProps {
    onChange: (value: string ) => void;
    label?: string;
    className?: string;
    placeholder?: string;
    value?: string;
    id?: string;
    name?: string
}

const TextInput: React.FC<TextInputProps>  = (props) => {

    const { onChange, label, className, placeholder, id, name } = props
    const [value, setValue] = React.useState<string | number>('');

    const handleChange= (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;
        setValue(value);
        onChange(value);
    };


    return(
        <div className={'flex flex-col'}>
        <label className={'font-semibold mb-2 mt-2'}>{label}</label>
        <input
            id={id}
            name={name}
            type="text"
            className={`text-primary font-semibold  bg-tertiary bg-opacity-40 py-1.5 px-4 rounded-[4px] ' ${className || ''}' placeholder:text-primary dark:text-white`}
            value={value}
            onChange={handleChange}
            placeholder={placeholder}
        />
        </div>
    )
}

export default TextInput;