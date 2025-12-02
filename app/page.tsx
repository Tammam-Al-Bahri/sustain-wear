// app/page.tsx
import { Metadata } from "next";
import ClientPage from "./page-client";

export const metadata: Metadata = {
  title: "SustainWear",
  description: "SustainWear Home Page",
};

export default function Home() {
  return <ClientPage />;
}


