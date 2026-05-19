export interface Source {
  id: string;
  title: string;
  publisher?: string;
  year?: number | string;
  url?: string;
  accessed?: string;
  tier?: 1 | 2 | 3;
}

export interface FaqItem {
  q: string;
  a: string;
}

export interface RelatedArticle {
  title: string;
  url: string;
  description?: string;
}

export interface Heading {
  id: string;
  text: string;
  level: 2 | 3;
}

export interface ArticleFrontmatter {
  title: string;
  h1: string;
  meta_description: string;
  url: string;
  date_published: string;
  last_reviewed: string;
  target_keyword?: string;
  secondary_keywords?: string[];
  sources?: Source[];
  faq?: FaqItem[];
  parent_title?: string;
}
