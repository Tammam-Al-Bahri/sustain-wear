"use client";

import { createContext, useContext, useState, Dispatch, SetStateAction } from "react";

export interface ItemsContextType {
    selectedItemIds: string[];
    setSelectedItemIds: Dispatch<SetStateAction<string[]>>;
    selectedCharityId: string;
    setSelectedCharityId: Dispatch<SetStateAction<string>>;
}

const ItemsContext = createContext<ItemsContextType | null>(null);

export function ItemsProvider({ children }: { children: React.ReactNode }) {
    const [selectedItemIds, setSelectedItemIds] = useState<string[]>([]);
    const [selectedCharityId, setSelectedCharityId] = useState<string>("");

    return (
        <ItemsContext.Provider
            value={{
                selectedItemIds,
                setSelectedItemIds,
                selectedCharityId,
                setSelectedCharityId,
            }}
        >
            {children}
        </ItemsContext.Provider>
    );
}

export function useItemsContext() {
    const ctx = useContext(ItemsContext);
    if (!ctx) throw new Error("useItemsContext must be inside ItemsProvider");
    return ctx;
}
