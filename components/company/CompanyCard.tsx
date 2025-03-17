'use client'
import Image from "next/image";
import {useState} from "react";
import Link from "next/link";

type CompanyCardProps = {
	id: number;
	name: string;
	image: string;
	handleDelete: (id: number) => void;
}
export default function CompanyCard(props: CompanyCardProps) {
	const { name, image, id, handleDelete } = props;

	const [isOpen, setIsOpen] = useState<boolean>(false)

	return (
		<div className="relative w-64 rounded-2xl overflow-hidden border-4 border-primary text-primary">
			<Image className="w-full h-28 object-cover object-center" src={image} alt={name} width={248} height={112}/>
			<div className="p-2 bg-[#FFF2DF]">
				<h2 className="text-lg font-semibold text-nowrap overflow-ellipsis overflow-hidden">{name}</h2>
			</div>
			<div className="absolute top-3 right-3 bg-[#FFF2DF] rounded text-primary p-1.5">
				{isOpen? (
					<div className="flex flex-col align-end">
						<Link className="hover:bg-secondary p-2"  href={`/companies/edit/${id}`}>Editer</Link>
						<button className="hover:bg-secondary p-2" onClick={() => handleDelete(id)}>Supprimer</button>
					</div>
				) : (
					<button onClick={()=> setIsOpen(true)} className="flex gap-0.5">
						<div className={`w-1 h-1 rounded-full bg-primary`}/>
						<div className={`w-1 h-1 rounded-full bg-primary`}/>
						<div className={`w-1 h-1 rounded-full bg-primary`}/>
					</button>
				)}
			</div>

		</div>
	)
}