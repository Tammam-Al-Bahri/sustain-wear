"use client";

import { Combobox } from "@/components/combobox";
import { listMemberships } from "@/lib/db/membership";
import { useState, useTransition, useEffect } from "react";

export default function CharityCombobox({ userId }: { userId?: string }) {
    const [selectedCharity, setSelectedCharity] = useState("");
    const [charityFields, setCharityFields] = useState<{ value: string; label: string }[]>([]);
    const [isPending, startTransition] = useTransition();

    function getCharities() {
        startTransition(async () => {
            const memberships = await listMemberships(userId);

            const mapped = memberships.map((m) => ({
                value: m.charity.id,
                label: m.charity.name,
            }));

            setCharityFields(mapped);
        });
    }

    useEffect(() => {
        getCharities();
    }, []);

    return (
        <Combobox
            label="Charity*"
            fields={charityFields}
            value={selectedCharity}
            onValueChange={setSelectedCharity}
        />
    );
}
