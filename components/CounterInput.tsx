import React, { useState, useEffect } from 'react';

interface CounterInputProps {
    initialCount?: number;
    min?: number;
    max?: number;
    onChange: (value: number) => void;
    label?: string;
    className?: string;
    showMaxInLabel?: boolean;
    integer?: boolean;
}

const CounterInput: React.FC<CounterInputProps> = ({ initialCount = 0, min = 0, max, onChange, label, className, showMaxInLabel, integer = false }) => {
    const [count, setCount] = useState<number>(initialCount);

    useEffect(() => {
        onChange(count);
    }, [count, onChange]);

    useEffect(() => {
        if (max !== undefined && count > max) {
            setCount(max);
        }
    }, [max, count]);

    const handleDecrement = () => {
        if (count > min) {
            setCount(prev => prev - 1);
        }
    };

    const handleIncrement = () => {
        if (max === undefined || count < max) {
            setCount(prev => prev + 1);
        }
    };

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const inputValue = event.target.value.replace(',', '.');
        const value = parseFloat(inputValue);

        if (isNaN(value)) return;

        if (integer) {
            setCount(Math.trunc(value));
        } else {
            setCount(Math.trunc(value * 100) / 100);
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
            {label && <label className="font-semibold mb-2 mt-2">{label} {showMaxInLabel && (<span>(Max. {max})</span>)}</label>}
            <div className="flex items-center bg-tertiary bg-opacity-40 rounded-md w-36">
                <button
                    type="button"
                    onClick={handleDecrement}
                    className="px-4 py-2 text-lg font-semibold text-primary hover:bg-tertiary rounded focus:outline-none"
                >
                    -
                </button>
                <input
                    type="number"
                    value={count}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className="w-16 text-center bg-transparent text-primary font-semibold counter-input-hide focus:outline-none"
                />
                <button
                    type="button"
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