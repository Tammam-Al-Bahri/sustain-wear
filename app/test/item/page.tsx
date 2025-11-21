import CreateItemForm from "@/components/item/CreateItemForm";
import ItemsContainer from "@/components/item/ItemsContainer";
import getCurrentUserIdAction from "@/app/actions/getCurrentUserId";
import SelectCharity from "@/components/charity/SelectCharity";

export default async function Test() {
    const { userId } = await getCurrentUserIdAction();
    if (!userId) return <div>Not authenticated</div>;

    return (
        <div className="flex gap-4">
            <div className="flex-col w-full">
                <div className="text-2xl">Create and List Item</div>
                <CreateItemForm />
            </div>

            <div className="flex-col w-full">
                <div className="text-2xl">Items</div>
                <ItemsContainer currentUserId={userId} />
            </div>
            <div className="flex-col w-full">
                <div className="text-2xl">Select Items</div>
                <ItemsContainer currentUserId={userId} selectable={true} />
            </div>
            <SelectCharity userId={userId} />
        </div>
    );
}
