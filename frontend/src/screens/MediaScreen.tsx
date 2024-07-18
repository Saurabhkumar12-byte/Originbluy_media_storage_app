// MediaScreen.tsx

import React, { useEffect, useState } from 'react';
import { View, Button, FlatList, Text, Alert, StyleSheet } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import DocumentPicker, { DocumentPickerResponse } from 'react-native-document-picker';
import { fetchUserMedia, uploadMedia, deleteMedia } from '../store/slices/mediaslice';
import MediaItem from '../components/MediaItem';
import { RootState } from '../store';

const MediaScreen: React.FC = () => {
  const dispatch = useDispatch();
  const media = useSelector((state: RootState) => state.media.media);
  const [selectedFile, setSelectedFile] = useState<DocumentPickerResponse | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    dispatch(fetchUserMedia() as any);
  }, [dispatch]);
 
  const handleUpload = async () => {
    if (!selectedFile) {
      Alert.alert('No File Selected', 'Please select a file to upload.');
      return;
    }

    setLoading(true);

    try {
      const fileUri = selectedFile.uri;
      await dispatch(uploadMedia(fileUri) as any);

      Alert.alert('Upload Successful', 'Media uploaded successfully.');
      setSelectedFile(null);
    } catch (error) {
      console.error('Error uploading media:', error);
      Alert.alert('Upload Failed', 'Failed to upload media. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  const selectFile = async () => {
    try {
      const res = await DocumentPicker.pick({
        type: [DocumentPicker.types.allFiles],
      });
      setSelectedFile(res as any);
    } catch (err) {
      if (DocumentPicker.isCancel(err)) {
        console.log('User cancelled file picker');
      } else {
        console.error('Unknown error:', err);
        Alert.alert('Error', 'Failed to select file. Please try again later.');
      }
    }
  };

  return (
    <View style={styles.container}>
      <Button title="Select Media" onPress={selectFile} />
      {selectedFile && (
        <Text style={styles.fileInfo}>
          Selected File: {selectedFile.name} ({selectedFile.type})
        </Text>
      )}
      <Button
        title="Upload Media"
        onPress={handleUpload}
        disabled={!selectedFile || loading}
      />
      <FlatList
        data={media}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => <MediaItem media={item} />}
        style={styles.flatList}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  fileInfo: {
    marginTop: 10,
  },
  flatList: {
    marginTop: 20,
  },
});

export default MediaScreen;
