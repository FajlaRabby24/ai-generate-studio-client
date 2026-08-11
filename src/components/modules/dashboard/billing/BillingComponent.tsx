"use client";

import { Button } from "@/components/ui/button";
import { SubscriptionPlan, SubscriptionStatus } from "@/config/constant";
import {
  cancelSubscriptionService,
  createCheckoutSessionService,
  createCustomerPortalService,
  getMyBillingService,
} from "@/services/subscription/subscription.service";
import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import {
  ArrowUpRight,
  Check,
  CreditCard,
  Download,
  Layers,
  RefreshCw,
  Sparkles,
} from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

// Mock Pricing Plans
const plans = [
  {
    name: "Starter",
    description: "Ideal for beginners starting their creative AI journey.",
    priceMonthly: 0,
    priceYearly: 0,
    features: [
      "3 high-fidelity images/mo",
      "Standard generation speeds",
      "Access to base chatbot styles",
      "Standard quality speech synthesis",
      "Community support access",
    ],
    cta: "Current Plan",
    popular: false,
    color: "neutral",
  },
  {
    name: "Pro Creator",
    description: "Designed for content creators needing premium features.",
    priceMonthly: 10,
    priceYearly: 99.99,
    features: [
      "5 priority images/mo",
      "300 priority video seconds/mo",
      "50,000 text-to-speech characters/mo",
      "Unlimited chatbot sessions",
      "4x faster generation queues",
      "Priority email support",
    ],
    cta: "Upgrade Plan",
    popular: true,
    color: "violet",
  },
];

