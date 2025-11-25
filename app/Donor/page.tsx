import { Card } from "@/components/ui/card"
import { currentUser } from "@clerk/nextjs/server";

export default async function Donor() {
  const user = await currentUser();
  return (
    <div>
      <div className="w-screen flex justify-center">
        <p id="welcome-message">Welcome, {user?.firstName}</p>
      </div>
      <Card />
      <h2>Donor</h2>
    </div>
  );
}



