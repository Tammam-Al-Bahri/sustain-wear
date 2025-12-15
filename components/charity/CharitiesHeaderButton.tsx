import { Button } from "@/components/ui/button";
import Link from "next/link";

export default async function CharitiesHeaderButton() {
    return (
        <Link href="/charities">
            <Button>Charities</Button>
        </Link>
    );
}
