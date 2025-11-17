import { getCharities } from "@/lib/db/charity";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import JoinCharity from "./JoinCharity";

export default async function SearchCharities() {
    const charities = await getCharities();
    return (
        <div className="w-full">
            <Card className="mb-4">
                <CardHeader>
                    <CardTitle>Find charities</CardTitle>
                </CardHeader>
                {/* <CardContent className="flex flex-col gap-4">
                    <Input name="search" type="search" placeholder="Search..." />
                    <Button type="submit">Submit</Button>
                </CardContent> */}
            </Card>
            <div className="flex-col">
                {charities.map(({ id, name, description, status, createdAt }) => (
                    <Card key={id} className="my-4 w-full">
                        <CardHeader>
                            <CardTitle>{name}</CardTitle>
                            <CardDescription>Joined {createdAt.toDateString()}</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <CardDescription>{description}</CardDescription>
                            {status == "ACTIVE" && <JoinCharity charityId={id} />}
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    );
}
