import { DashCard } from "@/components/ui/dashcard";

export default function donorStats () {
    return(
        <main>
            <div className="flex p-4 justify-center items-start text-2xl font-bold">
                <h1>Your Stats</h1>
            </div>
             <div className="flex p-4 justify-center items-start">
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4">
                                <DashCard
                                    title="Total Donotions"
                                    value={"coming soon"}
                                />
                                <DashCard
                                    title="Total CO2 emmissions saved"
                                    value={"coming soon"}
                                />
                            </div>
                        </div>
        </main>

    )
}