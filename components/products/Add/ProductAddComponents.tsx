'use client';
import ProfilePicture from "@/components/products/ProfilePicture";
import FormEdit from "@/components/products/Add/FormEdit";
import {useTranslations} from "next-intl";
import {useEffect, useState} from "react";

export default function ProductAddComponents() {

    //@TODO add the API call to get format, status and entreprise data and replace props in FormEdit
    const format = ['test', 'test1'];
    const entreprise = ['test', 'test1'];
    const [profileImage, setProfileImage] = useState<string>("/images/placeholder.jpg");

    useEffect(() => {
        // Fetch data from API
    }, [profileImage]);


    const t = useTranslations('Product');

    return (
        <div className={"flex h-full w-full items-center justify-center"}>
            <ProfilePicture onChange={setProfileImage}  />
            <FormEdit entreprise={entreprise} format={format}  status={[t('In stock'), t('In order'), t('Out of stock')]}  />
        </div>
    );
}