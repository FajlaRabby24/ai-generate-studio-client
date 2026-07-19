/* eslint-disable @typescript-eslint/no-explicit-any */
import { envVars } from "@/config/env";
import jwt, { JwtPayload } from "jsonwebtoken";

const verifyToken = (token: string) => {
  try {
    const decoded = jwt.verify(
      token,
      envVars.ACCESS_TOKEN_SECRET as string,
    ) as JwtPayload;

    return {
      success: true,
      data: decoded,
    };
  } catch (error: any) {
    return {
      success: false,
      message: error.message,
      error,
    };
  }
};

const decodedToken = (token: string) => {
  const decoded = jwt.decode(token) as JwtPayload;
  return decoded;
};

export const jwtUtils = {
  verifyToken,
  decodedToken,
};
