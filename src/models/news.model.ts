export interface NewsState {
    articles: Article[];
    loading: boolean;
    error: string | null;
  }
  
  export interface Article {
    title: string;
    description: string;
    url: string;
  }
  
  export interface FetchNewsPayload {
    token: string;
  }