import { UserRole, UserStatus } from "@/utils/authUtils";
import { AuthValidation } from "@/zod-schema/auth/auth.schema";
import z from "zod";

export type IRegisterPayload = z.infer<
  typeof AuthValidation.registerValidationSchema
>;
export type ILoginPayload = z.infer<
  typeof AuthValidation.loginValidationSchema
>;

export interface IRegisterResponse {
  id: string;
  name: string;
  email: string;
  image: string | null | undefined;
}

export interface ILoginResponse {
  user: {
    id: string;
    name: string;
    email: string;
    image: string | null | undefined;
  };
  token: string;
  accessToken: string;
  refreshToken: string;
}

export interface IGetMeResponse {
  name: string;
  email: string;
  id: string;
  role: UserRole;
  status: UserStatus;
  isDeleted: boolean;
}
