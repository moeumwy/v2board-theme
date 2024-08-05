export default interface Notice {
  id: number;
  title: string;
  content: string;
  created_at: number;
  updated_at: number;
  tags: string[] | null;
  img_url: string | null;
  show: 0 | 1;
}
