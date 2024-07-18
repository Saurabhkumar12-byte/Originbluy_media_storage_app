import React from 'react';
import { View, Image, Button, Alert } from 'react-native';
import { useDispatch } from 'react-redux';
import Video from 'react-native-video';
import { AppDispatch } from '../store';
import { deleteMedia } from '../store/slices/mediaslice'; 

interface MediaItemProps {
  media: {
    _id: string;
    url: string;
    type: 'image' | 'video';
  };
}

const MediaItem: React.FC<MediaItemProps> = ({ media }) => {
  const dispatch = useDispatch<AppDispatch>();

  const handleDelete = async () => {
    try {
      const result = await dispatch(deleteMedia(media._id));
      if (deleteMedia.fulfilled.match(result)) {
        console.log('Media deleted successfully:', result.payload);
      } else {
        console.error('Failed to delete media:', result.payload);
      }
    } catch (error) {
      console.error('Error deleting media:', error);
      Alert.alert('Error', 'Failed to delete media.');
    }
  };

  return (
    <View>
      {media.type === 'image' ? (
        <Image source={{ uri: media.url }} style={{ width: 100, height: 100 }} />
      ) : (
        <Video source={{ uri: media.url }} style={{ width: 100, height: 100 }} />
      )}
      <Button title="Delete" onPress={handleDelete} />
    </View>
  );
};

export default MediaItem;
