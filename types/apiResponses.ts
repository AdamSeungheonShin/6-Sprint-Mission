export interface ArticlesResponseBody {
  list: [];
  totalCount: number;
}

export interface CommentsResponseBody {
  list: [];
  nextCursor: number | null;
}

export interface UserInfo {
  id: number;
  nickname: string;
  image: string | null;
  createdAt: string;
  updatedAt: string;
  email: string;
}

export interface Writer {
  id: number;
  nickname: string;
  image: string | null;
}

export interface Article {
  id: number;
  title: string;
  content: string;
  image: string | null;
  likeCount: number;
  createdAt: string;
  updatedAt: string;
  writer: Writer;
  isLiked: boolean;
}

export interface Comment {
  id: number;
  content: string;
  createdAt: string;
  updatedAt: string;
  writer: Writer;
}
