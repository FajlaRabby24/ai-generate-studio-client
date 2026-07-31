import { SubscriptionPlan } from "@/config/constant";
import { PricingValidation } from "@/zod-schema/pricing.zod";
import z from "zod";

export type ICreatePricePlan = z.infer<
  typeof PricingValidation.createPricingPlanSchema
>;

export type IUpdatePricePlan = z.infer<
  typeof PricingValidation.updatePricingPlanSchema
>;

export interface IPricing {
  name: string;
  plan: SubscriptionPlan;
  price: number;
  currency: string;
  features: string[];
  isActive: boolean;
  isPopular: boolean;
  stripePriceId: string | null;
  id: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface IDeletePricing {
  id: string;
  updatedAt: Date;
}
