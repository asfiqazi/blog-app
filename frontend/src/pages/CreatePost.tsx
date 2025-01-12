import React, { useState, useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {
  TextField,
  Button,
  Typography,
  Paper,
  Box,
  Switch,
  FormControlLabel,
  Alert,
} from '@mui/material';

import { RootState, AppDispatch } from '../store';
import { createPost } from '../store/slices/postsSlice';

interface CreatePostFormInputs {
  title: string;
  content: string;
  published: boolean;
}

const CreatePost: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const { isLoading, error } = useSelector((state: RootState) => state.posts);
  const [postError, setPostError] = useState<string | null>(null);

  const { control, handleSubmit, formState: { errors } } = useForm<CreatePostFormInputs>({
    defaultValues: {
      title: '',
      content: '',
      published: false,
    },
  });

  useEffect(() => {
    if (error) {
      setPostError(error);
    }
  }, [error]);

  const onSubmit = async (data: CreatePostFormInputs) => {
    setPostError(null);
    try {
      const result = await dispatch(createPost(data)).unwrap();
      navigate(`/post/${result.id}`);
    } catch (err) {
      setPostError(err.message);
    }
  };

  return (
    <Box 
      sx={{ 
        display: 'flex', 
        flexDirection: 'column', 
        alignItems: 'center', 
        mt: 4 
      }}
    >
      <Paper 
        elevation={3} 
        sx={{ 
          padding: 4, 
          display: 'flex', 
          flexDirection: 'column', 
          alignItems: 'center',
          width: '100%',
          maxWidth: 600 
        }}
      >
        <Typography component="h1" variant="h5">
          Create New Blog Post
        </Typography>
        {postError && (
          <Alert severity="error" sx={{ width: '100%', mt: 2 }}>
            {postError}
          </Alert>
        )}
        <Box 
          component="form" 
          onSubmit={handleSubmit(onSubmit)} 
          sx={{ width: '100%', mt: 1 }}
        >
          <Controller
            name="title"
            control={control}
            rules={{ 
              required: 'Title is required',
              minLength: {
                value: 5,
                message: "Title must be at least 5 characters"
              }
            }}
            render={({ field }) => (
              <TextField
                {...field}
                variant="outlined"
                margin="normal"
                fullWidth
                label="Post Title"
                autoFocus
                error={!!errors.title}
                helperText={errors.title?.message}
              />
            )}
          />
          <Controller
            name="content"
            control={control}
            rules={{ 
              required: 'Content is required',
              minLength: {
                value: 10,
                message: "Content must be at least 10 characters"
              }
            }}
            render={({ field }) => (
              <TextField
                {...field}
                variant="outlined"
                margin="normal"
                fullWidth
                label="Post Content"
                multiline
                rows={10}
                error={!!errors.content}
                helperText={errors.content?.message}
              />
            )}
          />
          <Controller
            name="published"
            control={control}
            render={({ field: { value, onChange } }) => (
              <FormControlLabel
                control={
                  <Switch
                    checked={value}
                    onChange={(e) => onChange(e.target.checked)}
                    color="primary"
                  />
                }
                label="Publish Post"
              />
            )}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            disabled={isLoading}
            sx={{ mt: 3, mb: 2 }}
          >
            {isLoading ? 'Creating Post...' : 'Create Post'}
          </Button>
        </Box>
      </Paper>
    </Box>
  );
};

export default CreatePost;
