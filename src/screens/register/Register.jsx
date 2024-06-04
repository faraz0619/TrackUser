import React, {useState} from 'react';
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

const Register = ({navigation}) => {
  const [loading, setLoading] = useState(false);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [emailError, setErrorEmail] = useState('');
  const [passwordError, setErrorPassword] = useState('');

  const handleRegister = async () => {
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
        await firebase.auth().createUserWithEmailAndPassword(email, password);
        // console.log('Register Successfully');
        Alert.alert('Welcome to TrackRoute');
        // navigation.replace('Login');
      }
    } catch (error) {
      const errorMessage = error.message.split('] ')[1];
      Alert.alert(errorMessage);
      // console.log(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const handleLogin = () => {
    navigation.navigate('Login');
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
      <TouchableOpacity style={styles.button} onPress={handleRegister}>
        {loading ? (
          <ActivityIndicator size="small" color="white" />
        ) : (
          <Text style={styles.buttonText}>Register</Text>
        )}
      </TouchableOpacity>
      <TouchableOpacity style={styles.registerButton} onPress={handleLogin}>
        <Text style={styles.registerButtonText}>Login</Text>
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
    height: scale(50),
    borderColor: '#ccc',
    borderWidth: 1,
    paddingHorizontal: moderateScale(10),
    borderRadius: 5,
  },
  button: {
    backgroundColor: '#007BFF',
    paddingVertical: moderateScale(15),
    borderRadius: 5,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: scale(16),
  },
  registerButton: {
    marginTop: moderateScale(20),
    paddingVertical: moderateScale(15),
    alignItems: 'center',
  },
  registerButtonText: {
    color: '#007BFF',
    fontSize: scale(16),
  },
  errorText: {
    color: 'red',
    paddingLeft: moderateScale(5),
    padding: moderateScale(5),
  },
});

export default Register;