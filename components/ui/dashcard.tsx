import {Card, CardContent, CardTitle} from "@/components/ui/card";

export function DashCard({title, value}: {title: string, value: string}) {
    return (
        <Card>
            <CardContent >
                <CardTitle>
                    <div className="text-center mb-2">
                        {title}
                    </div>
                </CardTitle>
                <div className="text-xl font-bold justify-center flex mt-4">
                    {value}
                </div>
            </CardContent>
        </Card>
    )
}