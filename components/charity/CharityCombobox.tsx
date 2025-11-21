"use client";

import { Combobox, ComboboxItem } from "@/components/combobox";
import { useItemsContext } from "@/components/item/ItemsContext";

export default function CharityCombobox({ items }: { items: ComboboxItem[] }) {
    const { selectedCharityId, setSelectedCharityId } = useItemsContext();

    return (
        <Combobox
            label="Charity*"
            items={items}
            value={selectedCharityId}
            onValueChange={setSelectedCharityId}
        />
    );
}
