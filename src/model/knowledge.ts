export interface KnowledgePayload {
  language: string;
  keyword: string;
  id: number;
}

export interface KnowledgeListResponse {
  id: number;
  title: string;
  category: string;
  updated_at: number;
}

export default interface Knowledge extends KnowledgeListResponse {
  body: string;
  sort: null;
  show: 0 | 1;
  language: string;
  created_at: number;
}
