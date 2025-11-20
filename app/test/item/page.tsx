import CreateCharityForm from "@/components/charity/CreateCharityForm";
import CharitiesContainer from "@/components/charity/CharitiesContainer";
import MembershipsContainer from "@/components/membership/MembershipsContainer";
import CreateItemForm from "@/components/item/CreateItemForm";
import ItemsContainer from "@/components/item/ItemsContainer";
import { ItemCategory, ItemCondition, ItemSize, ItemType } from "@prisma/client";
import getCurrentUserIdAction from "@/app/actions/getCurrentUserId";
import CharityCombobox from "@/components/charity/CharityCombobox";

export default async function Test() {
    const { userId } = await getCurrentUserIdAction();

    return (
        <div className="flex gap-4">
            <div className="flex-col w-full">
                <div className="text-2xl">Create and List Item</div>
                <CreateItemForm />
            </div>

            <div className="flex-col w-full">
                <div className="text-2xl">Items</div>
                <ItemsContainer
                    currentUserId={userId}
                    // size={selectedSize as ItemSize}
                    // type={selectedType as ItemType}
                    // category={selectedCategory as ItemCategory}
                    // condition={selectedCondition as ItemCondition}
                />
            </div>
            <div className="flex-col w-full">
                <div className="text-2xl">Select Items</div>
                <CharityCombobox userId={userId} />
                <ItemsContainer currentUserId={userId} selectable={true} />
            </div>
        </div>
    );
}
