export type ForumPost = {
  id: number;
  title: string;
  description: string;
  images: string[];
  postedAt: string;
  views: number;
  author: string;
};

export type ForumPostQueryParams = {
  id: string;
  q: string;
};

export type ForumPostsResponse = {
  data: ForumPost[];
  count: number;
};
