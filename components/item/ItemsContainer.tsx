import ItemsList from "./ItemsList";
import { listItems } from "@/lib/db/item";
import SelectCharity from "@/components/charity/SelectCharity";
import ClaimItemsButton from "./ClaimItemsButton";
import { ItemsProvider } from "./ItemsContext";
import { currentUser } from "@clerk/nextjs/server";
import { getUserIdFromClerkId } from "@/lib/db/user";

export default async function ItemsContainer({ ...props }) {
    const clerkUserId = (await currentUser())?.id;
    const currentUserId = await getUserIdFromClerkId(clerkUserId ?? undefined);
    const status = props.status;
    const userId = props.userId;
    const items = await listItems(userId, undefined, undefined, undefined, undefined, status);

    return (
        <ItemsProvider>
            <div>
                <ItemsList
                    currentUserId={currentUserId}
                    items={items}
                    selectable={props.selectable}
                />
                {props.selectable && currentUserId && <SelectCharity userId={currentUserId} />}
                {props.selectable && currentUserId && <ClaimItemsButton />}
            </div>
        </ItemsProvider>
    );
}
