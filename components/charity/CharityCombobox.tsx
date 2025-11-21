"use client";

import { Combobox, ComboboxItem } from "@/components/combobox";
import { useState } from "react";

export default function CharityCombobox({ items }: { items: ComboboxItem[] }) {
    const [selectedCharity, setSelectedCharity] = useState("");

    return (
        <Combobox
            label="Charity*"
            items={items}
            value={selectedCharity}
            onValueChange={setSelectedCharity}
        />
    );
}
