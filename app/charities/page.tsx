import CharitiesContainer from "@/components/charity/CharitiesContainer";
import CreateCharityForm from "@/components/charity/CreateCharityForm";

export default function Charities() {
    return (
        <>
            <section className="flex justify-left w-full rounded-t-[15px] p-4 pb-[15px] pt-2.5 bg-linear-to-r from-[#C9EFC2] to-[#B7D5B2] shadow-[inset_0_-8px_0_0_rgba(58,150,46,0.2),inset_0_0_0_10px_rgba(255,255,255,0.15)] bg-clip-padding">
                <h2 className="text-[23px] font-extrabold text-[#274D22]">
                    Charities
                </h2>
            </section>
            <section className="flex flex-col lg:flex-row p-6 w-full bg-white gap-[20px]">
                <div className="flex flex-col w-full gap-4">
                    <div className="flex items-center justify-center bg-[#EDFFEA] rounded-[15px] px-4 py-3 border-4 border-[#83B47D]">
                        <h3 className="text-[20px] font-bold text-[#274D22]">Create Charity</h3>
                    </div>
                    <div className="bg-[#EDFFEA] rounded-[25px] p-6 border-4 border-[#83B47D] shadow-none">
                        <CreateCharityForm />
                    </div>
                </div>
                <div className="flex flex-col w-full gap-4">
                    <div className="flex items-center justify-center bg-[#EDFFEA] rounded-[15px] px-4 py-3 border-4 border-[#83B47D]">
                        <h3 className="text-[20px] font-bold text-[#274D22]">Active Charities</h3>
                    </div>
                    <div className="bg-[#EDFFEA] rounded-[25px] p-6 border-4 border-[#83B47D] shadow-none">
                        <CharitiesContainer status="ACTIVE" />
                    </div>
                </div>
            </section>
        </>
    );
}
