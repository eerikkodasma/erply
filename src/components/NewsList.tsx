import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchNews } from '../reducers/NewsReducer';
import { RootState, AppDispatch } from '../store/store';
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Grid,
  Container,
  CircularProgress,
  Box,
} from '@mui/material';

const NewsList: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { articles, loading, error } = useSelector((state: RootState) => state.news);
  const token = useSelector((state: RootState) => state.auth.token);

  useEffect(() => {
    if (token) {
      dispatch(fetchNews({ token }));
    }
  }, [dispatch, token]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
      <Box sx={{ mt: 4, px: 2 }}>
        {loading ? (
          <Box display="flex" justifyContent="center" alignItems="center" height="80vh">
            <CircularProgress />
          </Box>
        ) : error ? (
          <Typography variant="h6" color="error" align="center">
            {error}
          </Typography>
        ) : (
          <Box
            display="flex"
            flexWrap="wrap"
            justifyContent="space-between"
            gap={2}
          >
            {articles.map((article, index) => (
              <Card
                key={index}
                sx={{ flex: '1 1 calc(25% - 16px)', maxWidth: '400px', minWidth: '250px', cursor: 'pointer', ':hover': { boxShadow: 20}} }
                onClick={() => window.open(article.url, '_blank')}
              >
                {article.urlToImage && (
                  <CardMedia
                    component="img"
                    alt={article.title}
                    height="140"
                    image={article.urlToImage}
                  />
                )}
                <CardContent>
                  <Typography variant="h5" component="div" gutterBottom>
                    {article.title}
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    {article.description}
                  </Typography>
                  <Typography variant="body2" color="textSecondary" sx={{ mt: 2 }}>
                    {new Date(article.publishedAt).toLocaleDateString()}
                  </Typography>
                </CardContent>
              </Card>
            ))}
          </Box>
        )}
      </Box>
  );
};

export default NewsList;