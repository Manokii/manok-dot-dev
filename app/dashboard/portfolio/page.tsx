import { PortfolioForm } from "./_form";
import { authOptions } from "@/server/auth-options";
import { getPortfolio } from "@/queries";
import { getServerSession } from "next-auth/next";
import { redirect } from "next/navigation";
import { PortfolioDangerZone } from "./_danger_zone";

export default async function PortfolioDashboard() {
  const session = await getServerSession(authOptions);
  if (!session?.user) {
    redirect("/sign-in");
  }

  const portfolio = await getPortfolio(session.user.id);
  if (!portfolio) {
    redirect("/");
  }

  return (
    <div className="flex flex-col gap-4">
      <PortfolioForm portfolio={portfolio} />
      <PortfolioDangerZone />
    </div>
  );
}
