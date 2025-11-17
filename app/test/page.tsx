import CreateCharity from "@/components/CreateCharity";
import JoinCharity from "@/components/JoinCharity";
import SearchCharities from "@/components/SearchCharities";

export default function Test() {
    return (
        <div className="flex gap-4">
            <CreateCharity />
            <SearchCharities />
        </div>
    );
}
