"use server";

import { httpClient } from "@/lib/httpClient";
import { generalService } from "@/services/general.service";
import {
  IAnalyzeResumeResponse,
  IGeneratePdfPayload,
  IGeneratePdfResponse,
  IGetRecentResumeAnalyzerResponse,
} from "@/types/resumeAnalyzer.types";
import { catchAsync } from "@/utils/catchAsync";
import { ResumeAnalyzerValidation } from "@/zod-schema/dashboard/resume-analyzer/zod";

export const analyzeResumeService = async (formData: FormData) =>
  catchAsync(async () => {
    const authHeaders = await generalService.getHeaders();
    const res = await httpClient.post<IAnalyzeResumeResponse>(
      "/resume-analyzer",
      formData,
      {
        headers: {
          ...authHeaders.headers,
          "Content-Type": "multipart/form-data",
        },
      },
    );

    return res;
  });

export const generateResumePdfService = async (payload: IGeneratePdfPayload) =>
  catchAsync(async () => {
    const validatedPayload =
      generalService.validateRequest<IGeneratePdfPayload>(
        payload,
        ResumeAnalyzerValidation.generatePdfValidationSchema,
      );

    const authHeaders = await generalService.getHeaders();
    const res = await httpClient.post<IGeneratePdfResponse>(
      "/resume-analyzer/generate-pdf",
      validatedPayload,
      authHeaders,
    );

    return res;
  });

export const getRecentGenerationService = async () => {
  const authHeaders = await generalService.getHeaders();
  const res = await httpClient.get<IGetRecentResumeAnalyzerResponse[]>(
    "/resume-analyzer/recent",
    authHeaders,
  );

  return res;
};
