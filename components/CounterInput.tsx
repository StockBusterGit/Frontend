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
    const [inputValue, setInputValue] = useState<string>(initialCount.toString());

    useEffect(() => {
        onChange(parseFloat(inputValue) || 0);
    }, [inputValue, onChange]);

    useEffect(() => {
        const numericValue = parseFloat(inputValue) || 0;
        if (max !== undefined && numericValue > max) {
            setInputValue(max.toString());
        }
    }, [max, inputValue]);

    const handleDecrement = () => {
        let value = parseFloat(inputValue) || 0;
        if (value > min) {
            value -= 1;
            setInputValue(integer ? Math.trunc(value).toString() : (Math.trunc(value * 100) / 100).toString());
        }
    };

    const handleIncrement = () => {
        let value = parseFloat(inputValue) || 0;
        if (max === undefined || value < max) {
            value += 1;
            setInputValue(integer ? Math.trunc(value).toString() : (Math.trunc(value * 100) / 100).toString());
        }
    };

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const newValue = event.target.value.replace(',', '.'); // Convert ',' to '.'

        // Ensure only valid numeric input
        if (/^\d*\.?\d*$/.test(newValue) || newValue === '') {
            setInputValue(newValue);
        }
    };

    const handleBlur = () => {
        let numericValue = parseFloat(inputValue);
        if (isNaN(numericValue)) {
            numericValue = min; // Default to min if input is empty or invalid
        } else if (numericValue < min) {
            numericValue = min;
        } else if (max !== undefined && numericValue > max) {
            numericValue = max;
        }

        setInputValue(integer ? Math.trunc(numericValue).toString() : (Math.trunc(numericValue * 100) / 100).toString());
    };

    return (
        <div className={className}>
            {label && <label className="font-semibold mb-2 mt-2">{label} {showMaxInLabel && (<span>(Max. {max})</span>)}</label>}
            <div className="flex items-center bg-tertiary bg-opacity-40 rounded-md w-36 dark:text-white">
                <button
                    type="button"
                    onClick={handleDecrement}
                    className="px-4 py-2 text-lg font-semibold text-primary hover:bg-tertiary rounded focus:outline-none  dark:text-white"
                >
                    -
                </button>
                <input
                    type="text"
                    value={inputValue}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className="w-16 text-center bg-transparent text-primary font-semibold counter-input-hide focus:outline-none  dark:text-white"
                />
                <button
                    type="button"
                    onClick={handleIncrement}
                    className="px-4 py-2 text-lg font-semibold text-primary hover:bg-tertiary rounded focus:outline-none  dark:text-white"
                >
                    +
                </button>
            </div>
        </div>
    );
};

export default CounterInput;