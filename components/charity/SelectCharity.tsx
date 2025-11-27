import listCharitiesAction from "@/app/actions/listCharities";
import CharityCombobox from "@/components/charity/CharityCombobox";

export default async function SelectCharity({ userId }: { userId: string }) {
    const data = await listCharitiesAction(userId);
    return <CharityCombobox items={data} />;
}
