

import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

export interface Media {
  _id: string;
  url: string;
  type: 'image' | 'video';
  createdAt: string;
  updatedAt: string;
}

export interface MediaState {
  media: Media[];
  loading: boolean;
  error: string | null;
}

const initialState: MediaState = {
  media: [],
  loading: false,
  error: null
};

export const uploadMedia = createAsyncThunk(
  'media/uploadMedia',
  async (fileUri: string, { rejectWithValue, getState }) => {
    try {
      const state = getState() as { auth: { token: string } };
      const token = state.auth.token;

      const formData = new FormData();
      formData.append('file', { uri: fileUri, type: 'multipart/form-data' });

      const response = await axios.post('/api/media', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${token}`
        }
      });

      return response.data as Media;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Upload failed');
    }
  }
);

export const fetchUserMedia = createAsyncThunk(
  'media/fetchUserMedia',
  async (_, { rejectWithValue, getState }) => {
    try {
      const state = getState() as { auth: { token: string } };
      const token = state.auth.token;

      const response = await axios.get('/api/media', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      return response.data as Media[];
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Fetch failed');
    }
  }
);

export const deleteMedia = createAsyncThunk(
  'media/deleteMedia',
  async (mediaId: string, { rejectWithValue, getState }) => {
    try {
      const state = getState() as { auth: { token: string } };
      const token = state.auth.token;

      await axios.delete(`/api/media/${mediaId}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      return mediaId;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Delete failed');
    }
  }
);

const mediaSlice = createSlice({
  name: 'media',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(uploadMedia.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(uploadMedia.fulfilled, (state, action) => {
        state.loading = false;
        state.media.push(action.payload);
      })
      .addCase(uploadMedia.rejected, (state, action) => {
        state.loading = false;
        state.error = 'Failed to upload media';
      })
      .addCase(fetchUserMedia.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUserMedia.fulfilled, (state, action) => {
        state.loading = false;
        state.media = action.payload;
      })
      .addCase(fetchUserMedia.rejected, (state, action) => {
        state.loading = false;
        state.error =  'Failed to fetch media';
      })
      .addCase(deleteMedia.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteMedia.fulfilled, (state, action) => {
        state.loading = false;
        state.media = state.media.filter((media) => media._id !== action.payload);
      })
      .addCase(deleteMedia.rejected, (state, action) => {
        state.loading = false;
        state.error =  'Failed to delete media';
      });
  }
});

export default mediaSlice.reducer;
