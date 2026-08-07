import { ResumeAnalyzerValidation } from "@/zod-schema/dashboard/resume-analyzer/zod";
import { z } from "zod";

export type IAnalyzeResumePayload = z.infer<
  typeof ResumeAnalyzerValidation.analyzeValidationSchema
>;

export type IGeneratePdfPayload = z.infer<
  typeof ResumeAnalyzerValidation.generatePdfValidationSchema
>;

export interface IAnalyzeResumeResponse {
  analyzerId: string;
  atsScore: number;
  summary: string;
  strengths: string[];
  weaknesses: string[];
  missingKeywords: string[];
  actionableSuggestions: string[];
  updatedResume: any;
}

export interface IGeneratePdfResponse {
  pdfUrl: string;
}
