const BASE_URL = process.env.NEXT_PUBLIC_API_URL + "companies/";

export const getAllCompanies = async () => {
	try {
		const response = await fetch(BASE_URL);

		const data = await response.json();

		if (!response.ok) throw new Error("❌ Erreur lors de la récupération des entreprises");

		return data;
	} catch (error) {
		console.error("❗ Erreur fetch:", error);
		return null;
	}
};

export const getCompanyById = async (id: string) => {
	try {
		const response = await fetch(`${BASE_URL}/${id}`);
		if (!response.ok) throw new Error(`Entreprise avec ID ${id} non trouvée`);
		return await response.json();
	} catch (error) {
		console.error(error);
		return null;
	}
}

export const createCompany = async (data: Record<string, any>) => {
	try {
		const response = await fetch(BASE_URL, {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify(data),
		});
		if (!response.ok) throw new Error("Erreur lors de la création de l'entreprise");
		return await response.json();
	} catch (error) {
		console.error(error);
		return null;
	}
}

export const updateCompany = async (id: string, data: Record<string, any>) => {
	try {
		const response = await fetch(`${BASE_URL}/${id}`, {
			method: "PUT",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify(data),
		});
		if (!response.ok) throw new Error(`Erreur lors de la mise à jour de l'entreprise ${id}`);
		return await response.json();
	} catch (error) {
		console.error(error);
		return null;
	}
}

export const deleteCompany = async (id: string) => {
	try {
		const response = await fetch(`${BASE_URL}/${id}`, {
			method: "DELETE",
		});
		if (!response.ok) throw new Error(`Erreur lors de la suppression de l'entreprise ${id}`);
		return await response.json();
	} catch (error) {
		console.error(error);
		return null;
	}
}
