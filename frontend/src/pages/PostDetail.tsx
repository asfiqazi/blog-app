import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useForm, Controller } from 'react-hook-form';
import {
  Typography,
  Paper,
  Box,
  TextField,
  Button,
  Divider,
  List,
  ListItem,
  ListItemText,
  Pagination,
} from '@mui/material';

import { RootState, AppDispatch } from '../store';
import { fetchPostById } from '../store/slices/postsSlice';
import { 
  fetchComments, 
  createComment 
} from '../store/slices/commentsSlice';

interface CommentFormInputs {
  content: string;
}

const PostDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const dispatch = useDispatch<AppDispatch>();
  const { currentPost, isLoading: postLoading } = useSelector((state: RootState) => state.posts);
  const { comments, page, totalPages, isLoading: commentsLoading } = useSelector((state: RootState) => state.comments);
  const { isAuthenticated } = useSelector((state: RootState) => state.auth);

  const [commentPage, setCommentPage] = useState(1);

  const { control, handleSubmit, reset, formState: { errors } } = useForm<CommentFormInputs>({
    defaultValues: {
      content: '',
    },
  });

  useEffect(() => {
    if (id) {
      dispatch(fetchPostById(parseInt(id)));
      dispatch(fetchComments({ postId: parseInt(id), page: commentPage }));
    }
  }, [dispatch, id, commentPage]);

  const onSubmitComment = async (data: CommentFormInputs) => {
    if (id) {
      await dispatch(createComment({ 
        postId: parseInt(id), 
        content: data.content 
      }));
      reset();
    }
  };

  const handleCommentPageChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setCommentPage(value);
  };

  if (postLoading) {
    return <Typography variant="h6">Loading post...</Typography>;
  }

  if (!currentPost) {
    return <Typography variant="h6">Post not found</Typography>;
  }

  return (
    <Box>
      <Paper elevation={3} sx={{ p: 3, mb: 3 }}>
        <Typography variant="h4" gutterBottom>
          {currentPost.title}
        </Typography>
        <Typography variant="subtitle1" color="text.secondary" gutterBottom>
          By {currentPost.author.name} | {new Date(currentPost.createdAt).toLocaleDateString()}
        </Typography>
        <Typography variant="body1" paragraph>
          {currentPost.content}
        </Typography>
      </Paper>

      <Typography variant="h5" gutterBottom>
        Comments
      </Typography>

      {isAuthenticated && (
        <Paper elevation={2} sx={{ p: 2, mb: 3 }}>
          <Box component="form" onSubmit={handleSubmit(onSubmitComment)}>
            <Controller
              name="content"
              control={control}
              rules={{ 
                required: 'Comment is required',
                minLength: {
                  value: 5,
                  message: "Comment must be at least 5 characters"
                }
              }}
              render={({ field }) => (
                <TextField
                  {...field}
                  variant="outlined"
                  fullWidth
                  multiline
                  rows={4}
                  label="Write a comment"
                  error={!!errors.content}
                  helperText={errors.content?.message}
                />
              )}
            />
            <Button 
              type="submit" 
              variant="contained" 
              color="primary" 
              sx={{ mt: 2 }}
              disabled={commentsLoading}
            >
              Post Comment
            </Button>
          </Box>
        </Paper>
      )}

      {commentsLoading ? (
        <Typography variant="body1">Loading comments...</Typography>
      ) : (
        <>
          <List>
            {comments.map((comment) => (
              <React.Fragment key={comment.id}>
                <ListItem>
                  <ListItemText
                    primary={comment.author.name}
                    secondary={comment.content}
                  />
                </ListItem>
                <Divider variant="inset" component="li" />
              </React.Fragment>
            ))}
          </List>
          {totalPages > 1 && (
            <Box display="flex" justifyContent="center" mt={3}>
              <Pagination
                count={totalPages}
                page={page}
                onChange={handleCommentPageChange}
                color="primary"
              />
            </Box>
          )}
        </>
      )}
    </Box>
  );
};

export default PostDetail;
