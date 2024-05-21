export interface NewsState {
    articles: Article[];
    loading: boolean;
    error: string | null;
  }
  
  export interface Article {
    title: string;
    description: string;
    author: string | null;
    content: string;
    source: object;
    publishedAt: string;
    url: string;
    urlToImage: string;
  }
  
  export interface FetchNewsPayload {
    token: string;
  }