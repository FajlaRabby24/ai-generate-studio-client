export interface IHistoryDelete {
  id: string;
}

export interface IHistory {
  id: string;
  userId: string;
  type: string;
  status: string;
  prompt: string;
  projectId: string;
  outputUrls: string;
  isPublic: boolean;
  isFeatured: boolean;
  isDeleted: boolean;
  createdAt: string;
  updatedAt: string;
}
