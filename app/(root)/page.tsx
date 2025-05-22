import HeaderBox from "@/components/HeaderBox";
import RecentTransactions from "@/components/RecentTransactions";
import RightSidebar from "@/components/RightSidebar";
import TotalBalanceBox from "@/components/TotalBalanceBox";
import { getAccount, getAccounts } from "@/lib/actions/bank.actions";
import { getLoggedInUser } from "@/lib/actions/user.actions";
import React from "react";

export const runtime = 'edge';

const Home = async ({ searchParams: { id, page }}: SearchParamProps) => {
  const currentPage = Number(page as string) || 1;
  const loggedIn = await getLoggedInUser();
  
  // Check if user is logged in
  if (!loggedIn) {
    // Redirect to sign-in page or show a message
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-lg">Please sign in to access your banking information</p>
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
      <div className="flex items-center justify-center h-screen">
        <p className="text-lg">No accounts found. Please connect a bank account.</p>
      </div>
    );
  }

  const account = await getAccount({ appwriteItemId });
  
  // Check if account exists
  if (!account) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-lg">Account information unavailable</p>
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
