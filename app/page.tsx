import { Button } from "@/components/ui/button";
import Image from "next/image";
import { DashCard } from "@/components/ui/dashcard";

export default function Home() {
    return (
        <main>
            <div className="flex justify-center w-full">
                <div className="flex flex-col gap-4">
                    <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-4">
                        <DashCard
                        title="Total Consumption"
                        value={`500 kWh`}
                        />
                        <DashCard
                        title="Total Active Connections"
                        value={`$100`}
                        />
                        <DashCard title="Total Active Connections" value={`100`} />
                    </div>
                </div>
            </div>
        </main>
    );
}

