import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useForm, Controller } from 'react-hook-form';
import {
  Typography,
  Paper,
  Box,
  TextField,
  Button,
  Grid,
  List,
  ListItem,
  ListItemText,
  Divider,
} from '@mui/material';

import { RootState, AppDispatch } from '../store';

const Profile: React.FC = () => {
  const { user } = useSelector((state: RootState) => state.auth);
  const dispatch = useDispatch<AppDispatch>();
  const [isEditing, setIsEditing] = useState(false);

  const { control, handleSubmit, formState: { errors } } = useForm({
    defaultValues: {
      name: user?.name || '',
    },
  });

  const onSubmit = async (data: { name: string }) => {
    // TODO: Implement update profile functionality
    setIsEditing(false);
  };

  if (!user) {
    return <Typography variant="h6">Please log in to view your profile</Typography>;
  }

  return (
    <Grid container spacing={3}>
      <Grid item xs={12} md={4}>
        <Paper elevation={3} sx={{ p: 3 }}>
          <Typography variant="h5" gutterBottom>
            Profile Information
          </Typography>
          {isEditing ? (
            <Box component="form" onSubmit={handleSubmit(onSubmit)}>
              <Controller
                name="name"
                control={control}
                rules={{ 
                  required: 'Name is required',
                  minLength: {
                    value: 2,
                    message: "Name must be at least 2 characters"
                  }
                }}
                render={({ field }) => (
                  <TextField
                    {...field}
                    variant="outlined"
                    fullWidth
                    label="Name"
                    error={!!errors.name}
                    helperText={errors.name?.message}
                    sx={{ mb: 2 }}
                  />
                )}
              />
              <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Button 
                  type="submit" 
                  variant="contained" 
                  color="primary"
                >
                  Save
                </Button>
                <Button 
                  variant="outlined" 
                  color="secondary"
                  onClick={() => setIsEditing(false)}
                >
                  Cancel
                </Button>
              </Box>
            </Box>
          ) : (
            <>
              <Typography variant="body1">
                <strong>Name:</strong> {user.name}
              </Typography>
              <Typography variant="body1">
                <strong>Email:</strong> {user.email}
              </Typography>
              <Typography variant="body1">
                <strong>Role:</strong> {user.role}
              </Typography>
              <Button 
                variant="outlined" 
                color="primary" 
                sx={{ mt: 2 }}
                onClick={() => setIsEditing(true)}
              >
                Edit Profile
              </Button>
            </>
          )}
        </Paper>
      </Grid>

      <Grid item xs={12} md={8}>
        <Paper elevation={3} sx={{ p: 3 }}>
          <Typography variant="h5" gutterBottom>
            Your Posts
          </Typography>
          <List>
            {user.posts && user.posts.length > 0 ? (
              user.posts.map((post) => (
                <React.Fragment key={post.id}>
                  <ListItem>
                    <ListItemText
                      primary={post.title}
                      secondary={`Created on ${new Date(post.createdAt).toLocaleDateString()}`}
                    />
                  </ListItem>
                  <Divider component="li" />
                </React.Fragment>
              ))
            ) : (
              <Typography variant="body2" color="text.secondary">
                You haven't created any posts yet.
              </Typography>
            )}
          </List>
        </Paper>
      </Grid>
    </Grid>
  );
};

export default Profile;
