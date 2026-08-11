import {
  PaymentGateway,
  PaymentStatus,
  Plan,
  SubscriptionPlan,
  SubscriptionStatus,
} from "@/config/constant";
import { SubscriptionValidation } from "@/zod-schema/subscription/subscription.zod";
import { z } from "zod";

export type ICheckoutPayload = z.infer<
  typeof SubscriptionValidation.checkoutSchema
>;

export interface IGetMyBillings {
  subscription: {
    id: string;
    plan: SubscriptionPlan;
    stripePriceId: string | null;
    createdAt: Date;
    updatedAt: Date;
    userId: string;
    stripeCustomerId: string | null;
    stripeSubscriptionId: string | null;
    status: SubscriptionStatus;
    currentPeriodStart: Date;
    currentPeriodEnd: Date;
    cancelAtPeriodEnd: boolean;
    cancelledAt: Date | null;
  } | null;
  payments: {
    id: string;
    currency: string;
    createdAt: Date;
    userId: string;
    status: PaymentStatus;
    gateway: PaymentGateway;
    subscriptionId: string | null;
    amount: number;
    transactionId?: string;
    planActivated: Plan;
    metadata?: Record<string, unknown>;
  }[];
}

export interface ICancelSubsctiption {
  id: string;
  plan: SubscriptionPlan;
  stripePriceId: string | null;
  createdAt: Date;
  updatedAt: Date;
  userId: string;
  stripeCustomerId: string | null;
  stripeSubscriptionId: string | null;
  status: SubscriptionStatus;
  currentPeriodStart: Date;
  currentPeriodEnd: Date;
  cancelAtPeriodEnd: boolean;
  cancelledAt: Date | null;
}
