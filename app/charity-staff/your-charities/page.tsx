import getCurrentUserIdAction from "@/app/actions/getCurrentUserId";
import CharitiesContainer from "@/components/charity/CharitiesContainer";
import MembershipsContainer from "@/components/membership/MembershipsContainer";

export default async function YourCharities() {
    const { userId } = await getCurrentUserIdAction();
    return (
        <>
            <section className="flex justify-left w-full rounded-t-[15px] p-4 pb-[15px] pt-2.5 bg-linear-to-r from-[#C9EFC2] to-[#B7D5B2] shadow-[inset_0_-8px_0_0_rgba(58,150,46,0.2),inset_0_0_0_10px_rgba(255,255,255,0.15)] bg-clip-padding">
                <h2 className="text-[23px] font-extrabold text-[#274D22]">
                    Your Charities
                </h2>
            </section>
            <section className="flex flex-col lg:flex-row p-6 w-full bg-white gap-[20px]">
                <div className="flex flex-col w-full gap-4">
                    <div className="flex items-center justify-center bg-[#EDFFEA] rounded-[15px] px-4 py-3 border-4 border-[#83B47D]">
                        <h3 className="text-[20px] font-bold text-[#274D22]">Charities You Created</h3>
                    </div>
                    <div className="bg-[#EDFFEA] rounded-[25px] p-6 border-4 border-[#83B47D] shadow-none">
                        <CharitiesContainer creatorId={userId} />
                    </div>
                </div>

                <div className="flex flex-col w-full gap-4">
                    <div className="flex items-center justify-center bg-[#EDFFEA] rounded-[15px] px-4 py-3 border-4 border-[#83B47D]">
                        <h3 className="text-[20px] font-bold text-[#274D22]">Joined Charities (Memberships)</h3>
                    </div>
                    <div className="bg-[#EDFFEA] rounded-[25px] p-6 border-4 border-[#83B47D] shadow-none flex flex-col gap-6">
                        <div className="flex flex-col gap-3">
                            <h4 className="text-[17px] font-semibold text-[#3D533A]">All Your Memberships</h4>
                            <MembershipsContainer />
                        </div>
                        <div className="flex flex-col gap-3">
                            <h4 className="text-[17px] font-semibold text-[#3D533A]">Active Memberships</h4>
                            <MembershipsContainer status="ACTIVE" />
                        </div>
                        <div className="flex flex-col gap-3">
                            <h4 className="text-[17px] font-semibold text-[#3D533A]">Pending Memberships</h4>
                            <MembershipsContainer status="PENDING_APPROVAL" />
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}
