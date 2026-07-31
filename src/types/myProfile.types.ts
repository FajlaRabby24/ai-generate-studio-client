import { Plan } from "@/config/constant";
import { UserRole, UserStatus } from "@/utils/authUtils";

export interface IMyProfileResponse {
  name: string;
  email: string;
  id: string;
  role: UserRole;
  plan: Plan;
  status: UserStatus;
  isDeleted: boolean;
  textToImage: number;
  aiChatbot: number;
  codeChecker: number;
  imageBackgroundRemover: number;
  imageCaptionGenerator: number;
  resumeAnalyzer: number;
  languageTranslator: number;
  grammarChecker: number;
  textToSpeech: number;
  speechToText: number;
  imageToVideo: number;
  textToVideo: number;
  sessions: {
    id: string;
    userAgent: string | null;
  }[];
}
