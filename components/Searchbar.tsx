import MyIcon from '../public/icons/ic_round-search.svg'
import {useTranslations} from "next-intl";

export default function Searchbar() {
    const t = useTranslations('Components');
    return(
        <div className="bg-tertiary bg-opacity-40 w-[219px] flex py-1 px-4 rounded-[5px]">
            <MyIcon className="text-primary"/>
            <input type="text" placeholder={t('Search')} className="bg-tertiary bg-opacity-0 w-full text-primary placeholder:text-primary font-semibold text-center text-sm hover:border-0 "/>
        </div>
    )
}