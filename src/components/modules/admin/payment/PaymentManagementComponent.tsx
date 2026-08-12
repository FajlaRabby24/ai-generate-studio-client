"use client";

import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import {
  CreditCard,
  Search,
  Loader2,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { getAdminPaymentsService } from "@/services/dashboard/admin/admin.service";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function PaymentManagementComponent() {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchVal, setSearchVal] = useState("");
  const [page, setPage] = useState(1);
  const limit = 10;

  const { data: paymentsRes, isLoading } = useQuery({
    queryKey: ["adminPayments", page, searchVal],
    queryFn: () =>
      getAdminPaymentsService({
        page,
        limit,
        search: searchVal || undefined,
      }),
  });

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSearchVal(searchTerm);
    setPage(1);
  };

  const handleClearFilters = () => {
    setSearchTerm("");
    setSearchVal("");
    setPage(1);
  };

  // Backend response returns paginated object: { data, meta }
  const rawData = paymentsRes?.data as any;
  const paymentsList = Array.isArray(rawData) ? rawData : [];
  const meta = (paymentsRes as any)?.meta || { total: 0, totalPages: 1 };

  return (
    <div className="p-6 space-y-6 max-w-[1600px] mx-auto">
      {/* Title */}
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-neutral-900 dark:text-neutral-100 flex items-center gap-2">
          <CreditCard className="w-6 h-6 text-violet-500" />
          Payments Ledger
        </h1>
        <p className="text-xs text-neutral-500 mt-1.5">
          View and trace Stripe checkout payment transactions and invoice references.
        </p>
      </div>

      {/* Control Bar */}
      <div className="bg-white dark:bg-neutral-900/30 border border-neutral-200 dark:border-neutral-800 rounded-3xl p-6 shadow-xs">
        <form onSubmit={handleSearchSubmit} className="flex flex-col md:flex-row gap-4 items-center">
          <div className="relative w-full md:flex-1">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400" />
            <Input
              type="text"
              placeholder="Search by transaction ID, name or email..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 h-10 rounded-xl bg-neutral-50/50 dark:bg-neutral-950/20 border-neutral-250 dark:border-neutral-850 text-xs"
            />
          </div>

          <div className="flex gap-4 items-center w-full md:w-auto">
            <Button
              type="submit"
              className="h-10 rounded-xl bg-violet-600 hover:bg-violet-700 text-white font-bold text-xs px-5 shadow-xs cursor-pointer"
            >
              Search
            </Button>

            {searchVal && (
              <Button
                type="button"
                variant="ghost"
                onClick={handleClearFilters}
                className="h-10 rounded-xl font-bold text-xs px-4 text-neutral-500 hover:bg-neutral-100 dark:hover:bg-neutral-850 border border-neutral-250 dark:border-neutral-850 cursor-pointer"
              >
                Clear
              </Button>
            )}
          </div>
        </form>
      </div>

      {/* Main Table view */}
      <div className="bg-white dark:bg-neutral-900/30 border border-neutral-200 dark:border-neutral-800 rounded-3xl overflow-hidden shadow-xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-neutral-100 dark:border-neutral-850 bg-neutral-50/40 dark:bg-neutral-950/10 text-xs font-bold text-neutral-450 dark:text-neutral-550 uppercase">
                <th className="py-4.5 px-6">User details</th>
                <th className="py-4.5 px-6">Stripe Transaction ID</th>
                <th className="py-4.5 px-6">Gross Amount</th>
                <th className="py-4.5 px-6">Gateway</th>
                <th className="py-4.5 px-6">Activated Plan</th>
                <th className="py-4.5 px-6">Payment Status</th>
                <th className="py-4.5 px-6">Transaction Date</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-100 dark:divide-neutral-850">
              {isLoading ? (
                <tr>
                  <td colSpan={7} className="py-20 text-center">
                    <div className="flex flex-col items-center gap-3">
                      <Loader2 className="w-8 h-8 text-violet-500 animate-spin" />
                      <span className="text-xs text-neutral-400 font-medium">Fetching transaction ledger logs...</span>
                    </div>
                  </td>
                </tr>
              ) : paymentsList.length === 0 ? (
                <tr>
                  <td colSpan={7} className="py-20 text-center">
                    <div className="flex flex-col items-center gap-2">
                      <CreditCard className="w-10 h-10 text-neutral-300 dark:text-neutral-800" />
                      <span className="text-xs text-neutral-450 font-bold">No payments records found matching query.</span>
                    </div>
                  </td>
                </tr>
              ) : (
                paymentsList.map((item: any) => {
                  return (
                    <tr key={item.id} className="hover:bg-neutral-50/40 dark:hover:bg-neutral-950/10 transition-colors">
                      {/* Name / Email */}
                      <td className="py-4 px-6">
                        <div className="flex items-center gap-3">
                          <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-violet-600 to-indigo-600 text-white font-bold flex items-center justify-center shadow-xs">
                            {item?.user?.name?.substring(0, 1)?.toUpperCase() || "A"}
                          </div>
                          <div className="flex flex-col text-left">
                            <span className="text-xs font-bold text-neutral-800 dark:text-neutral-200">
                              {item?.user?.name || "Anonymous User"}
                            </span>
                            <span className="text-[10px] text-neutral-450 dark:text-neutral-550 mt-0.5">
                              {item?.user?.email || "unknown@stripe.com"}
                            </span>
                          </div>
                        </div>
                      </td>

                      {/* Transaction ID */}
                      <td className="py-4 px-6 text-xs font-mono font-bold text-neutral-700 dark:text-neutral-350">
                        {item.transactionId || "N/A"}
                      </td>

                      {/* Amount */}
                      <td className="py-4 px-6 text-xs font-extrabold text-neutral-800 dark:text-neutral-200">
                        ${item.amount.toFixed(2)} <span className="text-[9px] text-neutral-450 font-normal">{item.currency?.toUpperCase()}</span>
                      </td>

                      {/* Gateway */}
                      <td className="py-4 px-6 text-xs text-neutral-600 dark:text-neutral-450 font-medium">
                        {item.gateway}
                      </td>

                      {/* Plan */}
                      <td className="py-4 px-6">
                        <span
                          className={`text-[9px] font-black px-2 py-0.5 rounded-full inline-flex items-center gap-1 border ${
                            item.planActivated === "PRO"
                              ? "text-emerald-500 bg-emerald-500/10 border-emerald-500/10"
                              : "text-neutral-500 bg-neutral-100 border-neutral-250 dark:bg-neutral-850 dark:border-neutral-850 dark:text-neutral-400"
                          }`}
                        >
                          {item.planActivated}
                        </span>
                      </td>

                      {/* Payment Status */}
                      <td className="py-4 px-6">
                        <span
                          className={`text-[9px] font-black px-2 py-0.5 rounded-full inline-flex items-center gap-1 border ${
                            item.status === "SUCCESS"
                              ? "text-emerald-500 bg-emerald-500/10 border-emerald-500/10"
                              : "text-amber-500 bg-amber-500/10 border-amber-500/10"
                          }`}
                        >
                          {item.status === "SUCCESS" && <span className="h-1 w-1 rounded-full bg-emerald-500 animate-pulse" />}
                          {item.status}
                        </span>
                      </td>

                      {/* Transaction Date */}
                      <td className="py-4 px-6 text-xs text-neutral-600 dark:text-neutral-400 font-medium">
                        {new Date(item.createdAt).toLocaleDateString(undefined, {
                          year: "numeric",
                          month: "short",
                          day: "numeric",
                        })}
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination bar */}
        {!isLoading && paymentsList.length > 0 && (
          <div className="px-6 py-4.5 border-t border-neutral-100 dark:border-neutral-850 bg-neutral-50/30 dark:bg-neutral-950/5 flex items-center justify-between">
            <span className="text-xs text-neutral-450 dark:text-neutral-550 font-medium">
              Showing page <strong className="text-neutral-700 dark:text-neutral-300">{page}</strong> of{" "}
              <strong className="text-neutral-700 dark:text-neutral-300">{meta.totalPages}</strong>
            </span>

            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="sm"
                disabled={page <= 1}
                onClick={() => setPage((prev) => prev - 1)}
                className="h-8 w-8 rounded-lg border border-neutral-250 dark:border-neutral-850 p-0 text-neutral-500 disabled:opacity-40 cursor-pointer flex items-center justify-center hover:bg-neutral-100 dark:hover:bg-neutral-850"
              >
                <ChevronLeft className="w-4 h-4" />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                disabled={page >= meta.totalPages}
                onClick={() => setPage((prev) => prev + 1)}
                className="h-8 w-8 rounded-lg border border-neutral-250 dark:border-neutral-800 p-0 text-neutral-500 disabled:opacity-40 cursor-pointer flex items-center justify-center hover:bg-neutral-100 dark:hover:bg-neutral-850"
              >
                <ChevronRight className="w-4 h-4" />
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
