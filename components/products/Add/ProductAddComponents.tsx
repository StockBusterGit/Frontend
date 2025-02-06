'use client';
import ProfilePicture from "@/components/products/ProfilePicture";
import FormEdit from "@/components/products/Add/FormEdit";
import {useTranslations} from "next-intl";
import {useEffect, useState} from "react";
import { ProductDataSend} from "@/utils/Interface";

export default function ProductAddComponents() {

    //@TODO add the API call to get format, status and entreprise data and replace props in FormEdit
    const format = ['test', 'test1'];
    const entreprise = ['test', 'test1'];
    const [profileImage, setProfileImage] = useState<string>("/images/placeholder.jpg");

    useEffect(() => {
        // Fetch data from API
    }, [profileImage]);

    const handleFormSubmit = async (productData: ProductDataSend) => {
        console.log("Submitting product:", productData);
        try {
            const response = await fetch(`/api/products`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(productData),
            });

            if (!response.ok) throw new Error('Failed to create product');

            console.log("Product added successfully!");
        } catch (error) {
            console.error("Error adding product:", error);
        }
    };



    const t = useTranslations('Product');

    return (
        <div className={"flex h-full w-full items-center justify-center"}>
            <ProfilePicture onChange={setProfileImage}  />
            <FormEdit entreprise={entreprise} format={format}  status={[t('In stock'), t('In order'), t('Out of stock')]}   onSubmit={handleFormSubmit}/>
        </div>
    );
}