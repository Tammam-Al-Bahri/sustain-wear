import { DataTable } from "./data-table";
import { columns, Donations } from "./columns";
import { Card, CardContent } from "@/components/ui/card";

async function getData(): Promise<Donations[]> {
  return [
    {
      id: "1",
      donorName: "John Doe",
      item: 5,
      date: "2023-10-01",
      status: "Completed",
    },
        {
      id: "1",
      donorName: "John Doe",
      item: 5,
      date: "2023-10-01",
      status: "Completed",
    },    {
      id: "1",
      donorName: "John Doe",
      item: 5,
      date: "2023-10-01",
      status: "Completed",
    },    {
      id: "1",
      donorName: "John Doe",
      item: 5,
      date: "2023-10-01",
      status: "Completed",
    },    {
      id: "1",
      donorName: "John Doe",
      item: 5,
      date: "2023-10-01",
      status: "Completed",
    },
  ];
}

interface Card {
  title: string;
  stat: string;
}

const statistics: Card[] = [
  { title: "Awaiting reviews pending donations", stat: "2,200" },
  { title: "Processed items approved today", stat: "15,000" },
  { title: "Total items in the inventory", stat: "3,200" },
  { title: "Items processed this month", stat: "150K" },
];

export default async function CharityStaff() {
  const data = await getData();

  return (
    <>
      <section
        className="flex justify-left w-full rounded-t-[15px]  p-4 pb-[15px] pt-2.5 bg-linear-to-r from-[#C9EFC2] to-[#B7D5B2]
      shadow-[inset_0_-8px_0_0_rgba(58,150,46,0.2),inset_0_0_0_10px_rgba(255,255,255,0.15)] bg-clip-padding 
      border-b-
      "
      >
        <h2 className="text-[23px] font-extrabold text-[#274D22]">
          Charity Staff - Dashboard
        </h2>
      </section>
      <section className="p-4 w-full bg-white ">
        <div className=" flex flex-col p-4 gap-5 rounded-[15px] border-4 border-[rgba(196,255,188,0.5)] ">
          <div className="flex w-full flex-row gap-[55px] justify-center h-[123px]">
            {statistics.map((s) => (
              <Card
                key={s.title}
                className="flex flex-col gap-2 justify-center bg-[#EDFFEA]  h-full w-full rounded-[25px] px-[25px] py-5  border-4  border-[#83B47D] shadow-none "
              >
                <CardContent className="text-center flex flex-col  gap-2 p-0">
                  <p className="text-[14px] font-normal text-[#4B6B4B]">{s.title}</p>
                  <p className="text-[17px] font-black text-[#3D533A]">
                    {s.stat}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
          <div className="border-4 border-b-0 border-r-0 overflow-clip border-solid rounded-[15px]  bg-linear-to-b from-white to-[#EDFFEA] ">
            <DataTable columns={columns} data={data} />
          </div>
        </div>
      </section>
    </>
  );
}
