import ItemsList from "./ItemsList";
import { listItems } from "@/lib/db/item";
import SelectCharity from "@/components/charity/SelectCharity";
import ClaimItemsButton from "./ClaimItemsButton";
import { ItemsProvider } from "./ItemsContext";

export default async function ItemsContainer({ ...props }) {
    const status = props.status;
    const items = await listItems(undefined, undefined, undefined, undefined, undefined, status);

    return (
        <ItemsProvider>
            <div>
                <ItemsList
                    currentUserId={props.currentUserId}
                    items={items}
                    selectable={props.selectable}
                />
                {props.selectable && props.currentUserId && (
                    <SelectCharity userId={props.currentUserId} />
                )}
                {props.selectable && props.currentUserId && <ClaimItemsButton />}
            </div>
        </ItemsProvider>
    );
}
