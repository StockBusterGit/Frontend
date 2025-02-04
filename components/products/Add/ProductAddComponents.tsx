import ProfilePicture from "@/components/products/ProfilePicture";
import FormEdit from "@/components/products/Add/FormEdit";

export default function ProductAddComponents() {



    return (
        <div className={"flex h-full w-full"}>
            <ProfilePicture />
            <FormEdit label={''} entreprise={['test', 'test1']} format={['test', 'test1']} id={2} description={''} status={['En commande', 'En stock']} price={2} stock={5} stockMaximum={200} stockMinimum={20}  />
        </div>
    );
}