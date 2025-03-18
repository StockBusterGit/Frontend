'use client'
import { useTranslations } from "next-intl";
import Toaster from "@/components/Toaster";
import TextInput from "@/components/TextInput";
import { useAuth } from "@/components/context/AuthContext";
import { FormEvent, useState } from "react";
import { createCompany } from "@/utils/fetcher/company";

export default function ProductsPage() {
    const t = useTranslations('Company');

    const [name, setName] = useState('')
    const [toast, setToast] = useState(false)
    const [error, setError] = useState<string>()

    const { user } = useAuth()

    function isFormValid() {
        let error = false
        const isNameValid = name.length > 0
        setError('')

        if(!isNameValid) {
            setError(t('invalid-name'))
            error = true
        }
        return error
    }

    function onSubmit(e: FormEvent<HTMLFormElement>) {
        e.preventDefault()
        console.log(isFormValid())
        if(isFormValid() || !user.id) return
        const data = {
            name: name,
            userId: user.id
        }

        createCompany(data)
            .then(() => {
                setToast(true)
            })
    }

    return (
        <div>
            <h1 className={'title'} >{t('title-add')}</h1>
            <div className={"flex w-full mt-12"}>
                {toast && <Toaster message={t('create-success')} duration={3000} onClose={() => setToast(false)} />}
                <form onSubmit={(e) => onSubmit(e)} className="product-form w-1/2 flex flex-col gap-y-4">
                    <div>
                        <TextInput id="input-name-company" name="input-name-company" label={t('label-name')} value={name} onChange={setName} />
                        {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
                    </div>
                    <button type="submit" className={`bg-secondary h-[43px] w-[168px] text-sm font-semibold py-1.5 text-primary px-8 rounded-md mt-7 hover:bg-opacity-40 transition-all duration-300`}>
                        {t('submit')}
                    </button>
                </form>
            </div>
        </div>
    );
}