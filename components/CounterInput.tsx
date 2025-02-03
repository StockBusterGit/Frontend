import React, { useState, useEffect } from 'react';

interface CounterInputProps {
    initialCount?: number;
    min?: number;
    max?: number;
    onChange: (value: number) => void; // Ajoute la prop onChange
    label?: string;
    className?: string;
}

const CounterInput: React.FC<CounterInputProps> = ({ initialCount = 0, min = 0, max = 100, onChange, label, className }) => {
    const [count, setCount] = useState<number>(initialCount);

    useEffect(() => {
        onChange(count); // Appelle onChange à chaque changement de count
    }, [count, onChange]);

    const handleDecrement = () => {
        if (count > min) {
            setCount(count - 1);
        }
    };

    const handleIncrement = () => {
        if (count < max) {
            setCount(count + 1);
        }
    };

    return (
        <div className={` ' ${className || ''}' placeholder:text-primary`}>
            <label className={'font-semibold mb-2 mt-2'}>{label}</label>
            <div className="flex items-center bg-tertiary bg-opacity-40 rounded-md w-36">
                <button
                    onClick={handleDecrement}
                    className="px-4 py-2 text-lg font-semibold text-primary hover:bg-tertiary rounded focus:outline-none"
                >
                    -
                </button>
                <input
                    type="text"
                    value={count}
                    readOnly
                    className="w-16 text-center bg-transparent text-primary font-semibold focus:outline-none"
                />
                <button
                    onClick={handleIncrement}
                    className="px-4 py-2 text-lg font-semibold text-primary hover:bg-tertiary rounded focus:outline-none"
                >
                    +
                </button>
            </div>
        </div>
    );
};

export default CounterInput;