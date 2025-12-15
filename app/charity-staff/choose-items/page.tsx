import ItemsContainer from "@/components/item/ItemsContainer";

export default function ChooseItems() {
    return (
        <div className="flex gap-4">
            <div className="flex-col w-full">
                <div className="text-2xl">Select Items to Request Donation</div>
                <ItemsContainer selectable={true} status={"LISTED"} />
            </div>
        </div>
    );
}
