'use client';
import Searchbar from "@/components/Searchbar";
import ListPageInput from "@/components/ListPageInput";
import FilterInput from "@/components/FilterInput";
import CheckboxInput from "@/components/CheckboxInput";
import {useEffect, useState} from "react";
import TextInput from "@/components/TextInput";
import CounterInput from "@/components/CounterInput";
import SelectInput from "@/components/SelectInput";

export default function Filter() {

    const [text, setText] = useState<string>('');
    const [counter, setCounter] = useState<number>(0);
    const options = ["1", "2", "3"];
    const options2 = ["option 1", "option 2", "option 3"];

    useEffect(() => {
        console.log(text);
        console.log(counter);
    }, [text]);

    const handleSelect = (value: string) => {
        console.log(value);
    }


    return (

        <div>
            <h1>Products</h1>
            <Searchbar/>
            <div className="mt-4">
                <ListPageInput onSelect={handleSelect} options={options}/>
            </div>
            <div className={'mt-4'}>
                <FilterInput onSelect={handleSelect} />
            </div>
            <div className={'mt-4'}>
                <CheckboxInput label={'En rupture'}/>
            </div>
            <div className={'mt-4'}>
                <TextInput onChange={setText} label={"test"} placeholder={'Test'} />
            </div>
            <div className={'mt-4'}>
                <CounterInput onChange={setCounter}/>
            </div>
            <div className={'mt-4'}>
                <SelectInput options={options2} onSelect={handleSelect} />
            </div>
        </div>

    );
}