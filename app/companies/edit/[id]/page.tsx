'use client'
import { useTranslations } from "next-intl";
import Toaster from "@/components/Toaster";
import TextInput from "@/components/TextInput";
import { useAuth } from "@/components/context/AuthContext";
import {FormEvent, useEffect, useState} from "react";
import {getCompanyById, updateCompany} from "@/utils/fetcher/company";
import { useParams } from "next/navigation";

export default function EditProductPage() {
    const t = useTranslations('Company');

    const [name, setName] = useState('')
    const [userId, setUserId] = useState('')
    const [toast, setToast] = useState(false)
    const [error, setError] = useState<string>()

    const { user } = useAuth()

    const params = useParams()

    useEffect(()=> {
        const { id } = params
        if(!id) return
        const companyId = Array.isArray(id) ? id[0] : id
        getCompanyById(companyId)
            .then((res)=> {
                setName(res.name)
                setUserId(res.userId)
            })
    },[])

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
        if(isFormValid() || !user.id) return
        const data = {
            name: name,
            userId :userId
        }

        const { id } = params
        if(!id) return
        const companyId = Array.isArray(id) ? id[0] : id

        updateCompany(companyId, data)
            .then(() => {
                setToast(true)
            })
    }

    return (
        <div>
            <h1 className={'title'} >{t('title-edit')}</h1>
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