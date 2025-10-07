import HeaderBox from "@/components/HeaderBox";
import RecentTransactions from "@/components/RecentTransactions";
import RightSidebar from "@/components/RightSidebar";
import TotalBalanceBox from "@/components/TotalBalanceBox";
import { getAccount, getAccounts } from "@/lib/actions/bank.actions";
import { getLoggedInUser } from "@/lib/actions/user.actions";
import { AlertCircle } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export const runtime = 'edge';

const Home = async ({ searchParams: { id, page }}: SearchParamProps) => {
  const currentPage = Number(page as string) || 1;
  const loggedIn = await getLoggedInUser();
  
  // Check if user is logged in
  if (!loggedIn) {
    return (
      <div className="flex flex-col items-center justify-center h-screen gap-4">
        <AlertCircle className="w-12 h-12 text-yellow-500" />
        <h2 className="text-2xl font-semibold">Authentication Required</h2>
        <p className="text-gray-600">Please sign in to access your banking information</p>
        <Button asChild>
          <Link href="/sign-in">Go to Sign In</Link>
        </Button>
      </div>
    );
  }

  const accounts = await getAccounts({ 
    userId: loggedIn.$id
  })

  if (!accounts) return;

  const accountsData = accounts?.data;
  const appwriteItemId = (id as string) || accountsData?.[0]?.appwriteItemId;

  // Check if appwriteItemId exists
  if (!appwriteItemId) {
    return (
      <div className="flex flex-col items-center justify-center h-screen gap-4">
        <AlertCircle className="w-12 h-12 text-blue-500" />
        <h2 className="text-2xl font-semibold">No Bank Accounts Connected</h2>
        <p className="text-gray-600 text-center max-w-md">
          You haven&apos;t connected any bank accounts yet. Connect a bank account to get started with Horizon.
        </p>
      </div>
    );
  }

  const account = await getAccount({ appwriteItemId });
  
  // Check if account exists
  if (!account) {
    return (
      <div className="flex flex-col items-center justify-center h-screen gap-4">
        <AlertCircle className="w-12 h-12 text-red-500" />
        <h2 className="text-2xl font-semibold">Account Unavailable</h2>
        <p className="text-gray-600">Unable to load account information. Please try again later.</p>
      </div>
    );
  }

  return (
    <section className="home">
      <div className="home-content">
        <header className="home-header">
          <HeaderBox
            type="greeting"
            title="Welcome"
            user={loggedIn?.firstName || "Guest"}
            subtext="Access and manage your account and transactions efficiently."
          />

          <TotalBalanceBox
            accounts={accountsData}
            totalBanks={accounts?.totalBanks}
            totalCurrentBalance={accounts.totalCurrentBalance}
          />
        </header>

        <RecentTransactions 
        accounts ={accountsData}
        transactions={account?.transactions}
        appwriteItemId={appwriteItemId}
        page={currentPage}
        />
      </div>

      <RightSidebar
        user={loggedIn}
        transactions={account?.transactions || []}
        banks={accountsData?.slice(0,2) || []}
       />
    </section>
  );
};

export default Home;
