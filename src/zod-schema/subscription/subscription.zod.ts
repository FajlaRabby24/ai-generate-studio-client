import { SubscriptionPlan } from "@/config/constant";
import { z } from "zod";

const checkoutSchema = z.object({
  plan: z.nativeEnum(SubscriptionPlan),
});

export const SubscriptionValidation = {
  checkoutSchema,
};
