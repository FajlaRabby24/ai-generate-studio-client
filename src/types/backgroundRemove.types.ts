import { BackgroundRemoverValidation } from "@/zod-schema/dashboard/bg-remove/bgRemover.zod";
import { z } from "zod";

export type IBackgroundRemovePayload = z.infer<
  typeof BackgroundRemoverValidation.backgroundRemover
>;

export interface IBackgroundRemoveResponse {
  secureUrl: string;
}
