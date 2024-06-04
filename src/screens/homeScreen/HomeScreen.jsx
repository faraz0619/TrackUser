import {
    ActivityIndicator,
    PermissionsAndroid,
    StyleSheet,
    Text,
    Touchable,
    TouchableOpacity,
    View,
  } from 'react-native';
  import React, {useEffect, useState} from 'react';
  import MapView, {PROVIDER_GOOGLE} from 'react-native-maps';
  import Geolocation from 'react-native-geolocation-service';
  import {firebase} from '@react-native-firebase/database';
  import {moderateScale, scale} from 'react-native-size-matters';
  
  const HomeScreen = ({navigation}) => {
    const [loading, setLoading] = useState(false);
  
    // For Taking User Permission
    useEffect(() => {
      requestLocationPermission();
    }, []);
    const requestLocationPermission = async () => {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        );
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          console.log('You can use the Location');
        } else {
          console.log('Location permission denied');
        }
      } catch (err) {
        console.warn(err);
      }
    };
  
    // For Get Current Location of User
  
    const [latitude, setLatitude] = useState(0);
    const [longitude, setLongitude] = useState(0);
  
    const getLocation = () => {
      Geolocation.getCurrentPosition(
        position => {
          console.log(position);
  
          const {latitude, longitude} = position.coords;
          setLatitude(latitude);
          setLongitude(longitude);
          saveLocationToFirebase(latitude, longitude);
        },
        error => {
          console.log(error.code, error.message);
        },
      );
    };
  
    const saveLocationToFirebase = (latitude, longitude) => {
      firebase
        .database()
        .ref('/location')
        .push({
          latitude,
          longitude,
        })
        .then(() => {
          console.log('Location saved successfully.');
        })
        .catch(error => {
          console.log('Error saving location: ', error);
        });
    };
  
    //  This function is a Static Function because i don't have Google map Api.
    // It is just showing you how can get and store the coordinates
  
    const [sLatitude, setSLatitude] = useState('25.399676729213496');
    const [sLongitude, setSLongitude] = useState('68.35419863935499');
  
    const staticLocation = async () => {
      try {
        const newLocation = firebase.database().ref('/location').push();
        await newLocation.set({
          latitude: sLatitude,
          longitude: sLongitude,
        });
        console.log('Location saved successfully');
      } catch (error) {
        console.error('Error saving data: ', error);
      }
    };
  
    // for Logout
  
    const handleLogout = async () => {
      setLoading(true);
      try {
        await firebase.auth().signOut();
        console.log('User signed out successfully');
        navigation.navigate('AuthStack');
      } catch (error) {
        console.error('Error signing out: ', error);
      } finally {
        setLoading(false);
      }
    };
  
    return (
      <View style={styles.container}>
        <MapView
          provider={PROVIDER_GOOGLE}
          style={styles.map}
          initialRegion={{
            latitude: 25.428651219600408,
            longitude: 68.53259360348757,
            latitudeDelta: 0.015,
            longitudeDelta: 0.0121,
          }}></MapView>
        <View style={{flexDirection: 'row'}}>
          <TouchableOpacity
            onPress={staticLocation}
            style={styles.getLocationBtn}>
            <Text style={styles.getLocationBtnText}>Get Location</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={handleLogout}
            style={[styles.getLocationBtn, {backgroundColor: 'red'}]}>
            {loading ? (
              <ActivityIndicator size="small" color="white" />
            ) : (
              <Text style={styles.getLocationBtnText}>Logout</Text>
            )}
          </TouchableOpacity>
        </View>
      </View>
    );
  };
  
  export default HomeScreen;
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      height: '100%',
      width: '100%',
      justifyContent: 'flex-end',
      alignItems: 'center',
    },
    map: {
      height: '100%',
      width: '100%',
    },
    getLocationBtn: {
      width:moderateScale(135),
      backgroundColor: '#3ae71c',
      margin: moderateScale(10),
      justifyContent:"center"
    },
    getLocationBtnText: {
      textAlign:"center",
      color: '#f8f8f8',
      padding: moderateScale(10),
      fontSize: scale(20),
      fontWeight: 'bold',
    },
  });