export default function BillingComponent() {
  const [isYearly, setIsYearly] = useState(true);

  // Fetch billing data
  const {
    data: billingRes,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["myBilling"],
    queryFn: () => getMyBillingService(),
    refetchOnWindowFocus: false,
  });

  const billingData = billingRes?.data;
  const subscription = billingData?.subscription;
  const payments = billingData?.payments || [];
  const usages = billingData?.usages || [];

  // Determine active plan name & billing details
  const activePlanName =
    subscription?.plan === SubscriptionPlan.YEARLY
      ? "Yearly Pro"
      : subscription?.plan === SubscriptionPlan.MONTHLY
        ? "Monthly Pro"
        : "Free Tier";

  const billingCycleText =
    subscription?.plan === SubscriptionPlan.YEARLY
      ? "yearly"
      : subscription?.plan === SubscriptionPlan.MONTHLY
        ? "monthly"
        : "none";

  const planAmountText =
    subscription?.plan === SubscriptionPlan.YEARLY
      ? "99.99"
      : subscription?.plan === SubscriptionPlan.MONTHLY
        ? "10"
        : "0";

  const nextBillingDateText = subscription?.currentPeriodEnd
    ? new Date(subscription.currentPeriodEnd).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : "Never";

  const handlePlanSelect = async (planName: string) => {
    if (planName === "Starter") {
      toast.info("You are already on the basic creative tools tier.");
      return;
    }

    const planEnum = isYearly
      ? SubscriptionPlan.YEARLY
      : SubscriptionPlan.MONTHLY;

    try {
      toast.loading("Redirecting to Stripe checkout...");
      const res = await createCheckoutSessionService(planEnum);
      toast.dismiss();
      if (res?.success && res.data?.paymentUrl) {
        window.location.href = res.data.paymentUrl;
      } else {
        toast.error(res?.message || "Failed to create checkout session");
      }
    } catch (err: any) {
      toast.dismiss();
      toast.error(err?.message || "Failed to direct to payment gateway.");
    }
  };

  const handleCancelSubscription = async () => {
    try {
      toast.loading("Scheduling cancellation...");
      const res = await cancelSubscriptionService();
      toast.dismiss();
      if (res?.success) {
        toast.success(
          "Subscription scheduled to cancel at the end of current billing cycle.",
        );
        refetch();
      } else {
        toast.error(res?.message || "Failed to cancel subscription");
      }
    } catch (err: any) {
      toast.dismiss();
      toast.error(err?.message || "Failed to cancel subscription.");
    }
  };

  const handleUpdatePayment = async () => {
    try {
      toast.loading("Opening Stripe portal...");
      const res = await createCustomerPortalService();
      toast.dismiss();
      if (res?.success && res.data?.url) {
        window.location.href = res.data.url;
      } else {
        toast.error(res?.message || "Failed to create portal session");
      }
    } catch (err: any) {
      toast.dismiss();
      toast.error(err?.message || "Failed to open Stripe portal.");
    }
  };

  const handleDownloadInvoice = (id: string) => {
    toast.success(`Downloading invoice ${id} as PDF...`);
  };

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[50vh] space-y-4">
        <div className="w-10 h-10 border-4 border-primary/20 border-t-primary rounded-full animate-spin" />
        <p className="text-sm text-neutral-500 animate-pulse">
          Loading billing settings...
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-8 px-4 md:px-6 pb-12 text-neutral-900 dark:text-white transition-colors duration-300">
      {/* 1. Header */}
      <div>
        <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight bg-linear-to-r from-neutral-950 via-neutral-750 to-neutral-500 dark:from-white dark:via-neutral-200 dark:to-neutral-400 bg-clip-text text-transparent">
          Billing & Subscription
        </h1>
        <p className="text-xs md:text-sm text-neutral-500 dark:text-neutral-400 mt-1">
          Manage your subscription plans, monitor usage metrics, and review
          billing invoices.
        </p>
      </div>

      {/* 2. Top Section: Plan Overview & Usage Meters */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Current Plan Overview Card */}
        <div className="relative overflow-hidden bg-white dark:bg-neutral-900/30 border border-neutral-200 dark:border-neutral-800 rounded-3xl p-6 shadow-xs flex flex-col justify-between h-full min-h-[300px]">
          {/* Subtle background glow effect */}
          <div className="absolute top-0 right-0 -mr-16 -mt-16 w-32 h-32 bg-violet-500/10 rounded-full blur-2xl pointer-events-none" />

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-violet-500 dark:text-violet-400 bg-violet-500/10 px-3 py-1 rounded-full">
                Active Plan
              </span>
              <span className="flex items-center gap-1 text-xs text-emerald-500 font-semibold bg-emerald-500/10 dark:bg-emerald-500/20 px-2.5 py-0.5 rounded-full">
                <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse" />
                {subscription ? subscription.status : SubscriptionStatus.ACTIVE}
              </span>
            </div>

            <div>
              <h3 className="text-2xl font-extrabold tracking-tight text-neutral-900 dark:text-white">
                {activePlanName}
              </h3>
              <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-1">
                Billed {billingCycleText} • ${planAmountText}/
                {subscription?.plan === SubscriptionPlan.YEARLY
                  ? "year"
                  : "month"}
              </p>
            </div>

            <div className="pt-2 border-t border-neutral-100 dark:border-neutral-800/80">
              <p className="text-[10px] uppercase font-bold tracking-wider text-neutral-400">
                Next Renewal Date
              </p>
              <p className="text-sm font-semibold text-neutral-700 dark:text-neutral-300 mt-0.5">
                {nextBillingDateText}
              </p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 pt-6">
            {subscription && subscription.plan !== SubscriptionPlan.FREE ? (
              <>
                <Button
                  onClick={handleUpdatePayment}
                  className="flex-grow rounded-xl bg-violet-600 hover:bg-violet-750 text-white font-semibold text-xs py-2 shadow-xs cursor-pointer transition-all duration-200"
                >
                  Manage Subscription
                </Button>
                {!subscription.cancelAtPeriodEnd ? (
                  <Button
                    variant="outline"
                    onClick={handleCancelSubscription}
                    className="rounded-xl border border-neutral-200 dark:border-neutral-800 hover:bg-neutral-50 dark:hover:bg-neutral-900 font-semibold text-xs py-2 cursor-pointer transition-all duration-200 text-rose-500 hover:text-rose-600 hover:border-rose-500/30"
                  >
                    Cancel Plan
                  </Button>
                ) : (
                  <Button
                    disabled
                    variant="outline"
                    className="rounded-xl border border-neutral-200 dark:border-neutral-800 font-semibold text-xs py-2 text-amber-500"
                  >
                    Cancels at period end
                  </Button>
                )}
              </>
            ) : (
              <Button
                onClick={() => handlePlanSelect("Pro Creator")}
                className="w-full rounded-xl bg-violet-600 hover:bg-violet-750 text-white font-semibold text-xs py-2 shadow-xs cursor-pointer transition-all duration-200"
              >
                Upgrade to Pro
              </Button>
            )}
          </div>
        </div>

        {/* Usage Progress meters */}
        <div className="lg:col-span-2 bg-white dark:bg-neutral-900/30 border border-neutral-200 dark:border-neutral-800 rounded-3xl p-6 shadow-xs space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-bold text-neutral-950 dark:text-white">
                Quota Consumption
              </h3>
              <p className="text-xs text-neutral-500 dark:text-neutral-400">
                Current usage since your renewal cycle.
              </p>
            </div>
            <button
              onClick={() => {
                refetch();
                toast.success("Usage stats synced with database logs.");
              }}
              className="p-2 text-neutral-400 hover:text-neutral-600 dark:hover:text-white bg-neutral-50 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-xl transition cursor-pointer"
            >
              <RefreshCw className="h-3.5 w-3.5" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
            {usages.map((usage: any, idx: number) => {
              const percent = Math.min(
                100,
                Math.round((usage.current / usage.limit) * 100),
              );
              return (
                <div key={idx} className="space-y-1.5">
                  <div className="flex justify-between text-xs font-semibold">
                    <span className="text-neutral-700 dark:text-neutral-300">
                      {usage.label}
                    </span>
                    <span className="text-neutral-500">
                      {usage.current.toLocaleString()} /{" "}
                      {usage.limit.toLocaleString()}{" "}
                      <span className="text-[10px] font-normal">
                        {usage.unit}
                      </span>
                    </span>
                  </div>

                  {/* Progress track */}
                  <div className="h-2 w-full bg-neutral-100 dark:bg-neutral-800/80 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${percent}%` }}
                      transition={{ duration: 1, ease: "easeOut" }}
                      className={`h-full bg-gradient-to-r ${usage.color} rounded-full`}
                    />
                  </div>
                  <div className="flex justify-end">
                    <span className="text-[10px] text-neutral-400 font-bold">
                      {percent}% Used
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* 3. Middle Section: Pricing Tiers */}
      <div className="space-y-6 pt-4">
        <div className="text-center space-y-2">
          <h2 className="text-xl md:text-2xl font-bold text-neutral-950 dark:text-white">
            Upgrade Your Workspace
          </h2>
          <p className="text-xs text-neutral-500 dark:text-neutral-400 max-w-lg mx-auto">
            Choose the best plan suited for your workflow speed and rendering
            volume. Cancel or adjust tiers at any time.
          </p>

          {/* Monthly / Yearly Toggle */}
          <div className="flex items-center justify-center gap-3 pt-3">
            <span
              className={`text-xs font-semibold ${!isYearly ? "text-neutral-900 dark:text-white" : "text-neutral-400"}`}
            >
              Monthly
            </span>
            <button
              onClick={() => setIsYearly(!isYearly)}
              className="relative w-12 h-6 bg-violet-600/20 hover:bg-violet-600/30 rounded-full p-1 transition-colors duration-200 cursor-pointer"
            >
              <motion.div
                layout
                transition={{ type: "spring", stiffness: 500, damping: 30 }}
                className="w-4 h-4 bg-violet-600 dark:bg-violet-400 rounded-full"
                style={{ marginLeft: isYearly ? "1.5rem" : "0" }}
              />
            </button>
            <div className="flex items-center gap-1.5">
              <span
                className={`text-xs font-semibold ${isYearly ? "text-neutral-900 dark:text-white" : "text-neutral-400"}`}
              >
                Yearly
              </span>
              <span className="text-[10px] font-bold text-emerald-500 bg-emerald-500/10 px-2 py-0.5 rounded-full animate-bounce">
                Save 20%
              </span>
            </div>
          </div>
        </div>

        {/* Plans Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {plans.map((plan, idx) => {
            const price = isYearly ? plan.priceYearly : plan.priceMonthly;
            const planEnum =
              plan.name === "Starter"
                ? "FREE"
                : isYearly
                  ? "YEARLY"
                  : "MONTHLY";

            const isCurrent = subscription
              ? subscription.plan === planEnum
              : planEnum === "FREE";

            return (
              <div
                key={idx}
                className={`relative rounded-3xl p-6 flex flex-col justify-between transition-all duration-300 h-full ${
                  plan.popular
                    ? "bg-white dark:bg-neutral-900/40 border-2 border-violet-500 dark:border-violet-500 shadow-xl shadow-violet-500/5"
                    : "bg-white dark:bg-neutral-900/20 border border-neutral-200 dark:border-neutral-800 shadow-xs"
                }`}
              >
                {/* Popular Badge */}
                {plan.popular && (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 text-[10px] font-extrabold uppercase tracking-wider bg-violet-600 text-white px-3 py-1 rounded-full flex items-center gap-1">
                    <Sparkles className="h-3 w-3" /> Most Popular
                  </span>
                )}

                <div className="space-y-4">
                  <div>
                    <h3 className="text-lg font-bold text-neutral-950 dark:text-white">
                      {plan.name}
                    </h3>
                    <p className="text-xs text-neutral-400 mt-1 min-h-[32px] leading-relaxed">
                      {plan.description}
                    </p>
                  </div>

                  <div className="flex items-baseline gap-1 pt-2">
                    <span className="text-3xl font-extrabold text-neutral-950 dark:text-white">
                      ${price}
                    </span>
                    <span className="text-xs text-neutral-400 font-semibold">
                      {isYearly && price > 0 ? "/year" : "/month"}
                    </span>
                  </div>

                  {/* Features list */}
                  <ul className="space-y-2.5 pt-4 border-t border-neutral-100 dark:border-neutral-800/80">
                    {plan.features.map((feature, fIdx) => (
                      <li
                        key={fIdx}
                        className="flex items-start gap-2.5 text-xs text-neutral-700 dark:text-neutral-300"
                      >
                        <Check className="h-3.5 w-3.5 text-violet-500 dark:text-violet-400 shrink-0 mt-0.5" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="pt-6">
                  <Button
                    onClick={() => handlePlanSelect(plan.name)}
                    disabled={isCurrent}
                    className={`w-full rounded-xl py-2.5 font-bold text-xs cursor-pointer transition-all duration-200 flex items-center justify-center gap-1.5 ${
                      isCurrent
                        ? "bg-neutral-100 dark:bg-neutral-800/50 text-neutral-400 dark:text-neutral-500 border border-neutral-200 dark:border-neutral-700 pointer-events-none"
                        : plan.popular
                          ? "bg-violet-600 hover:bg-violet-750 text-white shadow-xs"
                          : "bg-white dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800 text-neutral-800 dark:text-neutral-300 hover:bg-neutral-50 dark:hover:bg-neutral-900"
                    }`}
                  >
                    {isCurrent ? (
                      <>Active Plan</>
                    ) : (
                      <>
                        {plan.cta}
                        <ArrowUpRight className="h-3.5 w-3.5" />
                      </>
                    )}
                  </Button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* 4. Bottom Section: Invoices & Payment Details */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 pt-4 border-t border-neutral-100 dark:border-neutral-800/80">
        {/* Payment info card */}
        <div className="bg-white dark:bg-neutral-900/30 border border-neutral-200 dark:border-neutral-800 rounded-3xl p-6 shadow-xs space-y-4">
          <h3 className="text-sm font-bold text-neutral-950 dark:text-white flex items-center gap-1.5">
            <CreditCard className="h-4 w-4 text-violet-500" />
            Payment Settings
          </h3>
          <p className="text-xs text-neutral-500 dark:text-neutral-400">
            Configure primary payment methods and view billing accounts.
          </p>

          {subscription && subscription.stripeSubscriptionId ? (
            <div className="rounded-2xl border border-neutral-200 dark:border-neutral-800 p-4 flex items-center justify-between bg-neutral-50 dark:bg-neutral-950/40">
              <div className="flex items-center gap-3">
                <div className="px-2.5 py-1.5 rounded-lg bg-neutral-100 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 text-xs font-black uppercase text-neutral-600 dark:text-neutral-300">
                  Stripe
                </div>
                <div>
                  <p className="text-xs font-bold text-neutral-800 dark:text-neutral-200">
                    Secure Stripe Billing
                  </p>
                  <p className="text-[10px] text-neutral-400">
                    Auto-renewal setup
                  </p>
                </div>
              </div>
              <span className="text-[10px] font-bold text-violet-500 dark:text-violet-400 bg-violet-500/10 px-2 py-0.5 rounded-full">
                Primary
              </span>
            </div>
          ) : (
            <div className="rounded-2xl border border-dashed border-neutral-250 dark:border-neutral-800 p-4 text-center bg-neutral-50/50 dark:bg-neutral-950/20">
              <p className="text-xs text-neutral-500 dark:text-neutral-400 leading-normal">
                No active card setup. Upgraded plans are processed securely via
                Stripe.
              </p>
            </div>
          )}

          {subscription && subscription.stripeSubscriptionId && (
            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              <Button
                onClick={handleUpdatePayment}
                variant="outline"
                className="flex-grow rounded-xl border border-neutral-200 dark:border-neutral-800 text-xs font-semibold hover:bg-neutral-50 dark:hover:bg-neutral-900 py-2 cursor-pointer transition"
              >
                Update Payment Card
              </Button>
            </div>
          )}
        </div>

        {/* Invoice table */}
        <div className="lg:col-span-2 bg-white dark:bg-neutral-900/30 border border-neutral-200 dark:border-neutral-800 rounded-3xl p-6 shadow-xs space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-neutral-950 dark:text-white flex items-center gap-1.5">
              <Layers className="h-4 w-4 text-violet-500" />
              Invoice History
            </h3>
            <button
              onClick={() => {
                refetch();
                toast.success("Billing history updated.");
              }}
              className="text-xs font-bold text-violet-500 dark:text-violet-400 hover:underline cursor-pointer bg-transparent border-0"
            >
              View All
            </button>
          </div>

          {/* Table container */}
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-neutral-100 dark:border-neutral-800/80 text-[10px] uppercase font-bold tracking-wider text-neutral-400">
                  <th className="pb-3 pl-1">Invoice ID</th>
                  <th className="pb-3">Billing Date</th>
                  <th className="pb-3">Amount</th>
                  <th className="pb-3">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-100 dark:divide-neutral-800/50">
                {payments.length === 0 ? (
                  <tr>
                    <td
                      colSpan={5}
                      className="text-center py-8 text-neutral-400 text-xs"
                    >
                      No invoices found.
                    </td>
                  </tr>
                ) : (
                  payments.map((pay: any, idx: number) => (
                    <tr
                      key={idx}
                      className="text-xs hover:bg-neutral-50/50 dark:hover:bg-neutral-900/20 transition-colors"
                    >
                      <td className="py-3.5 pl-1 font-mono font-semibold text-neutral-700 dark:text-neutral-300">
                        {pay.transactionId || pay.id.substring(0, 12)}
                      </td>
                      <td className="py-3.5 text-neutral-500 dark:text-neutral-400">
                        {new Date(pay.createdAt).toLocaleDateString()}
                      </td>
                      <td className="py-3.5 font-semibold text-neutral-800 dark:text-neutral-200">
                        ${pay.amount.toFixed(2)} {pay.currency.toUpperCase()}
                      </td>
                      <td className="py-3.5">
                        <span
                          className={`inline-flex items-center gap-1 text-[10px] font-bold px-2.5 py-0.5 rounded-full ${
                            pay.status === "SUCCESS"
                              ? "text-emerald-500 bg-emerald-500/10"
                              : "text-rose-500 bg-rose-500/10"
                          }`}
                        >
                          {pay.status}
                        </span>
                      </td>
                    
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
