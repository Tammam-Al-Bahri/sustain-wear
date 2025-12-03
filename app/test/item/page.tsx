import CreateItemForm from "@/components/item/CreateItemForm";
import ItemsContainer from "@/components/item/ItemsContainer";
import getCurrentUserIdAction from "@/app/actions/getCurrentUserId";
import DonationsContainer from "@/components/donation/DonationsContainer";

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
                <div className="text-2xl">All Items</div>
                <ItemsContainer />
            </div>
            <div className="flex-col w-full">
                <div className="text-2xl">Your Items</div>
                <ItemsContainer userId={userId} />
            </div>
            <div className="flex-col w-full">
                <div className="text-2xl">Select Items</div>
                <ItemsContainer selectable={true} status={"LISTED"} />
            </div>
            <div className="flex-col w-full">
                <div className="text-2xl">All Donations</div>
                <DonationsContainer />
            </div>
            <div className="flex-col w-full">
                <div className="text-2xl">Your Donations</div>
                <div className="text-xl">All</div>
                <DonationsContainer userId={userId} />
                <div className="text-xl">Received</div>
                <DonationsContainer userId={userId} status="RECEIVED" />
                <div className="text-xl">Sent</div>
                <DonationsContainer userId={userId} status="SENT" />
                <div className="text-xl">Pending</div>
                <DonationsContainer userId={userId} status="PENDING" />
            </div>
        </div>
    );
}
