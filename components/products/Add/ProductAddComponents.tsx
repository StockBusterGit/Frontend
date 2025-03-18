'use client';
import ProfilePicture from "@/components/products/ProfilePicture";
import FormEdit from "@/components/products/Add/FormEdit";
import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";
import {ProductDataSend, ProductDataSendApi} from "@/utils/Interface";
import { createProductRequest, getStatusRequest, getCompaniesRequest, getTagsRequest } from "@/utils/productRequest";

export default function ProductAddComponent() {
    const [profileImage, setProfileImage] = useState<string>("/images/placeholder.jpg");
    const [statusOptions, setStatusOptions] = useState<{ id: number; label: string }[]>([]);
    const [companyOptions, setCompanyOptions] = useState<{ id: number; label: string }[]>([]);
    const [formatOptions, setFormatOptions] = useState<{ id: number; label: string }[]>([]);
    const t = useTranslations('Product');

    useEffect(() => {
        const fetchData = async () => {
            try {
                const statusData = await getStatusRequest();
                const transformedStatus = statusData.map((status: { id: number; label: string; }) => ({
                    id: status.id,
                    label: status.label,
                }));
                setStatusOptions(transformedStatus);

                const companyData = await getCompaniesRequest();
                const transformedCompanies = companyData.map((company: { id: number; name: string; }) => ({
                    id: company.id,
                    label: company.name,
                }));
                setCompanyOptions(transformedCompanies);

                const tagsData = await getTagsRequest();
                const transformedTags = tagsData.map((tag: { id: number; label: string; }) => ({
                    id: tag.id,
                    label: tag.label,
                }));
                setFormatOptions(transformedTags);
            } catch (error) {
                console.error('Erreur lors de la récupération des données :', error);
            }
        };

        fetchData();
    }, []);

    const handleFormSubmit = async (productData: ProductDataSend) => {
        try {
            const productDataApi: ProductDataSendApi = {
                ...productData,
                statusId: productData.status,
                companyId: productData.company,
                tags: productData.tags.map(tag => tag.id),
            };
            await createProductRequest(productDataApi);
            console.log("Product added successfully!");
        } catch (error) {
            console.error("Error adding product:", error);
        }
    };

    return (
        <div className="flex h-full w-full items-center justify-center">
            <ProfilePicture onChange={setProfileImage} />
            <FormEdit
                onSubmit={handleFormSubmit}
                company={{ id: 0, name: '' }}
                statusEntity={{ id: 0, label: '' }}
                tags={[]}
                statusOptions={statusOptions}
                companyOptions={companyOptions}
                formatOptions={formatOptions}
            />
        </div>
    );
}
