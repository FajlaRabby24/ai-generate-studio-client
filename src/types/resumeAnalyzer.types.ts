import { GenerationStatus, GenerationType } from "@/config/constant";
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

export interface IGetRecentResumeAnalyzerResponse {
  id: string;
  userId: string;
  type: GenerationType.RESUME_ANALYZER;
  isDeleted: boolean;
  createdAt: Date;
  updatedAt: Date;
  resumeAnalyzers: IResumeAnalyzerResponse[];
}

export interface IResumeAnalyzerResponse {
  isGenerateResume: boolean;
  id: string;
  createdAt: Date;
  updatedAt: Date;
  generatedId: string;
  atsScore: number;
  summary: string;
  strengths: string[];
  weaknesses: string[];
  missingKeywords: string[];
  actionableSuggestions: string[];
  updatedResumeJson: any;
  generatedPdfUrl: string | null;
  status: GenerationStatus;
}
