import { Card, CardHeader, CardContent, CardTitle, CardDescription } from "@/components/ui/card";
import CreateMembershipButton from "@/components/membership/CreateMembershipButton";
import UpdateCharityStatus from "@/components/charity/UpdateCharityStatusButton";
import { Charity } from "@prisma/client";
import MembershipsContainer from "@/components/membership/MembershipsContainer";
import { isMember } from "@/lib/db/membership";
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";

export default async function CharityCard({
    charity,
    currentUserId,
    clerkRole,
}: {
    charity: Charity;
    currentUserId?: string | null;
    clerkRole?: string;
}) {
    const { id, name, description, address, status, createdAt, creatorId } = charity;

    const member = currentUserId ? await isMember(currentUserId, charity.id) : false;
    const isCreator = currentUserId === creatorId;
    const canJoin = status === "ACTIVE" && !isCreator && !member;
    const isAdmin = clerkRole === "admin";

    return (
        <Card className="w-full">
            <CardHeader>
                <CardTitle>Charity: {name}</CardTitle>
                <CardDescription>{description}</CardDescription>
                <CardDescription>{address}</CardDescription>
            </CardHeader>

            <CardContent>
                <CardDescription>Created: {createdAt.toDateString()}</CardDescription>
                <CardDescription>Status: {status.toLowerCase().replace("_", " ")}</CardDescription>

                {canJoin && <CreateMembershipButton charityId={id} />}

                {isCreator && (
                    <div>
                        <Accordion type="single" collapsible>
                            <AccordionItem value="item-2">
                                <AccordionTrigger>Membership requests</AccordionTrigger>
                                <AccordionContent>
                                    <MembershipsContainer
                                        charityId={id}
                                        status="PENDING_APPROVAL"
                                    />
                                </AccordionContent>
                            </AccordionItem>
                        </Accordion>
                    </div>
                )}

                <Accordion type="single" collapsible>
                    <AccordionItem value="item-1">
                        <AccordionTrigger>Members</AccordionTrigger>
                        <AccordionContent>
                            <MembershipsContainer charityId={id} status="ACTIVE" />
                        </AccordionContent>
                    </AccordionItem>
                </Accordion>

                {isAdmin && (
                    <div>
                        Charity status: {status.toLowerCase().replace("_", " ")}
                        <UpdateCharityStatus charityId={id} status={status} />
                    </div>
                )}
            </CardContent>
        </Card>
    );
}
