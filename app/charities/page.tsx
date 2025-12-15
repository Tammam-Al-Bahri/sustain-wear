import CharitiesContainer from "@/components/charity/CharitiesContainer";
import CreateCharityForm from "@/components/charity/CreateCharityForm";

export default function Charities() {
    return (
        <div className="flex gap-4">
            <div className="flex-col w-full">
                <div className="text-2xl">Create Charity</div>
                <CreateCharityForm />
            </div>
            <div className="flex-col w-full">
                <div className="text">Active Charities</div>
                <CharitiesContainer status="ACTIVE" />
            </div>
        </div>
    );
}
