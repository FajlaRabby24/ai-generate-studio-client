"use server";

import { httpClient } from "@/lib/httpClient";
import {
  ICreatePricePlan,
  IDeletePricing,
  IPricing,
  IUpdatePricePlan,
} from "@/types/pricing.types";
import { catchAsync } from "@/utils/catchAsync";
import { PricingValidation } from "@/zod-schema/pricing.zod";
import { generalService } from "../general.service";

// 1. Get All Active Pricing Plans (Public / User access)
export const getAllPricingPlansService = async () =>
  catchAsync(async () => {
    const res = await httpClient.get<IPricing[]>("/price-plan");
    return res;
  });

// 2. Create Pricing Plan (Admin only)
export const createPricingPlanService = async (payload: ICreatePricePlan) =>
  catchAsync(async () => {
    const validatedPayload = generalService.validateRequest<ICreatePricePlan>(
      payload,
      PricingValidation.createPricingPlanSchema,
    );

    const options = await generalService.getHeaders();
    const res = await httpClient.post<IPricing>(
      "/price-plan",
      validatedPayload,
      options,
    );
    return res;
  });

// 3. Get Pricing Plan By ID (Admin only)
export const getPricingPlanByIdService = async (pricingId: string) =>
  catchAsync(async () => {
    if (!pricingId) {
      return {
        success: false,
        message: "Pricing ID is required",
      };
    }

    const options = await generalService.getHeaders();
    const res = await httpClient.get<IPricing>(
      `/price-plan/${pricingId}`,
      options,
    );
    return res;
  });

// 4. Update Pricing Plan (Admin only)
export const updatePricingPlanService = async (
  pricingId: string,
  payload: IUpdatePricePlan,
) =>
  catchAsync(async () => {
    if (!pricingId) {
      return {
        success: false,
        message: "Pricing ID is required",
      };
    }
    const validatedPayload = generalService.validateRequest<IUpdatePricePlan>(
      payload,
      PricingValidation.updatePricingPlanSchema,
    );

    const options = await generalService.getHeaders();
    const res = await httpClient.patch<IPricing>(
      `/price-plan/${pricingId}`,
      validatedPayload,
      options,
    );
    return res;
  });

// 5. Delete Pricing Plan (Admin only)
export const deletePricingPlanService = async (pricingId: string) =>
  catchAsync(async () => {
    if (!pricingId) {
      return {
        success: false,
        message: "Pricing ID is required",
      };
    }
    const options = await generalService.getHeaders();
    const res = await httpClient.delete<IDeletePricing>(
      `/price-plan/${pricingId}`,
      options,
    );
    return res;
  });
