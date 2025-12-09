export interface KnowledgeAttachment {
  id: string;
  filename: string;
  url: string;
  description?: string;
}

export interface KnowledgeDocument {
  id: number;
  category: string;
  question: string;
  questionDetail: string;
  answerSummary: string;
  answerDetail: string;
  answerReference?: string;
  attachments?: KnowledgeAttachment[];
  updatedAt: string;
}
