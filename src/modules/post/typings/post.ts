export type Post = {
  domain: string;
  banned_by?: null;
  media_embed: Object;
  subreddit: string;
  selftext_html?: string | null;
  selftext: string;
  likes?: null;
  user_reports?: (null)[] | null;
  secure_media?: Object | null;
  link_flair_text?: string | null;
  id: string;
  gilded: number;
  secure_media_embed: Object | null;
  clicked: boolean;
  report_reasons?: null;
  author: string;
  media?: Object | null;
  score: number;
  approved_by?: null;
  over_18: boolean;
  hidden: boolean;
  thumbnail: string;
  subreddit_id: string;
  edited: number | boolean;
  link_flair_css_class?: string | null;
  author_flair_css_class?: string | null;
  downs: number;
  mod_reports?: (null)[] | null;
  saved: boolean;
  is_self: boolean;
  name: string;
  permalink: string;
  stickied: boolean;
  created: number;
  url: string;
  author_flair_text?: null;
  title: string;
  created_utc: number;
  ups: number;
  num_comments: number;
  visited: boolean;
  num_reports?: null;
  distinguished?: null;
};

export type PostWrapper = {
  kind: string;
  data: Post;
};

export type PostsPayload = {
  kind: string;
  data: {
    modhash: string;
    children: PostWrapper[];
    after?: string;
  };
};

export type PostsResponse = {
  posts: Post[];
  nextPage?: string;
};
