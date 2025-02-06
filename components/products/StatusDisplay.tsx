import {useTranslations} from "next-intl";

interface StatusDisplayProps {
    IsOutOfStock: boolean;
    status: string;
}

export default function StatusDisplay({ IsOutOfStock, status }: StatusDisplayProps) {

    //@TODO if status is set in Database change this component to use the status from the database

    let statusColor = 'text-green-500';
    const t = useTranslations('Components');
    if (IsOutOfStock) {
        statusColor = 'text-gray-500';
    } else if (status === 'In order') {
        statusColor = 'text-orange-500';
    }

    return (
        <div className={'flex items-center'}>
            <div className={`rounded-3xl w-5 h-5 ${statusColor === 'text-green-500' ? 'bg-green-600' : statusColor === 'text-gray-500' ? 'bg-gray-600' : 'bg-orange-600'}`}></div>
            <div className={`py-3 ml-2 ${statusColor}`}>
                {t(status)}
            </div>
        </div>
    );
}