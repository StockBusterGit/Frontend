'use client'
import CompanyCard from "@/components/company/CompanyCard";
import { getAllCompanies } from "@/utils/fetcher/company";
import {useEffect, useState} from "react";
import LinksCompany from "@/components/company/Links";
import ProtectedRoute from "@/components/auth/ProtectedRoute";

export default function CompaniesPages() {
	const [companies, setCompanies] = useState<[] | null>(null)
	useEffect(() => {
		const fetchCompanies = async () => {
			try {
				const data = await getAllCompanies();
				setCompanies(data);
			} catch (error) {
				console.error("Erreur lors de la récupération des entreprises :", error);
			}
		};

		fetchCompanies();
	}, []);

	return (
		<ProtectedRoute>
			<h1 className={'title'}>Companies</h1>
			<LinksCompany />
			<div className="flex flex-wrap gap-4 justify-between">
				{companies && companies.length > 0 ? (
					companies.map((company: any) => (
						<CompanyCard
							key={company.id}
							name={company.name}
							image={company.image || "https://cdn.futura-sciences.com/sources/images/AI-creation.jpg"}
						/>
					))
				) : (
					<p>Aucune entreprise trouvée.</p>
				)}
			</div>
		</ProtectedRoute>
	);
}
