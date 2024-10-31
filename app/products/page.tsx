'use client';
import Searchbar from "@/components/Searchbar";
import ListPageInput from "@/components/ListPageInput";
import FilterInput from "@/components/FilterInput";
import CheckboxInput from "@/components/CheckboxInput";

export default function ProductsPage() {


	const options = ["1", "2", "3"];

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
	  </div>

  );
}