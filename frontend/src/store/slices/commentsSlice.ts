import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../../utils/axiosInterceptor';

interface Author {
  id: number;
  name: string;
}

export interface Comment {
  id: number;
  content: string;
  createdAt: string;
  updatedAt: string;
  author: Author;
  postId: number;
  isApproved: boolean;
}

interface CommentsState {
  comments: Comment[];
  page: number;
  totalPages: number;
  isLoading: boolean;
  error: string | null;
}

interface CreateCommentData {
  postId: number;
  content: string;
}

interface FetchCommentsParams {
  postId: number;
  page?: number;
  limit?: number;
}

// Async Thunks
export const fetchComments = createAsyncThunk(
  'comments/fetchComments',
  async ({ 
    postId, 
    page = 1, 
    limit = 10 
  }: FetchCommentsParams, { rejectWithValue }) => {
    try {
      const response = await axios.get(`/posts/${postId}/comments`, { 
        params: { page, limit } 
      });
      return response.data;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || 'Failed to fetch comments'
      );
    }
  }
);

export const createComment = createAsyncThunk(
  'comments/createComment',
  async (commentData: CreateCommentData, { rejectWithValue }) => {
    try {
      const response = await axios.post(`/posts/${commentData.postId}/comments`, {
        content: commentData.content
      });
      return response.data;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || 'Failed to create comment'
      );
    }
  }
);

export const updateComment = createAsyncThunk(
  'comments/updateComment',
  async ({ 
    commentId, 
    content 
  }: { 
    commentId: number, 
    content: string 
  }, { rejectWithValue }) => {
    try {
      const response = await axios.patch(`/comments/${commentId}`, { content });
      return response.data;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || 'Failed to update comment'
      );
    }
  }
);

export const deleteComment = createAsyncThunk(
  'comments/deleteComment',
  async (commentId: number, { rejectWithValue }) => {
    try {
      await axios.delete(`/comments/${commentId}`);
      return commentId;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || 'Failed to delete comment'
      );
    }
  }
);

// Initial State
const initialState: CommentsState = {
  comments: [],
  page: 1,
  totalPages: 0,
  isLoading: false,
  error: null,
};

// Slice
const commentsSlice = createSlice({
  name: 'comments',
  initialState,
  reducers: {
    clearComments: (state) => {
      state.comments = [];
      state.page = 1;
      state.totalPages = 0;
    },
  },
  extraReducers: (builder) => {
    // Fetch Comments
    builder.addCase(fetchComments.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(fetchComments.fulfilled, (state, action) => {
      state.isLoading = false;
      state.comments = action.payload.comments;
      state.page = action.payload.page;
      state.totalPages = action.payload.totalPages;
    });
    builder.addCase(fetchComments.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload as string;
    });

    // Create Comment
    builder.addCase(createComment.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(createComment.fulfilled, (state, action) => {
      state.isLoading = false;
      state.comments.unshift(action.payload);
      state.totalPages = Math.max(state.totalPages, 1);
    });
    builder.addCase(createComment.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload as string;
    });

    // Update Comment
    builder.addCase(updateComment.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(updateComment.fulfilled, (state, action) => {
      state.isLoading = false;
      const index = state.comments.findIndex(comment => comment.id === action.payload.id);
      if (index !== -1) {
        state.comments[index] = action.payload;
      }
    });
    builder.addCase(updateComment.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload as string;
    });

    // Delete Comment
    builder.addCase(deleteComment.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(deleteComment.fulfilled, (state, action) => {
      state.isLoading = false;
      state.comments = state.comments.filter(comment => comment.id !== action.payload);
    });
    builder.addCase(deleteComment.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload as string;
    });
  },
});

export const { clearComments } = commentsSlice.actions;
export default commentsSlice.reducer;
