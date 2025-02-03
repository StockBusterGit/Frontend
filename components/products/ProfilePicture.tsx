import ButtonLink from "@/components/ButtonLink";
import {useTranslations} from "next-intl";
import DeleteButton from "@/components/products/DeleteButton";
import Image from "next/image";

interface ProfilePictureProps {
    src?: string;
}

export default function ProfilePicture({src}: ProfilePictureProps) {
    const t = useTranslations('Product');
    return (
        <div className={"w-1/2 h-full"}>
            <Image src={src || "/images/placeholder.jpg" } width={"300"} height={"300"} alt="Profile Picture" className={""} />
            <div className={"flex mt-4"}>
                <ButtonLink link={"/"} className={""} label={t('Edit')} />
                <DeleteButton label={t('Delete')} />
            </div>
        </div>
    )
}