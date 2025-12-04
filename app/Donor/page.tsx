import { Card } from "@/components/ui/card"
import { currentUser } from "@clerk/nextjs/server";
import ClientPage from "../page-client";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "SustainWear Donor",
  description: "Donor Home Page",
};

export default async function Donor() {
  const user = await currentUser();
  return (<ClientPage />
  );
}