import getCurrentUserIdAction from "@/app/actions/getCurrentUserId";
import DonationsContainer from "@/components/donation/DonationsContainer";
import CreateItemForm from "@/components/item/CreateItemForm";
import ItemsContainer from "@/components/item/ItemsContainer";

export default async function YourItems() {
    const { userId } = await getCurrentUserIdAction();
    if (!userId) return <div>Not authenticated</div>;
    return (
        <div className="flex gap-4">
            <div className="flex-col w-full">
                <div className="text-2xl">Create and List Item</div>
                <CreateItemForm />
            </div>

            <div className="flex-col w-full">
                <div className="text-2xl">Your Items</div>
                <ItemsContainer userId={userId} />
            </div>

            <div className="flex-col w-full">
                <div className="text-2xl">Your Donations</div>
                <div className="text-xl">Pending</div>
                <DonationsContainer userId={userId} status="PENDING" />
                <div className="text-xl">Sent</div>
                <DonationsContainer userId={userId} status="SENT" />
                <div className="text-xl">Received by charity</div>
                <DonationsContainer userId={userId} status="RECEIVED" />
            </div>
        </div>
    );
}
