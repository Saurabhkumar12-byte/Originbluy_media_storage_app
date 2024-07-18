import React, { useState } from 'react';
import { View, TextInput, Button, Alert } from 'react-native';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../store'; // Import your store's AppDispatch type
import { registerUser, loginUser } from '../store/slices/authslice';

const AuthScreen = ({ navigation }: any) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch<AppDispatch>();

  const handleRegister = async () => {
    try {
      await dispatch(registerUser({ name, email, password })).unwrap();
      navigation.navigate('Media');
    } catch (error) {
      console.error('Failed to register:', error);
      Alert.alert('Error', 'Failed to register.');
    }
  };

  const handleLogin = async () => {
    try {
      await dispatch(loginUser({ email, password })).unwrap();
      navigation.navigate('Media');
    } catch (error) {
      console.error('Failed to login:', error);
      Alert.alert('Error', 'Failed to login.');
    }
  };

  return (
    <View>
      <TextInput placeholder="Name" value={name} onChangeText={setName} />
      <TextInput placeholder="Email" value={email} onChangeText={setEmail} />
      <TextInput placeholder="Password" value={password} onChangeText={setPassword} secureTextEntry />
      <Button title="Register" onPress={handleRegister} />
      <Button title="Login" onPress={handleLogin} />
    </View>
  );
};

export default AuthScreen;
