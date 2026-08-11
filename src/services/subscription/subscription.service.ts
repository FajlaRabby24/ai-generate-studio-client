"use server";

import { SubscriptionPlan } from "@/config/constant";
import { httpClient } from "@/lib/httpClient";
import {
  ICancelSubsctiption,
  IGetMyBillings,
} from "@/types/subscription.types";
import { catchAsync } from "@/utils/catchAsync";
import { generalService } from "../general.service";

// 1. Get User Billing Details (subscription, payments, usages)
export const getMyBillingService = async () =>
  catchAsync(async () => {
    const options = await generalService.getHeaders();
    const res = await httpClient.get<IGetMyBillings>(
      "/subscription/my-billing",
      options,
    );
    return res;
  });

// 2. Create Checkout Session
export const createCheckoutSessionService = async (plan: SubscriptionPlan) =>
  catchAsync(async () => {
    const options = await generalService.getHeaders();
    const res = await httpClient.post<{
      sessionId: string;
      paymentUrl: string | null;
    }>("/subscription/create-checkout-session", { plan }, options);
    return res;
  });

// 3. Cancel Subscription
export const cancelSubscriptionService = async () =>
  catchAsync(async () => {
    const options = await generalService.getHeaders();
    const res = await httpClient.post<ICancelSubsctiption>(
      "/subscription/cancel-subscription",
      {},
      options,
    );
    return res;
  });

// 4. Create Stripe Customer Portal Session
export const createCustomerPortalService = async () =>
  catchAsync(async () => {
    const options = await generalService.getHeaders();
    const res = await httpClient.post<{
      url: string;
    }>("/subscription/create-customer-portal", {}, options);
    return res;
  });
