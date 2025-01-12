import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import {
  Typography,
  Grid,
  Card,
  CardContent,
  CardActions,
  Button,
  Pagination,
} from '@mui/material';

import { RootState, AppDispatch } from '../store';
import { fetchPosts } from '../store/slices/postsSlice';

const Home: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { posts, page, totalPages, isLoading } = useSelector((state: RootState) => state.posts);

  useEffect(() => {
    dispatch(fetchPosts({ page }));
  }, [dispatch, page]);

  const handlePageChange = (event: React.ChangeEvent<unknown>, value: number) => {
    dispatch(fetchPosts({ page: value }));
  };

  if (isLoading) {
    return <Typography variant="h6">Loading...</Typography>;
  }

  return (
    <div>
      <Typography variant="h4" gutterBottom>
        Blog Posts
      </Typography>
      <Grid container spacing={3}>
        {posts.map((post) => (
          <Grid item xs={12} md={6} key={post.id}>
            <Card>
              <CardContent>
                <Typography variant="h5" component="div">
                  {post.title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {post.content.substring(0, 150)}...
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  By {post.author.name}
                </Typography>
              </CardContent>
              <CardActions>
                <Button 
                  size="small" 
                  component={Link} 
                  to={`/post/${post.id}`}
                >
                  Read More
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
      <Grid container justifyContent="center" sx={{ mt: 4 }}>
        <Pagination 
          count={totalPages} 
          page={page} 
          onChange={handlePageChange} 
          color="primary" 
        />
      </Grid>
    </div>
  );
};

export default Home;
