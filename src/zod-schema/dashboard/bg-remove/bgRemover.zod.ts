import { GenerationType } from "@/config/constant";
import z from "zod";

const backgroundRemover = z.object({
  type: z.nativeEnum(GenerationType, {
    error: "Invalid generation type",
  }),
});

export const BackgroundRemoverValidation = {
  backgroundRemover,
};
