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
