import { Skeleton } from "@/components/ui/skeleton";

export function DashboardSkeleton() {
  return (
    <section className="home">
      <div className="home-content">
        <header className="home-header">
          {/* HeaderBox Skeleton */}
          <div className="flex flex-col gap-1">
            <Skeleton className="h-8 w-48" />
            <Skeleton className="h-4 w-64" />
          </div>

          {/* TotalBalanceBox Skeleton */}
          <div className="total-balance">
            <div className="total-balance-chart">
              <Skeleton className="h-[120px] w-[120px] rounded-full" />
            </div>
            <div className="flex flex-col gap-6">
              <Skeleton className="h-6 w-32" />
              <div className="flex flex-col gap-2">
                <Skeleton className="h-4 w-24" />
                <Skeleton className="h-8 w-40" />
              </div>
            </div>
          </div>
        </header>

        {/* Recent Transactions Skeleton */}
        <div className="recent-transactions">
          <header className="flex items-center justify-between">
            <Skeleton className="h-7 w-48" />
            <Skeleton className="h-9 w-24 rounded-lg" />
          </header>

          <div className="space-y-4 mt-4">
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="flex items-center justify-between p-4">
                <div className="flex items-center gap-4">
                  <Skeleton className="h-12 w-12 rounded-full" />
                  <div className="space-y-2">
                    <Skeleton className="h-4 w-32" />
                    <Skeleton className="h-3 w-24" />
                  </div>
                </div>
                <Skeleton className="h-6 w-20" />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* RightSidebar Skeleton */}
      <aside className="right-sidebar">
        <section className="flex flex-col pb-8">
          <div className="profile-banner" />
          <div className="profile">
            <Skeleton className="h-16 w-16 rounded-full" />
            <div className="profile-details">
              <Skeleton className="h-6 w-32" />
              <Skeleton className="h-4 w-48 mt-1" />
            </div>
          </div>
        </section>

        <section className="banks">
          <div className="flex w-full justify-between">
            <Skeleton className="h-6 w-24" />
            <Skeleton className="h-9 w-32 rounded-lg" />
          </div>

          <div className="relative flex flex-1 flex-col items-center justify-center gap-5 mt-5">
            <Skeleton className="h-[190px] w-full rounded-lg" />
          </div>
        </section>
      </aside>
    </section>
  );
}

export function BanksSkeleton() {
  return (
    <section className="flex">
      <div className="my-banks">
        <div className="space-y-4">
          <div>
            <Skeleton className="h-8 w-48 mb-2" />
            <Skeleton className="h-4 w-64" />
          </div>

          <div>
            <Skeleton className="h-7 w-32 mb-4" />
            <div className="flex flex-wrap gap-6">
              {[1, 2, 3].map((i) => (
                <Skeleton key={i} className="h-[190px] w-full max-w-[320px] rounded-lg" />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export function TransactionHistorySkeleton() {
  return (
    <section className="transactions">
      <div className="transactions-header">
        <div className="flex flex-col gap-1">
          <Skeleton className="h-8 w-48" />
          <Skeleton className="h-4 w-64" />
        </div>
      </div>

      <div className="space-y-6">
        <div className="transactions-account">
          <div className="flex flex-col gap-2">
            <Skeleton className="h-5 w-32" />
            <Skeleton className="h-4 w-48" />
            <Skeleton className="h-4 w-40" />
          </div>
          <div className="transactions-account-balance">
            <Skeleton className="h-4 w-28" />
            <Skeleton className="h-7 w-24 mt-1" />
          </div>
        </div>

        <section className="flex w-full flex-col gap-6">
          <div className="w-full">
            {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
              <div key={i} className="flex items-center justify-between p-4 border-b">
                <div className="flex items-center gap-4 flex-1">
                  <Skeleton className="h-10 w-10 rounded" />
                  <div className="space-y-2">
                    <Skeleton className="h-4 w-32" />
                    <Skeleton className="h-3 w-24" />
                  </div>
                </div>
                <Skeleton className="h-5 w-20" />
              </div>
            ))}
          </div>
        </section>
      </div>
    </section>
  );
}

export function PaymentTransferSkeleton() {
  return (
    <section className="payment-transfer">
      <div className="flex flex-col gap-1 mb-6">
        <Skeleton className="h-8 w-48" />
        <Skeleton className="h-4 w-96" />
      </div>

      <section className="size-full pt-5">
        <div className="flex flex-col space-y-6">
          {[1, 2, 3, 4, 5].map((i) => (
            <div key={i} className="border-t border-gray-200 pt-5">
              <Skeleton className="h-5 w-32 mb-2" />
              <Skeleton className="h-4 w-64 mb-4" />
              <Skeleton className="h-12 w-full rounded-lg" />
            </div>
          ))}
          <Skeleton className="h-12 w-full rounded-lg mt-6" />
        </div>
      </section>
    </section>
  );
}
