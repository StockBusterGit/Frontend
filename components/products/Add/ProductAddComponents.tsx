import ProfilePicture from "@/components/products/ProfilePicture";
import FormEdit from "@/components/products/Add/FormEdit";

export default function ProductAddComponents() {



    return (
        <div className={"flex h-full w-full"}>
            <ProfilePicture  />
            <FormEdit label={''} entreprise={''} format={''} id={2} description={''} price={2} stock={5} stockMaximum={200}  />
        </div>
    );
}