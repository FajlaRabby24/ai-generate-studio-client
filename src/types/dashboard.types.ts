import {
  GenerationStatus,
  GenerationType,
  Plan,
  SubscriptionPlan,
  SubscriptionStatus,
} from "@/config/constant";
import { UserRole } from "@/utils/authUtils";

export interface NavItem {
  title: string;
  href: string;
  icon: string;
}

export interface NavSection {
  title?: string;
  items: NavItem[];
}

export interface TextToImageResponse {
  imageUrl: string;
  creditRemainig: number | undefined;
}

export interface IGetGenerationLeftCountResponse {
  id: string;
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
}

export interface IAIChatBotResponse {
  response: string;
}

export interface IUserDashboardStatsResponse {
  user: {
    id: string;
    name: string;
    email: string;
    plan: Plan;
    role: UserRole;
    subscription: {
      id: string;
      plan: SubscriptionPlan;
      status: SubscriptionStatus;
      currentPeriodStart: Date;
      currentPeriodEnd: Date;
      cancelAtPeriodEnd: boolean;
      stripeCustomerId: string | null;
    } | null;
  };
  quotas: {
    name: string;
    used: number;
    limit: number;
    remaining: number;
    color: string;
  }[];
  activityData: {
    day: string;
    generations: number;
  }[];
  recentGenerations: {
    id: string;
    userId: string;
    type: GenerationType;
    status: GenerationStatus;
    prompt: string | null;
    projectId: string | null;
    outputUrls: string | null;
    isPublic: boolean;
    isFeatured: boolean;
    isDeleted: boolean;
    createdAt: Date;
    updatedAt: Date;
    _count: {
      likes: number;
    };
  }[];
}

export interface IGetRecentTextToImageResponse {
  id: string;
  userId: string;
  type: GenerationType.TEXT_TO_IMAGE;
  isDeleted: boolean;
  createdAt: Date;
  updatedAt: Date;
  textToImages: ITextToImageResponse[];
}

export interface ITextToImageResponse {
  id: string;
  generatedId: string;
  status: GenerationStatus;
  prompt: string;
  outputUrl: string;
  isPublic: boolean;
  isFeatured: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface IGetRecentTextToSpeechResponse {
  id: string;
  userId: string;
  type: GenerationType.TEXT_TO_SPEECH;
  isDeleted: boolean;
  createdAt: Date;
  updatedAt: Date;
  textToSpeech: ITextToSpeechResponse[];
}

export interface ITextToSpeechResponse {
  id: string;
  generatedId: string;
  status: GenerationStatus;
  prompt: string;
  outputUrl: string;
  isPublic: boolean;
  isFeatured: boolean;
  createdAt: Date;
  updatedAt: Date;
}
