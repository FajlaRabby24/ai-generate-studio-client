"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plan } from "@/config/constant";
import {
  getAdminUsersService,
  updateUserPlanService,
  updateUserStatusService,
} from "@/services/dashboard/admin/admin.service";
import { UserStatus } from "@/utils/authUtils";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  ChevronLeft,
  ChevronRight,
  Loader2,
  Lock,
  Search,
  Unlock,
  Users,
} from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

export default function UserManagementComponent() {
  const queryClient = useQueryClient();
  const [searchTerm, setSearchTerm] = useState("");
  const [searchVal, setSearchVal] = useState("");
  const [selectedPlan, setSelectedPlan] = useState<string>("ALL");
  const [selectedStatus, setSelectedStatus] = useState<string>("ALL");
  const [page, setPage] = useState(1);
  const limit = 10;

  // Query users
  const { data: usersRes, isLoading } = useQuery({
    queryKey: ["adminUsers", page, searchVal, selectedPlan, selectedStatus],
    queryFn: () =>
      getAdminUsersService({
        page,
        limit,
        search: searchVal || undefined,
        plan: selectedPlan === "ALL" ? undefined : (selectedPlan as Plan),
        status:
          selectedStatus === "ALL" ? undefined : (selectedStatus as UserStatus),
      }),
  });

  // Mutate plan
  const updatePlanMutation = useMutation({
    mutationFn: ({ userId, plan }: { userId: string; plan: Plan }) =>
      updateUserPlanService(userId, plan),
    onSuccess: () => {
      toast.success("User subscription plan updated successfully");
      queryClient.invalidateQueries({ queryKey: ["adminUsers"] });
    },
    onError: (err: any) => {
      toast.error(err.message || "Failed to update subscription plan");
    },
  });

  // Mutate status
  const updateStatusMutation = useMutation({
    mutationFn: ({ userId, status }: { userId: string; status: UserStatus }) =>
      updateUserStatusService(userId, status),
    onSuccess: () => {
      toast.success("User account status modified successfully");
      queryClient.invalidateQueries({ queryKey: ["adminUsers"] });
    },
    onError: (err: any) => {
      toast.error(err.message || "Failed to modify user status");
    },
  });

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSearchVal(searchTerm);
    setPage(1);
  };

  const handleClearFilters = () => {
    setSearchTerm("");
    setSearchVal("");
    setSelectedPlan("ALL");
    setSelectedStatus("ALL");
    setPage(1);
  };

  // Note: the backend wraps the paginated items in result.data and result.meta
  // Let's type-cast and parse response objects
  const rawData = usersRes?.data as any;
  const usersList = Array.isArray(rawData) ? rawData : [];
  const meta = (usersRes as any)?.meta || { total: 0, totalPages: 1 };

  return (
    <div className="p-6 space-y-6 max-w-[1600px] mx-auto">
      {/* Title */}
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-neutral-900 dark:text-neutral-100 flex items-center gap-2">
          <Users className="w-6 h-6 text-violet-500" />
          User Management
        </h1>
        <p className="text-xs text-neutral-500 mt-1.5">
          Search registered users, restrict accounts, or manually override
          subscription tiers.
        </p>
      </div>

      {/* Control Bar */}
      <div className="bg-white dark:bg-neutral-900/30 border border-neutral-200 dark:border-neutral-800 rounded-3xl p-6 shadow-xs space-y-4">
        <form
          onSubmit={handleSearchSubmit}
          className="flex flex-col md:flex-row gap-4 items-center"
        >
          {/* Search bar */}
          <div className="relative w-full md:flex-1">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400" />
            <Input
              type="text"
              placeholder="Search user by name or email..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 h-10 rounded-xl bg-neutral-50/50 dark:bg-neutral-950/20 border-neutral-250 dark:border-neutral-850 text-xs"
            />
          </div>

          <div className="flex flex-wrap gap-4 items-center w-full md:w-auto">
            {/* Plan filter */}
            <div className="flex items-center gap-2">
              <span className="text-xs text-neutral-500 font-medium">
                Plan:
              </span>
              <select
                value={selectedPlan}
                onChange={(e) => {
                  setSelectedPlan(e.target.value);
                  setPage(1);
                }}
                className="h-10 text-xs font-semibold rounded-xl bg-neutral-50/50 dark:bg-neutral-950/20 border border-neutral-250 dark:border-neutral-850 px-3 text-neutral-800 dark:text-neutral-200 outline-hidden focus:ring-2 focus:ring-violet-500/20 cursor-pointer"
              >
                <option value="ALL">All Plans</option>
                <option value="FREE">FREE</option>
                <option value="PRO">PRO</option>
              </select>
            </div>

            {/* Status filter */}
            <div className="flex items-center gap-2">
              <span className="text-xs text-neutral-500 font-medium">
                Status:
              </span>
              <select
                value={selectedStatus}
                onChange={(e) => {
                  setSelectedStatus(e.target.value);
                  setPage(1);
                }}
                className="h-10 text-xs font-semibold rounded-xl bg-neutral-50/50 dark:bg-neutral-950/20 border border-neutral-250 dark:border-neutral-850 px-3 text-neutral-800 dark:text-neutral-200 outline-hidden focus:ring-2 focus:ring-violet-500/20 cursor-pointer"
              >
                <option value="ALL">All Statuses</option>
                <option value="ACTIVE">ACTIVE</option>
                <option value="INACTIVE">INACTIVE</option>
                <option value="BANNED">BANNED</option>
              </select>
            </div>

            <Button
              type="submit"
              className="h-10 rounded-xl bg-violet-600 hover:bg-violet-700 text-white font-bold text-xs px-5 shadow-xs cursor-pointer"
            >
              Search
            </Button>

            {(searchVal ||
              selectedPlan !== "ALL" ||
              selectedStatus !== "ALL") && (
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
              <tr className="border-b border-neutral-100 dark:border-neutral-850 bg-neutral-50/40 dark:bg-neutral-950/10 text-xs font-bold text-neutral-450 dark:text-neutral-500 uppercase">
                <th className="py-4.5 px-6">User Info</th>
                <th className="py-4.5 px-6">Subscription Plan</th>
                <th className="py-4.5 px-6">Joined Date</th>
                <th className="py-4.5 px-6">Account Status</th>
                <th className="py-4.5 px-6 text-right">Quick Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-100 dark:divide-neutral-850">
              {isLoading ? (
                <tr>
                  <td colSpan={5} className="py-20 text-center">
                    <div className="flex flex-col items-center gap-3">
                      <Loader2 className="w-8 h-8 text-violet-500 animate-spin" />
                      <span className="text-xs text-neutral-400 font-medium">
                        Fetching accounts logs...
                      </span>
                    </div>
                  </td>
                </tr>
              ) : usersList.length === 0 ? (
                <tr>
                  <td colSpan={5} className="py-20 text-center">
                    <div className="flex flex-col items-center gap-2">
                      <Users className="w-10 h-10 text-neutral-300 dark:text-neutral-850" />
                      <span className="text-xs text-neutral-450 font-bold">
                        No user accounts found matching query.
                      </span>
                    </div>
                  </td>
                </tr>
              ) : (
                usersList.map((item: any) => {
                  const user = item?.user;
                  return (
                    <tr
                      key={user?.id}
                      className="hover:bg-neutral-50/40 dark:hover:bg-neutral-950/10 transition-colors"
                    >
                      {/* Name / Email */}
                      <td className="py-4 px-6">
                        <div className="flex items-center gap-3">
                          <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-violet-600 to-indigo-600 text-white font-bold flex items-center justify-center shadow-xs">
                            {user?.name?.substring(0, 1)?.toUpperCase()}
                          </div>
                          <div className="flex flex-col text-left">
                            <span className="text-xs font-bold text-neutral-800 dark:text-neutral-200">
                              {user?.name}
                            </span>
                            <span className="text-[10px] text-neutral-450 dark:text-neutral-500 mt-0.5">
                              {user?.email}
                            </span>
                          </div>
                        </div>
                      </td>

                      {/* Manual Subscription control */}
                      <td className="py-4 px-6">
                        <div className="flex items-center gap-2">
                          <select
                            value={user?.plan}
                            disabled={updatePlanMutation.isPending}
                            onChange={(e) =>
                              updatePlanMutation.mutate({
                                userId: user.id,
                                plan: e.target.value as Plan,
                              })
                            }
                            className={`h-8 text-[11px] font-black rounded-lg border px-2.5 outline-hidden cursor-pointer transition-all ${
                              user?.plan === "PRO"
                                ? "bg-emerald-500/10 border-emerald-500/20 text-emerald-500"
                                : "bg-neutral-100 border-neutral-250 dark:bg-neutral-850 dark:border-neutral-800 text-neutral-600 dark:text-neutral-450"
                            }`}
                          >
                            <option value="FREE">FREE</option>
                            <option value="PRO">PRO</option>
                          </select>
                        </div>
                      </td>

                      {/* Joined Date */}
                      <td className="py-4 px-6 text-xs text-neutral-600 dark:text-neutral-400 font-medium">
                        {new Date(user?.createdAt).toLocaleDateString(
                          undefined,
                          {
                            year: "numeric",
                            month: "short",
                            day: "numeric",
                          },
                        )}
                      </td>

                      {/* Account Status */}
                      <td className="py-4 px-6">
                        <span
                          className={`text-[10px] font-black px-2.5 py-0.5 rounded-full inline-flex items-center gap-1 border ${
                            user?.status === "ACTIVE"
                              ? "text-emerald-500 bg-emerald-500/10 border-emerald-500/10"
                              : user?.status === "BANNED"
                                ? "text-red-500 bg-red-500/10 border-red-500/10"
                                : "text-neutral-500 bg-neutral-100 border-neutral-250 dark:bg-neutral-850 dark:border-neutral-800 dark:text-neutral-400"
                          }`}
                        >
                          {user?.status === "ACTIVE" && (
                            <span className="h-1 w-1 rounded-full bg-emerald-500 animate-pulse" />
                          )}
                          {user?.status}
                        </span>
                      </td>

                      {/* Actions */}
                      <td className="py-4 px-6 text-right">
                        <div className="flex items-center justify-end gap-2">
                          {user?.status === "BANNED" ? (
                            <Button
                              size="sm"
                              variant="ghost"
                              disabled={updateStatusMutation?.isPending}
                              onClick={() =>
                                updateStatusMutation.mutate({
                                  userId: user.id,
                                  status: UserStatus.ACTIVE,
                                })
                              }
                              className="h-8 rounded-lg font-bold text-[10px] px-3.5 bg-emerald-500/10 text-emerald-500 border border-emerald-500/10 hover:bg-emerald-500/20 cursor-pointer inline-flex items-center gap-1.5"
                            >
                              <Unlock className="w-3.5 h-3.5" /> Unlock Account
                            </Button>
                          ) : (
                            <Button
                              size="sm"
                              variant="ghost"
                              disabled={updateStatusMutation?.isPending}
                              onClick={() => {
                                if (
                                  confirm(
                                    `Are you sure you want to ban user ${user?.name}?`,
                                  )
                                ) {
                                  updateStatusMutation.mutate({
                                    userId: user?.id,
                                    status: UserStatus?.BANNED,
                                  });
                                }
                              }}
                              className="h-8 rounded-lg font-bold text-[10px] px-3.5 bg-red-500/10 text-red-500 border border-red-500/10 hover:bg-red-500/20 cursor-pointer inline-flex items-center gap-1.5"
                            >
                              <Lock className="w-3.5 h-3.5" /> Restrict User
                            </Button>
                          )}
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination bar */}
        {!isLoading && usersList?.length > 0 && (
          <div className="px-6 py-4.5 border-t border-neutral-100 dark:border-neutral-850 bg-neutral-50/30 dark:bg-neutral-950/5 flex items-center justify-between">
            <span className="text-xs text-neutral-450 dark:text-neutral-550 font-medium">
              Showing page{" "}
              <strong className="text-neutral-700 dark:text-neutral-300">
                {page}
              </strong>{" "}
              of{" "}
              <strong className="text-neutral-700 dark:text-neutral-300">
                {meta?.totalPages}
              </strong>
            </span>

            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="sm"
                disabled={page <= 1}
                onClick={() => setPage((prev) => prev - 1)}
                className="h-8 w-8 rounded-lg border border-neutral-250 dark:border-neutral-800 p-0 text-neutral-500 disabled:opacity-40 cursor-pointer flex items-center justify-center hover:bg-neutral-100 dark:hover:bg-neutral-850"
              >
                <ChevronLeft className="w-4 h-4" />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                disabled={page >= meta?.totalPages}
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
