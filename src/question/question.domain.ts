export type Question = {
  id: string;
  topic_id: string;
  stage: string;
  difficulty: string;
  marks: number;
  answer_size: number;
  question: string;
  is_deleted: boolean;
  created_at: Date;
  updated_at: Date;
};
