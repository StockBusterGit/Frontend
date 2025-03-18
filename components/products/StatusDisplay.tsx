import { useTranslations } from "next-intl";

interface StatusDisplayProps {
    IsOutOfStock: boolean;
    status: string;
}

export default function StatusDisplay({ IsOutOfStock, status }: StatusDisplayProps) {
    let statusColor = 'text-green-500';
    let bgColor = 'bg-green-600';
    const t = useTranslations('Components');

    if (IsOutOfStock) {
        statusColor = 'text-gray-500';
        bgColor = 'bg-gray-600';
    } else {
        switch (status) {
            case 'Inactif':
                statusColor = 'text-red-500';
                bgColor = 'bg-red-600';
                break;
            case 'Rupture de stock':
                statusColor = 'text-red-500';
                bgColor = 'bg-red-600';
                break;
            case 'En commande':
                statusColor = 'text-orange-500';
                bgColor = 'bg-orange-600';
                break;
            case 'Bientôt en rupture':
                statusColor = 'text-yellow-500';
                bgColor = 'bg-yellow-600';
                break;
            case 'Arrêté':
                statusColor = 'text-gray-500';
                bgColor = 'bg-gray-600';
                break;
            case 'En promotion':
                statusColor = 'text-blue-500';
                bgColor = 'bg-blue-600';
                break;
            default:
                statusColor = 'text-green-500';
                bgColor = 'bg-green-600';
                break;
        }
    }

    return (
        <div className={'flex items-center'}>
            <div className={`rounded-3xl w-5 h-5 ${bgColor}`}></div>
            <div className={`py-3 ml-2 ${statusColor}`}>
                {t(status)}
            </div>
        </div>
    );
}
