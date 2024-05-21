import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { NewsState, FetchNewsPayload, Article } from '../models/news.model';

const initialState: NewsState = {
  articles: [],
  loading: false,
  error: null,
};

export const fetchNews = createAsyncThunk(
  'news/fetchNews',
  async (payload: FetchNewsPayload, { rejectWithValue }) => {
    try {
      const response = await axios.get('https://newsapi.org/v2/top-headlines', {
        params: {
            country: 'us',
            apiKey: payload.token,
        },
    });
      return response.data.articles as Article[];
      // Todo: change error type
    } catch (error: any) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

const newsSlice = createSlice({
  name: 'news',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchNews.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchNews.fulfilled, (state, action: PayloadAction<Article[]>) => {
        state.loading = false;
        state.articles = action.payload;
      })
      .addCase(fetchNews.rejected, (state, action) => {
        state.loading = false;
        state.error = 'Failed to fetch news';
      })
  },
});

export default newsSlice.reducer;