import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { isCharityCreatorOrStaff } from "@/lib/db/charity";
import DonationButton from "./DonationButton";

export default async function DonationCard({
    donation,
    currentUserId,
}: {
    donation: any;
    currentUserId?: string;
}) {
    const { id, status, item, charity } = donation;
    if (!currentUserId) return <div>Not authenticated</div>;
    const isStaff = await isCharityCreatorOrStaff(currentUserId, charity.id);

    return (
        <Card>
            <CardHeader>
                <CardTitle>Item: {item.name}</CardTitle>
                <CardDescription>Charity: {charity.name}</CardDescription>
            </CardHeader>
            <CardContent>
                <div>
                    {item.imageUrls.map((url: string) => (
                        <img key={url} src={url} />
                    ))}
                </div>
                <CardDescription>Status: {status.toLowerCase()}</CardDescription>
                {status === "PENDING" && currentUserId === item.userId && (
                    <DonationButton donationId={id} status={status} />
                )}
                {status === "SENT" && isStaff && <DonationButton donationId={id} status={status} />}
            </CardContent>
        </Card>
    );
}
