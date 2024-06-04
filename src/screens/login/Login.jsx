import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ActivityIndicator,
} from 'react-native';
import {firebase} from '@react-native-firebase/auth';
import {moderateScale, scale} from 'react-native-size-matters';

const Login = ({navigation}) => {
  const [loading, setLoading] = useState(false);

  // For User State
  useEffect(() => {
    const unsubscribe = firebase.auth().onAuthStateChanged(user => {
      if (user) {
        navigation.replace('HomeStack');
      }
    });

    return () => unsubscribe();
  }, [navigation]);

  // Login Functionality

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [emailError, setErrorEmail] = useState('');
  const [passwordError, setErrorPassword] = useState('');

  const handleLogin = async () => {
    setLoading(true);
    try {
      let isValid = true;

      if (email.trim() === '') {
        isValid = false;
        setErrorEmail('Please Enter Email');
      } else {
        setErrorEmail('');
      }
      if (password.trim() === '') {
        isValid = false;
        setErrorPassword('Please Enter Password');
      } else {
        setErrorPassword('');
      }
      if (isValid) {
        await firebase.auth().signInWithEmailAndPassword(email, password);
        console.log('Login Successful');

        // navigation.navigate('HomeStack');
      }
    } catch (error) {
      const errorMessage = error.message.split('] ')[1];
      Alert.alert(errorMessage);
      // console.log(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const handleRegister = () => {
    navigation.navigate('Register');
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Enter Email"
        placeholderTextColor='grey'
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
        keyboardType="email-address"
      />
      <Text style={styles.errorText}>{emailError}</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter Password"
        placeholderTextColor='grey'
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <Text style={styles.errorText}>{passwordError}</Text>
      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        {loading ? (
          <ActivityIndicator size="small" color="white" />
        ) : (
          <Text style={styles.buttonText}>Login</Text>
        )}
      </TouchableOpacity>
      <TouchableOpacity style={styles.registerButton} onPress={handleRegister}>
        <Text style={styles.registerButtonText}>Register</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: moderateScale(20),
    backgroundColor: '#fff',
  },
  input: {
    color:'black',
    height: moderateScale(50),
    borderColor: '#ccc',
    borderWidth: 1,
    paddingHorizontal: moderateScale(10),
    borderRadius: 5,
  },
  button: {
    backgroundColor: '#007BFF',
    paddingVertical: moderateScale(15),
    borderRadius: moderateScale(10),
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: scale(16),
  },
  registerButton: {
    marginTop: moderateScale(50),
    alignItems: 'center',
  },
  registerButtonText: {
    color: '#007BFF',
    fontSize: 16,
  },
  errorText: {
    color: 'red',
    paddingLeft: moderateScale(5),
    padding: moderateScale(5),
  },
});

export default Login;