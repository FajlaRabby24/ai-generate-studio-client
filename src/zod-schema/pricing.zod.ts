import { SubscriptionPlan } from "@/config/constant";
import { z } from "zod";

const createPricingPlanSchema = z.object({
  name: z.string().min(1).max(100),
  plan: z.enum(SubscriptionPlan),
  price: z.number().min(0),
  currency: z.string().default("USD"),
  features: z.array(z.string()),
  isActive: z.boolean().default(false),
  isPopular: z.boolean().default(false),
});

const updatePricingPlanSchema = z.object({
  name: z.string().min(1).max(100).optional(),
  price: z.number().min(0).optional(),
  features: z.array(z.string()).optional(),
  isActive: z.boolean().optional(),
  isPopular: z.boolean().optional(),
  stripePriceId: z.string().nullable().optional(),
});

export const PricingValidation = {
  createPricingPlanSchema,
  updatePricingPlanSchema,
};
