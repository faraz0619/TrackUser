import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import AuthStack from './AuthStack';
import HomeStack from './HomeStack';

const Routes = () => {
    const Stack = createStackNavigator();
  return (
    <NavigationContainer>
        <Stack.Navigator screenOptions={{headerShown:false}}>
            <Stack.Screen name='AuthStack' component={AuthStack}/>
            <Stack.Screen name='HomeStack' component={HomeStack}/>
        </Stack.Navigator>
    </NavigationContainer>
  )
}

export default Routes