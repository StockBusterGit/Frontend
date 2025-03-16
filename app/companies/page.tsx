import CompanyCard from "@/components/company/CompanyCard";
import ProtectedRoute from "@/components/auth/ProtectedRoute";

export default function CompaniesPages() {
	return (
		<ProtectedRoute>
		<div>
			<h1>Companies</h1>
			<div className="flex flex-wrap gap-4 justify-between">
				{
					[...Array(18)].map((index) => (
						<CompanyCard
							key={index}
							name={"Company Name"}
							image={"https://cdn.futura-sciences.com/sources/images/AI-creation.jpg"}
						/>
					))
				}
			</div>
		</div>
		</ProtectedRoute>
	)
}