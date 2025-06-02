export type LivingPost = {
  id: number;
  title: string;
  description: string;
  images: string[];
  postedAt: string;
  views: number;
  author: string;
};

export type LivingPostQueryParams = {
  id: string;
  q: string;
};

export type LivingPostsResponse = {
  data: LivingPost[];
  count: number;
};
