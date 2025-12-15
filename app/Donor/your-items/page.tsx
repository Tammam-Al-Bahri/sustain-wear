import getCurrentUserIdAction from "@/app/actions/getCurrentUserId";
import DonationsContainer from "@/components/donation/DonationsContainer";
import CreateItemForm from "@/components/item/CreateItemForm";
import ItemsContainer from "@/components/item/ItemsContainer";

export default async function YourItems() {
    const { userId } = await getCurrentUserIdAction();
    if (!userId) return <div>Not authenticated</div>;
    return (
        <>
            <section className="flex justify-left w-full rounded-t-[15px] p-4 pb-[15px] pt-2.5 bg-linear-to-r from-[#C9EFC2] to-[#B7D5B2] shadow-[inset_0_-8px_0_0_rgba(58,150,46,0.2),inset_0_0_0_10px_rgba(255,255,255,0.15)] bg-clip-padding">
                <h2 className="text-[23px] font-extrabold text-[#274D22]">
                    Your Items & Donations
                </h2>
            </section>
            <section className="flex flex-col p-6 w-full bg-white gap-[20px]">
                <div className="flex flex-col lg:flex-row gap-6 w-full">
                    {/* Create Item Section */}
                    <div className="flex flex-col w-full lg:w-1/2 gap-4">
                        <div className="flex items-center justify-center bg-[#EDFFEA] rounded-[15px] px-4 py-3 border-4 border-[#83B47D]">
                            <h3 className="text-[20px] font-bold text-[#274D22]">Create and List Item</h3>
                        </div>
                        <div className="bg-[#EDFFEA] rounded-[25px] p-6 border-4 border-[#83B47D] shadow-none">
                            <CreateItemForm />
                        </div>
                    </div>

                    {/* Your Items Section */}
                    <div className="flex flex-col w-full lg:w-1/2 gap-4">
                        <div className="flex items-center justify-center bg-[#EDFFEA] rounded-[15px] px-4 py-3 border-4 border-[#83B47D]">
                            <h3 className="text-[20px] font-bold text-[#274D22]">Your Items</h3>
                        </div>
                        <div className="bg-[#EDFFEA] rounded-[25px] p-6 border-4 border-[#83B47D] shadow-none">
                            <ItemsContainer userId={userId} />
                        </div>
                    </div>
                </div>

                <div className="flex flex-col w-full gap-4">
                    <div className="flex items-center justify-center bg-[#EDFFEA] rounded-[15px] px-4 py-3 border-4 border-[#83B47D]">
                        <h3 className="text-[20px] font-bold text-[#274D22]">Your Donations</h3>
                    </div>
                    <div className="bg-[#EDFFEA] rounded-[25px] p-6 border-4 border-[#83B47D] shadow-none">
                        <div className="flex flex-col gap-6">
                            <div className="flex flex-col gap-3">
                                <h4 className="text-[17px] font-semibold text-[#3D533A]">Pending</h4>
                                <DonationsContainer userId={userId} status="PENDING" />
                            </div>
                            <div className="flex flex-col gap-3">
                                <h4 className="text-[17px] font-semibold text-[#3D533A]">Sent</h4>
                                <DonationsContainer userId={userId} status="SENT" />
                            </div>
                            <div className="flex flex-col gap-3">
                                <h4 className="text-[17px] font-semibold text-[#3D533A]">Received by Charity</h4>
                                <DonationsContainer userId={userId} status="RECEIVED" />
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}
