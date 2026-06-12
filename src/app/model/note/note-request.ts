export interface NoteRequest {
  userId: number;
  title: string;
  text: string;
  grade: number;
  date: string;
  tags: string[];
}
