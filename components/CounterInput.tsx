import React, { useState, useEffect } from 'react';

interface CounterInputProps {
    initialCount?: number;
    min?: number;
    max?: number;
    onChange: (value: number) => void;
    label?: string;
    className?: string;
}

const CounterInput: React.FC<CounterInputProps> = ({ initialCount = 0, min = 0, max, onChange, label, className }) => {
    const [count, setCount] = useState<number>(initialCount);

    useEffect(() => {
        onChange(count);
    }, [count, onChange]);

    const handleDecrement = () => {
        if (count > min) {
            setCount(prev => prev - 1);
        }
    };

    const handleIncrement = () => {
        if (max === undefined || count < max) { // Ne bloque pas si max est undefined
            setCount(prev => prev + 1);
        }
    };

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;
        if (/^\d*$/.test(value)) {
            let newValue = value === "" ? min : parseInt(value, 10);
            if (newValue < min) newValue = min;
            if (max !== undefined && newValue > max) newValue = max;

            setCount(newValue);
        }
    };

    const handleBlur = () => {
        if (count < min) {
            setCount(min);
        } else if (max !== undefined && count > max) {
            setCount(max);
        }
    };

    return (
        <div className={className}>
            {label && <label className="font-semibold mb-2 mt-2">{label}</label>}
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
                    onChange={handleChange}
                    onBlur={handleBlur}
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