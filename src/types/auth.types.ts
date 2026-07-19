import { AuthValidation } from "@/zod-schema/auth/auth.schema";
import z from "zod";

export type IRegisterPayload = z.infer<
  typeof AuthValidation.registerValidationSchema
>;

export interface IRegisterResponse {
  id: string;
  name: string;
  email: string;
  image: string | null | undefined;
}
