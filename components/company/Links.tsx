'use client';

import ButtonLink from "@/components/ButtonLink";
import {useTranslations} from "next-intl";

export default function LinksCompany() {

	const t = useTranslations('Components');

	return (
		<div className={'flex justify-end mt-4 pb-8 border-b-2 border-tertiary border-opacity-20 mb-10'}>
			<div className={'flex flex-nowrap justify-center items-center space-x-9 '}>
				<ButtonLink link={'/companies/add'} label={t('Create')} />
			</div>
		</div>
	);
}